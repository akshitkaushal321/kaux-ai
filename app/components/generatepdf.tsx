"use client";

import { jsPDF } from "jspdf";

export default function GeneratePDF() {

  const handleGenerate = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("My First PDF 🚀", 20, 20);

    // Content
    doc.setFontSize(12);
    doc.text("This PDF is generated using jsPDF in Next.js.", 20, 40);

    // Save
    doc.save("my-first-pdf.pdf");
  };

  return (
    <div className="p-6">
      <button
        onClick={handleGenerate}
        className="px-6 py-2 bg-white text-black rounded-lg"
      >
        Generate PDF
      </button>
    </div>
  );
}