import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('voiceAssistant', {
  version: '0.1.0'
});
