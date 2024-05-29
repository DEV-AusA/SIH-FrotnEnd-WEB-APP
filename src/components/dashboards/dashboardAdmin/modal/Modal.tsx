import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    address: "",
    location: "",
    email: "",
    news: "",
    phone: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? Number(value) : value,
    }));
  };
  const storedToken = localStorage.getItem("token");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/establishment/create`, formData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Información actualizada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        return Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error",
          text: error.response.data.message || error.message,
          showConfirmButton: false,
          timer: 5000,
        });
      });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg relative">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 rounded-[15px] w-full text-sih-blue outline-0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Coordenadas</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 rounded-[15px] w-full text-sih-blue outline-0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Correo electrónico</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded-[15px] w-full text-sih-blue outline-0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Teléfono</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded-[15px] w-full text-sih-blue outline-0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mensaje parroquial</label>
            <textarea
              name="news"
              value={formData.news}
              onChange={handleChange}
              className="border p-2 rounded-[15px] w-full text-sih-blue outline-0"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-sih-blue text-white py-2 px-4 rounded-[10px] hover:bg-sih-orange hover:text-sih-blue"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-[10px] ml-2 hover:bg-sih-red"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
