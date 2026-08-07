export default function FileCard({ fileUrl }: { fileUrl: string }) {
  return (
    <div
      style={{
        marginTop: "5px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        display: "inline-block",
      }}
    >
      📄 kaux-generated.pdf
      <br />
      <a href={fileUrl} download="generated.pdf">
        ⬇ Download
      </a>
    </div>
  );
}