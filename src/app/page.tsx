import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gradient-gold mb-6 animate-pulse-glow">
          Hello, I'm badhope
        </h1>
        <p className="text-xl text-text-normal max-w-lg mx-auto">
          Welcome to my digital universe
        </p>
      </div>

      <div className="glass-card p-8 max-w-2xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: "🚀", label: "Innovate", desc: "Creating solutions" },
            { icon: "💪", label: "Persist", desc: "Never give up" },
            { icon: "🌟", label: "Explore", desc: "Discover possibilities" }
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-bg-card/50 rounded-lg border border-primary/10 hover:border-primary/30 transition-all animate-float"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-bold text-primary mb-1">{item.label}</div>
              <div className="text-sm text-text-muted">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/projects"
            className="px-8 py-3 bg-primary/20 border border-primary rounded-full text-primary font-medium hover:bg-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            Explore Projects
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 border border-text-muted/30 rounded-full text-text-normal font-medium hover:border-text-muted/60 transition-all"
          >
            About Me
          </Link>
        </div>
      </div>

      <div className="mt-12 text-text-muted text-sm">
        ✨ Every line of code is a bridge to the future
      </div>
    </div>
  );
}
