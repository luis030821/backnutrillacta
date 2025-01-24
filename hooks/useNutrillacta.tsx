import { User } from "@/interface";
import { useUser } from "@llampukaq/realm";
import { useState, useCallback } from "react";

const API_BASE_URL = "https://nutrillacta.llampukaq.workers.dev/";

/**
 * Custom React hook to interact with the Nutrillacta API
 */
export const useNutrillactaApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const fetchApi = useCallback(async (endpoint: string, options = {}) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const result = await response.json();
    setData(result);
    return result;
  }, []);
  const { user } = useUser<User>();
  // Add a user
  const addUser = useCallback(
    async (email: string) => {
      if (!email) throw new Error("Email is required");
      return await fetchApi("user", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          EMAIL: user?.email,
        },
      });
    },
    [fetchApi]
  );

  // Get a user
  const getUser = useCallback(
    async (email: string) => {
      if (!email) return;
      return await fetchApi(`user?email=${encodeURIComponent(email)}`);
    },
    [fetchApi]
  );

  return {
    loading,
    error,
    data,
    addUser,
    getUser,
  };
};
