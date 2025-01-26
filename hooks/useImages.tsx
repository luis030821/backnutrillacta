import { useApp } from "@llampukaq/realm";
import { useState, useEffect, useCallback } from "react";

export const useImages = () => {
  const apiBaseUrl = "https://nutrillacta.llampukaq.workers.dev";
  const [images, setImages] = useState([]); // Estado para almacenar las imágenes
  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const { currentUser } = useApp();
  const user = { email: currentUser?.profile.email };
  // Función para obtener las imágenes
  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/images`, {
        //@ts-ignore
        headers: {
          "Content-Type": "application/json",
          //@ts-ignore
          EMAIL: user?.email,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      setImages(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  // Función para actualizar las imágenes
  const updateImages = useCallback(
    async (newImages: any) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiBaseUrl}/images`, {
          method: "POST",
          //@ts-ignore
          headers: {
            "Content-Type": "application/json",
            EMAIL: user?.email,
          },
          body: JSON.stringify({ img: newImages }),
        });

        if (!response.ok) {
          throw new Error("Failed to update images");
        }

        fetchImages();
      } catch (err) {
      } finally {
        setLoading(false);
      }
    },
    [apiBaseUrl]
  );
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);
  return { images, loading, error, fetchImages, updateImages, setImages };
};
