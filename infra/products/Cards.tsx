import { Button, H1, Icons, ModalDownTrigger, P } from "cllk";
import React, { useCallback, useState } from "react";
import useCards from "./hooks/useCards";
import { useCategories } from "./hooks/useCategories";
import { useProducts } from "./hooks/useProducts";
import { useNutrillactaApi } from "@/hooks/useNutrillacta";

function Cards({ setInformation }: any) {
  const { cards } = useCards();
  const { setCardId, getCategories, setCard: setC } = useCategories();
  const { setCardId: set, setCard } = useProducts();
  const { addUser, loading, error } = useNutrillactaApi();
  const [email, setEmail] = useState("");
  const handleAddUser = async () => {
    try {
      if (!email) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
      }
      await addUser(email);
      alert("Usuario agregado exitosamente.");
      setEmail(""); // Limpiar el campo
    } catch (err) {
      alert(`Error al agregar usuario`);
    }
  };

  return (
    <div className="inline-flex w-full flex-col-reverse sm:flex-col sm:border-r sm:min-h-screen p-3 sm:space-y-2 overflow-x-auto">
      {cards?.map((x, index) => (
        <div
          key={index}
          className="border-b pb-2 sm:w-full flex-shrink-0 p-5 sm:p-3 flex flex-col sm:space-y-3 items-center w-full justify-around"
        >
          <div
            onClick={() => {
              setC(x);
              getCategories(x.cardId);
              setCardId(x.cardId);
              setInformation("category");
            }}
            className="bg-zinc-800 p-3 rounded-3xl"
          >
            <div className="flex flex-col justify-center items-center space-x-3">
              <div className="flex space-x-3">
                <Icons icon="IconMenuOrder" />
                <H1>Categoria</H1>
              </div>

              {x.private && (
                <div className="dark:bg-green-900 rounded-xl flex justify-center px-2">
                  <P color="text-white">Privado</P>
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => {
              setC(x);
              set(x.cardId);
              setCard(x);
              getCategories(x.cardId);
              setCardId(x.cardId);
              setInformation("product");
            }}
            className="bg-zinc-800 p-3 rounded-3xl"
          >
            <div className="flex flex-col justify-center items-center space-x-3">
              <div className="flex space-x-3">
                <Icons icon="IconBrandProducthunt" />
                <H1>Productos</H1>
              </div>

              {x.private && (
                <div className="dark:bg-green-900 rounded-xl flex justify-center px-2">
                  <P color="text-white">Privado</P>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <ModalDownTrigger
        trigger={<Button center>Agregar usuario</Button>}
        title="Agregar usuario"
      >
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <Button onClick={handleAddUser} disabled={loading}>
            {loading ? "Agregando..." : "Agregar Usuario"}
          </Button>
          {error && <P color="text-red-500">Error: {error}</P>}
        </div>
      </ModalDownTrigger>
    </div>
  );
}

export default Cards;
