import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('appInfo', {
  name: 'AI Voice Assistant'
});
