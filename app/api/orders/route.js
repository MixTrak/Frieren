import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { orderSchema, calculateTotalPrice } from '@/lib/validation';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';
import { getCurrentAdmin } from '@/lib/auth';

// POST - Create new order (public)
export async function POST(request) {
    try {
        const ip = getClientIP(request);

        // Rate limiting: 3 orders per hour per IP
        const rateLimit = checkRateLimit(`order:${ip}`, 60 * 60 * 1000, 3);
        if (!rateLimit.allowed) {
            return NextResponse.json(
                {
                    error: 'Too many requests. Please try again later.',
                    retryAfter: rateLimit.retryAfter
                },
                { status: 429 }
            );
        }

        const body = await request.json();

        // Validate input
        const validationResult = orderSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validationResult.error.format() },
                { status: 400 }
            );
        }

        const data = validationResult.data;

        // Recalculate total price on server for security
        const calculatedTotal = calculateTotalPrice(data.services);
        if (calculatedTotal !== data.totalPrice) {
            data.totalPrice = calculatedTotal;
        }

        await connectDB();

        const order = await Order.create({
            clientName: data.clientName,
            clientEmail: data.clientEmail,
            clientPhone: data.clientPhone,
            businessSummary: data.businessSummary || '',
            additionalInfo: data.additionalInfo || '',
            services: data.services,
            totalPrice: data.totalPrice,
            status: 'pending',
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Order submitted successfully',
                orderId: order._id,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json(
            { error: 'Failed to submit order. Please try again.' },
            { status: 500 }
        );
    }
}

// GET - Fetch orders (protected - admin only)
export async function GET(request) {
    try {
        // Check authentication
        const admin = await getCurrentAdmin();
        if (!admin) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);

        // Query parameters
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 20;
        const status = searchParams.get('status');
        const search = searchParams.get('search');
        const sortField = searchParams.get('sortField') || 'createdAt';
        const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        await connectDB();

        // Build query
        const query = {};

        if (status && ['pending', 'in-progress', 'completed'].includes(status)) {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { clientName: { $regex: search, $options: 'i' } },
                { clientEmail: { $regex: search, $options: 'i' } },
                { clientPhone: { $regex: search, $options: 'i' } },
            ];
        }

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        if (minPrice || maxPrice) {
            query.totalPrice = {};
            if (minPrice) query.totalPrice.$gte = parseFloat(minPrice);
            if (maxPrice) query.totalPrice.$lte = parseFloat(maxPrice);
        }

        // Execute query with pagination
        const skip = (page - 1) * limit;
        const sortObj = { [sortField]: sortOrder };

        const [orders, total] = await Promise.all([
            Order.find(query)
                .sort(sortObj)
                .skip(skip)
                .limit(limit)
                .lean(),
            Order.countDocuments(query),
        ]);

        // Calculate statistics
        const stats = await Order.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' },
                    avgOrderValue: { $avg: '$totalPrice' },
                    pendingCount: {
                        $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] },
                    },
                },
            },
        ]);

        return NextResponse.json({
            orders,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
            stats: stats[0] || { totalRevenue: 0, avgOrderValue: 0, pendingCount: 0 },
        });

    } catch (error) {
        console.error('Order fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
