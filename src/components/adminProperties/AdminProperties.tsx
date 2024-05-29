import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../UserProvider";
import { IProperty } from "@/helpers/types";
import Image from "next/image";
import expDto from "./helpers/helpers";
import Swal from "sweetalert2";

const GETPROPERTIES_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminProperties: React.FC = (): React.ReactElement => {
  const [search, setSearch] = useState("");
  const [searchOwner, setSearchOwner] = useState("");
  const [occupied, setOccupied] = useState(false);
  const [unoccupied, setUnoccupied] = useState(false);
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseData, setExpenseData] = useState({
    id: "",
    amount: 0,
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  const { setToken } = useUserContext();

  useEffect(() => {
    const fetchProperties = async () => {
      const storedToken = await localStorage.getItem("token");
      setToken(storedToken);

      const response = await axios.get(`${GETPROPERTIES_URL}/properties`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const sortedProperties = response.data.sort(
        (a: IProperty, b: IProperty) => a.number - b.number,
      );

      setProperties(sortedProperties);
    };

    fetchProperties();
  }, [setToken]);

  const handleUnoccupied = () => {
    setUnoccupied(!unoccupied);
    if (occupied) {
      setOccupied(!occupied);
    }
    setCurrentPage(1);
  };

  const handleOccupied = () => {
    setOccupied(!occupied);
    if (unoccupied) {
      setUnoccupied(!unoccupied);
    }
    setCurrentPage(1);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchBar = event.target.value;
    setSearch(searchBar);
    setCurrentPage(1);
  };

  const handleOwnerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchBar = event.target.value;
    setSearchOwner(searchBar);
    setCurrentPage(1);
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.number.toString().includes(search) &&
      (property.user?.name.toLowerCase().includes(searchOwner.toLowerCase()) ||
        property.user?.lastName
          .toLowerCase()
          .includes(searchOwner.toLowerCase())),
  );

  const unoccupiedProperties = properties.filter(
    (property) => property.user === null,
  );

  const occupiedProperties = properties.filter(
    (property) => property.user !== null,
  );

  const getPaginatedData = (data: IProperty[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = (totalItems: number) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === i ? "bg-sih-blue text-white" : "bg-gray-300"
          }`}
        >
          {i}
        </button>,
      );
    }

    return pages;
  };

  const displayProperties =
    search || searchOwner
      ? filteredProperties
      : unoccupied
        ? unoccupiedProperties
        : occupied
          ? occupiedProperties
          : properties;

  const paginatedProperties = getPaginatedData(displayProperties);

  const openModal = (propertyId: string) => {
    setExpenseData({ ...expenseData, id: propertyId });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setExpenseData({
      id: "",
      amount: 0,
      description: "",
    });
    setError(null);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "amount") {
      const amountValue = parseFloat(value);
      if (amountValue < 1) {
        setError("El monto debe ser mayor a 0");
      } else {
        setError(null);
      }
      setExpenseData({
        ...expenseData,
        [name]: amountValue,
      });
    } else {
      setExpenseData({
        ...expenseData,
        [name]: value,
      });
    }
  };

  const handleExp = async () => {
    if (expenseData.amount <= 1) {
      setError("El monto debe ser mayor a 1");
      return;
    }
    try {
      const storedToken = await localStorage.getItem("token");
      const expenseDataDTO = expDto(expenseData);
      await axios
        .post(`${GETPROPERTIES_URL}/expenses/createExpense`, expenseDataDTO, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "¡Gasto extraordinario creado correctamente!",
            showConfirmButton: true,
          });
        });
      closeModal();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al crear el gasto extraordinario",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <main>
      <div className="flex flex-col items-center pb-[5px]">
        <div className="flex max-[650px]:flex-col">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Buscar por número de casa..."
            className="text-black h-[40px] w-[256px] bg-white rounded-[15px] px-2 outline-0 m-[10px]"
          />
          <input
            onChange={handleOwnerChange}
            type="text"
            placeholder="Buscar por propietario..."
            className="text-black h-[40px] w-[256px] bg-white rounded-[15px] px-2 outline-0 m-[10px]"
          />
        </div>
        <div className="flex justify-center items-center mt-[5px]">
          <button
            onClick={handleOccupied}
            className={
              occupied
                ? "w-[120px] mx-[10px] bg-sih-orange text-sih-blue p-[6px] rounded-[10px] text-center"
                : "w-[120px] mx-[10px] bg-sih-blue p-[6px] rounded-[10px] text-center hover:bg-sih-orange hover:text-sih-blue"
            }
          >
            Ocupadas
          </button>
          <button
            onClick={handleUnoccupied}
            className={
              unoccupied
                ? "w-[120px] mx-[10px] bg-sih-orange text-sih-blue p-[6px] rounded-[10px] text-center"
                : "w-[120px] mx-[10px] bg-sih-blue p-[6px] rounded-[10px] text-center hover:bg-sih-orange hover:text-sih-blue"
            }
          >
            Desocupadas
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center px-[200px] max-2xl:px-[50px] max-md:px-[50px]">
        {paginatedProperties.length > 0 ? (
          paginatedProperties.map((property: IProperty) => (
            <div
              key={property.id}
              className="h-auto w-auto bg-white m-3 flex justify-center flex-col items-center rounded-[15px] mx-[8px] my-[30px] shadow-button text-sih-blue  max-[920px]:text-xs"
            >
              <Image
                className="w-[380px] h-[250px] rounded-t-[15px]  max-[920px]:w-[190px]  max-[920px]:h-[125px]"
                src={property.image}
                width={380}
                height={250}
                alt="Frente de la propiedad"
              />
              <span className="my-[2px] mt-[10px] max-[530px]:mt-[2px] max-[530px]:my-[1px]">
                <b>Número de casa:</b> {property.number}
              </span>
              <span className="my-[2px] max-[530px]:my-[1px]">
                <b>Dirección:</b> {property.address}
              </span>
              <span className="my-[2px] max-[530px]:my-[1px]">
                <b>Codigo de vivienda:</b> {property.code}
              </span>
              {property.user ? (
                <span className="my-[2px] max-[530px]:my-[1px]">
                  <b>Propietario: </b>
                  {property.user?.name} {property.user?.lastName}
                </span>
              ) : (
                <span className="text-sih-green mt-[38px] mb-[25px] max-[530px]:mt-[10px]">
                  <b>Desocupada</b>
                </span>
              )}
              {property.user ? (
                <button
                  onClick={() => openModal(property.id)}
                  className="bg-sih-blue text-white mt-[10px] mb-[15px] mx-[10px] py-[5px] w-[250px] text-center rounded-[10px] hover:bg-sih-orange hover:text-sih-blue  max-[920px]:w-[150px]  max-[920px]:text-xs"
                >
                  Gasto extraordinario
                </button>
              ) : null}
            </div>
          ))
        ) : (
          <div className="text-sih-blue text-xl  text-center px-8 max-md:text-[20px] my-[20px] mr-[45px]">
            {search || searchOwner
              ? "No se encontraron propiedades con ese criterio"
              : unoccupied
                ? "No hay propiedades desocupadas"
                : "Aún no hay propiedades registradas"}
          </div>
        )}
      </div>

      <div className="flex justify-center my-4">
        {renderPagination(displayProperties.length)}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl mb-4 text-sih-blue text-center">
              Nuevo gasto extraordinario
            </h2>
            <div className="mb-4">
              <label className="text-sih-blue" htmlFor="amount">
                Monto
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={expenseData.amount}
                onChange={handleInputChange}
                className="border p-2 rounded-[15px] w-full text-sih-blue outline-0"
                min="1"
              />
              {error && <span className="text-red-500">{error}</span>}
            </div>
            <div className="mb-4">
              <label className="text-sih-blue" htmlFor="description">
                Descripción
              </label>
              <input
                id="description"
                type="text"
                name="description"
                value={expenseData.description}
                onChange={handleInputChange}
                className="border p-2 rounded-[15px] w-full text-sih-blue outline-0"
              />
            </div>
            <button
              onClick={handleExp}
              className="bg-sih-blue text-white py-2 px-4 rounded-[10px] hover:bg-sih-orange hover:text-sih-blue"
            >
              Crear gasto extraordinario
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white py-2 px-4 rounded-[10px] ml-2 hover:bg-sih-red"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminProperties;
