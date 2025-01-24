import { Button, Drop, H1, Icons } from "cllk";
import { ReactNode } from "react";

export const ContainerPanelLeft = ({
  onClick,
  title,
  children,
}: {
  onClick?: any;
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="rounded-xl dark:bg-zinc-800 bg-zin-100 p-2 space-y-3">
      <H1>{title}</H1>
      {children}
      <Button onClick={onClick} center icon={<Icons icon="IconPlus" />}>
        Añadir
      </Button>
    </div>
  );
};
export function ButtonDelete({ deleteFn }: { deleteFn?: any }) {
  return (
    <Drop.Container>
      <Drop.Trigger>
        <Button icon={<Icons icon="IconSettings" />}></Button>
      </Drop.Trigger>
      <Drop.Menu>
        <Drop.Item
          onClick={() => {
            deleteFn?.();
          }}
          icon={<Icons icon="IconTrash" />}
          key="delete"
        >
          Eliminar
        </Drop.Item>
      </Drop.Menu>
    </Drop.Container>
  );
}
export function ButtonSettings({
  deleteFn,
  updateFn,
  show,
}: {
  updateFn?: any;
  deleteFn?: any;
  show?: boolean;
}) {
  return (
    <Drop.Container>
      <Drop.Trigger>
        <Button icon={<Icons icon="IconSettings" />}></Button>
      </Drop.Trigger>
      <Drop.Menu>
        {show ? (
          <Drop.Item
            onClick={() => {
              updateFn?.();
            }}
            icon={<Icons icon="IconStatusChange" />}
            key="update"
          >
            Actualizar
          </Drop.Item>
        ) : (
          <></>
        )}
        <Drop.Item
          onClick={() => {
            deleteFn?.();
          }}
          icon={<Icons icon="IconTrash" />}
          withDivider={show}
        >
          Eliminar
        </Drop.Item>
      </Drop.Menu>
    </Drop.Container>
  );
}
export function ButtonSettingsPage({
  deleteFn,
  hourFn,
  updateFn,
}: {
  updateFn?: () => void;
  hourFn?: () => void;
  deleteFn?: () => void;
}) {
  return (
    <Drop.Container>
      <Drop.Trigger>
        <Button icon={<Icons icon="IconSettings" />}></Button>
      </Drop.Trigger>
      <Drop.Menu>
        <Drop.Item
          onClick={() => {
            hourFn?.();
          }}
          icon={<Icons icon="Icon24Hours" />}
          key="hour"
        >
          Horario
        </Drop.Item>
        <Drop.Item
          onClick={() => {
            updateFn?.();
          }}
          icon={<Icons icon="IconStatusChange" />}
          key="update"
        >
          Actualizar
        </Drop.Item>
        <Drop.Item
          onClick={() => {
            deleteFn?.();
          }}
          icon={<Icons icon="IconTrash" />}
          key="delete"
          withDivider
        >
          Eliminar
        </Drop.Item>
      </Drop.Menu>
    </Drop.Container>
  );
}
