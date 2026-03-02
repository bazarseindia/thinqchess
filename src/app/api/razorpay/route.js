import { NextResponse } from "next/server";

// POST - Create Razorpay order
// Requires: npm install razorpay
// Requires: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env
export async function POST(request) {
    try {
        const { amount, currency = "INR", receipt, notes } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ success: false, error: "Invalid amount" }, { status: 400 });
        }

        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            return NextResponse.json(
                { success: false, error: "Payment gateway not configured. Please contact admin." },
                { status: 503 }
            );
        }

        let Razorpay;
        try {
            Razorpay = (await import("razorpay")).default;
        } catch (e) {
            return NextResponse.json(
                { success: false, error: "Payment module not installed. Run: npm install razorpay" },
                { status: 503 }
            );
        }

        const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // Razorpay expects paise
            currency,
            receipt: receipt || `order_${Date.now()}`,
            notes: notes || {},
        });

        return NextResponse.json({
            success: true,
            key: keyId,
            order,
        });
    } catch (error) {
        console.error("Razorpay order error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
