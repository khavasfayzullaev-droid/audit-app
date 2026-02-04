export type AuditInputs = {
    businessOwner: boolean;
    hasCrm: string; // "NO", "AMO", "BITRIX", "OTHER"
    hasSalesDept: string; // "NO", "YES_1", "YES_2-5", "YES_5+"
    socialStatus: string; // "BAD", "MID", "GOOD"
    industry: string;
    platform: string;
    revenueGoal: number;
    avgCheck: number;
    conversionRate: number; // Percentage, e.g. 10 for 10%
};

export type CalculatedMetrics = {
    clientsNeeded: number;
    leadsNeeded: number;
    budgetMin: number;
    budgetOpt: number;
    riskScore: "GREEN" | "YELLOW" | "RED";
    penaltyPercentage: number;
    realBudgetMin: number;
    realBudgetOpt: number;
};

export type BenchmarkData = {
    cplMin: number;
    cplOpt: number;
};
