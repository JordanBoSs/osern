"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts } from "@/data/api/mock";
import Services from "@/data/api/server";
import handleApiError from "@/utils/handleApiError";
import { toast } from "react-toastify";
import auth from "@/data/api/server/auth";
import { set } from "lodash";

const ServicesContext = createContext();

const setupCookie = (name, value, days) => {
  const expires = days
    ? new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
    : "";

  document.cookie = `${name}=${value}${
    expires ? `; expires=${expires}` : ""
  }; path=/; SameSite=Strict; Secure`;
};

export const ServicesProvider = ({ children }) => {
  const [stateServices, setStateServices] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito (con cantidad)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const found = prevCart.find((item) => item.id === product.id);
      if (found) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Quitar uno del producto
  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const found = prevCart.find((item) => item.id === product.id);
      if (found && found.quantity > 1) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      // Si solo hay uno, lo elimina del carrito
      return prevCart.filter((item) => item.id !== product.id);
    });
  };

  // Obtener cantidad de un producto
  const getProductQuantity = (productId) => {
    const found = cart.find((item) => item.id === productId);
    return found ? found.quantity : 0;
  };

  // Calcular total del carrito
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const register = (data) => {
    return Services.register(data)
      .then((data) => data)
      .catch((error) => {
        const message = handleApiError(error);
        toast.error(message);
        return false;
      });
  };

  const login = async (email, password) => {
    return Services.login(email, password)
      .then((res) => {
        setupCookie("token", res.accessToken);
        setupCookie("role", res.role);
        setToken(res.accessToken);
        setRole(res.role);
        return res;
      })
      .catch((error) => {
        const message = handleApiError(error);
        toast.error(message);
        return false;
      });
  };

  const getProducts = async () => {
    try {
      const products = await fetchProducts();
      return products;
    } catch (error) {
      toast.error("Error al cargar los productos");
      return [];
    }
  };

  const values = {
    stateServices,
    user,
    token,
    role,
    register,
    login,
    getProducts,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    getCartTotal,
    getProductQuantity,
  };

  useEffect(() => {
    const storedToken = auth.getToken();
    const storedRole = auth.getRole();
    if (storedToken && storedRole) {
      // verificar token con mi servicio
      const resultadoDeValidacionToken = true;
      if (resultadoDeValidacionToken) {
        setToken(storedToken);
        setRole(storedRole);
      } else {
        logout();
      }
    }
    setStateServices(true);
  }, []);
  return (
    <ServicesContext.Provider value={values}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => useContext(ServicesContext);
