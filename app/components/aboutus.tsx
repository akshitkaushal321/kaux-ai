"use client";


import Image from "next/image";

export default function About() {
  return (
    <main className="page-enter">
   
    <section className="about-section">
      <div className="about-container">

        {/* LEFT SIDE */}
        <div className="about-text">
          <h1>About KauX</h1>

          <p>
            KauX AI is currently introduced in the market as an experimental
            platform designed to test new AI capabilities and gather real
            user feedback.
          </p>
          

          <p>
            The primary objective of this launch is to conduct live testing,
            understand user behavior, and continuously improve the system
            based on real-world interactions. At this stage, KauX AI is
            operating under <strong>Beta Version 1.0</strong>, which means
            features, performance, and functionalities may evolve as
            development progresses.
          </p>

          <p>
            This experimental phase allows us to refine the platform,
            identify improvements, and build a more powerful and reliable
            AI experience for the future.
          </p>
        </div>
  
      <Image
      className="kaux-preview"
    src="/kaux-preview.png"
    alt="KauX AI Preview"
    width={600}
    height={400}
  />


  <section className="developer-section">
  <h2 className="developer-title">Developer</h2>

  <div className="developer-container">

    {/* LEFT SIDE - IMAGE CARD */}
    <div className="developer-card">
      <Image
        src="/akshit.png"
        alt="Akshit Kaushal"
        width={250}
        height={320}
        className="developer-image"
      />
     
      <h3 className="developer-name">
        Akshit Kaushal</h3>

      <p className="developer-role">
        AI Enthusiast <br />
        Developer <br />
        UI Designer
      </p>
    </div>

    {/* RIGHT SIDE - DESCRIPTION */}
    <div className="developer-description">

      <p>
        Akshit is a young curious builder and tech enthusiast who enjoys exploring ideas at the
        intersection of technology, creativity, and business. He spends much of his time learning
        new skills, working on digital projects, and experimenting with tools related to AI,
        design, and web development.
      </p>

      <p>
        With interests ranging from coding and UI/UX design to entrepreneurship and fitness,
        he focuses on continuous self-improvement and disciplined work habits.
      </p>

      <p>
        Akshit values productivity, early-morning routines, and structured work management,
        using his time to study, build projects, and understand how technology and business
        can solve real-world problems.
      </p>

    </div>

  </div>
</section>
    </div>
    </section>
      </main>
 );
}  

