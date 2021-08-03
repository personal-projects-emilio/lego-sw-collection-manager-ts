import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { RootState, initStore } from "store";
import { BrowserRouter } from "react-router-dom";
import { MinifigsList } from "interfaces/minifigs";

export interface WrapperProps {
  children: ReactElement;
}
interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: Partial<RootState>;
  route?: string;
}

const render = (
  ui: ReactElement,
  extendedRenderOptions?: ExtendedRenderOptions
) => {
  window.history.pushState(
    {},
    "Test page",
    extendedRenderOptions?.route || "/"
  );

  const Wrapper: React.FC = ({ children }) => {
    return (
      <Provider
        store={initStore(
          extendedRenderOptions?.preloadedState || initialStoreMocked
        )}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...extendedRenderOptions });
};

export const initialStoreMocked: RootState = {
  minifigs: {
    list: null,
    tags: null,
    characNames: null,
    filters: {
      show: "all",
      tag: null,
      characName: null,
    },
    pagination: {
      total: 0,
      activePage: 0,
      nbPerPage: 50,
    },
  },
};

export const mockedMinifigsList: MinifigsList = [
  {
    characterName: "Battle Droid",
    id: "sw0001a",
    name: "Battle Droid Tan with Back Plate",
    possessed: true,
    tags: ["Battle Droid", "CIS", "Droid"],
  },
  {
    characterName: "Battle Droid",
    id: "sw0001b",
    name: "Battle Droid Tan without Back Plate",
    possessed: true,
    tags: ["Battle Droid", "CIS", "Droid"],
  },
  {
    characterName: "Boba Fett",
    id: "sw0002",
    name: "Boba Fett - Classic Grays",
    possessed: true,
    tags: ["Bounty Hunter", "Fett", "Mandalorian"],
  },
  {
    characterName: "Darth Maul",
    id: "sw0003",
    name: "Darth Maul",
    possessed: true,
    tags: ["CIS", "Sith", "Zabrak"],
  },
];

export const generateMockedMinifigsList = (length: number): MinifigsList =>
  Array.from({ length }, (_el, i) => ({
    id: `sw${i}`,
    characterName: `test${i}`,
    name: "test",
    possessed: Math.random() < 0.5,
    tags: [],
  }));

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
