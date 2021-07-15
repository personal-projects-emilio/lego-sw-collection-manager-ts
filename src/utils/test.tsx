import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { RootState, initStore } from "store";
import { BrowserRouter } from "react-router-dom";

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
      <Provider store={initStore(extendedRenderOptions?.preloadedState)}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...extendedRenderOptions });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
