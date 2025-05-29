import { useState } from 'react';
import axios from 'axios';
import logo from "../assets/logo.jpg";

export default function RegistrationInterface() {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    dui: '',
    correoElectronico: '',
    direccion: '',
    telefono: '',
    password: ''
  });
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

    try {
      const response = await axios.post('https://gaming-gear-tienda-online.onrender.com/api/register', {
        userType: 'customer',
        nombre: formData.nombre,
        edad: Number(formData.edad),
        dui: formData.dui,
        correoElectronico: formData.correoElectronico,
        direccion: formData.direccion,
        telefono: formData.telefono,
        password: formData.password
      });

      if (response.data.success) {
        setSuccess(response.data.message);
        // Redirect to dashboard or login
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error del servidor' + {err});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-black">
      <div className="w-2/5 flex flex-col items-center justify-center bg-black p-8">
        <img src={logo} alt="Gaming Clan Logo" className="w-24 h-24 mb-8" />
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
