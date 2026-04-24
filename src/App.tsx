import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <AppRouter />
  );
}