import {
  Button,
  FilesImg,
  Input,
  modal,
  ModalDownTrigger,
  ModalFooter,
  useUploadImages,
} from "cllk";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCategories } from "../../hooks/useCategories";

const ModalCreateCategory = ({ modal }: { modal: modal }) => {
  const { createdCategory } = useCategories();
  const { register, handleSubmit, reset } = useForm();
  const [img, setImg] = useState<any>();

  const { uploadImages } = useUploadImages();
  return (
    <form
      onSubmit={(e) => {
        handleSubmit((e) => {
          createdCategory({ title: e.title, img });
        })(e);
        reset();
        modal.close();
      }}
      className="space-y-5"
    >
      <ModalDownTrigger
        title="Actualizar imagen"
        trigger={
          <Button type="button" center>
            Actualizar imagen
          </Button>
        }
      >
        {(modalre) => (
          <FilesImg
            multiple
            onClick={async (e) => {
              //@ts-ignore
              const res = await uploadImages(e.target.files);
              setImg(res);
              modalre.close();
            }}
          />
        )}
      </ModalDownTrigger>
      <Input required name="title" register={register} label="Nombre" />
      <ModalFooter modal={modal}>Crear</ModalFooter>
    </form>
  );
};

export default ModalCreateCategory;
