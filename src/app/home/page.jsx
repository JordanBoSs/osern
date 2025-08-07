"use client";
import { useServices } from "@/data/providers/ServicesProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const {
    getProducts,
    addToCart,
    removeFromCart,
    getCartTotal,
    cart,
    getProductQuantity,
  } = useServices();
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const loadProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-center text-6xl font-extrabold tracking-wide text-blue-600 mb-10 drop-shadow-lg">
        Osern
      </h1>
      <div className="mb-8 flex justify-end items-center gap-4">
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold shadow">
          Productos en carrito:{" "}
          {cart.reduce((acc, item) => acc + item.quantity, 0)} | Total: $
          {getCartTotal()} MXN
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
          onClick={() => router.push("/cart")}
        >
          Ver carrito
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
        {products.length > 0 &&
          products.map((product) => {
            const quantity = getProductQuantity(product.id);
            return (
              <div
                key={product.id}
                className="border border-gray-200 rounded-xl p-5 shadow-md flex flex-col items-center bg-white hover:scale-105 transition-transform"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm mb-2 text-center">
                  {product.description}
                </p>
                <p className="font-bold text-xl text-blue-700 mb-4">
                  ${product.price} MXN
                </p>
                {quantity === 0 ? (
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
                    onClick={() => addToCart(product)}
                  >
                    Agregar al carrito
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded transition-colors cursor-pointer"
                      onClick={() => removeFromCart(product)}
                    >
                      −
                    </button>
                    <span className="font-semibold text-lg">{quantity}</span>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded transition-colors cursor-pointer"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        {products.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No hay productos disponibles.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
