import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username: username,
        password: password,
      });
      console.log("Registro exitoso:", response.data);
      // Redirigir al usuario a la página de inicio de sesión
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar usuario:", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : "Error al registrar la cuenta.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/20 transform transition-all hover:scale-[1.02]">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Crear una cuenta
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre de usuario:
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirmar contraseña:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Registrarse
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex justify-center text-sm mt-4">
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;