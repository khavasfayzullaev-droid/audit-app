"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";

// Mock type for list item
type AuditSummary = {
    id: string;
    date: string;
    industry: string;
    revenueGoal: number;
    score: string;
};

export default function DashboardView() {
    const [audits, setAudits] = useState<AuditSummary[]>([]);

    useEffect(() => {
        // Mock data fetching from localStorage or API
        const stored = localStorage.getItem("latest_audit");
        if (stored) {
            const parsed = JSON.parse(stored);
            // In a real app, this would be a list from DB
            setAudits([
                {
                    id: "local-draft",
                    date: new Date().toLocaleDateString(),
                    industry: parsed.inputs.industry,
                    revenueGoal: parsed.inputs.revenueGoal,
                    score: parsed.metrics.riskScore,
                },
            ]);
        }
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Mening Auditlarim</h1>
                    <p className="text-gray-500">Barcha hisobotlaringiz bu yerda saqlanadi</p>
                </div>
                <Link href="/audits/new">
                    <Button className="shadow-lg bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Yangi Audit
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {audits.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BarChart3 className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Hali hech narsa yo'q</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">Birinchi auditingizni yarating va biznesingiz holatini to'liq tahlil qiling.</p>
                        <Link href="/audits/new">
                            <Button size="lg" className="font-semibold">Birinchi auditni yaratish</Button>
                        </Link>
                    </div>
                ) : (
                    audits.map((audit) => (
                        <Card key={audit.id} className="hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-blue-500">
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg">{audit.industry} Auditi</h3>
                                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{audit.date}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Avtomatik saqlangan nusxa</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <div className="text-sm text-gray-500">Maqsad</div>
                                        <div className="font-medium font-mono">${audit.revenueGoal.toLocaleString()}</div>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <div className="text-sm text-gray-500">Xavf darajasi</div>
                                        <div className={`font-bold ${audit.score === "RED" ? "text-red-600" :
                                                audit.score === "YELLOW" ? "text-yellow-600" :
                                                    "text-green-600"
                                            }`}>
                                            {audit.score === "RED" ? "YUQORI" : audit.score === "YELLOW" ? "O'RTA" : "PAST"}
                                        </div>
                                    </div>
                                    <Link href="/audits/report">
                                        <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                                            <ArrowRight className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
