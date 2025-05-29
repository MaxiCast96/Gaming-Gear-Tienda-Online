import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.jpg";

const NavAdmin = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userType, logout, user } = useAuth();
  const navigate = useNavigate();

  // Solo mostrar si es empleado
  if (userType !== 'employee') return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Gestión de Productos', path: '/admin/product-manage' },
    { label: 'Gestión de Usuarios', path: '/admin/user-manage' },
    { label: 'Gestión de Pedidos', path: '/admin/order-manage' },
    { label: 'Soporte al Cliente', path: '/admin/client-support' },
    { label: 'Panel de Notificaciones', path: '/admin/notifications' },
    { label: 'Configuración Tienda', path: '/admin/shop-config' }
  ];

  return (
    <header className="bg-black text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-10 w-10 rounded" />
        <span className="text-xl font-bold">Panel Administrativo.</span>
      </div>

      {/* Desktop links */}
      <nav className="hidden md:flex space-x-4">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `py-2 px-3 rounded ${isActive ? 'bg-gray-800' : 'hover:bg-gray-700'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User info and logout */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <User size={20} />
          <span className="text-sm">{user?.name || user?.email || 'Empleado'}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 hover:bg-gray-700 px-3 py-2 rounded"
          title="Cerrar Sesión"
        >
          <LogOut size={18} />
          <span className="text-sm">Salir</span>
        </button>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col space-y-1 p-4 z-50">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 px-3 rounded ${isActive ? 'bg-gray-800' : 'hover:bg-gray-700'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          
          {/* Mobile user info and logout */}
          <div className="border-t border-gray-700 pt-2 mt-2">
            <div className="flex items-center space-x-2 py-2 px-3">
              <User size={18} />
              <span className="text-sm">{user?.name || user?.email || 'Empleado'}</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded w-full text-left"
            >
              <LogOut size={18} />
              <span className="text-sm">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavAdmin;