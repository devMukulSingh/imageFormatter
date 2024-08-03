"use client";
import { store } from "@/app/redux/store";
// import { persistor, store } from "@/app/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const PersistProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
};

export default PersistProvider;
