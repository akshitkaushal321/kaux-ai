import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="page-enter">

      {/* HERO SECTION */}

    
      <section className="hero">
        <h1>Smarter Answers. Faster Thinking</h1>
        <p>
          KauX is your Experimental AI assistant for thinking,
          building, and exploring ideas.
        </p>

        <div className="hero-buttons">
          <Link href="/try-kaux" className="btn-primary">
            Try KauX →
          </Link>

          <Link href="/testimonials" className="btn-outline">
            Testimonials
          </Link>
        </div>
      </section>


      {/* INTRO SECTION */}

      
      
      <section className="intro-section">

        <div className="intro-container">

          <div className="intro-image">
            <Image
              src="/kaux-ai.png"
              alt="KauX AI"
              width={950}
              height={650}
            />
              <p className="intro-caption">
               Introducing KauXAI <span>beta</span>
             </p>
            <small>Intelligence Virtual Assistant</small>

            </div>
          

          <div className="intro-text">
            <h2>What is KauX?</h2>

            <p>
              KauX is an experimental AI assistant designed to help
              people think deeper, explore ideas, and test concepts quickly.
            
              Built for developers, thinkers, and creators.
            </p>

          </div>

        </div>

      </section>


      {/* FEATURES SECTION */}
      <section className="features">

        <h2>Features</h2>

        <div className="features-grid">

          <div className="feature-card">
            <h3>🤖 Deep Analysis Mode</h3>
            <p>Step-by-step reasoning beyond surface-level answers.</p>
          </div>

          <div className="feature-card">
            <h3>📱 Structured Output</h3>
            <p>Clear organized responses designed for action.</p>
          </div>

          <div className="feature-card">
            <h3>🧪 Experiment Lab</h3>
            <p>Test prompts, ideas, and strategies.</p>
          </div>

          <div className="feature-card">
            <h3>⚡️ Fast Response Engine</h3>
            <p>Intelligent answers instantly without lag.</p>
          </div>

        </div>

      </section>


      {/* CTA SECTION */}
      <section className="cta">

        <h2>Get started with</h2>

        <Link href="/try-kaux" className="btn-primary">
          Try KauX
        </Link>

      </section>


    </main>
  );
}