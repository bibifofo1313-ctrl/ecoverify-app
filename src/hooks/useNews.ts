import { useEffect, useState } from "react";
import type { NewsItem } from "../types/app";

interface NewsState {
  items: NewsItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  items: [],
  isLoading: true,
  error: null,
};

export const useNews = () => {
  const [state, setState] = useState<NewsState>(initialState);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Unable to load news updates.");
        }
        const data = (await response.json()) as { items: NewsItem[] };
        if (isMounted) {
          setState({ items: data.items ?? [], isLoading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ items: [], isLoading: false, error: (error as Error).message });
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
};
