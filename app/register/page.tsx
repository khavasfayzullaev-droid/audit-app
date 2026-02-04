"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate registration
        setTimeout(() => {
            setLoading(false);
            router.push("/audits");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-xl border-t-4 border-green-600">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Ro'yxatdan o'tish</CardTitle>
                    <p className="text-sm text-gray-500">Yangi hisob yarating</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Ism" required className="bg-gray-50" />
                            <Input placeholder="Familiya" required className="bg-gray-50" />
                        </div>
                        <div className="space-y-2">
                            <Input type="email" placeholder="Email pochta" required className="bg-gray-50" />
                        </div>
                        <div className="space-y-2">
                            <Input type="password" placeholder="Parol" required className="bg-gray-50" />
                        </div>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 font-bold" disabled={loading}>
                            {loading ? "Yaratilmoqda..." : "Ro'yxatdan o'tish"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/login" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                        Allaqachon hisobingiz bormi? Kirish
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
