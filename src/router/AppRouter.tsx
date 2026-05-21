// src/router/AppRouter.tsx
import { Route, Routes } from 'react-router-dom';
import { Analisis_Sintomas } from '../pages';
import Login from '../pages/Login';
import Catalog from '../pages/Catalog';
import Dashboard from '../pages/Dashboard';
import Comparison from '../pages/Comparison';
import ErrorPage from '../pages/ErrorPage';
import RolesPermisosPage from '../pages/admin/RolesPermisosPage';
import AdminRoute from './AdminRoute';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas Públicas (No renderizan el Sidebar) */}
      <Route path="/" element={<Login />} />
      <Route path="/error" element={<ErrorPage />} />

      {/* Rutas Privadas (Heredan el DashboardLayout automáticamente) */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/analisis_sintomas" element={<Analisis_Sintomas />} />
        <Route path="/comparacion" element={<Comparison />} />
        
        {/* Ruta de Administrador (Protegida por tu AdminRoute) */}
        <Route 
          path="/roles-permisos" 
          element={
            <AdminRoute>
              <RolesPermisosPage />
            </AdminRoute>
          } 
        />
      </Route>
    </Routes>
  );
}