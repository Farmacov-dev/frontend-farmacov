import { Route, Routes } from 'react-router-dom';
import { Analisis_Sintomas } from '../pages';
import Login from '../pages/Login';
import Catalog from '../pages/Catalog';
import Dashboard from '../pages/Dashboard';
import Comparison from '../pages/Comparison';
import ErrorPage from '../pages/ErrorPage';
import { Historial } from '../pages';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/analisis_sintomas" element={<Analisis_Sintomas />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/comparacion" element={<Comparison />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/historial" element={<Historial/>}/>
    </Routes>
  );
}
