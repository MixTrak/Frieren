import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { signToken, setAuthCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';

export async function POST(request) {
    try {
        const ip = getClientIP(request);

        // Rate limiting: 5 attempts per 15 minutes per IP
        const rateLimit = checkRateLimit(`login:${ip}`, 15 * 60 * 1000, 5);
        if (!rateLimit.allowed) {
            return NextResponse.json(
                {
                    error: `Too many login attempts. Please try again in ${rateLimit.retryAfter} seconds.`,
                    retryAfter: rateLimit.retryAfter
                },
                { status: 429 }
            );
        }

        const body = await request.json();

        // Validate input
        const validationResult = loginSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 400 }
            );
        }

        const { username, password } = validationResult.data;

        await connectDB();

        // Find admin by username
        let admin = await Admin.findOne({ username: username.toLowerCase() });

        // If no admin exists, check environment variables for initial setup
        if (!admin && process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
            if (
                username.toLowerCase() === process.env.ADMIN_USERNAME.toLowerCase() &&
                password === process.env.ADMIN_PASSWORD
            ) {
                // Create admin from environment variables
                const passwordHash = await bcrypt.hash(password, 10);
                admin = await Admin.create({
                    username: process.env.ADMIN_USERNAME.toLowerCase(),
                    passwordHash,
                    role: 'super-admin',
                });
            }
        }

        if (!admin) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Update last login
        await Admin.findByIdAndUpdate(admin._id, { lastLogin: new Date() });

        // Generate JWT token
        const token = await signToken({
            id: admin._id.toString(),
            username: admin.username,
            role: admin.role,
        });

        // Set cookie
        await setAuthCookie(token);

        return NextResponse.json({
            success: true,
            message: 'Login successful',
            admin: {
                username: admin.username,
                role: admin.role,
            },
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed. Please try again.' },
            { status: 500 }
        );
    }
}
