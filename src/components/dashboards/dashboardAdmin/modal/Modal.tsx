import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  const [establishmentData, setEstablishmentData] = useState({
    address: "",
    location: "",
    email: "",
    news: "",
    phone: 0,
  });

  const [formData, setFormData] = useState({
    address: "",
    location: "",
    email: "",
    news: "",
    phone: 0,
  });

  const [errors, setErrors] = useState({
    address: "",
    location: "",
    email: "",
    news: "",
    phone: "",
  });

  useEffect(() => {
    const getData = async () => {
      const storedToken = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/establishment`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const { address, location, email, news, phone } = response.data[0];
      setEstablishmentData({ address, location, email, news, phone });
    };
    getData();
  }, []);

  useEffect(() => {
    setFormData(establishmentData);
  }, [establishmentData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? Number(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {
      address: "",
      location: "",
      email: "",
      news: "",
      phone: "",
    };

    if (!formData.address) {
      formIsValid = false;
      newErrors.address = "La dirección es requerida.";
    }
    if (!formData.location) {
      formIsValid = false;
      newErrors.location = "La ubicación es requerida.";
    }
    if (!formData.email) {
      formIsValid = false;
      newErrors.email = "El correo electrónico es requerido.";
    }
    if (!formData.news) {
      formIsValid = false;
      newErrors.news = "El mensaje parroquial es requerido.";
    }
    if (!formData.phone) {
      formIsValid = false;
      newErrors.phone = "El teléfono es requerido.";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const storedToken = localStorage.getItem("token");
    const dataToSubmit = {
      ...formData,
      phone: Number(formData.phone),
    };

    axios
      .put(`${API_URL}/establishment/update`, dataToSubmit, {
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
        onClose();
      })
      .catch((error) => {
        Swal.fire({
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
      <div className="bg-white p-5 rounded-lg shadow-lg relative w-3/4 md:w-3/4 lg:w-2/5">
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
            {errors.address && (
              <span className="text-red-500">{errors.address}</span>
            )}
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
            {errors.location && (
              <span className="text-red-500">{errors.location}</span>
            )}
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
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
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
            {errors.phone && (
              <span className="text-red-500">{errors.phone}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mensaje parroquial</label>
            <textarea
              name="news"
              value={formData.news}
              onChange={handleChange}
              className="border p-2 rounded-[15px] w-full text-sih-blue outline-0"
            />
            {errors.news && <span className="text-red-500">{errors.news}</span>}
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
