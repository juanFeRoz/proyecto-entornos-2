import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { XMarkIcon } from '@heroicons/react/24/solid'; // Importa el icono de la "x"

const LoginForm = ({ onClose }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (isRegistering && password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const url = isRegistering
        ? "http://localhost:8080/api/auth/register"
        : "http://localhost:8080/api/auth/login";
      const payload = { username: username, password: password };

      // ✅ Aquí se añade `withCredentials: true` para que se reciba la cookie JSESSIONID
      const response = await axios.post(url, payload, {
        withCredentials: true,
      });

      console.log(
        isRegistering ? "Registro exitoso:" : "Inicio de sesión exitoso:",
        response.data
      );

      if (isRegistering) {
        setIsRegistering(false); // Cambia a modo login tras registrarse
      } else {
        console.log("¡Inicio de sesión exitoso!");
        localStorage.setItem("loggedInUser", username);
        navigate("/");
        setIsVisible(false);
        if (onClose) onClose();
      }
    } catch (error) {
      console.error(
        isRegistering ? "Error al registrar usuario:" : "Error al iniciar sesión:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response?.data?.message ||
          (isRegistering ? "Error al registrar la cuenta." : "Credenciales incorrectas.")
      );
    }
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    setError("");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-lg relative"> {/* Añadido 'relative' para posicionar la 'x' */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}
        <h2 className="text-2xl font-bold mb-4">
          {isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña:</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña:</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <div className="flex justify-end">
            {!onClose && (
              <button
                type="button"
                className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100 mr-2"
              >
                Cancelar {/* Si no hay onClose prop, mostramos un "Cancelar" genérico */}
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isRegistering ? "Registrarse" : "Iniciar Sesión"}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={toggleAuthMode}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {isRegistering
              ? "¿Ya tienes una cuenta? Iniciar sesión"
              : "¿No tienes una cuenta? Regístrate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;