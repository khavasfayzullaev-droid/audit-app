"use client";

import { useState, useMemo } from "react";
import { SalesPerson, calculateMetrics, INITIAL_SALES_PEOPLE } from "@/lib/sales";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Download, Save, RefreshCw } from "lucide-react";

export default function SalesConversionView() {
    const [salesPeople, setSalesPeople] = useState<SalesPerson[]>(INITIAL_SALES_PEOPLE);
    const [currency, setCurrency] = useState<"USD" | "UZS">("USD");

    // Calculate total team volume for percentage calculation
    const totalTeamVolume = useMemo(() => {
        return salesPeople.reduce((sum, p) => sum + (p.salesVolume || 0), 0);
    }, [salesPeople]);

    const addPerson = () => {
        const newId = (salesPeople.length + 1).toString();
        setSalesPeople([...salesPeople, {
            id: Date.now().toString(),
            name: `Sotuvchi ${newId}`,
            incoming: { calls: 0, sales: 0 },
            outgoing: { calls: 0, sales: 0 },
            salesVolume: 0
        }]);
    };

    const removePerson = (id: string) => {
        if (salesPeople.length > 1) {
            setSalesPeople(salesPeople.filter(p => p.id !== id));
        }
    };

    const updatePerson = (id: string, field: string, value: any) => {
        setSalesPeople(salesPeople.map(p => {
            if (p.id !== id) return p;

            // Handle nested updates (e.g., incoming.calls)
            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                return {
                    ...p,
                    [parent]: {
                        ...p[parent as keyof SalesPerson] as any,
                        [child]: Number(value)
                    }
                };
            }

            // Handle direct updates (name, salesVolume)
            return { ...p, [field]: field === 'name' ? value : Number(value) };
        }));
    };

    // Calculate totals for the footer row
    const footerTotals = useMemo(() => {
        const totals = {
            incomingCalls: 0, incomingSales: 0,
            outgoingCalls: 0, outgoingSales: 0,
            totalCalls: 0, totalSales: 0,
            salesVolume: 0
        };

        salesPeople.forEach(p => {
            totals.incomingCalls += p.incoming.calls;
            totals.incomingSales += p.incoming.sales;
            totals.outgoingCalls += p.outgoing.calls;
            totals.outgoingSales += p.outgoing.sales;
            totals.totalCalls += (p.incoming.calls + p.outgoing.calls);
            totals.totalSales += (p.incoming.sales + p.outgoing.sales);
            totals.salesVolume += p.salesVolume;
        });

        return totals;
    }, [salesPeople]);

    const formatMoney = (amount: number) => {
        return currency === "USD"
            ? `$${amount.toLocaleString()}`
            : `${amount.toLocaleString()} so'm`;
    };

    return (
        <div className="max-w-[1400px] mx-auto p-4 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sotuvchilar Konversiyasi</h1>
                    <p className="text-gray-500">Menejerlarning samaradorligini o'lchash paneli</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setCurrency(prev => prev === "USD" ? "UZS" : "USD")}
                        className="gap-2 border-blue-200 hover:bg-blue-50 text-blue-700"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Valyuta: {currency === "USD" ? "$ (USD)" : "so'm (UZS)"}
                    </Button>
                    <Button variant="outline" onClick={() => window.print()} className="gap-2">
                        <Download className="h-4 w-4" /> PDF Saqlash
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                        <Save className="h-4 w-4" /> Saqlash
                    </Button>
                </div>
            </div>

            <Card className="shadow-lg border-0 overflow-hidden">
                <CardHeader className="bg-gray-50/50 border-b pb-4">
                    <CardTitle className="text-xl">Haftalik/Oylik Hisobot ({currency})</CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 font-bold uppercase text-xs">
                            <tr>
                                <th rowSpan={2} className="px-4 py-3 border-r min-w-[200px]">Sotuvchilar</th>
                                <th colSpan={3} className="px-4 py-2 border-r text-center bg-blue-50/50 text-blue-700 border-b border-blue-200">Kiruvchi Qo'ng'iroqlar</th>
                                <th colSpan={3} className="px-4 py-2 border-r text-center bg-green-50/50 text-green-700 border-b border-green-200">Chiquvchi Qo'ng'iroqlar</th>
                                <th colSpan={3} className="px-4 py-2 border-r text-center bg-purple-50/50 text-purple-700 border-b border-purple-200">Umumiy Natija</th>
                                <th colSpan={2} className="px-4 py-2 text-center bg-orange-50/50 text-orange-700 border-b border-orange-200">Moliya</th>
                                <th rowSpan={2} className="px-2 py-2 text-center w-10"></th>
                            </tr>
                            <tr>
                                {/* Incoming */}
                                <th className="px-2 py-2 border-r text-center bg-blue-50/30">Qo'ng'iroq</th>
                                <th className="px-2 py-2 border-r text-center bg-blue-50/30">Sotuv</th>
                                <th className="px-2 py-2 border-r text-center bg-blue-50/30 font-extrabold text-blue-600">Konv %</th>

                                {/* Outgoing */}
                                <th className="px-2 py-2 border-r text-center bg-green-50/30">Qo'ng'iroq</th>
                                <th className="px-2 py-2 border-r text-center bg-green-50/30">Sotuv</th>
                                <th className="px-2 py-2 border-r text-center bg-green-50/30 font-extrabold text-green-600">Konv %</th>

                                {/* Total */}
                                <th className="px-2 py-2 border-r text-center bg-purple-50/30">Jami Qo'ng'iroq</th>
                                <th className="px-2 py-2 border-r text-center bg-purple-50/30">Jami Sotuv</th>
                                <th className="px-2 py-2 border-r text-center bg-purple-50/30 font-extrabold text-purple-600">Jami Konv %</th>

                                {/* Finance */}
                                <th className="px-4 py-2 border-r text-center bg-orange-50/30">Sotuv Summasi ({currency})</th>
                                <th className="px-2 py-2 text-center bg-orange-50/30">% Ulushi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {salesPeople.map((person) => {
                                const metrics = calculateMetrics(person, totalTeamVolume);
                                return (
                                    <tr key={person.id} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="p-2 border-r">
                                            <Input
                                                value={person.name}
                                                onChange={(e) => updatePerson(person.id, 'name', e.target.value)}
                                                className="h-9 font-medium bg-transparent border-transparent hover:border-gray-200 focus:bg-white"
                                            />
                                        </td>

                                        {/* Incoming */}
                                        <td className="p-2 border-r">
                                            <Input
                                                type="number" min="0"
                                                value={person.incoming.calls || ''}
                                                onChange={(e) => updatePerson(person.id, 'incoming.calls', e.target.value)}
                                                className="h-9 text-center bg-blue-50/10 focus:bg-white"
                                            />
                                        </td>
                                        <td className="p-2 border-r">
                                            <Input
                                                type="number" min="0"
                                                value={person.incoming.sales || ''}
                                                onChange={(e) => updatePerson(person.id, 'incoming.sales', e.target.value)}
                                                className="h-9 text-center bg-blue-50/10 focus:bg-white"
                                            />
                                        </td>
                                        <td className="p-2 border-r text-center font-bold text-blue-600 bg-blue-50/20">
                                            {metrics.incomingConversion.toFixed(1)}%
                                        </td>

                                        {/* Outgoing */}
                                        <td className="p-2 border-r">
                                            <Input
                                                type="number" min="0"
                                                value={person.outgoing.calls || ''}
                                                onChange={(e) => updatePerson(person.id, 'outgoing.calls', e.target.value)}
                                                className="h-9 text-center bg-green-50/10 focus:bg-white"
                                            />
                                        </td>
                                        <td className="p-2 border-r">
                                            <Input
                                                type="number" min="0"
                                                value={person.outgoing.sales || ''}
                                                onChange={(e) => updatePerson(person.id, 'outgoing.sales', e.target.value)}
                                                className="h-9 text-center bg-green-50/10 focus:bg-white"
                                            />
                                        </td>
                                        <td className="p-2 border-r text-center font-bold text-green-600 bg-green-50/20">
                                            {metrics.outgoingConversion.toFixed(1)}%
                                        </td>

                                        {/* Total */}
                                        <td className="p-2 border-r text-center bg-purple-50/10 font-mono text-gray-700">
                                            {metrics.totalCalls}
                                        </td>
                                        <td className="p-2 border-r text-center bg-purple-50/10 font-mono text-gray-700">
                                            {metrics.totalSales}
                                        </td>
                                        <td className={`p-2 border-r text-center font-extrabold bg-purple-50/20 ${metrics.totalConversion < 10 ? 'text-red-500' : 'text-purple-600'}`}>
                                            {metrics.totalConversion.toFixed(1)}%
                                        </td>

                                        {/* Finance */}
                                        <td className="p-2 border-r">
                                            <div className="relative">
                                                <Input
                                                    type="number" min="0"
                                                    value={person.salesVolume || ''}
                                                    onChange={(e) => updatePerson(person.id, 'salesVolume', e.target.value)}
                                                    className="h-9 text-right bg-orange-50/10 focus:bg-white font-mono pr-2"
                                                    placeholder="0"
                                                />
                                                <span className="absolute left-2 top-2 text-xs text-gray-400 font-bold pointer-events-none">
                                                    {currency === 'USD' ? '$' : ''}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center font-bold text-orange-600 bg-orange-50/20">
                                            {metrics.percentageOfTotalVolume.toFixed(1)}%
                                        </td>

                                        <td className="p-2 text-center">
                                            <button onClick={() => removePerson(person.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}

                            {/* Footer Totals */}
                            <tr className="bg-gray-100 font-bold border-t-2 border-gray-300">
                                <td className="p-3 border-r text-gray-800">JAMI (O'rtacha)</td>

                                {/* Incoming Totals */}
                                <td className="p-3 text-center border-r">{footerTotals.incomingCalls}</td>
                                <td className="p-3 text-center border-r">{footerTotals.incomingSales}</td>
                                <td className="p-3 text-center border-r text-blue-700">
                                    {(footerTotals.incomingCalls > 0 ? (footerTotals.incomingSales / footerTotals.incomingCalls * 100) : 0).toFixed(1)}%
                                </td>

                                {/* Outgoing Totals */}
                                <td className="p-3 text-center border-r">{footerTotals.outgoingCalls}</td>
                                <td className="p-3 text-center border-r">{footerTotals.outgoingSales}</td>
                                <td className="p-3 text-center border-r text-green-700">
                                    {(footerTotals.outgoingCalls > 0 ? (footerTotals.outgoingSales / footerTotals.outgoingCalls * 100) : 0).toFixed(1)}%
                                </td>

                                {/* Grand Totals */}
                                <td className="p-3 text-center border-r">{footerTotals.totalCalls}</td>
                                <td className="p-3 text-center border-r">{footerTotals.totalSales}</td>
                                <td className="p-3 text-center border-r text-purple-700">
                                    {(footerTotals.totalCalls > 0 ? (footerTotals.totalSales / footerTotals.totalCalls * 100) : 0).toFixed(1)}%
                                </td>

                                {/* Finance Totals */}
                                <td className="p-3 text-right border-r px-4 text-orange-800">
                                    {formatMoney(footerTotals.salesVolume)}
                                </td>
                                <td className="p-3 text-center text-gray-400">100%</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
                <div className="bg-gray-50 p-4 border-t">
                    <Button variant="outline" onClick={addPerson} className="text-blue-600 border-blue-200 hover:bg-blue-50">
                        <Plus className="h-4 w-4 mr-2" /> Yangi Sotuvchi Qo'shish
                    </Button>
                </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2">Kiruvchi Konversiya</h3>
                    <p className="text-sm text-blue-600 mb-4">Mijozlar o'zlari qo'ng'iroq qilgandagi samaradorlik.</p>
                    <div className="text-3xl font-extrabold text-blue-900">
                        {(footerTotals.incomingCalls > 0 ? (footerTotals.incomingSales / footerTotals.incomingCalls * 100) : 0).toFixed(1)}%
                    </div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <h3 className="font-bold text-green-800 mb-2">Chiquvchi Konversiya</h3>
                    <p className="text-sm text-green-600 mb-4">Sotuvchilar o'zlari qo'ng'iroq qilgandagi samaradorlik.</p>
                    <div className="text-3xl font-extrabold text-green-900">
                        {(footerTotals.outgoingCalls > 0 ? (footerTotals.outgoingSales / footerTotals.outgoingCalls * 100) : 0).toFixed(1)}%
                    </div>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                    <h3 className="font-bold text-orange-800 mb-2">Umumiy Daromad</h3>
                    <p className="text-sm text-orange-600 mb-4">Jamoaning jami sotuvi.</p>
                    <div className="text-3xl font-extrabold text-orange-900">
                        {formatMoney(footerTotals.salesVolume)}
                    </div>
                </div>
            </div>
        </div>
    );
}
