"use client";
import { useState } from "react";
import { useServices } from "@/data/providers/ServicesProvider";
import { useRouter } from "next/navigation";

const PayPage = () => {
  const { cart, getCartTotal, setCart } = useServices();
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    metodoPago: "Tarjeta",
  });
  const [showResumen, setShowResumen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFinalizar = (e) => {
    e.preventDefault();
    setShowResumen(true);
  };

  const handleVolver = () => {
    setCart([]);
    router.push("/home");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Pago</h1>
        <p className="text-gray-500">Tu carrito está vacío.</p>
        <button
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleVolver}
        >
          Ir a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        Información de pago y envío
      </h1>
      {!showResumen ? (
        <form
          className="flex flex-col gap-6 bg-white border border-gray-200 rounded-xl shadow-lg p-8"
          onSubmit={handleFinalizar}
        >
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="nombre"
            >
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre completo"
              value={form.nombre}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="direccion"
            >
              Dirección de envío
            </label>
            <input
              type="text"
              name="direccion"
              id="direccion"
              placeholder="Dirección de envío"
              value={form.direccion}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="metodoPago"
            >
              Método de pago
            </label>
            <select
              name="metodoPago"
              id="metodoPago"
              value={form.metodoPago}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Tarjeta">Tarjeta de crédito/débito</option>
              <option value="PayPal">PayPal</option>
              <option value="OXXO">Pago en OXXO</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer mt-2"
          >
            Finalizar compra
          </button>
        </form>
      ) : (
        <div className="bg-gray-100 rounded-lg p-6 mt-6 shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Resumen de compra
          </h2>
          <p>
            <span className="font-semibold">Nombre:</span> {form.nombre}
          </p>
          <p>
            <span className="font-semibold">Dirección:</span> {form.direccion}
          </p>
          <p>
            <span className="font-semibold">Método de pago:</span>{" "}
            {form.metodoPago}
          </p>
          <div className="my-4">
            <h3 className="font-semibold mb-2">Productos:</h3>
            <ul className="list-disc list-inside">
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} x{item.quantity} - ${item.price * item.quantity}{" "}
                  MXN
                </li>
              ))}
            </ul>
          </div>
          <div className="text-xl font-bold text-blue-700 mb-4">
            Total: ${getCartTotal()} MXN
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleVolver}
          >
            Volver a la tienda
          </button>
        </div>
      )}
    </div>
  );
};

export default PayPage;
