import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import AuthGuard from './components/AuthGuard/AuthGuard';
import RoleGuard from './components/RoleGuard/RoleGuard';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import RoleBasedRedirect from './components/RoleBasedRedirect/RoleBasedRedirect';
import RecuperarClave from './components/Login/RecuperarClave';
import Registrarse from './components/Login/Registrarse';

// Usuarios
import UsuariosList from './components/Usuarios/UsuariosList';
import UsuarioCreate from './components/Usuarios/UsuarioCreate';
import UsuarioEdit from './components/Usuarios/UsuarioEdit';

// Roles
import RolesList from './components/Roles/RolesList';
import RolCreate from './components/Roles/RolCreate';
import RolEdit from './components/Roles/RolEdit';

// Productos
import ProductosList from './components/Productos/ProductosList';
import ProductoCreate from './components/Productos/ProductoCreate';
import ProductoEdit from './components/Productos/ProductoEdit';

// Categorías
import CategoriasList from './components/Categorias/CategoriasList';
import CategoriaCreate from './components/Categorias/CategoriaCreate';
import CategoriaEdit from './components/Categorias/CategoriaEdit';

// Proveedores
import ProveedoresList from './components/Proveedores/ProveedoresList';
import ProveedorCreate from './components/Proveedores/ProveedorCreate';
import ProveedorEdit from './components/Proveedores/ProveedorEdit';

// Ubicaciones
import UbicacionesList from './components/Ubicaciones/UbicacionesList';
import UbicacionCreate from './components/Ubicaciones/UbicacionCreate';
import UbicacionEdit from './components/Ubicaciones/UbicacionEdit';

// Inventario (Entidad principal - Auditoría automática)
import InventarioList from './components/Inventario/InventarioList';
import InventarioCreate from './components/Inventario/InventarioCreate';
import InventarioEdit from './components/Inventario/InventarioEdit';

// Movimientos (Solo lectura - Auditoría automática)
import MovimientosList from './components/Movimientos/MovimientosList';

// Órdenes de Compra
import OrdenesCompraList from './components/OrdenesCompra/OrdenesCompraList';
import OrdenCompraCreate from './components/OrdenesCompra/OrdenCompraCreate';
import OrdenCompraEdit from './components/OrdenesCompra/OrdenCompraEdit';

// Ajustes de Inventario (Solo lectura - Auditoría en tiempo real)
import AjustesInventarioList from './components/AjustesInventario/AjustesInventarioList';

// Módulo de Compras
import ComprasList from './components/Compras/ComprasList';
import Carrito from './components/Compras/Carrito';
import PedidosList from './components/Compras/PedidosList';

const NotFound = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>404 - Página no encontrada</h2>
    <p>La ruta a la que intentas acceder no existe.</p>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-clave" element={<RecuperarClave />} />
            <Route path="/registrarse" element={<Registrarse />} />

            {/* Ruta de redirección basada en roles */}
            <Route
              path="/sistema"
              element={
                <AuthGuard>
                  <RoleBasedRedirect />
                </AuthGuard>
              }
            />

            {/* Rutas principales del sistema */}
            <Route
              path="/sistema/*"
              element={
                <AuthGuard>
                  <Layout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      
                      {/* Rutas solo para ADMINISTRADOR */}
                      <Route path="usuarios" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <UsuariosList />
                        </RoleGuard>
                      } />
                      <Route path="usuarios/crear" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <UsuarioCreate />
                        </RoleGuard>
                      } />
                      <Route path="usuarios/:id/actualizar" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <UsuarioEdit />
                        </RoleGuard>
                      } />
                      
                      <Route path="roles" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <RolesList />
                        </RoleGuard>
                      } />
                      <Route path="roles/crear" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <RolCreate />
                        </RoleGuard>
                      } />
                      <Route path="roles/:id/actualizar" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <RolEdit />
                        </RoleGuard>
                      } />
                      
                      <Route path="productos" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <ProductosList />
                        </RoleGuard>
                      } />
                      <Route path="productos/crear" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <ProductoCreate />
                        </RoleGuard>
                      } />
                      <Route path="productos/:id/actualizar" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <ProductoEdit />
                        </RoleGuard>
                      } />
                      
                      <Route path="categorias" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <CategoriasList />
                        </RoleGuard>
                      } />
                      <Route path="categorias/crear" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <CategoriaCreate />
                        </RoleGuard>
                      } />
                      <Route path="categorias/:id/actualizar" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <CategoriaEdit />
                        </RoleGuard>
                      } />
                      
                      <Route path="proveedores" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <ProveedoresList />
                        </RoleGuard>
                      } />
                      <Route path="proveedores/crear" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <ProveedorCreate />
                        </RoleGuard>
                      } />
                      <Route path="proveedores/:id/actualizar" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <ProveedorEdit />
                        </RoleGuard>
                      } />

                      <Route path="ubicaciones" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <UbicacionesList />
                        </RoleGuard>
                      } />
                      <Route path="ubicaciones/crear" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <UbicacionCreate />
                        </RoleGuard>
                      } />
                      <Route path="ubicaciones/:id/actualizar" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <UbicacionEdit />
                        </RoleGuard>
                      } />
                      
                      <Route path="ordenes-compra" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <OrdenesCompraList />
                        </RoleGuard>
                      } />
                      <Route path="ordenes-compra/crear" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <OrdenCompraCreate />
                        </RoleGuard>
                      } />
                      <Route path="ordenes-compra/:id/actualizar" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR']}>
                          <OrdenCompraEdit />
                        </RoleGuard>
                      } />
                      
                      {/* Rutas para ADMINISTRADOR y FLORISTA */}
                      <Route path="inventario" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR', 'FLORISTA']}>
                          <InventarioList />
                        </RoleGuard>
                      } />
                      <Route path="inventario/crear" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR', 'FLORISTA']}>
                          <InventarioCreate />
                        </RoleGuard>
                      } />
                      <Route path="inventario/:id/actualizar" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR', 'FLORISTA']}>
                          <InventarioEdit />
                        </RoleGuard>
                      } />
                      
                      <Route path="movimientos" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR', 'FLORISTA']}>
                          <MovimientosList />
                        </RoleGuard>
                      } />
                      
                      <Route path="ajustes-inventario" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR', 'FLORISTA']}>
                          <AjustesInventarioList />
                        </RoleGuard>
                      } />
                      
                      {/* Rutas para ADMINISTRADOR, REPARTIDOR y FLORISTA */}
                      <Route path="pedidos" element={
                        <RoleGuard allowedRoles={['ADMINISTRADOR', 'REPARTIDOR', 'FLORISTA']}>
                          <PedidosList />
                        </RoleGuard>
                      } />
                      
                      {/* Rutas solo para USUARIO */}
                      <Route path="compras" element={
                        <RoleGuard allowedRoles={['USUARIO']}>
                          <ComprasList />
                        </RoleGuard>
                      } />
                      <Route path="carrito" element={
                        <RoleGuard allowedRoles={['USUARIO']}>
                          <Carrito />
                        </RoleGuard>
                      } />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </AuthGuard>
              }
            />

            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
