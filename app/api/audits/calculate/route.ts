import { NextRequest, NextResponse } from "next/server";
import { calculateAuditMetrics } from "@/lib/calculator";
import { AuditInputs } from "@/lib/types";
import { z } from "zod";

// Validation schema
const schema = z.object({
    businessOwner: z.boolean(),
    hasCrm: z.string(),
    hasSalesDept: z.string(),
    socialStatus: z.string(),
    industry: z.string(),
    platform: z.string(),
    revenueGoal: z.number().positive(),
    avgCheck: z.number().positive(),
    conversionRate: z.number().min(0).max(100),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate inputs
        const result = schema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid inputs", details: result.error.errors },
                { status: 400 }
            );
        }

        const inputs: AuditInputs = result.data;
        const metrics = calculateAuditMetrics(inputs);

        return NextResponse.json({ success: true, metrics });
    } catch (error) {
        console.error("Calculation error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
