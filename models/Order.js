import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: [true, 'Client name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    clientEmail: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
    },
    clientPhone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
    },
    services: {
        frontend: {
            tier: {
                type: String,
                enum: ['modern', 'animations', 'everything'],
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
        backend: {
            tier: {
                type: String,
                enum: ['modern', 'premium', null],
                default: null,
            },
            price: {
                type: Number,
                default: 0,
            },
        },
        mongodb: {
            features: [{
                type: String,
                enum: ['user', 'gridfs', 'combo'],
            }],
            price: {
                type: Number,
                default: 0,
            },
        },
        uropay: {
            included: {
                type: Boolean,
                default: false,
            },
            price: {
                type: Number,
                default: 0,
            },
        },
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Price cannot be negative'],
    },
    businessSummary: {
        type: String,
        trim: true,
        maxlength: [2000, 'Business summary cannot exceed 2000 characters'],
        default: '',
    },
    additionalInfo: {
        type: String,
        trim: true,
        maxlength: [2000, 'Additional info cannot exceed 2000 characters'],
        default: '',
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

// Indexes for efficient querying
orderSchema.index({ clientEmail: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ clientName: 'text', clientEmail: 'text', clientPhone: 'text' });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
