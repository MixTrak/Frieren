// Simple in-memory rate limiting for serverless
// In production, consider using Redis or a proper rate limiting service

const rateLimitStore = new Map();

// Clean up old entries periodically
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute
let lastCleanup = Date.now();

function cleanup() {
    const now = Date.now();
    if (now - lastCleanup > CLEANUP_INTERVAL) {
        for (const [key, data] of rateLimitStore.entries()) {
            if (now - data.windowStart > data.windowMs) {
                rateLimitStore.delete(key);
            }
        }
        lastCleanup = now;
    }
}

export function checkRateLimit(key, windowMs = 900000, maxAttempts = 5) {
    cleanup();

    const now = Date.now();
    const data = rateLimitStore.get(key);

    if (!data) {
        rateLimitStore.set(key, {
            attempts: 1,
            windowStart: now,
            windowMs,
        });
        return { allowed: true, remaining: maxAttempts - 1 };
    }

    // Reset if window has passed
    if (now - data.windowStart > windowMs) {
        rateLimitStore.set(key, {
            attempts: 1,
            windowStart: now,
            windowMs,
        });
        return { allowed: true, remaining: maxAttempts - 1 };
    }

    // Check if limit exceeded
    if (data.attempts >= maxAttempts) {
        const retryAfter = Math.ceil((data.windowStart + windowMs - now) / 1000);
        return { allowed: false, remaining: 0, retryAfter };
    }

    // Increment attempts
    data.attempts += 1;
    rateLimitStore.set(key, data);

    return { allowed: true, remaining: maxAttempts - data.attempts };
}

export function getClientIP(request) {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }
    return 'unknown';
}
