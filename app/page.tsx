import CameraPanel from '../components/CameraPanel';
import BrainConsole from '../components/BrainConsole';

export default function Home() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="apex-card">
        <h2 className="apex-title">Today Matrix</h2>
        <p>Tasks, missions, and priorities for the day.</p>
      </section>

      <section className="apex-card">
        <h2 className="apex-title">Hustle Table</h2>
        <p>Revenue streams, active projects, and pipeline.</p>
      </section>

      <section className="apex-card">
        <h2 className="apex-title">Finance Panel</h2>
        <p>Cash flow, balances, and key metrics.</p>
      </section>

      <section className="apex-card">
        <h2 className="apex-title">Music Studio</h2>
        <p>Elite Music Studio quick controls and status.</p>
      </section>

      <CameraPanel />

      <BrainConsole />
    </div>
  );
}
