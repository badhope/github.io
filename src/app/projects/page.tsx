export default function ProjectsPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gradient-gold">
        Projects
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Project 1", desc: "Coming soon..." },
          { title: "Project 2", desc: "Coming soon..." },
          { title: "Project 3", desc: "Coming soon..." }
        ].map((p, i) => (
          <div key={i} className="glass-card p-6 hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-primary mb-2">{p.title}</h3>
            <p className="text-text-muted">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
