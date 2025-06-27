import { useState } from 'react';
import logo from "../assets/logo.jpg";

export default function RegistrationInterface() {
  const [step, setStep] = useState(1); // 1: formulario, 2: confirmación
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    dui: '',
    correoElectronico: '',
    direccion: '',
    telefono: '',
    password: ''
  });
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // LOG: Datos que se van a enviar
    console.log('=== INICIO DEL REGISTRO ===');
    console.log('Datos del formulario:', formData);
    console.log('URL de la API:', '/api/register');

    try {
      const requestBody = {
        userType: 'customer',
        nombre: formData.nombre,
        edad: Number(formData.edad),
        dui: formData.dui,
        correoElectronico: formData.correoElectronico,
        direccion: formData.direccion,
        telefono: formData.telefono,
        password: formData.password
      };

      // LOG: Cuerpo de la petición
      console.log('Cuerpo de la petición:', requestBody);

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      // LOG: Respuesta del servidor
      console.log('Respuesta del servidor - Status:', response.status);
      console.log('Respuesta del servidor - StatusText:', response.statusText);
      console.log('Headers de respuesta:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      
      // LOG: Datos de respuesta
      console.log('Datos de respuesta:', data);

      if (data.success) {
        console.log('✅ Registro exitoso, cambiando a paso 2');
        setSuccess('Código de confirmación enviado a tu correo');
        setStep(2);
      } else {
        console.log('❌ Error en el registro:', data.message);
        setError(data.message);
      }
    } catch (err) {
      // LOG: Error de red o parsing
      console.error('💥 Error en la petición:', err);
      console.error('Tipo de error:', err.name);
      console.error('Mensaje de error:', err.message);
      console.error('Stack trace:', err.stack);
      setError('Error del servidor: ' + err.message);
    } finally {
      setLoading(false);
      console.log('=== FIN DEL REGISTRO ===');
    }
  };

  const handleConfirmation = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // LOG: Confirmación
    console.log('=== INICIO DE CONFIRMACIÓN ===');
    console.log('Email:', formData.correoElectronico);
    console.log('Código ingresado:', confirmationCode);

    try {
      const requestBody = {
        correoElectronico: formData.correoElectronico,
        confirmationCode: confirmationCode
      };

      console.log('Cuerpo de confirmación:', requestBody);

      const response = await fetch('/api/confirm-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Respuesta confirmación - Status:', response.status);
      
      const data = await response.json();
      console.log('Datos de confirmación:', data);

      if (data.success) {
        console.log('✅ Confirmación exitosa');
        setSuccess('Registro confirmado exitosamente');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        console.log('❌ Error en confirmación:', data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error('💥 Error en confirmación:', err);
      setError('Código inválido o expirado: ' + err.message);
    } finally {
      setLoading(false);
      console.log('=== FIN DE CONFIRMACIÓN ===');
    }
  };

  const resendCode = async () => {
    setLoading(true);
    
    // LOG: Reenvío
    console.log('=== REENVÍO DE CÓDIGO ===');
    console.log('Email para reenvío:', formData.correoElectronico);
    
    try {
      const response = await fetch('/api/resend-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correoElectronico: formData.correoElectronico
        })
      });
      
      console.log('Respuesta reenvío - Status:', response.status);
      
      const data = await response.json();
      console.log('Datos de reenvío:', data);
      
      if (data.success) {
        console.log('✅ Código reenviado exitosamente');
        setSuccess('Código reenviado a tu correo');
      } else {
        console.log('❌ Error en reenvío:', data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error('💥 Error en reenvío:', err);
      setError('Error al reenviar el código: ' + err.message);
    } finally {
      setLoading(false);
      console.log('=== FIN DE REENVÍO ===');
    }
  };

  return (
    <div className="flex h-screen w-full bg-black">
      <div className="w-2/5 flex flex-col items-center justify-center bg-black p-8">
        <img src={logo} alt="Gaming Clan Logo" className="w-24 h-24 mb-8" />
        
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">Registro de Cliente</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-white text-sm mb-1">Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="edad" className="block text-white text-sm mb-1">Edad</label>
                <input
                  type="number"
                  id="edad"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="dui" className="block text-white text-sm mb-1">DUI</label>
                <input
                  type="text"
                  id="dui"
                  name="dui"
                  value={formData.dui}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="correoElectronico" className="block text-white text-sm mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  id="correoElectronico"
                  name="correoElectronico"
                  value={formData.correoElectronico}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="direccion" className="block text-white text-sm mb-1">Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-white text-sm mb-1">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-white text-sm mb-1">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full p-2 bg-red-600 text-white rounded shadow-md hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>

              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={() => window.location.href = '/login'}
                  className="text-red-500 text-sm hover:underline"
                >
                  ¿Ya tienes cuenta? Inicia Sesión
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">Confirmar Registro</h2>
            <div className="w-full max-w-md">
              <p className="text-white text-sm mb-4">
                Hemos enviado un código de confirmación a: <br />
                <span className="font-semibold">{formData.correoElectronico}</span>
              </p>
              
              <form onSubmit={handleConfirmation} className="space-y-4">
                <div>
                  <label htmlFor="confirmationCode" className="block text-white text-sm mb-1">
                    Código de Confirmación
                  </label>
                  <input
                    type="text"
                    id="confirmationCode"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    className="w-full p-2 rounded bg-white text-black text-center text-lg tracking-widest"
                    placeholder="000000"
                    maxLength="6"
                    required
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full p-2 bg-red-600 text-white rounded shadow-md hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Confirmando...' : 'Confirmar Registro'}
                </button>
              </form>

              <div className="text-center mt-4 space-y-2">
                <button
                  type="button"
                  onClick={resendCode}
                  disabled={loading}
                  className="text-red-500 text-sm hover:underline disabled:opacity-50"
                >
                  Reenviar código
                </button>
                <br />
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-white text-sm hover:underline"
                >
                  Volver al formulario
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-3/5 bg-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-900 bg-opacity-30 flex items-center justify-center">
          <img
            src="https://saportareport.com/wp-content/uploads/2025/01/pexels-lulizler-3165335-1.jpg"
            alt="Gaming Equipment"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}