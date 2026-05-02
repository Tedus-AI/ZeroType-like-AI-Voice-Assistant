const App = (): JSX.Element => {
  return (
    <main className="container">
      <h1>AI Voice Assistant</h1>
      <p className="status">Ready</p>
      <div className="actions">
        <button type="button">Start Recording</button>
        <button type="button">Settings</button>
      </div>
      <section className="result-box" aria-label="Transcription Result" />
    </main>
  );
};

export default App;
