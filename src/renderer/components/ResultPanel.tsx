export default function ResultPanel() {
  return (
    <section>
      <h3>AI Result</h3>
      <textarea rows={8} readOnly placeholder="Rewritten result will appear here" />
      <div>
        <button type="button">Copy</button>
        <button type="button">Paste</button>
      </div>
    </section>
  );
}
