import {
  Button,
  FilesImg,
  H1,
  Icons,
  Img,
  modal,
  ModalDownTrigger,
  P,
  useMessage,
  useUploadImages,
} from "cllk";
import React, { useCallback, useState } from "react";
import useCards from "./hooks/useCards";
import { useCategories } from "./hooks/useCategories";
import { useProducts } from "./hooks/useProducts";
import { useNutrillactaApi } from "@/hooks/useNutrillacta";

import { useImages } from "@/hooks/useImages";

function Cards({ setInformation }: any) {
  const { cards } = useCards();
  const { setCardId, getCategories, setCard: setC } = useCategories();
  const { setCardId: set, setCard } = useProducts();
  const { addUser, loading, error, users, deleteUser } = useNutrillactaApi();
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
            </div>
          </div>
        </div>
      ))}
      <ModalDownTrigger
        trigger={<Button center>Agregar imagenes</Button>}
        title="Agregar imagenes"
      >
        {(modal) => <Images modal={modal} />}
      </ModalDownTrigger>
      <ModalDownTrigger
        trigger={<Button center>Agregar usuario</Button>}
        title="Agregar usuario"
      >
        <div>
          {/* @ts-ignore */}
          {users?.map((x) => (
            <div className="flex justify-between items-center">
              <P>{x.name}</P>
              <div
                onClick={async () => {
                  await deleteUser(x.name);
                }}
              >
                <Icons className="stroke-white" icon="IconTrashFilled"></Icons>
              </div>
            </div>
          ))}
        </div>
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
const Images = ({ modal }: { modal: modal }) => {
  const { images, updateImages, setImages } = useImages();
  const [img, setImg] = useState<any>();
  const { uploadImages } = useUploadImages();
  const { messagePromise } = useMessage();
  return (
    <>
      <div className="flex gap-1">
        {images.map((img, index1) => (
          <div className="w-20 flex flex-col justify-center space-y-2 items-center stroke-white fill-white">
            <Img src={img}></Img>
            <div
              onClick={() => {
                setImages(images.filter((_, index) => index != index1));
              }}
            >
              <Icons icon="IconTrashFilled" />
            </div>
          </div>
        ))}
      </div>
      <FilesImg
        onClick={async (e) => {
          //@ts-ignore
          const res = await uploadImages(e.target.files);
          setImg(res);
        }}
      />
      {img != undefined && (
        <Button
          onClick={(async) => {
            messagePromise(
              async () => {
                modal.close();
                const isArray = Array.isArray(images);
                if (isArray) {
                  updateImages([...(images ?? []), img.src]);
                } else updateImages([img.src]);
              },
              {
                error: "error en imagen ",
                pending: "Cargando Imagen",
                success: "Imagen cargada",
              }
            );
          }}
        >
          Guardar
        </Button>
      )}
    </>
  );
};
