"use client";
import { useServices } from "@/data/providers/ServicesProvider";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    getCartTotal,
    getProductQuantity,
    setCart,
  } = useServices();
  const router = useRouter();

  const handleRemoveProduct = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-8 text-center">
        Carrito de compras
      </h1>
      <button
        className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors cursor-pointer"
        onClick={() => router.push("/home")}
      >
        ← Seguir comprando
      </button>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Tu carrito está vacío.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-6 mb-8">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-500 text-sm">{product.description}</p>
                  <p className="font-bold text-blue-700">
                    ${product.price} MXN
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded transition-colors cursor-pointer"
                    onClick={() => removeFromCart(product)}
                  >
                    −
                  </button>
                  <span className="font-semibold text-lg">
                    {product.quantity}
                  </span>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded transition-colors cursor-pointer"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                  <button
                    className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded transition-colors cursor-pointer"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
              onClick={handleClearCart}
            >
              Vaciar carrito
            </button>
            <div className="text-xl font-bold text-blue-700">
              Total a pagar: ${getCartTotal()} MXN
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
              onClick={() => router.push("/pay")}
            >
              Comprar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
