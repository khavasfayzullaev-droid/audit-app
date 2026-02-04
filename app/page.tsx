export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-white/70 pb-6 pt-8 backdrop-blur-xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-white/50 lg:p-4 lg:dark:bg-zinc-800/30">
                    AI Marketing & Moliya Auditi
                </p>
            </div>

            <div className="relative flex flex-col items-center place-items-center z-[1]">
                <div className="text-center space-y-6 max-w-3xl">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        Biznesingizni <br /> AI yordamida o'stiring
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mx-auto max-w-2xl">
                        Atigi 9 ta savolga javob bering va sun'iy intellekt asosida marketing va moliya bo'yicha aniq harakatlar rejasini oling.
                    </p>

                    <div className="pt-8">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/audits/new"
                                className="inline-flex items-center px-8 py-4 rounded-full text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Auditni boshlash
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="/sales/conversion"
                                className="inline-flex items-center px-8 py-4 rounded-full text-lg font-bold text-blue-700 bg-white border-2 border-blue-100 hover:bg-blue-50 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                            >
                                Sotuvchilar konversiyasi
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="20" x2="12" y2="10"></line>
                                    <line x1="18" y1="20" x2="18" y2="4"></line>
                                    <line x1="6" y1="20" x2="6" y2="16"></line>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-8 mt-20">
                <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50">
                    <h2 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
                        Tezkor Tahlil 🚀
                    </h2>
                    <p className="m-0 text-sm text-gray-500 dark:text-gray-400">
                        Biznesingiz holatini bir necha soniyada aniqlang. Keraksiz vaqt sarflamaysiz.
                    </p>
                </div>

                <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50">
                    <h2 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
                        Aniq Hisob-kitob 📊
                    </h2>
                    <p className="m-0 text-sm text-gray-500 dark:text-gray-400">
                        Reklama byudjeti, mijozlar va lidlar sonini formulalar asosida hisoblab beramiz.
                    </p>
                </div>

                <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50">
                    <h2 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
                        AI Maslahatchi 🤖
                    </h2>
                    <p className="m-0 text-sm text-gray-500 dark:text-gray-400">
                        Sun'iy intellekt sizga xavflarni kamaytirish va sotuvni oshirish bo'yicha tavsiyalar beradi.
                    </p>
                </div>
            </div>
        </main>
    );
}
