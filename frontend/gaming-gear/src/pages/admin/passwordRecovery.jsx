import React, { useState } from 'react';

const PasswordRecovery = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendCode = async () => {
    if (!formData.email) {
      alert('Por favor ingresa tu correo electrónico');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
      console.log('Código enviado a:', formData.email);
    }, 1000);
  };

  const handleVerifyCode = async () => {
    if (!formData.verificationCode) {
      alert('Por favor ingresa el código de verificación');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3);
      console.log('Código verificado:', formData.verificationCode);
    }, 1000);
  };

  const handleResetPassword = async () => {
    if (!formData.newPassword || !formData.confirmPassword) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Contraseña restablecida exitosamente');
      // Reset form
      setCurrentStep(1);
      setFormData({
        email: '',
        verificationCode: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-red-500 mb-2">
            Recuperación de Contraseña
          </h1>
          <p className="text-gray-300 text-sm">
            Ingresa los datos necesarios para restablecer tu contraseña.
          </p>
        </div>

        {/* Step 1: Email Input */}
        {currentStep === 1 && (
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Paso 1: Ingresa tu Correo Electrónico
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                className="w-full p-3 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleSendCode}
              disabled={isLoading}
              className="w-full py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-semibold rounded-md transition-colors duration-200"
            >
              {isLoading ? 'Enviando...' : 'Enviar Código'}
            </button>
          </div>
        )}

        {/* Step 2: Verification Code */}
        {currentStep === 2 && (
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Paso 2: Ingresar Código de Verificación
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Código de Verificación
              </label>
              <input
                type="text"
                value={formData.verificationCode}
                onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                placeholder="Ingresa el código que te enviamos"
                className="w-full p-3 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleVerifyCode}
              disabled={isLoading}
              className="w-full py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-semibold rounded-md transition-colors duration-200"
            >
              {isLoading ? 'Verificando...' : 'Verificar Código'}
            </button>
          </div>
        )}

        {/* Step 3: New Password */}
        {currentStep === 3 && (
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Paso 3: Establecer Nueva Contraseña
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  placeholder="Ingresa tu nueva contraseña"
                  className="w-full p-3 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirma tu nueva contraseña"
                  className="w-full p-3 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              onClick={handleResetPassword}
              disabled={isLoading}
              className="w-full py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-semibold rounded-md transition-colors duration-200"
            >
              {isLoading ? 'Restableciendo...' : 'Restablecer Contraseña'}
            </button>
          </div>
        )}

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setCurrentStep(1);
              setFormData({
                email: '',
                verificationCode: '',
                newPassword: '',
                confirmPassword: ''
              });
            }}
            className="text-red-400 hover:text-red-300 text-sm transition-colors duration-200"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;