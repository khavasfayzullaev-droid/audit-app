export type SalesPerson = {
    id: string;
    name: string;
    incoming: {
        calls: number;
        sales: number;
    };
    outgoing: {
        calls: number;
        sales: number;
    };
    salesVolume: number; // Sotuv obyomi (so'm)
};

export type ComputedMetrics = {
    incomingConversion: number; // %
    outgoingConversion: number; // %
    totalCalls: number;
    totalSales: number;
    totalConversion: number; // %
    percentageOfTotalVolume: number; // %
};

export const INITIAL_SALES_PEOPLE: SalesPerson[] = [
    {
        id: "1",
        name: "Sotuvchi 1",
        incoming: { calls: 0, sales: 0 },
        outgoing: { calls: 0, sales: 0 },
        salesVolume: 0
    },
    {
        id: "2",
        name: "Sotuvchi 2",
        incoming: { calls: 0, sales: 0 },
        outgoing: { calls: 0, sales: 0 },
        salesVolume: 0
    },
    {
        id: "3",
        name: "Sotuvchi 3",
        incoming: { calls: 0, sales: 0 },
        outgoing: { calls: 0, sales: 0 },
        salesVolume: 0
    },
];

export function calculateMetrics(person: SalesPerson, totalTeamVolume: number): ComputedMetrics {
    const totalCalls = person.incoming.calls + person.outgoing.calls;
    const totalSales = person.incoming.sales + person.outgoing.sales;

    // Avoid division by zero
    const incomingConversion = person.incoming.calls > 0
        ? (person.incoming.sales / person.incoming.calls) * 100
        : 0;

    const outgoingConversion = person.outgoing.calls > 0
        ? (person.outgoing.sales / person.outgoing.calls) * 100
        : 0;

    const totalConversion = totalCalls > 0
        ? (totalSales / totalCalls) * 100
        : 0;

    const percentageOfTotalVolume = totalTeamVolume > 0
        ? (person.salesVolume / totalTeamVolume) * 100
        : 0;

    return {
        incomingConversion,
        outgoingConversion,
        totalCalls,
        totalSales,
        totalConversion,
        percentageOfTotalVolume
    };
}
