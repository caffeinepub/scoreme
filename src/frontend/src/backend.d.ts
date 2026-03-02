import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface DeepInsights {
    skillGapWarning: string;
    strengths: Array<string>;
    actionSteps: Array<string>;
    yearProjection: string;
    hiddenRisks: Array<string>;
    brutalTruth: string;
}
export interface ScoreResult {
    score: bigint;
    insight: string;
    riskLevel: RiskLevel;
    courageLevel: CourageLevel;
}
export interface Question {
    id: bigint;
    unlockCount: bigint;
    mode: ScoreMode;
    createdAt: Time;
    text: string;
    viewCount: bigint;
    isFeatured: boolean;
    scoreResult: ScoreResult;
}
export enum CourageLevel {
    low = "low",
    high = "high",
    medium = "medium"
}
export enum ScoreMode {
    money = "money",
    growth = "growth",
    brutal = "brutal",
    emotion = "emotion",
    future = "future",
    logic = "logic"
}
export interface backendInterface {
    getAllQuestions(): Promise<Array<Question>>;
    getDeepInsights(questionId: bigint): Promise<DeepInsights>;
    getFeaturedQuestionByMode(mode: ScoreMode): Promise<Question | null>;
    getScoreResult(questionId: bigint): Promise<ScoreResult>;
    getTopQuestions(limit: bigint): Promise<Array<Question>>;
    getTopQuestionsByUnlocks(limit: bigint): Promise<Array<Question>>;
    setFeaturedQuestion(questionId: bigint, mode: ScoreMode): Promise<void>;
    submitQuestion(text: string, mode: ScoreMode): Promise<bigint>;
    unlockQuestion(questionId: bigint): Promise<void>;
}
