import { AuditInputs, CalculatedMetrics, BenchmarkData } from "./types";

// Default benchmarks if not provided
const DEFAULT_BENCHMARK: BenchmarkData = {
    cplMin: 2.0, // $2
    cplOpt: 5.0, // $5
};

export function calculateAuditMetrics(
    inputs: AuditInputs,
    benchmark: BenchmarkData = DEFAULT_BENCHMARK
): CalculatedMetrics {
    const {
        revenueGoal,
        avgCheck,
        conversionRate,
        hasCrm,
        hasSalesDept,
        socialStatus,
    } = inputs;

    // A) Clients Needed with validation
    const safeAvgCheck = avgCheck > 0 ? avgCheck : 1;
    const clientsNeeded = Math.ceil(revenueGoal / safeAvgCheck);

    // B) Leads Needed
    const safeConversion = conversionRate > 0 ? conversionRate / 100 : 0.01;
    const leadsNeeded = Math.ceil(clientsNeeded / safeConversion);

    // C) Budget
    const budgetMin = leadsNeeded * benchmark.cplMin;
    const budgetOpt = leadsNeeded * benchmark.cplOpt;

    // D) Risk Scoring
    let riskPoints = 0;
    if (!inputs.businessOwner) riskPoints += 1; // Maybe? Not in spec but good to track
    if (hasCrm === "NO") riskPoints += 1;
    if (hasSalesDept === "NO") riskPoints += 1;
    if (socialStatus === "BAD") riskPoints += 1;

    let riskScore: "GREEN" | "YELLOW" | "RED" = "GREEN";
    if (riskPoints === 1) riskScore = "YELLOW";
    if (riskPoints >= 2) riskScore = "RED";

    // E) Efficiency Penalty
    let penaltyPercentage = 0;
    if (hasCrm === "NO") penaltyPercentage += 0.20; // 20%
    if (hasSalesDept === "NO") penaltyPercentage += 0.20; // 20%
    if (socialStatus === "BAD") penaltyPercentage += 0.10; // 10% (Example X%)

    const realBudgetMin = budgetMin * (1 + penaltyPercentage);
    const realBudgetOpt = budgetOpt * (1 + penaltyPercentage);

    return {
        clientsNeeded,
        leadsNeeded,
        budgetMin,
        budgetOpt,
        riskScore,
        penaltyPercentage,
        realBudgetMin,
        realBudgetOpt,
    };
}
