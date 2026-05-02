import { PROMPT_MODES } from '../../shared/constants';
import type { PromptMode } from '../../shared/types';

type Props = {
  mode: PromptMode;
  onChange: (mode: PromptMode) => void;
};

export default function ModeSelector({ mode, onChange }: Props) {
  return (
    <label>
      Mode
      <select value={mode} onChange={(event) => onChange(event.target.value as PromptMode)}>
        {PROMPT_MODES.map((promptMode) => (
          <option key={promptMode} value={promptMode}>
            {promptMode}
          </option>
        ))}
      </select>
    </label>
  );
}
