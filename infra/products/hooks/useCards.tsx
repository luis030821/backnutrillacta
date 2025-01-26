import { createProviderFn, useMessage } from "cllk";

import { useEffect, useState } from "react";
export interface Card {
  title: { es: string; en: string } | string;
  cardId: string;
  organizationId: string;
  created: Date;
  private?: boolean;
}
function useCa() {
  const [cards, setCards] = useState<Card[]>([
    {
      title: "Productos",
      cardId: "8RMnKQNRyL",
      //@ts-ignore
      created: "2025-01-23T01:41:10.132Z",
      organizationId: "nutrillacta",
      name: "Productos",
      private: false,
    },
  ]);

  return { cards };
}

const [CarDProvider, useCards] = createProviderFn<typeof useCa>(useCa);
export { CarDProvider, useCards };

export default useCards;
