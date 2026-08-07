export default function MessageBubble({
  text,
  sender,
}: {
  text: string;
  sender: "user" | "bot";
}) {
  return (
    <div
      style={{
        textAlign: sender === "user" ? "right" : "left",
        margin: "8px 0",
      }}
    >
      <span
        style={{
          background: sender === "user" ? "#000" : "#eee",
          color: sender === "user" ? "#fff" : "#000",
          padding: "10px",
          borderRadius: "10px",
          display: "inline-block",
        }}
      >
        {text}
      </span>
    </div>
  );
}