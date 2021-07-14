import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store";
import { BrowserRouter } from "react-router-dom";

export interface WrapperProps {
  children: ReactElement;
}

const render = (
  ui: ReactElement,
  renderOptions?: RenderOptions,
  { route = "/" } = {}
) => {
  window.history.pushState({}, "Test page", route);
  const Wrapper: React.FC = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
