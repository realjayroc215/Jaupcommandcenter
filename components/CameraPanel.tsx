export default function CameraPanel() {
  return (
    <section className="apex-card col-span-2">
      <h2 className="apex-title">Home Cameras</h2>
      <p className="text-xs mb-2">
        UI hosted on GitHub Pages. Feeds served by your Linux backend.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="apex-subcard">
          <h3 className="apex-subtitle">Felt Electric Camera</h3>
          <div className="h-40 bg-black/60 border border-apex-gold flex items-center justify-center text-xs">
            Stream from: https://YOUR-LINUX-SERVER/api/camera/felt
          </div>
        </div>
        <div className="apex-subcard">
          <h3 className="apex-subtitle">Ring Solar Plus</h3>
          <div className="h-40 bg-black/60 border border-apex-gold flex items-center justify-center text-xs">
            Stream from: https://YOUR-LINUX-SERVER/api/camera/ring
          </div>
        </div>
      </div>
    </section>
  );
}
