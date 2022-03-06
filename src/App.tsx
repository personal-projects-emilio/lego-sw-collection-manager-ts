import React, { useEffect } from "react";
import Header from "components/commons/Header";
import AppRoutes from "components/routes";
import { useAppDispatch } from "hooks";
import { tryAutoSignIn } from "store/auth";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tryAutoSignIn());
  }, [dispatch]);

  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
};

export default App;
