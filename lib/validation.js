import { z } from 'zod/v4';

// Indian phone number validation
const phoneRegex = /^[6-9]\d{9}$/;

// Client information schema
export const clientInfoSchema = z.object({
    clientName: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters')
        .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    clientEmail: z
        .email('Please enter a valid email address'),
    clientPhone: z
        .string()
        .regex(phoneRegex, 'Please enter a valid 10-digit Indian phone number'),
});

// Frontend tier schema
export const frontendSchema = z.object({
    tier: z.enum(['modern', 'animations', 'everything'], {
        message: 'Please select a frontend option',
    }),
    price: z.number().positive(),
});

// Backend tier schema (optional, but required if MongoDB/Uropay selected)
export const backendSchema = z.object({
    tier: z.enum(['modern', 'premium']).nullable(),
    price: z.number().min(0),
});

// MongoDB features schema
export const mongodbSchema = z.object({
    features: z.array(z.enum(['user', 'gridfs', 'combo'])),
    price: z.number().min(0),
});

// Uropay schema
export const uropaySchema = z.object({
    included: z.boolean(),
    price: z.number().min(0),
});

// Complete order schema with conditional validation
export const orderSchema = z.object({
    clientName: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters'),
    clientEmail: z.email('Please enter a valid email address'),
    clientPhone: z
        .string()
        .regex(phoneRegex, 'Please enter a valid 10-digit Indian phone number'),
    services: z.object({
        frontend: frontendSchema,
        backend: backendSchema,
        mongodb: mongodbSchema,
        uropay: uropaySchema,
    }),
    totalPrice: z.number().positive('Total price must be positive'),
}).refine(
    (data) => {
        // If MongoDB features or Uropay is selected, backend must be selected
        const hasMongoFeatures = data.services.mongodb.features.length > 0;
        const hasUropay = data.services.uropay.included;
        const hasBackend = data.services.backend.tier !== null;

        if ((hasMongoFeatures || hasUropay) && !hasBackend) {
            return false;
        }
        return true;
    },
    {
        message: 'Backend is required when MongoDB features or Uropay is selected',
        path: ['services', 'backend'],
    }
);

// Admin login schema
export const loginSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Pricing constants
export const PRICING = {
    frontend: {
        modern: 3000,
        animations: 6000,
        everything: 9000,
    },
    backend: {
        modern: 2500,
        premium: 5000,
    },
    mongodb: {
        user: 3000,
        gridfs: 2500,
        combo: 5000, // Save ₹500
    },
    uropay: 3500,
};

// Calculate total price
export function calculateTotalPrice(services) {
    let total = 0;

    // Frontend (required)
    if (services.frontend?.tier) {
        total += PRICING.frontend[services.frontend.tier] || 0;
    }

    // Backend (optional)
    if (services.backend?.tier) {
        total += PRICING.backend[services.backend.tier] || 0;
    }

    // MongoDB features
    if (services.mongodb?.features?.length > 0) {
        if (services.mongodb.features.includes('combo')) {
            total += PRICING.mongodb.combo;
        } else {
            services.mongodb.features.forEach((feature) => {
                if (feature !== 'combo') {
                    total += PRICING.mongodb[feature] || 0;
                }
            });
        }
    }

    // Uropay
    if (services.uropay?.included) {
        total += PRICING.uropay;
    }

    return total;
}
