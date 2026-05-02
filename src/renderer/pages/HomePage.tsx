import { useState } from 'react';
import RecordingPanel from '../components/RecordingPanel';
import TranscriptPanel from '../components/TranscriptPanel';
import ResultPanel from '../components/ResultPanel';
import ModeSelector from '../components/ModeSelector';
import StatusBadge from '../components/StatusBadge';
import type { AssistantStatus, PromptMode } from '../../shared/types';

export default function HomePage() {
  const [status] = useState<AssistantStatus>('Ready');
  const [mode, setMode] = useState<PromptMode>('Clean Text');

  return (
    <section>
      <StatusBadge status={status} />
      <ModeSelector mode={mode} onChange={setMode} />
      <RecordingPanel />
      <TranscriptPanel />
      <ResultPanel />
    </section>
  );
}
