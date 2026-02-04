import AuditWizard from "@/components/audit-wizard";

export default function NewAuditPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="mb-8 text-center max-w-lg">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Yangi Biznes Audit</h1>
                <p className="text-gray-500 text-lg">9 ta savolga javob bering va shaxsiy rivojlanish strategiyangizga ega bo'ling.</p>
            </div>
            <AuditWizard />
        </div>
    );
}
