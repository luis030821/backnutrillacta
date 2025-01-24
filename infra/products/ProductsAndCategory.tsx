import React, { useState } from "react";
import Cards from "./Cards";
import Categories from "./Categories";
import Products, { ProductProviderSimple } from "./Products";
type Props = {};
function ProductsAndCategory({}: Props) {
  const [information, setInformation] = useState<"product" | "category">();

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-60 flex-shrink-0">
        <Cards setInformation={setInformation} />
      </div>
      <div className="w-full">
        {information == "category" && <Categories />}
        {information == "product" && (
          <ProductProviderSimple>
            <Products />
          </ProductProviderSimple>
        )}
      </div>
    </div>
  );
}

export default ProductsAndCategory;
