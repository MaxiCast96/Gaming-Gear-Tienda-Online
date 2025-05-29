import React, { useState } from 'react';

const GamingGearConfig = () => {
  const [generalConfig, setGeneralConfig] = useState({
    logo: null,
    storeName: 'Gaming Gear',
    currency: 'USD - Dólar Estadounidense',
    taxRate: '0.18'
  });

  const [adminProfile, setAdminProfile] = useState({
    adminName: 'John Doe',
    email: 'admin@gaminggear.com',
    password: ''
  });

  const handleGeneralConfigChange = (field, value) => {
    setGeneralConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdminProfileChange = (field, value) => {
    setAdminProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleGeneralConfigChange('logo', file);
    }
  };

  const saveConfigurations = () => {
    console.log('Saving configurations:', { generalConfig, adminProfile });
    // Here you would typically send the data to your backend
  };

  const saveProfile = () => {
    console.log('Saving admin profile:', adminProfile);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-red-500 mb-8">
          Configuración - Gaming Gear
        </h1>

        {/* General Configuration Section */}
        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Configuración General</h2>
          
          <div className="space-y-4">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Logo de la tienda:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="w-full p-3 bg-gray-600 border border-gray-500 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
              />
            </div>

            {/* Store Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Nombre de la tienda:
              </label>
              <input
                type="text"
                value={generalConfig.storeName}
                onChange={(e) => handleGeneralConfigChange('storeName', e.target.value)}
                className="w-full p-3 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Moneda de la tienda:
              </label>
              <select
                value={generalConfig.currency}
                onChange={(e) => handleGeneralConfigChange('currency', e.target.value)}
                className="w-full p-3 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="USD - Dólar Estadounidense">USD - Dólar Estadounidense</option>
                <option value="EUR - Euro">EUR - Euro</option>
                <option value="MXN - Peso Mexicano">MXN - Peso Mexicano</option>
                <option value="COP - Peso Colombiano">COP - Peso Colombiano</option>
              </select>
            </div>

            {/* Tax Rate */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Tasa de impuesto:
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={generalConfig.taxRate}
                onChange={(e) => handleGeneralConfigChange('taxRate', e.target.value)}
                className="w-full p-3 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Save Configurations Button */}
          <button
            onClick={saveConfigurations}
            className="w-full mt-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition-colors duration-200"
          >
            Guardar Configuraciones
          </button>
        </div>

        {/* Admin Profile Section */}
        <div className="bg-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Perfil del Administrador</h2>
          
          <div className="space-y-4">
            {/* Admin Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Nombre del Administrador:
              </label>
              <input
                type="text"
                value={adminProfile.adminName}
                onChange={(e) => handleAdminProfileChange('adminName', e.target.value)}
                className="w-full p-3 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Correo Electrónico:
              </label>
              <input
                type="email"
                value={adminProfile.email}
                onChange={(e) => handleAdminProfileChange('email', e.target.value)}
                className="w-full p-3 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Contraseña:
              </label>
              <input
                type="password"
                value={adminProfile.password}
                onChange={(e) => handleAdminProfileChange('password', e.target.value)}
                placeholder="Ingrese una nueva contraseña"
                className="w-full p-3 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Save Profile Button */}
          <button
            onClick={saveProfile}
            className="w-full mt-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition-colors duration-200"
          >
            Guardar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamingGearConfig;