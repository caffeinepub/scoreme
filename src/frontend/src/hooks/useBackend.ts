import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type DeepInsights, type Question, ScoreMode } from "../backend.d";
import { useActor } from "./useActor";

export function useTopQuestions(limit = 5n) {
  const { actor, isFetching } = useActor();
  return useQuery<Question[]>({
    queryKey: ["topQuestions", limit.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopQuestions(limit);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useTopByUnlocks(limit = 10n) {
  const { actor, isFetching } = useActor();
  return useQuery<Question[]>({
    queryKey: ["topByUnlocks", limit.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopQuestionsByUnlocks(limit);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useFeaturedByMode(mode: ScoreMode) {
  const { actor, isFetching } = useActor();
  return useQuery<Question | null>({
    queryKey: ["featuredByMode", mode],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getFeaturedQuestionByMode(mode);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useDeepInsights(questionId: bigint | null, enabled: boolean) {
  const { actor, isFetching } = useActor();
  return useQuery<DeepInsights | null>({
    queryKey: ["deepInsights", questionId?.toString()],
    queryFn: async () => {
      if (!actor || !questionId) return null;
      return actor.getDeepInsights(questionId);
    },
    enabled: !!actor && !isFetching && enabled && questionId !== null,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useSubmitQuestion() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ text, mode }: { text: string; mode: ScoreMode }) => {
      if (!actor) throw new Error("Actor not ready");
      const questionId = await actor.submitQuestion(text, mode);
      const scoreResult = await actor.getScoreResult(questionId);
      return { questionId, scoreResult };
    },
  });
}

export function useUnlockQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (questionId: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.unlockQuestion(questionId);
    },
    onSuccess: (_, questionId) => {
      queryClient.invalidateQueries({
        queryKey: ["deepInsights", questionId.toString()],
      });
    },
  });
}

export function useAllFeaturedQuestions() {
  const { actor, isFetching } = useActor();
  const modes = [
    ScoreMode.logic,
    ScoreMode.emotion,
    ScoreMode.money,
    ScoreMode.growth,
    ScoreMode.brutal,
    ScoreMode.future,
  ];
  return useQuery<Question[]>({
    queryKey: ["allFeaturedQuestions"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await Promise.all(
        modes.map((mode) => actor.getFeaturedQuestionByMode(mode)),
      );
      return results.filter((q): q is Question => q !== null);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}
