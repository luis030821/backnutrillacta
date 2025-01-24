import React, { useEffect, useState } from "react";
import { useOrganization } from "@llampukaq/realm-organizations";
import {
  Avatar,
  Button,
  Drop,
  FilesImg,
  ICONS,
  Icons,
  Input,
  Modal,
  ModalColor,
  ModalDownTrigger,
  ModalFooter,
  P,
  PrintSocialMedia,
  Text,
  modal,
  useChangeObj,
  useMessage,
  useModal,
  useObj,
  useUploadImages,
} from "cllk";
import { nanoid } from "nanoid";
import { useCollection } from "@llampukaq/realm";
import { Organization } from "@/types/types";
import Colorsbg from "@/components/Colorsbg";
import SelectIcon from "@/components/SelectIcon";
import useAddAsset from "@/backend/useAddAsset";

function SocialPages() {
  const { changeObj } = useChangeObj();
  const collection = useCollection("organization", "social");
  const [index, setIndex] = useState<number>();
  const { organization } = useOrganization<Organization>();
  const [background, setBackground] = useState("");
  const find = async () => {
    const exist = await collection?.findOne({
      organizationId: "nutrillacta",
    });
    if (exist != undefined) {
      setBackground(exist.bg);
      setNavs(exist.navs);
    }
  };
  useEffect(() => {
    find();
  }, []);
  const modal = useModal();
  const [navs, setNavs] = useState([
    { name: "Facebook", to: "", bg: "blue", icon: "IconBrandFacebook" },
  ]);
  const handleSave = async () => {
    const exist = await collection?.findOne({
      organizationId: "nutrillacta",
    });
    const dat = {
      organizationId: "nutrillacta",
      socialId: nanoid(10),
      navs,
      bg: background,
    };
    if (exist != undefined) {
      const data = changeObj(exist, dat);
      await collection?.findOneAndUpdate(
        {
          organizationId: "nutrillacta",
        },
        { $set: data }
      );
    } else {
      await collection?.insertOne(dat);
    }
  };
  const updateNavProperty = (index: any, property: any, value: any) => {
    const updatedNavs = [...navs];
    //@ts-ignore
    updatedNavs[index][property] = value;
    setNavs(updatedNavs);
  };
  const removeNav = (index: any) => {
    const updatedNavs = navs.filter((_, i) => i != index);
    const finalNavs = updatedNavs.length === 1 ? [] : updatedNavs;
    setNavs([...finalNavs]);
  };
  const [changes, setChanges] = useState<boolean>(false);
  const { messagePromise } = useMessage();
  const modalBusiness = useModal();
  const modalIcon = useModal();
  const modalColor = useModal();
  return (
    <div className="px-5">
      <div className="max-w-[800px] mx-auto space-y-5 my-5">
        <div className="dark:bg-zinc-800 bg-zinc-100 rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center">
          {!changes ? (
            <Text type="BodyMd(Medium)">No tienes cambios</Text>
          ) : (
            <P>Tienes cambios</P>
          )}
          <Button
            center
            onClick={() => {
              messagePromise(handleSave, {
                error: "Error en el guardado",
                pending: "Guardando información...",
                success: "Guardado exitoso",
              });
            }}
          >
            Publicar
          </Button>
        </div>
        <div className="dark:bg-zinc-800 bg-zinc-100 rounded-3xl p-5 md:p-10 flex flex-col sm:flex-row space-y-5 justify-between items-center space-x-5">
          <Text type="BodyMd">
            Recuerda que el nombre, descripción y fotografía son lo de la
            organización. Si no los tienes, actualízalos aquí.
          </Text>
          <Button center onClick={modalBusiness.open}>
            Actualizar la organización
          </Button>
        </div>
        {modalBusiness.value && (
          <UpdateOrganizationSocial modal={modalBusiness} />
        )}
        <div className="dark:bg-zinc-800 bg-zinc-100 rounded-3xl p-5 md:p-10 flex flex-col md:flex-row space-y-3 justify-between items-center">
          <Text type="BodyMd(Medium)">Configurar de fondo</Text>
          <Button onClick={modal.open}>Cambiar</Button>
        </div>
        <div className="dark:bg-zinc-800 bg-zinc-100 rounded-3xl p-5 md:p-10 ">
          <div className="space-y-5">
            {navs.map((nav, index) => (
              <div
                key={index}
                className="items-center space-x-3 rounded-3xl dark:bg-zinc-900 bg-zinc-50 p-5 space-y-3 relative"
              >
                <div
                  className={`w-10 h-10 ${nav.bg} flex justify-center items-center rounded-full mx-auto`}
                >
                  <Icons icon={nav.icon as ICONS} />
                </div>
                <Input
                  label="Redes"
                  value={nav.name}
                  onChange={(e) =>
                    updateNavProperty(index, "name", e.target.value)
                  }
                />
                <Input
                  label="Link"
                  value={nav.to}
                  onChange={(e) =>
                    updateNavProperty(index, "to", e.target.value)
                  }
                />
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 justify-center md:space-x-10">
                  <Button
                    center
                    onClick={() => {
                      setIndex(index);
                      modalColor.open();
                    }}
                  >
                    Color
                  </Button>

                  <Button
                    center
                    onClick={() => {
                      setIndex(index);
                      modalIcon.open();
                    }}
                  >
                    Icon
                  </Button>
                </div>

                <div className="absolute top-0 right-5">
                  <Drop.Container>
                    <Drop.Trigger>
                      <Button secondary icon={<Icons icon="IconSettings" />} />
                    </Drop.Trigger>
                    <Drop.Menu>
                      <Drop.Section title="Eliminar">
                        <Drop.Item
                          onClick={() => {
                            removeNav(index);
                          }}
                          icon={<Icons icon="IconTrashFilled" />}
                        >
                          Eliminar
                        </Drop.Item>
                      </Drop.Section>
                    </Drop.Menu>
                  </Drop.Container>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => {
              setChanges(true);
              setNavs([...navs, { name: "", to: "", bg: "", icon: "" }]);
            }}
            center
            className="my-3"
          >
            Añadir
          </Button>
        </div>

        <Modal full modal={modalColor} title="Color">
          <ModalColor
            modal={modalColor}
            onChange={(e) => {
              updateNavProperty(index, "bg", e);
            }}
          />
        </Modal>
        <Modal title="Icon" modal={modalIcon} full>
          <SelectIcon
            modal={modalIcon}
            onSelect={(e) => {
              updateNavProperty(index, "icon", e);
            }}
          />
        </Modal>
      </div>
      <Modal full modal={modal} title="Colors">
        <Colorsbg
          modal={modal}
          onChange={(e: any) => {
            setBackground(e);
          }}
        />
      </Modal>
      <Text className="text-center" type="H2">
        Vista Previa
      </Text>
      <PrintSocialMedia
        data={{
          name: organization?.name,
          description: organization?.description,
          //@ts-ignore
          img: organization?.logo?.src,
          //@ts-ignore
          navs,
          bg: background,
        }}
      />
    </div>
  );
}

export default SocialPages;

export const UpdateOrganizationSocial = ({ modal }: { modal: modal }) => {
  const { organization, updateOrganization } = useOrganization<Organization>();
  const { isEmpty } = useObj();
  const { addAsset } = useAddAsset();
  const { uploadImages } = useUploadImages(addAsset);
  const [name, setName] = useState(organization?.name || "");
  const [description, setDescription] = useState<any>(
    organization?.description?.es
  );
  const [isChangeName, setIsChangeName] = useState(false);
  const [isChangeDescription, setIsChangeDescription] = useState(false);
  const handleNameChange = (newName: any) => {
    setName(newName);
    setIsChangeName(true);
  };
  const handleDescriptionChange = (newDescription: any) => {
    setDescription(newDescription);
    setIsChangeDescription(true);
  };
  const { message } = useMessage();
  const save = async () => {
    if (isChangeName || isChangeDescription) {
      const updatedData: any = {};

      if (isChangeName) {
        updatedData.name = name;
      }

      if (isChangeDescription) {
        updatedData.description = description;
      }

      if (!isEmpty(updatedData)) {
        await updateOrganization(updatedData);
        setIsChangeName(false);
        setIsChangeDescription(false);
      }

      if (isEmpty(updatedData)) {
        message({
          type: "warning",
          description: "No hay datos para actualizar",
        });
      }
    } else {
      message({
        type: "warning",
        description: "No hay datos para actualizar",
      });
    }
  };

  return (
    <>
      {organization?.logo != undefined ? (
        <div className="flex justify-center">
          <Avatar src={organization?.logo.src} />
        </div>
      ) : (
        <div className="flex justify-center">
          <Avatar icon={<Icons icon="IconUserOff" />} />
        </div>
      )}
      <ModalDownTrigger
        trigger={<Button center>Actualizar imagen</Button>}
        title="Actualizar imagen de empresa"
      >
        {(modal) => (
          <FilesImg
            onClick={async (e) => {
              //@ts-ignore
              const res = await uploadImages(e.target.files);
              if (res !== undefined) {
                await updateOrganization({ logo: res });
                modal.close();
              }
            }}
          />
        )}
      </ModalDownTrigger>

      <Input
        value={name}
        onChange={(e) => handleNameChange(e.target.value)}
        label="Nombre"
      />
      <Input
        //@ts-ignore
        value={description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
        label="Descripción"
      />
      <ModalFooter modal={modal} onClick={save}>
        Actualizar
      </ModalFooter>
    </>
  );
};
