import type { PromptMode } from './types';

export const promptTemplates: Record<PromptMode, string> = {
  'Clean Text': '整理成自然、精簡、可閱讀文字。',
  'Formal Email': '整理成正式電子郵件，包含主旨與內文。',
  'Meeting Notes': '整理成會議紀錄。',
  'Task List': '整理成任務清單。',
  'Requirement Draft': '整理成需求文件初稿。'
};
