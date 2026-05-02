export default function TranscriptPanel() {
  return (
    <section>
      <h3>Raw Transcript</h3>
      <textarea rows={6} readOnly placeholder="STT output will appear here" />
    </section>
  );
}
