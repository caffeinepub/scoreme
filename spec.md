# SCOREME – Reality Score Engine (PH Edition)

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Splash screen with animated logo and tagline (2-3 sec fade-in)
- Home / Mode Selection screen with 6 modes: Logic, Emotion, Money, Growth, Brutal, Future
- Question input screen with text area and submit button
- Free Result screen: Reality Score (0–100, animated), Risk Level, Courage Level, 1-line bold insight
- GCash unlock flow: ₱15 payment prompt with GCash QR, number (09858612144), and deep-link to GCash app
- Full Result screen (post-unlock): 5 Hidden Risks, 3 Strengths, 1-Year Projection, 3 Action Steps, Confidence/Skill Gap Warning, optional Brutal Truth tone
- Shareable Score Card: auto-generated visual card with score, question, risk, courage, watermark "scoreme.ph", share buttons for FB/IG/TikTok/Messenger
- Leaderboard / Trending Questions: daily top questions by mode, tap to see free score
- Daily Public Question: featured question with free score, optional unlock
- Score Improvement Suggestions: personalized tips to raise score
- Settings: dark/light mode toggle
- Backend: question storage, scoring logic, trending/leaderboard data, daily question scheduling, unlock status tracking per question session

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
- `Question` type: id, text, mode, score, riskLevel, courageLevel, insight, timestamp, unlockCount, viewCount
- `ScoreResult` type: score (Nat), risk (text), courage (text), insight (text)
- `FullInsight` type: risks [text], strengths [text], projection (text), actionSteps [text], skillGapWarning (text), brutalTruth (text)
- `submitQuestion(text, mode)` → returns ScoreResult (deterministic scoring algorithm based on keywords/mode)
- `getFullInsights(questionId)` → returns FullInsight (requires unlock flag set)
- `markUnlocked(questionId)` → sets unlock status (trust-based, payment confirmed client-side via GCash)
- `getTrendingQuestions(mode?)` → top questions by view/unlock count
- `getDailyQuestion()` → returns today's featured question
- `getLeaderboard()` → top scored questions across all modes
- `incrementView(questionId)` → bumps view count for trending
- Score algorithm: keyword analysis + mode weighting → 0–100 score, risk/courage derived from score bands
- Seed daily questions for each mode

### Frontend (React + TypeScript)
- App-wide dark/light theme toggle stored in localStorage
- Splash screen: animated logo, tagline, auto-advance after 2.5s
- Mode selection grid: 6 mode cards with icons, names, short descriptions
- Question input: large textarea, selected mode badge, submit CTA
- Free result: animated score counter (0→score), color-coded risk/courage badges, bold insight text, unlock CTA button
- GCash payment modal: QR code image, GCash number, "Open GCash App" deep link button, "I've Paid" confirmation button
- Full result: sectioned cards for risks, strengths, projection, action steps, skill gap warning
- Share card generator: HTML Canvas or styled div screenshot using html2canvas, watermark overlay, native share / copy to clipboard
- Leaderboard page: tabbed by mode, list of top questions with scores
- Daily question banner on home page
- Score improvement tips section
- Smooth animations throughout (score counter, progress bars, card reveals)
- Mobile-first responsive layout, max-width ~430px centered
- data-ocid markers on all interactive elements
