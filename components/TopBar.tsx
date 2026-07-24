export default function TopBar() {
  const now = new Date().toLocaleString();

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-apex-gold bg-black/60">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-center bg-no-repeat bg-contain apex-lion" />
        <div>
          <div className="font-bold tracking-wide">J-A-U-P Command Center</div>
          <div className="text-xs text-apex-red">Apex Lion Mode</div>
        </div>
      </div>
      <div className="text-xs">{now}</div>
    </header>
  );
}
