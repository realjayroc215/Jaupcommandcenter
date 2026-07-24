const apps = Array.from({ length: 50 }).map((_, i) => ({
  id: `app-${i + 1}`,
  name: `App ${i + 1}`
}));

export default function AppDock() {
  return (
    <aside className="w-64 border-l border-apex-gold px-3 py-4 bg-black/70">
      <h2 className="text-sm font-semibold mb-3">App Dock</h2>
      <div className="h-full overflow-y-auto space-y-1 text-xs">
        {apps.map((app) => (
          <div
            key={app.id}
            className="px-2 py-1 rounded hover:bg-apex-gold/10 cursor-pointer"
          >
            {app.name}
          </div>
        ))}
      </div>
    </aside>
  );
}
