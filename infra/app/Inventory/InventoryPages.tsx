import {
  Button,
  DataStyle,
  Icons,
  modal,
  ModalDownTrigger,
  ModalFooter,
  Text,
  useBoolean,
} from "cllk";
import React, { useEffect, useState } from "react";
import PrintInventory from "./components/PrintInventory";
import { useInventory } from "./hooks/useInventory";
import { product, Variant } from "@/infra/products/hooks/useProducts";
import jsPDF from "jspdf";
import InventorySearch from "./components/InventorySearch";
import useScannerHardware from "@/hooks/useScannerHardware";
import useCart from "../Invoices/interfaceMac/hooks/useCart";
export interface Inventory {
  inventoryId: string;
  stock: string;
  min: number;
  max: number;
  productId: string;
  barcode: string;
  organizationId: string;
  priceProvider?: string;
}
function InventoryPages() {
  const { products, inventory } = useInventory();
  const [pro, setPro] = useState<product[] | undefined>(products);
  const [filter, setFilter] = useState<"all" | "inventory" | "without">("all");
  const min = useBoolean();
  const isHigh = useBoolean();
  return (
    <div className="py-5">
      <div className="dark:bg-zinc-800 w-11/12 mx-auto rounded-3xl p-5">
        <InventorySearch
          setPro={setPro}
          setFilter={setFilter}
          filter={filter}
        />
        <div className="my-2 flex justify-start space-x-3">
          <ModalDownTrigger
            title="Lista de compra"
            trigger={<Button>Generar lista de compra</Button>}
          >
            <div className="flex justify-around">
              <Button onClick={min.toggle}>Comprar minimos</Button>
              <Button onClick={isHigh.toggle}>Solo prioridad</Button>
              <DownloadPDFButton
                list={listFn({
                  high: true,
                  inventory,
                  min: min.value,
                  products: pro,
                })}
                listSecond={listFn({
                  high: false,
                  inventory,
                  min: min.value,
                  products: pro,
                })}
                high={isHigh.value}
              />
            </div>

            <Text type="BodySm">
              Compra minima {min.value ? "Activo" : "Inactivo"}
            </Text>
            <Text type="BodyLg(Medium)">Lista prioritaria</Text>
            <>
              {listFn({
                high: true,
                inventory,
                min: min.value,
                products: pro,
              }).map((list, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center space-x-5"
                >
                  <Text type="BodyMd">
                    {list.cant} {list.title} {list.name}
                  </Text>
                </div>
              ))}
            </>
            {!isHigh.value &&
              listFn({
                high: false,
                inventory,
                min: min.value,
                products: pro,
              }).length != 0 && (
                <>
                  <Text type="BodyLg(Medium)">Lista de segundo orden</Text>
                  {listFn({
                    high: false,
                    inventory,
                    min: min.value,
                    products: pro,
                  }).map((list, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center space-x-5"
                    >
                      <Text type="BodyMd">
                        {list.cant} {list.title} {list.name}
                      </Text>
                    </div>
                  ))}
                </>
              )}
          </ModalDownTrigger>
          <ModalDownTrigger
            full
            trigger={<Button>Agregar Inventario</Button>}
            title="Agregar por Scanner"
          >
            {(modal) => <AddInventoryScanner modal={modal} />}
          </ModalDownTrigger>
        </div>
      </div>
      <div>
        {pro?.map((product, key) => (
          <div key={key} className="space-y-5 my-5">
            {product?.variants?.map((productVariant, index) => (
              <PrintInventory
                filter={filter}
                product={product}
                productVariant={productVariant}
                index={index}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InventoryPages;
const listFn = ({
  products,
  high,
  min,
  inventory,
}: {
  products: product[] | undefined;
  min: boolean;
  high: boolean;
  inventory: Inventory[] | undefined;
}) => {
  const res = [] as Array<product & Variant & { cant: number }>;
  inventory?.map((singleInventory) => {
    const index =
      singleInventory.productId[singleInventory.productId.length - 1];
    const productId = singleInventory.productId.slice(0, -1);
    const findProduct = products?.find((x) => x.productId == productId);
    const findVariant = findProduct?.variants.find(
      (_, indexq) => indexq == parseInt(index)
    );
    const maxInvetory = Number(singleInventory?.max);
    const minInventory = Number(singleInventory?.min);
    const stockInventory = Number(singleInventory.stock);
    const generateList = maxInvetory - stockInventory;
    const generateMin =
      minInventory > stockInventory ? minInventory - stockInventory : -1;
    const isHigh = minInventory > stockInventory;
    if (!isNaN(generateList)) {
      if (isHigh && high) {
        if (min) {
          if (generateMin > 0) {
            //@ts-ignore
            res.push({ ...findProduct, ...findVariant, cant: generateMin });
          }
        }
        if (!min) {
          //@ts-ignore
          res.push({ ...findProduct, ...findVariant, cant: generateList });
        }
      }
      if (!isHigh && !high) {
        if (min) {
          if (generateMin > 0) {
            //@ts-ignore
            res.push({ ...findProduct, ...findVariant, cant: generateMin });
          }
        }
        if (!min) {
          //@ts-ignore
          res.push({ ...findProduct, ...findVariant, cant: generateList });
        }
      }
    }
  });
  return res;
};

const DownloadPDFButton = ({
  high,
  list,
  listSecond,
}: {
  high: boolean;
  list: (product &
    Variant & {
      cant: number;
    })[];
  listSecond: (product &
    Variant & {
      cant: number;
    })[];
}) => {
  const generatePDFList = (
    doc: jsPDF,
    title: string,
    startY: number,
    list: any[]
  ) => {
    doc.text(title, 10, startY); // Título de la lista en el PDF
    let y = startY + 10; // Iniciar en la posición Y después del título
    list?.forEach((product, key) => {
      const text = `${product.cant} ${product.title} - ${product.name}`;
      doc.text(text, 10, y); // Agregar el texto del producto
      y += 10; // Incrementar la posición Y para la siguiente línea
    });
    return y;
  };
  // Función para manejar la descarga del PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    // Generar lista prioritaria (filter = true)
    let currentY = generatePDFList(doc, "Lista Prioritaria", 20, list);
    // Añadir espacio para la lista de segundo orden
    if (currentY > 270) {
      doc.addPage(); // Añadir nueva página si no hay suficiente espacio
      currentY = 20; // Reiniciar la posición Y para la nueva página
    } else {
      currentY += 20; // Añadir espacio antes de la segunda lista
    }
    if (!high && listSecond.length != 0) {
      // Generar lista de segundo orden (filter = false)
      generatePDFList(doc, "Lista de Segundo Orden", currentY, listSecond);
    }
    doc.save("lista_de_compra.pdf");
  };

  return (
    <Button onClick={handleDownloadPDF}>Descargar Lista de Compra (PDF)</Button>
  );
};
const AddInventoryScanner = ({ modal }: { modal: modal }) => {
  const { addCart, removeCartItem, shop } = useCart();
  const { inventory, products, updateManyInventoryScanner } = useInventory();
  const { barcode, resetBarcode } = useScannerHardware();
  useEffect(() => {
    if (barcode != "") {
      const find = inventory?.find((x) => x.barcode == barcode);

      if (find != undefined) {
        addCart(`${find.productId}`);
        resetBarcode();
      }
    }
  }, [barcode]);

  return (
    <>
      {shop?.map((x, index) => (
        <PrintProduct
          inventory={inventory?.find((e) => e.productId == x.productId)}
          plus={() => {
            addCart(`${x.productId}`);
          }}
          min={() => {
            removeCartItem(`${x.productId}`);
          }}
          key={index}
          count={x.count}
          index={parseFloat(x.productId.charAt(x.productId.length - 1))}
          product={products?.find(
            (e) =>
              e.productId == x.productId.substring(0, x.productId.length - 1)
          )}
        />
      ))}
      <ModalFooter
        onClick={async () => {
          modal.close();
          await updateManyInventoryScanner(shop);
        }}
      >
        Actualizar
      </ModalFooter>
    </>
  );
};
const PrintProduct = ({
  count,
  product,
  index,
  min,
  plus,
  inventory,
}: {
  product: product | undefined;
  count: any;
  index: number;
  plus: any;
  min: any;
  inventory: Inventory | undefined;
}) => {
  const variant = product?.variants[index];
  console.log(inventory);
  return (
    <div className="dark:bg-zinc-800 bg-zinc-200 p-5 flex flex-col justify-center rounded-2xl space-y-1 relative overflow-hidden max-w-[400px]">
      <DataStyle title="Producto">
        {product?.title} {variant?.name}
      </DataStyle>

      <DataStyle title="Inventario actual">{inventory?.stock}</DataStyle>
      <DataStyle title="Agregar al stock">{count}</DataStyle>
      <DataStyle title="Stock nuevo">
        {Number(count) + Number(inventory?.stock)}
      </DataStyle>

      <div className="flex justify-center space-x-10">
        <div
          onClick={min}
          className="w-10 flex justify-center items-center aspect-video rounded-sm bg-red-500"
        >
          <Icons icon="IconMinus"></Icons>
        </div>
        <Text type="BodyMd(Medium)">{count}</Text>

        <div
          onClick={plus}
          className="w-10 flex justify-center items-center aspect-video rounded-sm bg-green-500"
        >
          <Icons icon="IconPlus" />
        </div>
      </div>

      <div
        onClick={min}
        className="absolute left-0 w-6/12 h-24 bg-transparent"
      ></div>
      <div
        onClick={plus}
        className="absolute right-0 w-6/12 h-24 bg-transparent"
      ></div>
    </div>
  );
};
