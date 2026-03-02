import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { type Question, ScoreMode } from "./backend.d";
import HomeScreen from "./screens/HomeScreen";
import QuestionScreen from "./screens/QuestionScreen";
import ResultScreen from "./screens/ResultScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SplashScreen from "./screens/SplashScreen";
import TrendingScreen from "./screens/TrendingScreen";

export type Screen =
  | "splash"
  | "home"
  | "question"
  | "result"
  | "trending"
  | "settings";

export interface AppState {
  selectedMode: ScoreMode;
  questionId: bigint | null;
  question: Question | null;
  viewingQuestion: Question | null;
}

function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const stored = localStorage.getItem("scoreme-theme");
    return (stored as "dark" | "light") || "dark";
  });
  const [appState, setAppState] = useState<AppState>({
    selectedMode: ScoreMode.logic,
    questionId: null,
    question: null,
    viewingQuestion: null,
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("scoreme-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const navigateTo = (newScreen: Screen) => {
    setScreen(newScreen);
  };

  const selectMode = (mode: ScoreMode) => {
    setAppState((prev) => ({ ...prev, selectedMode: mode }));
    navigateTo("question");
  };

  const setQuestionResult = (questionId: bigint, question: Question) => {
    setAppState((prev) => ({ ...prev, questionId, question }));
    navigateTo("result");
  };

  const viewQuestion = (question: Question) => {
    setAppState((prev) => ({ ...prev, viewingQuestion: question, question }));
    navigateTo("result");
  };

  if (screen === "splash") {
    return (
      <>
        <SplashScreen onComplete={() => navigateTo("home")} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="mobile-container bg-background">
      {screen === "home" && (
        <HomeScreen
          theme={theme}
          onToggleTheme={toggleTheme}
          onSelectMode={selectMode}
          onNavigate={navigateTo}
          onViewQuestion={viewQuestion}
        />
      )}
      {screen === "question" && (
        <QuestionScreen
          mode={appState.selectedMode}
          onBack={() => navigateTo("home")}
          onResult={setQuestionResult}
        />
      )}
      {screen === "result" && appState.question && (
        <ResultScreen
          question={appState.question}
          onBack={() => navigateTo("home")}
          onNewQuestion={() => navigateTo("home")}
        />
      )}
      {screen === "trending" && (
        <TrendingScreen
          onBack={() => navigateTo("home")}
          onViewQuestion={viewQuestion}
        />
      )}
      {screen === "settings" && (
        <SettingsScreen
          theme={theme}
          onToggleTheme={toggleTheme}
          onBack={() => navigateTo("home")}
        />
      )}
      <Toaster />
    </div>
  );
}

export default App;
