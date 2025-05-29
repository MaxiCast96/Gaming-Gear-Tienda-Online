import { useState, useEffect } from 'react';

// Componente Toast para notificaciones
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 
                  type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          ×
        </button>
      </div>
    </div>
  );
};

// Modal de confirmación
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function GestionUsuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, userId: null });
  
  // Estado para formulario
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    dui: '',
    correoElectronico: '',
    direccion: '',
    telefono: '',
    password: '',
    rol: 'Cliente' // Para empleados
  });

  // Estado para determinar si estamos en modo cliente o empleado
  const [userType, setUserType] = useState('customers'); // 'customers' o 'employees'

  const API_BASE_URL = '/api'; // Ajusta según tu configuración

  // Mostrar toast
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Limpiar formulario
  const clearForm = () => {
    setFormData({
      nombre: '',
      edad: '',
      dui: '',
      correoElectronico: '',
      direccion: '',
      telefono: '',
      password: '',
      rol: 'Cliente'
    });
    setEditingUser(null);
  };

  // Obtener usuarios
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${userType}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      showToast(`Error al cargar ${userType === 'customers' ? 'clientes' : 'empleados'}: ${error.message}`, 'error');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Crear usuario
  const createUser = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${userType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      await fetchUsers();
      showToast(`${userType === 'customers' ? 'Cliente' : 'Empleado'} creado exitosamente`, 'success');
      clearForm();
    } catch (error) {
      showToast(`Error al crear ${userType === 'customers' ? 'cliente' : 'empleado'}: ${error.message}`, 'error');
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar usuario
  const updateUser = async (id, userData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${userType}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      await fetchUsers();
      showToast(`${userType === 'customers' ? 'Cliente' : 'Empleado'} actualizado exitosamente`, 'success');
      clearForm();
    } catch (error) {
      showToast(`Error al actualizar ${userType === 'customers' ? 'cliente' : 'empleado'}: ${error.message}`, 'error');
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${userType}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      await fetchUsers();
      showToast(`${userType === 'customers' ? 'Cliente' : 'Empleado'} eliminado exitosamente`, 'success');
    } catch (error) {
      showToast(`Error al eliminar ${userType === 'customers' ? 'cliente' : 'empleado'}: ${error.message}`, 'error');
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuarios al montar el componente o cambiar tipo
  useEffect(() => {
    fetchUsers();
  }, [userType]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    // Validación básica
    if (!formData.nombre || !formData.correoElectronico || !formData.telefono) {
      showToast('Por favor completa todos los campos requeridos', 'error');
      return;
    }

    // Validar email
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.correoElectronico)) {
      showToast('Por favor ingresa un correo electrónico válido', 'error');
      return;
    }

    // Validar contraseña si es un nuevo usuario
    if (!editingUser && (!formData.password || formData.password.length < 6)) {
      showToast('La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    // Preparar datos según el tipo de usuario
    const userData = { ...formData };
    if (userType === 'customers') {
      delete userData.rol; // Los clientes no tienen rol
    }

    // Si estamos editando y no se cambió la contraseña, no la incluir
    if (editingUser && !formData.password) {
      delete userData.password;
    }

    if (editingUser) {
      updateUser(editingUser._id, userData);
    } else {
      createUser(userData);
    }
  };

  // Iniciar edición
  const startEdit = (user) => {
    setFormData({
      nombre: user.nombre || '',
      edad: user.edad || '',
      dui: user.dui || '',
      correoElectronico: user.correoElectronico || '',
      direccion: user.direccion || '',
      telefono: user.telefono || '',
      password: '', // No mostramos la contraseña existente
      rol: user.rol || 'Cliente'
    });
    setEditingUser(user);
  };

  // Confirmar eliminación
  const confirmDelete = (userId) => {
    setConfirmModal({ isOpen: true, userId });
  };

  const handleConfirmDelete = () => {
    if (confirmModal.userId) {
      deleteUser(confirmModal.userId);
    }
    setConfirmModal({ isOpen: false, userId: null });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, userId: null })}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar este ${userType === 'customers' ? 'cliente' : 'empleado'}? Esta acción no se puede deshacer.`}
      />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-red-500 mb-8">
          Gestión de {userType === 'customers' ? 'Clientes' : 'Empleados'} - Gaming Gear
        </h1>

        {/* Selector de tipo de usuario */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setUserType('customers');
                clearForm();
              }}
              className={`px-6 py-2 rounded-lg font-medium ${
                userType === 'customers'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Clientes
            </button>
            <button
              onClick={() => {
                setUserType('employees');
                clearForm();
              }}
              className={`px-6 py-2 rounded-lg font-medium ${
                userType === 'employees'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Empleados
            </button>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingUser ? 'Editar' : 'Agregar'} {userType === 'customers' ? 'Cliente' : 'Empleado'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Edad</label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="Edad"
                min="18"
                max="100"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">DUI</label>
              <input
                type="text"
                name="dui"
                value={formData.dui}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="12345678-9"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Correo Electrónico *</label>
              <input
                type="email"
                name="correoElectronico"
                value={formData.correoElectronico}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="1234-5678"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="Dirección completa"
              />
            </div>

            {userType === 'employees' && (
              <div>
                <label className="block mb-2 text-sm font-medium">Rol</label>
                <input
                  type="text"
                  name="rol"
                  value={formData.rol}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                  placeholder="Cargo del empleado"
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium">
                Contraseña {editingUser ? '(dejar vacío para no cambiar)' : '*'}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="Mínimo 6 caracteres"
                minLength="6"
              />
            </div>

            <div className="md:col-span-2 flex space-x-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Procesando...' : (editingUser ? 'Actualizar' : 'Agregar')}
              </button>
              
              {editingUser && (
                <button
                  onClick={clearForm}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Lista de usuarios */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">
              Lista de {userType === 'customers' ? 'Clientes' : 'Empleados'} ({users.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              <p className="mt-2 text-gray-400">Cargando...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No hay {userType === 'customers' ? 'clientes' : 'empleados'} registrados
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-4 text-left font-medium">Nombre</th>
                    <th className="p-4 text-left font-medium">Correo</th>
                    <th className="p-4 text-left font-medium">Teléfono</th>
                    {userType === 'employees' && (
                      <th className="p-4 text-left font-medium">Rol</th>
                    )}
                    <th className="p-4 text-left font-medium">Estado</th>
                    <th className="p-4 text-left font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{user.nombre}</div>
                          {user.edad && (
                            <div className="text-sm text-gray-400">{user.edad} años</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-gray-300">{user.correoElectronico}</td>
                      <td className="p-4 text-gray-300">{user.telefono}</td>
                      {userType === 'employees' && (
                        <td className="p-4 text-gray-300">{user.rol}</td>
                      )}
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEdit(user)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => confirmDelete(user._id)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}