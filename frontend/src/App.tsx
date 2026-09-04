export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-6">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-cyan-400">
          HackNEX 2026 Development Environment
        </h1>
        <p className="text-slate-400">
          Environment initialized and bootstrapped. Ready for feature implementation.
        </p>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-left text-sm font-mono text-cyan-300 space-y-1">
          <p><span className="text-slate-400">Organizer:</span> NEXUS Club, KITS</p>
          <p><span className="text-slate-400">Event Dates:</span> October 7–9, 2026</p>
          <p><span className="text-slate-400">Registration Fee:</span> ₹600 / Team of 4</p>
          <p><span className="text-slate-400">Status:</span> BOOTSTRAPPED & READY</p>
        </div>
      </div>
    </div>
  );
}
