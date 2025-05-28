import { useEffect, useState } from 'react';

export default function GestionUsuarios() {
  // Estado para controlar la vista en dispositivos móviles
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Estado para el nuevo usuario
  const [newUser, setNewUser] = useState({
    nombre: '',
    correoElectronico: '',
    rol: 'Administrador',
    dui: '', 
    telefono: '', 
    edad:''
  });
  
  // Lista de usuarios inicial
  const [users, setUsers] = useState([
  ]);
  const [editId, setEditId]=useState("")
  
  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };
  
  // Agregar un nuevo usuario
  /*const handleAddUser = () => {
    // Validación básica
    if (!newUser.nombre || !newUser.correoElectronico || !newUser.contrasena) {
      return;
    }
    setUsers([...users, userToAdd]);
    setNewUser({ nombre: '', correoElectronico: '', rol: 'Administrador', dui: '', telefono: '' });
  };*/
  


const url="http://localhost:4000/api/employees";

//funcion para guardar empleado
  const guardarEmpleado = async ()=>{
    console.log(newUser)
    
try {
  
    const solicitud = await fetch(url, {
      method:'POST', 
 headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })

    const respuesta = await solicitud.json();

    if(respuesta.message==="Empleado guardado")
    {
      alert("Empleado guardado")
      mostrarEmpleados()
    }
    else alert("Error al guardar")
} catch (error) {
  alert(error)
}
finally{
  setNewUser({ nombre: '', correoElectronico: '', rol: 'Administrador', dui: '', telefono: '', edad:'' });
}

  }

const mostrarEmpleados = async ()=>{

const peticion=await fetch(url);

const respuesta = await peticion.json();

if(!respuesta) {alert("no se pudo obtener") 
  return;}

  setUsers(respuesta)

}

useEffect(() => {
    mostrarEmpleados();
  }, []);
  
  // Eliminar un usuario
  const EliminarEmpleado = async (id) => {
   try {
     const peticion = await fetch(`${url}/${id}`, {
      method:'DELETE'
    })
    const respuesta = peticion.json();
     mostrarEmpleados();

    if (respuesta) alert("Empleado eliminado")
   } catch (error) {
    alert(error)
   }
  };

  const cargarInformacionActualizar=(user)=>{
    setEditId(user._id)    
    setNewUser({ nombre: user.nombre, correoElectronico: user.correoElectronico, rol: user.rol, dui: user.dui, telefono: user.telefono, edad: user.edad });
  }

  const actualizarEmpleado = async()=>
  {
 
try {
  
    const solicitud = await fetch(`${url}/${editId}`, {
      method:'PUT', 
 headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })

if (!solicitud.ok) {
  throw new Error("Error al actualizar el empleado");
}

    alert("Actualizado correctamente")
    mostrarEmpleados();
} catch (error) {
  alert(error)
}
finally{
  setEditId(null)
  setNewUser({ nombre: '', correoElectronico: '', rol: 'Administrador', dui: '', telefono: '', edad:'' });
}
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block md:w-64 bg-black`}>
        <div className="p-4">
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Dashboard</div>
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Gestión de Productos</div>
          <div className="py-2 px-4 bg-gray-800 rounded">Gestión de Usuarios</div>
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Gestión de Pedidos</div>
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Soporte al Cliente</div>
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Panel de Notificaciones</div>
          <div className="py-2 px-4 hover:bg-gray-800 rounded">Configuración</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Gaming Gear Admin</h1>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-red-500 mb-8">Gestión de Usuarios - Gaming Gear</h1>
          
          {/* Add User Form */}
          <div className="bg-gray-800 p-6 rounded mb-8">
            <h2 className="text-xl font-bold mb-4">{editId ? "Actualizar usuario" : "Agregar Usuario"}</h2>
            <div>
              <div className="mb-4">
                <label className="block mb-2">Nombre del Usuario</label>
                <input
                  type="text"
                  name="nombre"
                  value={newUser.nombre}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  name="correoElectronico"
                  value={newUser.correoElectronico}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="ejemplo@correo.com"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Rol del Usuario</label>
                <input
                  type="text"
                  name="rol"
                  value={newUser.rol}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="Administrador"
                />
              </div>
                            <div className="mb-4">
                <label className="block mb-2">telefono del Usuario </label>
                <input
                  type="number"
                  name="telefono"
                  value={newUser.telefono}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="Administrador"
                />
              </div>

                            <div className="mb-4">
                <label className="block mb-2">dui del Usuario</label>
                <input
                  type="text"
                  name="dui"
                  value={newUser.dui}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="dui"
                />
              </div>

                                       <div className="mb-4">
                <label className="block mb-2">edad del Usuario</label>
                <input
                  type="number"
                  name="edad"
                  value={newUser.edad}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="edad"
                />
              </div>
              
              
              {/*<div className="mb-4">
                <label className="block mb-2">Contraseña</label>
                <input
                  type="password"
                  name="contrasena"
                  value={newUser.contrasena}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="******"
                />
              </div>*/}
              
              <button
                onClick={editId ? actualizarEmpleado : guardarEmpleado}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                {editId ? "Actualizar Empleado" : "Guardar Empleado"}
              </button>
            </div>
          </div>
          
          {/* Users List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-800 rounded">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-4 text-left">Nombre</th>
                    <th className="p-4 text-left">Correo Electrónico</th>
                    <th className="p-4 text-left">Rol</th>
                    <th className="p-4 text-left">telefono</th>
                    <th className="p-4 text-left">edad</th>
                    <th className="p-4 text-left">dui</th>
                    <th className="p-4 text-left">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-b border-gray-700">
                      <td className="p-4">{user?.nombre}</td>
                      <td className="p-4">{user?.correoElectronico}</td>
                      <td className="p-4">{user?.rol}</td>
                      <td className="p-4">{user?.telefono}</td>
                      <td className="p-4">{user?.edad}</td>
                      <td className="p-4">{user?.dui}</td>
                      <td className="p-4 flex space-x-2">
                        <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                        onClick={()=>cargarInformacionActualizar(user)}
                        >
                          Editar
                        </button>

                        <button 
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                          onClick={() => EliminarEmpleado(user._id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}