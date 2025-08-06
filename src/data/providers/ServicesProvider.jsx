"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Services from "../api/mock";
import { toast } from "react-toastify";

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [stateServices, setStateServices] = useState(false);

  const getProducts = async () => {
    const products = await Services.getProducts();
    return products;
  };

  const values = {
    stateServices,
    getProducts,
  };

  useEffect(() => {
    setStateServices(true);
  }, []);
  return (
    <ServicesContext.Provider value={values}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => useContext(ServicesContext);

export { ServicesProvider, useServices };
