import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [carrito, setCarrito] = useState([]);

  // Key personalizada por usuario
  const carritoKey = user && user.rol && user.rol.nombre === 'USUARIO' && user.id
    ? `carrito_${user.id}`
    : null;

  // Cargar carrito desde localStorage solo para USUARIO
  useEffect(() => {
    if (carritoKey) {
      const carritoGuardado = localStorage.getItem(carritoKey);
      if (carritoGuardado) {
        setCarrito(JSON.parse(carritoGuardado));
      } else {
        setCarrito([]);
      }
    } else {
      setCarrito([]);
    }
    // eslint-disable-next-line
  }, [carritoKey]);

  // Guardar carrito en localStorage solo para USUARIO
  useEffect(() => {
    if (carritoKey) {
      localStorage.setItem(carritoKey, JSON.stringify(carrito));
    }
    // eslint-disable-next-line
  }, [carrito, carritoKey]);

  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.producto_id === producto.id);
    
    if (itemExistente) {
      setCarrito(carrito.map(item => 
        item.producto_id === producto.id 
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, {
        producto_id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio || 0,
        cantidad: 1,
        imagen: producto.imagen
      }]);
    }
  };

  const quitarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.producto_id !== productoId));
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      quitarDelCarrito(productoId);
      return;
    }
    
    setCarrito(carrito.map(item => 
      item.producto_id === productoId 
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
    if (carritoKey) {
      localStorage.removeItem(carritoKey);
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (parseFloat(item.precio || 0) * item.cantidad), 0);
  };

  const obtenerCantidadTotal = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  const value = {
    carrito,
    agregarAlCarrito,
    quitarDelCarrito,
    actualizarCantidad,
    limpiarCarrito,
    calcularTotal,
    obtenerCantidadTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 