"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login
        setTimeout(() => {
            setLoading(false);
            router.push("/audits");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-xl border-t-4 border-blue-600">
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-2xl font-bold">Tizimga kirish</CardTitle>
                    <p className="text-sm text-gray-500">Hisobingizga kirish uchun ma'lumotlarni kiriting</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Input type="email" placeholder="Email pochta" required className="bg-gray-50" />
                        </div>
                        <div className="space-y-2">
                            <Input type="password" placeholder="Parol" required className="bg-gray-50" />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold" disabled={loading}>
                            {loading ? "Kirilmoqda..." : "Kirish"}
                        </Button>
                    </form>
                    <div className="mt-6 text-center text-sm relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <span className="relative bg-white px-2 text-gray-500 text-xs uppercase">Yoki</span>
                    </div>
                    <div className="mt-6 flex justify-center gap-2">
                        <Button variant="outline" type="button" onClick={() => router.push("/audits")} className="w-full">
                            Google orqali kirish
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/register" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                        Akkauntingiz yo'qmi? Ro'yxatdan o'ting
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
