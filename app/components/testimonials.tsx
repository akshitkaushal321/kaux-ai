"use client";
import { useState } from "react";


const testimonials = [
  {
    text: `This website is just amazing, I would be very impressed that how a chatbot is giving all the answer giving the interactive robotic vibe everytime i talk it gives me pure ChatGPT vibe And the modes are also awesome`,
    name: "Mohit",
  },
  {
    text: 'hahah best webiste hai yeh am too impressed dude i love that',
    name: "mohit",
  },
];
export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="testimonials-page">

      <h1 className="title">Testimonials</h1>

      <div className="testimonial-container">

        {/* LEFT BUTTON */}
        <button className="nav-btn left" onClick={prev}>←</button>

        {/* CARD */}
        <div className="testimonial-card">
          <p className="text">“{testimonials[index].text}”</p>
          <p className="name">- {testimonials[index].name}</p>
        </div>

        {/* RIGHT BUTTON */}
        <button className="nav-btn right" onClick={next}>→</button>

      </div>

      {/* FEEDBACK BUTTON */}
      <button className="feedback-btn">Give Feedback</button>

    </div>
  );
}
