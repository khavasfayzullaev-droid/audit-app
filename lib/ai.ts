import { AuditInputs, CalculatedMetrics } from "./types";

export type AIResponse = {
    summary: string;
    risks: string[];
    recommendations: string[];
    action_plan: {
        week1: string[];
        week2: string[];
        month1: string[];
    };
    assumptions: string[];
};

export async function generateAuditAnalysis(
    inputs: AuditInputs,
    metrics: CalculatedMetrics
): Promise<AIResponse> {
    // TODO: Integrate OpenAI API here

    // Mock Response
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay

    return {
        summary: `Sizning biznesingiz ${inputs.industry} sohasida faoliyat yuritmoqda. Hozirgi holatingiz tahlili shuni ko'rsatadiki, sizda tizimlashtirish bo'yicha jiddiy muammolar mavjud. \nCRM tizimi: ${inputs.hasCrm === "NO" ? "Yo'q (bu mijozlar yo'qotilishiga sabab bo'ladi)" : "Bor"}. \nSotuv bo'limi: ${inputs.hasSalesDept === "NO" ? "Mavjud emas (lidlarni kim qayta ishlaydi?)" : "Mavjud"}.`,
        risks: [
            inputs.hasCrm === "NO" ? "Mijozlar bazasi bilan ishlash tizimi yo'q, bu esa qayta sotuvlar deyarli bo'lmasligini anglatadi." : "",
            inputs.hasSalesDept === "NO" ? "Lidlarni qayta ishlash uchun mas'ul xodimlar yetishmasligi sababli reklama byudjeti havoga uchishi mumkin." : "",
            metrics.riskScore === "RED" ? "Yuqori xavf guruhi: Reklama byudjeti samarasiz bo'lishi ehtimoli juda katta." : ""
        ].filter(Boolean),
        recommendations: [
            "CRM tizimini joriy qiling (AmoCRM yoki Bitrix24). Bu sizga har bir lidni nazorat qilish imkonini beradi.",
            "Sotuv skriptlarini ishlab chiqing va menejerlarni (yoki o'zingizni) o'qiting.",
            "Lidlar sifatini oshirish uchun target auditoriyani toraytiring va kreatiflarni yangilang."
        ],
        action_plan: {
            week1: [
                "CRM (AmoCRM/Bitrix) da ro'yxatdan o'tish va voronkani sozlash.",
                "Sotuv skriptining qoralama variantini yozish (Salomlashish -> Ehtiyojni aniqlash -> Taklif -> Yopish).",
                "Raqobatchilar reklamasini tahlil qilish (3 ta asosiy raqobatchi)."
            ],
            week2: ["Reklama kreativlarini tayyorlash (Video + Rasm)", "Birinchi test kampaniyasini ishga tushirish ($50 byudjet)"],
            month1: ["Sotuv bo'limi uchun KPI tizimini ishlab chiqish", "Reklama natijalarini tahlil qilish va optimizatsiya"]
        },
        assumptions: [
            "Lid narxi benchmark asosida hisoblandi.",
            "Konversiya foizi siz kiritgan ma'lumotga asoslandi."
        ]
    };
}
