export type AssistantStatus =
  | 'Ready'
  | 'Recording'
  | 'Transcribing'
  | 'Rewriting'
  | 'Copied'
  | 'Pasted'
  | 'Error';

export type PromptMode =
  | 'Clean Text'
  | 'Formal Email'
  | 'Meeting Notes'
  | 'Task List'
  | 'Requirement Draft';
