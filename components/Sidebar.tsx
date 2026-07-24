const sections = [
  'Today Matrix',
  'Hustle Table',
  'Finance',
  'Clients',
  'Betting',
  'Music',
  'Legal',
  'Inbox'
];

export default function Sidebar() {
  return (
    <aside className="w-56 border-r border-apex-gold px-3 py-4 bg-black/70">
      <h2 className="text-sm font-semibold mb-3">Command Modules</h2>
      <nav className="space-y-2 text-sm">
        {sections.map((s) => (
          <button
            key={s}
            className="w-full text-left px-2 py-1 rounded hover:bg-apex-gold/10"
          >
            {s}
          </button>
        ))}
      </nav>
    </aside>
  );
}
