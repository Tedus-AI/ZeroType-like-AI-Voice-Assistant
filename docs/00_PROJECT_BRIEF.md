# 00_PROJECT_BRIEF.md

# AI Voice Assistant 開發總控文件

## 1. 專案目的

本專案要開發一套桌面型 AI 語音輸入助手。

使用者可以在任何應用程式中按下全域快捷鍵開始錄音，說完後系統會自動完成以下流程：

1. 錄製語音
2. 將語音轉成文字
3. 使用 AI 修正口語、錯字、贅詞與語意
4. 根據指定模式整理成可直接使用的文字
5. 複製結果到剪貼簿
6. 自動貼回目前游標所在位置

本產品不是單純的語音輸入法，而是「語音 → AI 整理 → 工作文字輸出」的桌面工具。

---

## 2. 產品一句話描述

使用者按下快捷鍵後直接說話，系統會自動將口述內容整理成乾淨、正式、可直接貼上的文字。

---

## 3. MVP 目標

第一版 MVP 只做最小可用版本。

MVP 的目標是：

讓使用者可以在 Windows 桌面環境中完成：

「快捷鍵啟動 → 錄音 → 語音轉文字 → AI 修正 → 複製 → 自動貼上」

---

## 4. MVP 必須包含的功能

MVP 必須包含以下功能：

1. Electron 桌面應用程式
2. React + TypeScript 前端畫面
3. 基本主畫面
4. 基本設定頁
5. OpenAI API Key 設定
6. 全域快捷鍵
7. 麥克風錄音
8. 錄音檔暫存
9. STT 語音轉文字
10. LLM 文字修正
11. Prompt 模式切換
12. 複製結果到剪貼簿
13. 自動貼回目前 App
14. 歷史紀錄
15. 基本錯誤提示

---

## 5. MVP 不做的功能

第一版不要實作以下功能：

1. 使用者帳號系統
2. 付款系統
3. 雲端同步
4. 團隊管理
5. 多人語者分離
6. 即時字幕
7. 手機 App
8. macOS 版本
9. Linux 版本
10. Prompt 市集
11. 瀏覽器外掛
12. 企業後台
13. 複雜權限系統
14. AI 自動操作電腦
15. 自動更新
16. 安裝包 installer

---

## 6. 目標平台

第一版只支援：

- Windows 10
- Windows 11

其他平台暫不處理。

---

## 7. 技術棧

MVP 採用以下技術棧：

- Desktop Framework：Electron
- Frontend：React
- Language：TypeScript
- Bundler：Vite
- Runtime：Node.js
- Storage：先使用本機 JSON，之後可改 SQLite
- STT Provider：OpenAI Transcription API
- LLM Provider：OpenAI API
- Text Injection：Clipboard + Ctrl+V 模擬

---

## 8. 核心使用流程

使用者操作流程：

1. 使用者在任意 App 中點選文字輸入位置
2. 按下全域快捷鍵
3. App 開始錄音
4. 使用者口述內容
5. 再次按下快捷鍵或點擊停止錄音
6. 系統產生音訊檔
7. 系統將音訊送至 STT
8. 系統取得原始逐字稿
9. 系統將逐字稿送至 LLM
10. LLM 根據目前模式產生整理後文字
11. 系統將整理後文字複製到剪貼簿
12. 系統模擬 Ctrl+V
13. 文字被貼回目前 App

---

## 9. 系統模組

本專案拆成以下模組：

### 9.1 Main Process

負責：

- 啟動 Electron App
- 建立主視窗
- 管理 App 生命週期
- 註冊 IPC
- 管理系統層功能

### 9.2 Renderer UI

負責：

- 顯示主畫面
- 顯示設定頁
- 顯示錄音狀態
- 顯示原始逐字稿
- 顯示 AI 修正結果
- 顯示錯誤訊息

### 9.3 Preload Bridge

負責：

- 安全暴露 main process API 給 renderer
- 使用 contextBridge
- 避免 renderer 直接使用 Node.js API

### 9.4 Settings Service

負責：

- 儲存 API Key
- 儲存快捷鍵設定
- 儲存預設模式
- 儲存是否自動貼上
- 儲存是否保留歷史紀錄

### 9.5 Hotkey Service

負責：

- 註冊全域快捷鍵
- 監聽快捷鍵事件
- 觸發錄音開始或停止
- 處理快捷鍵註冊失敗

### 9.6 Audio Recorder Service

負責：

- 開始錄音
- 停止錄音
- 儲存音訊檔
- 回傳音訊檔路徑
- 處理錄音錯誤

### 9.7 STT Service

負責：

- 接收音訊檔
- 呼叫 OpenAI Transcription API
- 回傳原始逐字稿
- 處理 STT 錯誤

### 9.8 LLM Service

負責：

- 接收原始逐字稿
- 接收目前 Prompt 模式
- 呼叫 OpenAI Chat API
- 回傳整理後文字
- 處理 LLM 錯誤

### 9.9 Prompt Template Service

負責：

- 管理不同輸出模式
- 根據模式產生 prompt
- 確保 AI 不新增使用者沒說的事實

### 9.10 Clipboard Service

負責：

- 將最終文字寫入剪貼簿
- 未來可支援貼上後恢復原剪貼簿

### 9.11 Text Injection Service

負責：

- 模擬 Ctrl+V
- 將文字貼回目前 App
- 處理貼上失敗

### 9.12 History Service

負責：

- 儲存原始逐字稿
- 儲存 AI 修正後文字
- 儲存使用模式
- 儲存建立時間
- 讓使用者可以查看歷史紀錄

---

## 10. MVP Prompt 模式

MVP 先支援以下 5 種模式：

### 10.1 Clean Text

用途：

將口語逐字稿整理成乾淨、自然、可閱讀的文字。

規則：

- 保留原意
- 移除贅詞
- 修正錯字
- 修正標點
- 不新增使用者沒說的內容

### 10.2 Formal Email

用途：

將口述內容整理成正式 email。

輸出格式：

- 主旨
- 內文

規則：

- 語氣正式
- 內容清楚
- 不過度承諾
- 不新增未確認事項

### 10.3 Meeting Notes

用途：

將口述會議內容整理成會議紀錄。

輸出格式：

- 會議摘要
- 主要討論事項
- 決議事項
- 待辦事項
- 待確認問題

### 10.4 Task List

用途：

將口述內容整理成任務清單。

輸出格式：

- 目標
- 任務清單
- 優先順序
- 下一步

### 10.5 Requirement Draft

用途：

將口述想法整理成需求文件初稿。

輸出格式：

- 背景
- 目標
- 使用情境
- 功能需求
- 非功能需求
- 邊界條件
- 待確認問題

---

## 11. 預設 AI 規則

LLM 整理文字時必須遵守：

1. 保留使用者原意
2. 不要新增使用者沒提到的事實
3. 移除口語贅詞、重複語句與語助詞
4. 修正明顯錯字與標點
5. 若內容不確定，標記為「待確認」
6. 根據指定模式輸出
7. 不要解釋處理過程
8. 只輸出整理後的最終文字

---

## 12. 建議資料夾結構

請盡量使用以下結構：

src/
  main/
    main.ts
    ipc/
      settings.ipc.ts
      recording.ipc.ts
      transcription.ipc.ts
      rewrite.ipc.ts
      clipboard.ipc.ts
    services/
      settingsService.ts
      hotkeyService.ts
      audioRecorderService.ts
      sttService.ts
      llmService.ts
      promptTemplateService.ts
      clipboardService.ts
      textInjectionService.ts
      historyService.ts

  preload/
    preload.ts

  renderer/
    main.tsx
    App.tsx
    pages/
      HomePage.tsx
      SettingsPage.tsx
      HistoryPage.tsx
    components/
      RecordingPanel.tsx
      TranscriptPanel.tsx
      ResultPanel.tsx
      ModeSelector.tsx
      StatusBadge.tsx
    styles/
      global.css

  shared/
    types.ts
    constants.ts
    promptTemplates.ts

docs/
  00_PROJECT_BRIEF.md

---

## 13. UI 規劃

MVP UI 先求清楚，不追求華麗。

### 13.1 主畫面

主畫面包含：

1. App 標題：AI Voice Assistant
2. 狀態文字
3. 目前模式
4. Start Recording 按鈕
5. Stop Recording 按鈕
6. Settings 按鈕
7. 原始逐字稿區塊
8. AI 修正結果區塊
9. Copy 按鈕
10. Paste 按鈕

### 13.2 狀態

狀態包含：

- Ready
- Recording
- Transcribing
- Rewriting
- Copied
- Pasted
- Error

### 13.3 設定頁

設定頁包含：

1. OpenAI API Key
2. STT model
3. LLM model
4. Global hotkey
5. Default mode
6. Auto paste on/off
7. Save history on/off

---

## 14. 資料儲存

MVP 可以先用本機 JSON。

未來可改 SQLite。

需要儲存的資料：

### 14.1 Settings

欄位：

- openaiApiKey
- sttModel
- llmModel
- globalHotkey
- defaultMode
- autoPaste
- saveHistory

### 14.2 History

欄位：

- id
- createdAt
- mode
- rawTranscript
- finalText
- audioFilePath
- sttModel
- llmModel
- errorMessage

---

## 15. 錯誤處理

必須處理以下錯誤：

1. API Key 未設定
2. 麥克風權限不足
3. 錄音失敗
4. 音訊檔產生失敗
5. STT API 失敗
6. LLM API 失敗
7. 剪貼簿寫入失敗
8. 自動貼上失敗
9. 快捷鍵註冊失敗
10. 網路連線失敗

錯誤訊息必須讓使用者知道問題原因與下一步。

---

## 16. 隱私與安全原則

本產品會處理語音與文字，所以必須遵守：

1. API Key 不可完整顯示在 UI
2. 不要預設上傳不必要資料
3. MVP 只送出音訊檔給 STT，以及逐字稿給 LLM
4. 不讀取使用者檔案
5. 不擷取螢幕畫面
6. 不讀取剪貼簿歷史
7. 歷史紀錄必須可以關閉

---

## 17. 開發原則

Codex 開發時必須遵守以下原則：

1. 每次只做一個小任務
2. 不要一次實作多個大功能
3. 不要修改無關檔案
4. 不要大規模重構
5. 不要實作下一階段功能
6. 優先完成可運作版本
7. 優先穩定性，不優先美觀
8. TypeScript 不應該留下明顯型別錯誤
9. 新增功能時要有基本錯誤處理
10. 完成任務後要回報修改內容與測試方式

---

## 18. Codex 任務格式

之後每次給 Codex 的任務都應該包含：

1. 背景
2. 本次任務目標
3. 修改範圍
4. 不要做的事
5. 驗收條件
6. 測試方式
7. 完成後回報格式

---

## 19. 開發任務順序

MVP 開發順序如下：

1. 建立 Electron + React + TypeScript 專案骨架
2. 建立基本 UI
3. 建立設定儲存
4. 加入全域快捷鍵
5. 加入錄音功能
6. 接上 STT 語音轉文字
7. 接上 LLM 文字修正
8. 加入 Prompt 模式切換
9. 加入剪貼簿與自動貼上
10. 加入歷史紀錄
11. 加強錯誤處理
12. MVP 整合測試

---

## 20. 目前專案狀態

目前狀態：

尚未開始正式開發。

下一個任務：

建立 Electron + React + TypeScript 專案骨架。

---

## 21. 給 Codex 的總指令

Codex 在執行任何任務前，請先閱讀本文件。

請遵守：

1. 只做本次任務指定內容
2. 不做下一階段功能
3. 不主動加入不必要套件
4. 不重構無關檔案
5. 遇到不確定處，採用最簡單、最穩定、最容易維護的方案
6. 完成後回報：
   - 新增了哪些檔案
   - 修改了哪些檔案
   - 如何測試
   - 是否有未完成事項
   - 是否有風險
