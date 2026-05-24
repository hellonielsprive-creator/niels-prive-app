export default function AnalyticsLoadingState() {
  return (
    <main className="min-h-screen bg-[#050505] text-white px-8 py-10">
      <div className="animate-pulse">
        <div className="h-16 w-72 bg-white/10 rounded-2xl mb-12" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[180px] rounded-[32px] bg-white/[0.04]"
            />
          ))}
        </div>
        <div className="h-[420px] rounded-[35px] bg-white/[0.04] mb-10" />
        <div className="h-[320px] rounded-[35px] bg-white/[0.04]" />
      </div>
    </main>
  );
}
