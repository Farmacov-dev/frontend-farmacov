// src/router/AppRouter.tsx
import { Route, Routes } from 'react-router-dom';
import { Analisis_Sintomas, Historial } from '../pages';
import Login from '../pages/Login';
import Catalog from '../pages/Catalog';
import Dashboard from '../pages/Dashboard';
import Comparison from '../pages/Comparison';
import ErrorPage from '../pages/ErrorPage';
import RolesPermisosPage from '../pages/admin/RolesPermisosPage';
import AdminRoute from './AdminRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import GestionDatosPage from '../pages/admin/GestionDatosPage';

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/error" element={<ErrorPage />} />

      {/* Rutas Privadas con layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/analisis_sintomas" element={<Analisis_Sintomas />} />
        <Route path="/comparacion" element={<Comparison />} />
        

        <Route
          path="/roles-permisos"
          element={
            <AdminRoute>
              <RolesPermisosPage />
            </AdminRoute>
          }
        />

        <Route
          path="/historial"
          element={
            <AdminRoute>
              <Historial />
            </AdminRoute>
          }
        />

        <Route
          path="/gestion-datos"
          element={
            <AdminRoute>
              <GestionDatosPage />
            </AdminRoute>
          }
        />


      </Route>
    </Routes>
  );
}