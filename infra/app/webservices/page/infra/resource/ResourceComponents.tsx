import { ButtonDelete } from "../../components/Page/Components";
import {
  Button,
  Container,
  H1,
  Icons,
  Input,
  Modal,
  ModalFooter,
  ModalIcon,
  ModalTrigger,
  NavLink,
  useModal,
} from "cllk";
import { useWSC } from "../../../hooks/useWebServicesComponents";
import { nanoid } from "nanoid";
import { useOrganization } from "@llampukaq/realm-organizations";
import { Organization } from "@/types/types";
import { useForm } from "react-hook-form";
import useCards from "@/infra/products/hooks/useCards";

export function ResourceComponents({
  handleResourceClick,
}: {
  handleResourceClick: any;
}) {
  const { components, createComponent, setComponent, deleteComponent } =
    useWSC();

  const { organization } = useOrganization<Organization>();
  const modalDeleteResource = useModal();
  const { register, handleSubmit, reset } = useForm();

  const m = async (e: { name: string } | any) => {
    const data = {
      organizationId: "nutrillacta",
      componentId: nanoid(11),
      title: e.name,
    };

    await createComponent(data);
  };

  return (
    <>
      {components?.map((resource, index) => (
        <Container
          p="p-5"
          key={index}
          bordered
          className="flex justify-between items-center"
        >
          <div
            onClick={() => {
              handleResourceClick("component", resource);
            }}
          >
            <H1>{resource.title.es}</H1>
          </div>
          <ButtonDelete
            deleteFn={() => {
              setComponent(resource);
              modalDeleteResource.open();
            }}
          />
        </Container>
      ))}
      <div className="flex justify-center">
        <ModalTrigger
          trigger={
            <Button center icon={<Icons icon="IconPlus" />}>
              Añadir
            </Button>
          }
          title="Crear Componente"
        >
          {(modal) => {
            return (
              <form
                onSubmit={(e) => {
                  handleSubmit(m)(e);
                  reset();
                  modal.close();
                }}
              >
                <Input
                  required
                  register={register}
                  name="name"
                  type="text"
                  label="Nombre"
                />
                <ModalFooter type="submit" modal={modal}>
                  Crear
                </ModalFooter>
              </form>
            );
          }}
        </ModalTrigger>
      </div>

      <Modal title="Eliminar Componente" modal={modalDeleteResource}>
        {(modal) => {
          return (
            <>
              <ModalIcon icons="IconTrash" />
              <ModalFooter
                onClick={async () => {
                  await deleteComponent();
                  modalDeleteResource.close();
                }}
                modal={modalDeleteResource}
              >
                Eliminar
              </ModalFooter>
            </>
          );
        }}
      </Modal>
    </>
  );
}

export function ResourceProducts() {
  const { cards } = useCards();
  return (
    <>
      {cards?.map((resource, index) => (
        <Container
          p="p-5"
          bordered
          key={index}
          className="flex justify-between items-center"
        >
          <div>
            {/* @ts-ignore */}
            <H1 position="text-left">{resource.title.es}</H1>
          </div>
        </Container>
      ))}
      <NavLink href="/organization/products">
        <Button center>Modificar</Button>
      </NavLink>
    </>
  );
}
