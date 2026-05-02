import type { AssistantStatus } from '../../shared/types';

type Props = { status: AssistantStatus };

export default function StatusBadge({ status }: Props) {
  return <p>Status: {status}</p>;
}
