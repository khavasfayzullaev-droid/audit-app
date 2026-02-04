"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AuditInputs } from "@/lib/types";
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2, HelpCircle } from "lucide-react";

const STEPS = [
    "Asosiy Ma'lumotlar",
    "Jarayonlar va Tizim",
    "Moliyaviy Ko'rsatkichlar"
];

const INDUSTRIES = ["E-commerce (Internet do'kon)", "Ta'lim (O'quv markaz)", "Xizmat ko'rsatish", "Ko'chmas mulk", "Tibbiyot", "Boshqa"];
const PLATFORMS = ["Instagram", "Telegram", "Google", "YouTube", "TikTok", "Boshqa"];

export default function AuditWizard() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<AuditInputs>>({
        businessOwner: true,
        hasCrm: "NO",
        hasSalesDept: "NO",
        socialStatus: "MID",
        industry: "E-commerce (Internet do'kon)",
        platform: "Instagram",
        revenueGoal: 0,
        avgCheck: 0,
        conversionRate: 0,
    });

    const handleChange = (key: keyof AuditInputs, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        if (step < STEPS.length - 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/audits/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to calculate");

            const data = await res.json();

            localStorage.setItem("latest_audit", JSON.stringify({ inputs: formData, metrics: data.metrics }));
            router.push("/audits/report");
        } catch (error) {
            console.error(error);
            alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto py-10">
            {/* Progress Steps */}
            <div className="mb-10 flex justify-between items-center px-6">
                {STEPS.map((s, i) => (
                    <div key={i} className={`flex items-center gap-2 ${i <= step ? "text-blue-700" : "text-gray-300"}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-colors ${i <= step ? "border-blue-600 bg-blue-100 dark:bg-blue-900 ring-4 ring-blue-50" : "border-gray-200"
                            }`}>
                            {i + 1}
                        </div>
                        <span className="hidden sm:inline text-sm font-semibold tracking-tight">{s}</span>
                    </div>
                ))}
            </div>

            <Card className="border-0 shadow-2xl overflow-visible bg-white/80 backdrop-blur-sm rounded-2xl">
                <div className="h-2 bg-gray-100 w-full overflow-hidden rounded-t-2xl">
                    <div
                        className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
                        style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                    />
                </div>

                <CardHeader className="pb-4 pt-8 text-center">
                    <CardTitle className="text-3xl font-extrabold text-gray-900">{STEPS[step]}</CardTitle>
                    <p className="text-gray-500">Iltimos, barcha maydonlarni to'ldiring</p>
                </CardHeader>

                <CardContent className="space-y-8 pt-6 min-h-[350px] px-8">

                    {/* STEP 1: Basic Info */}
                    {step === 0 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <HelpCircle className="h-5 w-5 text-blue-500" /> Siz Biznes egasimisz?
                                </Label>
                                <div className="grid grid-cols-2 gap-6">
                                    <div
                                        onClick={() => handleChange("businessOwner", true)}
                                        className={`cursor-pointer border-2 rounded-2xl p-6 text-center transition-all shadow-sm ${formData.businessOwner ? "border-blue-600 bg-blue-50 text-blue-800 font-bold ring-2 ring-blue-200" : "border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-300 hover:shadow-md"
                                            }`}
                                    >
                                        Ha, egasiman
                                    </div>
                                    <div
                                        onClick={() => handleChange("businessOwner", false)}
                                        className={`cursor-pointer border-2 rounded-2xl p-6 text-center transition-all shadow-sm ${!formData.businessOwner ? "border-blue-600 bg-blue-50 text-blue-800 font-bold ring-2 ring-blue-200" : "border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-300 hover:shadow-md"
                                            }`}
                                    >
                                        Yo'q, xodimman
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-gray-800">Biznes sohasi</Label>
                                <Select onValueChange={(val) => handleChange("industry", val)} defaultValue={formData.industry}>
                                    <SelectTrigger className="h-16 text-lg bg-gray-50 border-transparent hover:bg-white hover:border-gray-300 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl shadow-sm px-6">
                                        <SelectValue placeholder="Sohani tanlang" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-0 shadow-xl rounded-xl">
                                        {INDUSTRIES.map((ind) => (
                                            <SelectItem key={ind} value={ind} className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">{ind}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-gray-800">Asosiy reklama platformasi</Label>
                                <Select onValueChange={(val) => handleChange("platform", val)} defaultValue={formData.platform}>
                                    <SelectTrigger className="h-16 text-lg bg-gray-50 border-transparent hover:bg-white hover:border-gray-300 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl shadow-sm px-6">
                                        <SelectValue placeholder="Platformani tanlang" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-0 shadow-xl rounded-xl">
                                        {PLATFORMS.map((p) => (
                                            <SelectItem key={p} value={p} className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">{p}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Operations */}
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-gray-800">CRM tizimi bormi?</Label>
                                <Select onValueChange={(val) => handleChange("hasCrm", val)} defaultValue={formData.hasCrm}>
                                    <SelectTrigger className="h-16 text-lg bg-gray-50 border-transparent hover:bg-white hover:border-gray-300 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl shadow-sm px-6">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-0 shadow-xl rounded-xl">
                                        <SelectItem value="NO" className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">Yo'q</SelectItem>
                                        <SelectItem value="AMO" className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">Bor (AmoCRM)</SelectItem>
                                        <SelectItem value="BITRIX" className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">Bor (Bitrix24)</SelectItem>
                                        <SelectItem value="OTHER" className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">Bor (Boshqa)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-gray-800">Alohida sotuv bo'limi bormi?</Label>
                                <Select onValueChange={(val) => handleChange("hasSalesDept", val)} defaultValue={formData.hasSalesDept}>
                                    <SelectTrigger className="h-16 text-lg bg-gray-50 border-transparent hover:bg-white hover:border-gray-300 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl shadow-sm px-6">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-0 shadow-xl rounded-xl">
                                        <SelectItem value="NO" className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">Yo'q</SelectItem>
                                        <SelectItem value="YES_1" className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">Ha (1-2 kishi)</SelectItem>
                                        <SelectItem value="YES_2_5" className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">Ha (2-5 kishi)</SelectItem>
                                        <SelectItem value="YES_5+" className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">Ha (5+ kishi)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-gray-800">Ijtimoiy tarmoqlar (Upakovka) holati</Label>
                                <Select onValueChange={(val) => handleChange("socialStatus", val)} defaultValue={formData.socialStatus}>
                                    <SelectTrigger className="h-16 text-lg bg-gray-50 border-transparent hover:bg-white hover:border-gray-300 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl shadow-sm px-6">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-0 shadow-xl rounded-xl">
                                        <SelectItem value="BAD" className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">Yomon / Yo'q</SelectItem>
                                        <SelectItem value="MID" className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">O'rtacha</SelectItem>
                                        <SelectItem value="GOOD" className="py-4 text-base cursor-pointer hover:bg-blue-50 rounded-lg mx-1 my-1 px-4 font-medium text-gray-700">Yaxshi / Professional</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Metrics */}
                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-gray-800">Oylik sof daromad maqsadingiz ($)</Label>
                                <Input type="number" className="h-16 text-lg bg-gray-50 border-transparent hover:bg-white hover:border-gray-300 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl shadow-sm px-6" onChange={(e) => handleChange("revenueGoal", Number(e.target.value))} />
                            </div>

                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-gray-800">O'rtacha chek ($)</Label>
                                <Input type="number" className="h-16 text-lg bg-gray-50 border-transparent hover:bg-white hover:border-gray-300 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl shadow-sm px-6" onChange={(e) => handleChange("avgCheck", Number(e.target.value))} />
                            </div>

                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-gray-800">Sotuv konversiyasi (%)</Label>
                                <div className="relative">
                                    <Input type="number" className="h-16 text-lg pr-12 bg-gray-50 border-transparent hover:bg-white hover:border-gray-300 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl shadow-sm px-6" placeholder="masalan 10" onChange={(e) => handleChange("conversionRate", Number(e.target.value))} />
                                    <span className="absolute right-6 top-5 font-bold text-gray-400 text-lg">%</span>
                                </div>
                            </div>
                        </div>
                    )}

                </CardContent>
                <CardFooter className="flex justify-between bg-white/50 backdrop-blur-sm p-8 rounded-b-2xl border-t border-gray-100">
                    <Button
                        variant="ghost"
                        onClick={prevStep}
                        disabled={step === 0}
                        className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-6 h-12 rounded-xl text-base"
                    >
                        <ChevronLeft className="mr-2 h-5 w-5" /> Ortga
                    </Button>

                    {step < STEPS.length - 1 ? (
                        <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 px-10 h-14 rounded-full text-lg shadow-lg shadow-blue-200">
                            Keyingi <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={loading} className="bg-green-600 hover:bg-green-700 px-10 h-14 rounded-full text-lg shadow-lg shadow-green-200">
                            {loading ? (
                                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Hisoblanmoqda...</>
                            ) : (
                                <>Hisobotni olish <CheckCircle2 className="ml-2 h-5 w-5" /></>
                            )}
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <div className="mt-8 text-center text-sm text-gray-400">
                AI Marketing Audit &copy; {new Date().getFullYear()}
            </div>
        </div>
    );
}
