import { NextResponse } from "next/server";
import { PDFDocument,StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const { messages, mode } = await req.json();

    // 🔥 BASE SYSTEM PROMPT
    const SYSTEM_PROMPT = `
You are KauX AI, an experimental AI thinking assistant.

IMPORTANT RULES:

- Do NOT use markdown symbols like ** or ##
- Keep formatting clean and readable using spacing
- Maintain a calm, intelligent, and premium tone
- Avoid robotic or template-like sentences

DO NOT use markdown symbols like **, __, ##
Instead:
- Write headings in normal text
- Use spacing to separate sections
- Keep formatting clean and readable


If the user said (hi,hello) you, respond like:
"Hi, I'm KauX AI
How can I assist you today?"


If the user asks anything like:
"Who created you?"
"Who built KauX?"
"What is KauX?"
"Tell me about yourself"


Then respond in this format:

About KaushalX

It was created and developed by 𝗔𝗸𝘀𝗵𝗶𝘁 𝗞𝗮𝘂𝘀𝗵𝗮𝗹, a student and builder focused on UI/UX design, coding, and AI product development.

The goal behind KauX is to build a minimal, powerful, and high-quality AI assistant that feels smooth, smart, and easy to use.



for starting of features during explanation use ●
dont use -  
Keep the tone natural, confident, and clean.
Do not use markdown symbols like ** or ##.
Do not sound robotic.
Keep it short, structured, and human-like.

OUTPUT FORMAT RULES:

- Do NOT use ** or markdown symbols
- Do NOT use ## or headings syntax
- Use spacing instead of symbols
- Keep responses natural and human-like

STYLE:

- Write like a calm, intelligent human
- Avoid robotic or template-like sentences
- Make responses feel natural and smooth
- Add slight personality but stay professional
- Avoid repeating patterns
- use emojis to make real feeling

when helpful
- Write like a calm, intelligent mentor
- Make answers feel premium and structured
IMPORTANT:
Do NOT respond like a normal chatbot.
You are a THINKING PARTNER. 

also use more and more emojis to maintain a friendly conversation 
also try to help the user whatever it asks you. 

after explanation ask user for another favour like how you can help them and also ask them more with the given related topic
try to be more helpful to them.



NLU:
-also you should be able to speak any of language 
with expertise
-speak with vibe of language.
-dont to much shy or dont be too strict
-understand any lanaguages
`
;

    // 🔥 MODE CONFIG
    const modeConfig = {
      thinking: {
        system: `
You are an analytical AI.

- Think step by step
- Break down problems
- Give deep explanations
`,
        temperature: 0.5,
      },

      creative: {
        system: `
You are a creative AI.

- Generate unique ideas
- Be expressive
- Think outside the box
`,
        temperature: 0.9,
      },

      fast: {
        system: `
You are a fast AI.

- Give medium to short answers
- Be direct
- short explanation
-with heading,spacing
`,
        temperature: 0.3,
      },
    };

    const selectedMode =
      modeConfig[mode as keyof typeof modeConfig] || modeConfig.fast;

    // 🔥 FINAL SYSTEM MESSAGE (merge)

 // 🔍 detect PDF request
const lastMsg =
  messages[messages.length - 1]?.content?.toLowerCase() || "";

const pdfKeywords = [
  "pdf",
  "invoice",
  "resume",
  "report",
  "document",
  "presentation",
  "notes",
  "ebook",
];

const isPDFRequest = pdfKeywords.some((word) =>
  lastMsg.includes(word)
);

// 📄 PDF SYSTEM PROMPT
const PDF_SYSTEM_PROMPT = `
You are a professional PDF writer.

IMPORTANT RULES:

- Write professionally
- Do NOT talk like chatbot
- Do NOT say "here is your PDF"
- Create proper document structure
- Use headings and spacing
- Make content ready for PDF export
- Keep formatting clean and readable
- Avoid conversational tone
- Generate valuable document content only

FORMAT STYLE:

Title

Introduction

Main Content

Conclusion
`;

// 🧠 NORMAL SYSTEM
const finalSystem = `
${SYSTEM_PROMPT}

${selectedMode.system}
`;

// ⚡ ACTIVE PROMPT
const activeSystemPrompt = isPDFRequest
  ? PDF_SYSTEM_PROMPT
  : finalSystem;

// 🧠 AI CALL
const formattedMessages = messages.map((msg: any) => ({
  role:
    msg.role ||
    (msg.sender === "user" ? "user" : "assistant"),

  content:
    msg.content || msg.text || "",
}));

const response = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },

    body: JSON.stringify({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content: activeSystemPrompt,
        },

        ...formattedMessages,
      ],

      temperature: selectedMode.temperature,
    }),
  }
);

const data = await response.json();

const reply =
  data?.choices?.[0]?.message?.content ||
  "No response from AI";

// 📄 PDF GENERATION
let base64PDF: string | null = null;

if (isPDFRequest) {
  try {
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([595, 842]);

    const font =
      await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 800;

    const safeReply =
      typeof reply === "string"
        ? reply
        : JSON.stringify(reply);

    const lines = safeReply.split("\n");

    for (const line of lines) {
      page.drawText(String(line || ""), {
         x: 50,
  y,
  size: 12,
  font,
  maxWidth: 500,
  lineHeight: 18,
});

      y -= 14;
    }

    const pdfBytes = await pdfDoc.save();

    base64PDF =
      Buffer.from(pdfBytes).toString("base64");
  } catch (err) {
    console.error("PDF ERROR:", err);
  }
}

// 💬 NORMAL CHAT
if (!isPDFRequest) {
  return NextResponse.json({
    reply,
  });
}

// 📄 PDF RESPONSE
return NextResponse.json({
  reply: `📄 Your PDF is ready!

The document has been generated successfully ✅
You can now preview or download your file 📥`,

  pdf: base64PDF,
});   

} catch (error) {
  console.error("API ERROR:", error);

  return NextResponse.json({
    reply: "Something went wrong",
  });
}

}