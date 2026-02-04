"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { AuditInputs, CalculatedMetrics } from "@/lib/types";
import { generateAuditAnalysis, AIResponse } from "@/lib/ai";
import { ArrowLeft, AlertTriangle, CheckCircle, Download, Share2, Printer } from "lucide-react";
import Link from "next/link";

export default function ReportView() {
    const [data, setData] = useState<{ inputs: AuditInputs; metrics: CalculatedMetrics } | null>(null);
    const [analysis, setAnalysis] = useState<AIResponse | null>(null);
    const [loadingAI, setLoadingAI] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("latest_audit");
        if (stored) {
            const parsed = JSON.parse(stored);
            setData(parsed);

            // Trigger AI generation
            setLoadingAI(true);
            generateAuditAnalysis(parsed.inputs, parsed.metrics)
                .then(setAnalysis)
                .catch(console.error)
                .finally(() => setLoadingAI(false));
        }
    }, []);

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-500">Hisobot yuklanmoqda...</p>
            </div>
        );
    }

    const { inputs, metrics } = data;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-6 print:p-0">

            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
                <div>
                    <Link href="/audits" className="text-sm text-gray-500 hover:text-gray-900 flex items-center mb-2">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Mening auditlarim
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Marketing & Moliya Auditi</h1>
                    <p className="text-gray-500">Sana: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handlePrint} className="gap-2">
                        <Printer className="h-4 w-4" /> PDF Yuklab olish
                    </Button>
                    <Button variant="secondary" className="gap-2">
                        <Share2 className="h-4 w-4" /> Ulashish
                    </Button>
                </div>
            </div>

            {/* 1. Business Status */}
            <Card className="border-l-4 border-l-blue-500 shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        🏥 Biznes Holati
                    </CardTitle>
                    <CardDescription>Hozirgi operatsion holat tekshiruvi</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="flex justify-between items-center border-b border-dashed pb-3">
                        <span className="text-gray-600">CRM Tizimi:</span>
                        <span className={`font-bold px-3 py-1 rounded-full text-sm ${inputs.hasCrm === "NO" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                            {inputs.hasCrm === "NO" ? "Yo'q" : "Bor"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-dashed pb-3">
                        <span className="text-gray-600">Sotuv Bo'limi:</span>
                        <span className={`font-bold px-3 py-1 rounded-full text-sm ${inputs.hasSalesDept === "NO" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                            {inputs.hasSalesDept === "NO" ? "Yo'q" : "Bor"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-dashed pb-3">
                        <span className="text-gray-600">Ijtimoiy Tarmoqlar:</span>
                        <span className={`font-bold px-3 py-1 rounded-full text-sm ${inputs.socialStatus === "BAD" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                            {inputs.socialStatus === "BAD" ? "Yomon" : inputs.socialStatus === "MID" ? "O'rtacha" : "Zo'r"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-dashed pb-3">
                        <span className="text-gray-600">Umumiy Xavf:</span>
                        <span className={`font-bold px-3 py-1 rounded-full text-sm ${metrics.riskScore === "RED" ? "bg-red-100 text-red-600" :
                                metrics.riskScore === "YELLOW" ? "bg-yellow-100 text-yellow-600" :
                                    "bg-green-100 text-green-600"
                            }`}>
                            {metrics.riskScore === "RED" ? "YUQORI" : metrics.riskScore === "YELLOW" ? "O'RTA" : "PAST"}
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* 2. Financial Goal & Funnel */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        🎯 Maqsad va Voronka (Funnel)
                    </CardTitle>
                    <CardDescription>Moliyaviy maqsadingizga yetish matematikasi</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                            <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-semibold">Daromad Maqsadi</div>
                            <div className="text-3xl font-extrabold text-gray-900">${inputs.revenueGoal.toLocaleString()}</div>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                            <div className="text-sm text-blue-600 mb-1 uppercase tracking-wider font-semibold">Kerakli Mijozlar</div>
                            <div className="text-3xl font-extrabold text-blue-700">{metrics.clientsNeeded} ta</div>
                            <div className="text-xs text-blue-500 mt-1">O'rtacha chek: ${inputs.avgCheck}</div>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                            <div className="text-sm text-purple-600 mb-1 uppercase tracking-wider font-semibold">Kerakli Lidlar</div>
                            <div className="text-3xl font-extrabold text-purple-700">{metrics.leadsNeeded} ta</div>
                            <div className="text-xs text-purple-500 mt-1">Konversiya: {inputs.conversionRate}%</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 3. Budget */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800 text-xl">
                        💰 Tavsiya Etilgan Reklama Byudjeti
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/60 p-4 rounded-lg backdrop-blur-sm border border-blue-100">
                            <div className="mb-2 font-semibold text-gray-600 uppercase text-xs">Minimal Byudjet</div>
                            <div className="text-4xl font-extrabold text-slate-900">
                                ${Math.round(metrics.realBudgetMin).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500 mt-2">
                                Asosiy formula: ${Math.round(metrics.budgetMin).toLocaleString()} <br />
                                <span className="text-red-500 font-medium">Samarasizlik jarimasi: +{metrics.penaltyPercentage * 100}%</span>
                            </div>
                        </div>
                        <div className="bg-white/60 p-4 rounded-lg backdrop-blur-sm border border-green-100">
                            <div className="mb-2 font-semibold text-gray-600 uppercase text-xs">Optimal Byudjet</div>
                            <div className="text-4xl font-extrabold text-green-700">
                                ${Math.round(metrics.realBudgetOpt).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500 mt-2">
                                Barqaror o'sish va tajribalar uchun tavsiya etiladi.
                            </div>
                        </div>
                    </div>

                    {metrics.penaltyPercentage > 0 && (
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-900 text-sm rounded-lg flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0 text-yellow-600" />
                            <div>
                                <strong>Samarasizlik Jarimasi (+{metrics.penaltyPercentage * 100}%):</strong><br />
                                Sizning byudjetingiz tizimsizlik (CRM yo'qligi va h.k) sababli oshirilgan.
                                Agar tizimni to'g'irlasangiz, mijoz jalb qilish narxi (CAC) kamayadi.
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* 4. AI Analysis */}
            <Card className="shadow-lg border-t-4 border-t-purple-600">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        🤖 AI Maslahatchi & Harakatlar Rejasi
                    </CardTitle>
                    <CardDescription>Sizning ko'rsatkichlaringiz asosida yozilgan shaxsiy strategiya</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {loadingAI ? (
                        <div className="space-y-4 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="grid grid-cols-3 gap-4 mt-8">
                                <div className="h-24 bg-gray-200 rounded"></div>
                                <div className="h-24 bg-gray-200 rounded"></div>
                                <div className="h-24 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ) : analysis ? (
                        <>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    Xulosa
                                </h4>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{analysis.summary}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                                        ⚠️ Aniqlangan Xavflar
                                    </h4>
                                    <ul className="space-y-2">
                                        {analysis.risks.map((risk, i) => (
                                            <li key={i} className="flex gap-2 text-gray-700 bg-red-50 p-2 rounded text-sm border-l-2 border-red-400">
                                                <span>•</span> {risk}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-green-600 mb-3 flex items-center gap-2">
                                        ✅ Asosiy Tavsiyalar
                                    </h4>
                                    <ul className="space-y-2">
                                        {analysis.recommendations.map((rec, i) => (
                                            <li key={i} className="flex gap-2 text-gray-700 bg-green-50 p-2 rounded text-sm border-l-2 border-green-400">
                                                <span>•</span> {rec}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <h4 className="font-bold text-lg mb-4 text-center">📅 7-Kunlik Harakatlar Rejasi</h4>
                                <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                                    <div className="bg-blue-600 text-white px-4 py-2 font-bold text-sm">
                                        1-Hafta: "Tezkor Start"
                                    </div>
                                    <div className="p-4">
                                        <ul className="space-y-3">
                                            {analysis.action_plan.week1.map((action, i) => (
                                                <li key={i} className="flex gap-3 items-start group">
                                                    <CheckCircle className="h-5 w-5 text-gray-300 group-hover:text-blue-500 mt-0.5 shrink-0 transition-colors" />
                                                    <span className="text-gray-700">{action}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-red-500 text-center py-8">AI tahlilini yuklashda xatolik yuz berdi.</p>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}
