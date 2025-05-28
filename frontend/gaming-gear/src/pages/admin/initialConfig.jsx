import { useState } from "react";

export default function InitialSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    adminName: "Juan Pérez",
    adminEmail: "admin@correo.com",
    adminPassword: "••••••",
    storeName: "Mi Gaming Gear",
    storeEmail: "ventas@correo.com",
    storePhone: "+1 234 567 890",
    currency: "USD - Dólar Estadounidense",
    taxRate: "18",
    paymentMethods: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    // Aquí iría la lógica para enviar el formulario completo
    console.log("Configuración completada", formData);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-red-400">Configuración Inicial - Gaming Gear</h1>
          <div className="text-gray-400 text-sm">
            <span>PARA SALIR DE LA PANTALLA COMPLETA, PRESIONA </span>
            <span className="bg-gray-600 px-2 py-1 rounded">F11</span>
          </div>
        </header>

        <div className="mb-4 text-gray-300">
          <p>Por favor, completa los siguientes pasos para configurar tu tienda.</p>
        </div>

        <div className="space-y-8">
          {/* Paso 1: Credenciales del Administrador */}
          <section className={`bg-gray-900 p-6 rounded-lg shadow-lg ${currentStep !== 1 && "opacity-70"}`}>
            <h2 className="text-xl font-semibold mb-4">Paso 1: Credenciales del Administrador</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Nombre del Administrador
                </label>
                <input
                  type="text"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Correo Electrónico del Administrador
                </label>
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                />
              </div>
            </div>

            {currentStep === 1 && (
              <button
                onClick={handleNextStep}
                className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Siguiente
              </button>
            )}
          </section>

          {/* Paso 2: Información Básica */}
          <section className={`bg-gray-900 p-6 rounded-lg shadow-lg ${currentStep !== 2 && "opacity-70"}`}>
            <h2 className="text-xl font-semibold mb-4">Paso 2: Información Básica</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Nombre de la Tienda
                </label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Correo Electrónico de la Tienda
                </label>
                <input
                  type="email"
                  name="storeEmail"
                  value={formData.storeEmail}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Teléfono de Contacto
                </label>
                <input
                  type="text"
                  name="storePhone"
                  value={formData.storePhone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                />
              </div>
            </div>

            {currentStep === 2 && (
              <button
                onClick={handleNextStep}
                className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Siguiente
              </button>
            )}
          </section>

          {/* Paso 3: Configuración de Moneda y Impuestos */}
          <section className={`bg-gray-900 p-6 rounded-lg shadow-lg ${currentStep !== 3 && "opacity-70"}`}>
            <h2 className="text-xl font-semibold mb-4">Paso 3: Configuración de Moneda y Impuestos</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Moneda
                </label>
                <input
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Tasa de Impuesto (%)
                </label>
                <input
                  type="text"
                  name="taxRate"
                  value={formData.taxRate}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                />
              </div>
            </div>

            {currentStep === 3 && (
              <button
                onClick={handleNextStep}
                className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Siguiente
              </button>
            )}
          </section>

          {/* Paso 4: Métodos de Pago */}
          <section className={`bg-gray-900 p-6 rounded-lg shadow-lg ${currentStep !== 4 && "opacity-70"}`}>
            <h2 className="text-xl font-semibold mb-4">Paso 4: Métodos de Pago</h2>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Selecciona los métodos de pago
              </label>
              <div className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white h-24">
                {/* Aquí iría un selector de métodos de pago */}
              </div>
            </div>

            {currentStep === 4 && (
              <button
                onClick={handleComplete}
                className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Completar Configuración
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}