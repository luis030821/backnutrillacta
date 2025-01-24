import { H1, ICONS, Icons, Input, modal } from "cllk";
import React, { useEffect, useState } from "react";
import { icons } from "./data";

function SelectIcon({
  onSelect,
  modal,
}: {
  onSelect: (s: ICONS | undefined) => void;
  modal: modal;
}) {
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState<string>();
  const [data, setData] = useState<string[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [filteredIcons, setFilteredIcons] = useState([]);
  const iconsPerPage = 100;
  useEffect(() => {
    //@ts-ignore
    onSelect?.(select);
  }, [select]);
  // Función para cargar más íconos
  const loadMoreIcons = () => {
    // Calcular el índice de inicio y fin para los íconos de la siguiente página
    const startIndex = (page - 1) * iconsPerPage;
    const endIndex = startIndex + iconsPerPage;

    // Obtener los íconos para la siguiente página
    const nextPageIcons = icons.slice(startIndex, endIndex);

    // Actualizar el estado de la página y agregar los nuevos íconos a los datos existentes
    setPage(page + 1);
    setData([...data, ...nextPageIcons]);
  };

  // Efecto para cargar íconos cuando el componente se monta
  useEffect(() => {
    loadMoreIcons();
  }, []);

  // Efecto para agregar el listener de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreIcons();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, data]);

  // Manejar cambios en el input de búsqueda
  const handleSearchChange = (event: any) => {
    const newSearchTerm = event.target.value;
    if (newSearchTerm == "") {
      setIsSearch(false);
    } else {
      setIsSearch(true);
      // Realizar la búsqueda o solicitud aquí con el término de búsqueda actual
      const newFilteredIcons = icons
        .filter((icon) =>
          icon.toLowerCase().includes(newSearchTerm.toLowerCase())
        )
        .slice(0, 20);
      //@ts-ignore
      setFilteredIcons(newFilteredIcons);
    }
  };

  return (
    <div>
      {modal.value ? (
        <>
          <Input label="Buscar icono" onChange={handleSearchChange} />
          <div className="flex flex-wrap gap-3">
            {isSearch
              ? filteredIcons.map((icon, index) => (
                  <div
                    className="w-[125px] flex flex-col justify-center items-center"
                    onClick={() => {
                      setSelect(icon);
                      modal.close();
                    }}
                  >
                    <Icons size={100} icon={icon} key={index} />
                    <H1>{eliminarIcon(icon)}</H1>
                  </div>
                ))
              : data.map((icon, index) => (
                  <div
                    className="w-[130px] flex flex-col justify-center items-center"
                    onClick={() => {
                      setSelect(icon);
                      modal.close();
                    }}
                  >
                    {/* @ts-ignore */}
                    <Icons size={100} icon={icon} key={index} />
                    <H1>{eliminarIcon(icon)}</H1>
                  </div>
                ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          {/* @ts-ignore */}
          <Icons size={60} icon={select} />
        </div>
      )}
    </div>
  );
}

export default SelectIcon;

function eliminarIcon(texto: string) {
  return texto.replace("Icon", "");
}
