import { useState, useCallback } from "react";
import type { Gif, GiphyResponse } from "../types/giphy";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = "https://api.giphy.com/v1/gifs";
const LIMIT = 12;

interface GiphyState {
  gifs: Gif[];
  cache: Record<string, Gif[]>;
  totalCount: number;
  isLoading: boolean;
  isRateLimited: boolean;
  error: string | null;
}

const initialState: GiphyState = {
  gifs: [],
  cache: {},
  totalCount: 0,
  isLoading: false,
  isRateLimited: false,
  error: null,
};

function useGiphy() {
  const [state, setState] = useState<GiphyState>(initialState);

  const fetchGifs = useCallback(async (query: string, page: number = 1) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const offset = (page - 1) * LIMIT;

    const params = new URLSearchParams({
      api_key: API_KEY,
      q: query,
      limit: String(LIMIT),
      offset: String(offset),
      rating: "g",
    });

    try {
      const response = await fetch(`${BASE_URL}/search?${params}`);

      if (response.status === 429) {
        setState((prev) => ({
          ...prev,
          gifs: prev.cache[query] ?? prev.gifs,
          isLoading: false,
          isRateLimited: true,
        }));
        return;
      }

      if (!response.ok) {
        throw new Error(`Something went wrong: ${response.status}`);
      }

      const data: GiphyResponse = await response.json();

      setState((prev) => ({
        ...prev,
        gifs: data.data,
        cache: {
          ...prev.cache,
          [query]: [...(prev.cache[query] ?? []), ...data.data],
        },
        totalCount: data.pagination.total_count,
        isLoading: false,
        isRateLimited: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Something went wrong",
      }));
    }
  }, []);

  const fetchTrending = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const randomOffset = Math.floor(Math.random() * 50);
    const params = new URLSearchParams({
      api_key: API_KEY,
      limit: "3",
      rating: "g",
      offset: String(randomOffset),
    });

    try {
      const response = await fetch(`${BASE_URL}/trending?${params}`);

      if (!response.ok) {
        throw new Error(`Something went wrong: ${response.status}`);
      }

      const data: GiphyResponse = await response.json();

      setState((prev) => ({
        ...prev,
        gifs: data.data,
        isLoading: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Something went wrong",
      }));
    }
  }, []);

  return {
    ...state,
    fetchGifs,
    fetchTrending,
  };
}

export default useGiphy;
