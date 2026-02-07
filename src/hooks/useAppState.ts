import { useCallback } from "react";
import { APP_STORAGE_KEY, DEFAULT_FORM_DATA } from "../data/defaults";
import type { AppState, FormData } from "../types/app";
import { useLocalStorage } from "./useLocalStorage";

const initialState: AppState = {
  formData: DEFAULT_FORM_DATA,
  onboardingStep: 1,
  updatedAt: null,
  completed: false,
};

export const useAppState = () => {
  const [state, setState] = useLocalStorage<AppState>(APP_STORAGE_KEY, initialState);

  const setFormData = useCallback(
    (updater: FormData | ((current: FormData) => FormData)) => {
      setState((prev) => {
        const nextData = typeof updater === "function" ? updater(prev.formData) : updater;
        return {
          ...prev,
          formData: nextData,
          updatedAt: new Date().toISOString(),
        };
      });
    },
    [setState]
  );

  const setOnboardingStep = useCallback(
    (step: number) => {
      setState((prev) => ({ ...prev, onboardingStep: step }));
    },
    [setState]
  );

  const markCompleted = useCallback(() => {
    setState((prev) => ({
      ...prev,
      completed: true,
      onboardingStep: 3,
      updatedAt: new Date().toISOString(),
    }));
  }, [setState]);

  const resetState = useCallback(() => {
    setState(initialState);
  }, [setState]);

  return {
    state,
    setFormData,
    setOnboardingStep,
    markCompleted,
    resetState,
  };
};
