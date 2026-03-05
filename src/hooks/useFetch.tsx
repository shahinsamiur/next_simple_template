import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Something went wrong");

        const data: T = await res.json();

        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (err: unknown) {
        if (isMounted) {
          let errorMessage = "Unknown error";

          if (err instanceof Error) {
            errorMessage = err.message;
          }

          setState({
            data: null,
            loading: false,
            error: errorMessage,
          });
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
}
