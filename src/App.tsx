import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <div className="min-h-screen flex items-center justify-center">
            <p className="font-inter text-[24px] font-medium text-dark">
              Dashboard — próximamente
            </p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}