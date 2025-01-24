import { useAddressOrganization } from "@/backend/useAddressOrganization";
import ModalAddOrgAddress from "@/infra/organization/components/ModalAddOrgAddress";
import {
  Button,
  Collapse,
  DataStyle,
  Icons,
  ModalDownTrigger,
  ModalFooter,
  Text,
} from "cllk";
import React from "react";

function DropAddress() {
  const { deleteAddress, address } = useAddressOrganization();

  return (
    <div className="space-y-3">
      <div className="space-y-3">
        {address?.map((address, index) => (
          <Collapse
            subtitle={`${address.addressId}`}
            full
            key={index}
            title={`${address.title} ${
              address.isMatriz ? "Matriz" : "Sucursal"
            }`}
          >
            <div className="rounded-xl p-5" key={index}>
              <DataStyle title="Nombre">{address.title}</DataStyle>
              <DataStyle title="Calle principal">
                {address.addressStreet}
              </DataStyle>
              <DataStyle title="Información adicional">
                {address.addressAdditional}
              </DataStyle>

              <DataStyle title="Calle secundaria">
                {address.address_line2}
              </DataStyle>
              <DataStyle title="Email">{address.email}</DataStyle>

              <DataStyle title="Telefono/Celular">{address.phone}</DataStyle>
              <DataStyle title="Pais">{address.country}</DataStyle>
              <DataStyle title="Ciudad">{address.city}</DataStyle>
              <DataStyle title="Instrucciones de retiro">
                {address.instructions}
              </DataStyle>
              <DataStyle title="Preguntar por?">{address.name}</DataStyle>
            </div>
            <div className="flex justify-around">
              <ModalDownTrigger
                title={`Eliminar ${address.title} ${
                  address.isMatriz ? "Matriz" : "Sucursal"
                }`}
                trigger={
                  <Button icon={<Icons icon="IconTrash" />} center>
                    Eliminar
                  </Button>
                }
              >
                {(modal) => (
                  <>
                    <Text className="text-white/70" type="BodyMd">
                      Tenga en cuenta que al eliminar la dirección se borrarán
                      todos los datos asociados a ella, incluyendo el
                      inventario, los datos de facturación y toda la información
                      relacionada con la empresa. Además, no existe manera de
                      recuperar estos datos.
                    </Text>
                    <div className="flex justify-center">
                      <Icons
                        className="stroke-white text-white"
                        icon="IconTrashFilled"
                        size={160}
                      />
                    </div>
                    <ModalFooter
                      onClick={async () => {
                        modal.close();
                        await deleteAddress(address.addressId);
                      }}
                      modal={modal}
                    >
                      Eliminar
                    </ModalFooter>
                  </>
                )}
              </ModalDownTrigger>
              <ModalDownTrigger
                title="Actualizar dirección"
                trigger={
                  <Button icon={<Icons icon="IconPencilPlus"></Icons>} center>
                    Actualizar
                  </Button>
                }
              >
                {(modal) => (
                  <ModalAddOrgAddress
                    create={false}
                    modal={modal}
                    data={address}
                  />
                )}
              </ModalDownTrigger>
            </div>
          </Collapse>
        ))}
      </div>

      <ModalDownTrigger
        title="Agregar dirección"
        trigger={
          <Button center icon={<Icons icon="IconMapPinPlus" />}>
            Agregar dirección
          </Button>
        }
      >
        {(modal) => <ModalAddOrgAddress create modal={modal} />}
      </ModalDownTrigger>
    </div>
  );
}

export default DropAddress;
