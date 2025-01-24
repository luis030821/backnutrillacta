import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

function useScannerHardware() {
  const [barcode, setBarcode] = useState("");
  const bar = useDebounce(barcode, 1000);
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setBarcode("");
      } else {
        setBarcode((prevBarcode) => prevBarcode + event.key);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return {
    barcode: bar,
    resetBarcode: () => {
      setBarcode("");
    },
  };
}

export default useScannerHardware;
