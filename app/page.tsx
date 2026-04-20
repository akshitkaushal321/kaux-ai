import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="page-enter">

      {/* HERO SECTION */}

    
      <section className="hero">
        <h1>Understand.<span className="hero-gradient"> Solve. </span> Master</h1>
        <p>
          Powered for students-get precise, step-by-step answers that simplify even the hardest problems.
        </p>

        <div className="hero-buttons">
          <Link href="/try-kaux" className="btn-primary">
            Try KauX AI →
          </Link>
        </div>
      </section>


      {/* INTRO SECTION */}



      <section className="intro-section">
      <h1 className="intro-heading">
       Your AI powered <span className="intro-gradient">Problem Solver</span>
      </h1>

      <div className="intro-list">

    <div className="intro-item">
      <div className="intro-text">
        <h2 className="intro-title">TTS Speak Systems</h2>
        <p className="intro-desc">
          Transform written answers into natural, human-like speech
           so you can learn even when you're not reading. Whether you're 
           revising concepts, multitasking, or just prefer listening, our TTS
            system delivers clear, expressive audio that helps you absorb information
             faster and more effectively.
        </p>
      </div>
      <div className="intro-visual"></div>
    </div>

    <div className="intro-item">
      <div className="intro-text">
        <h2 className="intro-title">NLU Systems</h2>
        <p className="intro-desc">
          Our system goes beyond keywords to truly understand your intent,
           context, and the way you ask questions. This allows it to deliver
            highly accurate, personalized responses—making complex queries feel
             simple and ensuring you always get answers that actually make sense.
        </p>
      </div>
      <div className="intro-visual"></div>
    </div>

    <div className="intro-item">
      <div className="intro-text">
        <h2 className="intro-title">
          Structured thinking with <br /> Problem solving capability
        </h2>
        <p className="intro-desc">
          Every response is organized into clear,
           step-by-step explanations that are easy to follow
            and designed for real understanding. Instead of overwhelming 
            information, you get logically structured solutions that help 
            you learn concepts deeply and retain them longer.
        </p>
      </div>
      <div className="intro-visual"></div>
    </div>

    <div className="intro-item">
      <div className="intro-text">
        <h2 className="intro-title intro-highlight">Execution mode</h2>
        <p className="intro-desc">
          Move beyond just reading answers—interact with them.
          Execution Mode allows you to apply logic, simulate steps
         and actively engage with solutions in real-time, helping you
          turn knowledge into practical understanding and real outcomes.
        </p>
      </div>
      <div className="intro-visual"></div>
    </div>

  </div>


      </section>


      {/* FEATURES SECTION */}
      <section className="features">

        <h2>How KauX AI help students <span className="features-thin">Creativity?</span></h2>

        <div className="features-grid">

          <div className="feature-card">
            <h3 className="headfeat">Ideation </h3>
            <p className="pfeat">Kaux AI helps students generate ideas quickly when they feel stuck or 
              confused about where to begin. It can provide multiple topic suggestions,
               expand a single concept into different directions, and introduce unique
                perspectives that a student might not think of alone. This speeds up the
                 brainstorming process.</p>
          </div>

          <div className="feature-card">
            <h3 className="headfeat">Expression </h3>
            <p className="pfeat">It improves how students communicate their ideas by refining grammar,
               vocabulary, and overall structure. Kaux AI can rewrite content in different tones
               , enhance storytelling, and make explanations clearer and more engaging.
                This allows students to present their creativity in a more polished and
                 impactful way.</p>
          </div>

          <div className="feature-card">
            <h3 className="headfeat">Design </h3>
            <p className="pfeat">Kaux AI supports creative design by suggesting layouts, color combinations,
               and user interface ideas. It helps students quickly visualize concepts 
               and improve user experience in their projects. This leads to faster
                iterations and more professional-looking designs, especially useful for
                 UI/UX and graphic work.</p>
          </div>

          <div className="feature-card">
            <h3 className="headfeat">Solver</h3>
            <p className="pfeat">
              It strengthens creative thinking by helping students break down complex problems
               and explore multiple solutions. Kaux AI encourages analytical thinking by offering
                step-by-step explanations and alternative approaches. This not only improves 
                understanding but also builds the ability to think creatively.
            </p>
          </div>
        </div>

      </section>


      {/* CTA SECTION */}
     <section className="testimonial-section">
  <h2 className="testimonial-heading">What Students are saying?</h2>

  <div className="slider">
    <div className="slider-track">

      <div className="testimonial-card">
        <p>
          KauX is an AI tool that helps turn ideas into real things quickly.
          It makes designing and building much easier by doing a lot of the work for you.
          Instead of starting everything from scratch, you can use KauX to speed things up and
          stay productive. It’s really useful for people who want to create or build something
           without wasting too much time.
        </p>
        <span>Ranveer Singh</span>
      </div>

      <div className="testimonial-card">
        <p>
          I’ve been using kauX recently, and it’s genuinely impressive.
           The AI is fast, intuitive, and handled everything I threw at
            it with total ease. 
           It’s rare to find a tool that’s this powerful
            yet so simple to use.
        </p>
        <span>Ekam Singh</span>
      </div>

      <div className="testimonial-card">
        <p>
          "I used this app first time and its really impresive it guides 
          me through my problems and helps me solve them"
        </p>
        <span>- Rajesh Kaushal</span>
      </div>

      <div className="testimonial-card">
        <p>
          “Best AI tool for students right now. Super clean and helpful.”
        </p>
        <span>- Kunal</span>
      </div>

      {/* 🔥 duplicate for infinite loop */}
      <div className="testimonial-card">
        <p>
          “KauX completely changed the way I study. I now get clear,
          structured answers instantly.”
        </p>
        <span>- Aarav</span>
      </div>

      <div className="testimonial-card">
        <p>
          “The step-by-step solving is insane. Better than most teachers tbh.”
        </p>
        <span>- Rohan</span>
      </div>

    </div>
  </div>
</section>


    </main>
  );
}