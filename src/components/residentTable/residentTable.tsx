"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useUserContext } from "../UserProvider";
import { IRegister, IUser } from "@/helpers/types";
import BarStadisticsGraphicsComponent from "../graphics/BarStadisticsGraphics";
import StatisticsPolarGraphicsComponent from "../graphics/StadisticsPolarGraphics";
import Image from "next/image";
import updateDto from "../updateForm/helpers/updateDto";
import { formData } from "../updateForm/helpers/updateFormData";
import Swal from "sweetalert2";
import validateUpdate from "../updateForm/helpers/validateUpdate";
// import userDto from "../loginForm/helpers/userDto";
import { useRouter } from "next/navigation";
// import TableContent from "./tableContent";

const GETUsers_URL = process.env.NEXT_PUBLIC_API_URL;
const REGISTERUSER_URL = process.env.NEXT_PUBLIC_API_URL;

const OwnerTable: React.FC = (): React.ReactElement => {
  const [Users, setUsers] = useState<IUser[]>([]);
  const [isModalOpenUpdate, setIsModalOpen] = useState(false);
  const [userDataUpdated, setUserDataUpdated] = useState<IUser | null>(null);
  const [isModalOpenState, setIsModalOpenState] = useState(false);
  const [userDataState, setUserDataState] = useState<IUser | null>(null);
  // const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { setToken } = useUserContext();
  const { setUser } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.user) {
        const currentUser = await JSON.parse(localStorage.user);
        setUser(currentUser);
      } else {
        router.push("/ingreso");
      }
    };

    checkToken();
  }, [setUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      const storedToken = await localStorage.getItem("token");
      setToken(storedToken);

      const response = await axios.get(`${GETUsers_URL}/users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      // Ordenar el array de propiedades por el número de casa de forma ascendente
      //   const sortedUsers = response.data.sort(
      //     (a: IUser, b: IUser) => a.number - b.number,
      //   );
      // console.log(response.data);
      setUsers(response.data);
    };

    fetchUsers();
  }, [setToken]);

  const initialState: IRegister = {
    name: userDataUpdated ? userDataUpdated.name : "",
    lastName: userDataUpdated ? userDataUpdated.lastName : "",
    email: userDataUpdated ? userDataUpdated.email : "",
    username: "",
    document: userDataUpdated ? String(userDataUpdated.document) : "",
    phone: userDataUpdated ? String(userDataUpdated.phone) : "",
    cellphone: userDataUpdated ? String(userDataUpdated.cellphone) : "",
    code: "",
    password: "",
    confirmpassword: "",
  };
  const initialStateErrors: IRegister = {
    name: "",
    lastName: "",
    email: "",
    username: "",
    document: "",
    phone: "",
    cellphone: "",
    code: "",
    password: "",
    confirmpassword: "",
  };
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  useEffect(() => {
    const cargaUserDataUpdated = async () => {
      setData({
        name: userDataUpdated ? userDataUpdated.name : "",
        lastName: userDataUpdated ? userDataUpdated.lastName : "",
        email: userDataUpdated ? userDataUpdated.email : "",
        username: "",
        document: userDataUpdated ? String(userDataUpdated.document) : "",
        phone: userDataUpdated ? String(userDataUpdated.phone) : "",
        cellphone: userDataUpdated ? String(userDataUpdated.cellphone) : "",
        code: "",
        password: "",
        confirmpassword: "",
      });
    };
    cargaUserDataUpdated();
  }, [userDataUpdated]);

  useEffect(() => {
    const cargaUserDataUpdated = async () => {
      console.log(`${data} state`);
    };
    cargaUserDataUpdated();
  }, [userDataUpdated]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });

    setErrors(validateUpdate({ ...data, [name]: value }));
  };
  const dateTimeConvert = (dateTime: string) => {
    const date = new Date(dateTime);

    const formattedDate = date.toISOString().split("T")[0]; // "2024-05-24"
    const formattedTime = date.toISOString().split("T")[1].split(".")[0];

    return formattedDate + " \n " + formattedTime;
  };

  const openModalStatu = (user: IUser) => {
    setUserDataState(user);
    console.log("Modal State: ", userDataState);
    setIsModalOpenState(true);
  };

  const closeModalStatu = () => {
    setIsModalOpenState(false);
  };
  const openModal = (user: IUser) => {
    setUserDataUpdated(user);
    console.log("Modal Update: ", userDataUpdated);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newdata = updateDto(data);
    const token = await localStorage.getItem("token");
    console.log(newdata);
    axios
      .put(`${REGISTERUSER_URL}/users/update/${userDataUpdated?.id}`, newdata, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        axios
          .get(`${REGISTERUSER_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(({ data }) => data)
          .then((data) => {
            const userInfo = data;
            setUsers(userInfo);
          });
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Se han actualizado tus datos.",
          showConfirmButton: true,
        });
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Lo sentimos, algo ha salido mal.",
          text: error.response.data.message || error.message,
          showConfirmButton: true,
        });
      });
  };

  const uploadImage = async () => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    console.log(file);
    const token = await localStorage.getItem("token");
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "No has seleccionado un archivo.",
        showConfirmButton: true,
      });
      return;
    }
    const maxSize = 200 * 1024;

    if (file.size > maxSize) {
      Swal.fire({
        icon: "error",
        title: "El tamaño máximo del archivo es de 200KB.",
        showConfirmButton: true,
      });
      fileInput.value = "";
      return;
    } else {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      axios
        .put(
          `${REGISTERUSER_URL}/users/update/${userDataUpdated?.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          axios
            .get(`${REGISTERUSER_URL}/users`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(({ data }) => data)
            .then((data) => {
              const userInfo = data;
              setUsers(userInfo);
            });
        })
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Imagen subida con exito.",
            showConfirmButton: true,
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Lo sentimos, algo ha salido mal.",
            showConfirmButton: true,
          });
        });
    }
  };

  const handleState = async () => {
    console.log("afirmativo");
    const newdata = { state: false };
    const token = await localStorage.getItem("token");
    console.log(userDataState);
    console.log(newdata);
    axios
      .put(`${REGISTERUSER_URL}/users/update/${userDataState?.id}`, newdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        axios
          .get(`${REGISTERUSER_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(({ data }) => data)
          .then((data) => {
            console.log(data);
            const userInfo = data;
            setUsers(userInfo);
          });
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Se han actualizado tus datos.",
          showConfirmButton: true,
        });
        setIsModalOpenState(false);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Lo sentimos, algo ha salido mal.",
          text: error.response.data.message || error.message,
          showConfirmButton: true,
        });
        setIsModalOpenState(false);
      });
  };

  // const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
  //   const searchBar = event.target.value;
  //   setSearch(searchBar);
  // };

  const filteredUsers = [...Users].filter((userData) =>
    userData.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderUserButton = (user: IUser) => {
    return (
      <tr key={user.id}>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <img
              src={user.image}
              alt={user.name || "user img"}
              className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
            />
            <div className="flex flex-col">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                {user.name} {user.lastName}
              </p>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                {user.email}
              </p>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {user.rol === "owner" ? "Usuario" : "Usuario Temp."}
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex flex-col">
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              {user.cellphone}
            </p>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
              {user.phone}
            </p>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {user.document}
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="w-max">
            {
              user?.state === true ? (
                <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                  <span className="">Activo</span>
                </div>
              ) : user?.state === false ? (
                <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-red-500/20">
                  <span className="">Inactivo</span>
                </div>
              ) : (
                <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
                  <span className="">No Estado</span>
                </div>
              )

              // <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
              //   <span className="">No Estado</span>
              // </div>
            }
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {dateTimeConvert(user.lastLogin)}
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <button
            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => openModal(user)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
              </svg>
            </span>
          </button>
          <button
            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => openModalStatu(user)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="16.000000pt"
                height="16.000000pt"
                viewBox="0 0 26.000000 26.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,26.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M70 240 c-24 -24 -25 -51 -5 -91 16 -31 13 -49 -9 -49 -17 0 -56 -38
-56 -54 0 -17 51 -36 96 -36 32 0 32 1 27 39 -4 26 1 53 16 86 11 26 21 56 21
66 0 23 -34 59 -55 59 -8 0 -24 -9 -35 -20z"
                  />
                  <path
                    d="M155 105 c-31 -31 -31 -49 0 -80 31 -31 49 -31 80 0 31 31 31 49 0
80 -31 31 -49 31 -80 0z m63 -42 c-10 -2 -28 -2 -40 0 -13 2 -5 4 17 4 22 1
32 -1 23 -4z"
                  />
                </g>
              </svg>
            </span>
          </button>
        </td>
      </tr>
    );
  };
  return (
    <main>
      {isModalOpenState && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl mb-4 text-sih-blue text-center">
              Desea dar de baja al Propietario?
            </h2>
            <button
              onClick={handleState}
              className="bg-sih-blue text-white py-2 px-4 rounded-[10px] hover:bg-sih-orange hover:text-sih-blue"
            >
              Si
            </button>
            <button
              onClick={closeModalStatu}
              className="bg-gray-500 text-white py-2 px-4 rounded-[10px] ml-2 hover:bg-sih-red"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {isModalOpenUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <div className="flex flex-row items-center max-[1000px]:flex-col">
                <div className="flex flex-col  items-center mt-[39px] max-md:flex-col">
                  {userDataUpdated ? (
                    <Image
                      className="rounded-full border-8 border-white h-[260px] w-[260px] max-md:h-[173px] max-md:w-[173px] max-cellphone:h-[100px] max-cellphone:w-[100px]"
                      src={userDataUpdated.image}
                      height={260}
                      width={260}
                      alt="Imagen del usuario"
                    ></Image>
                  ) : (
                    ""
                  )}
                  <div className="flex flex-col m-6 items-center">
                    <input
                      type="file"
                      accept="image/*"
                      id="file"
                      name="file"
                      className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={uploadImage}
                      className="bg-sih-blue h-[37px] w-[200px] rounded-[15px] text-base p-1 mt-[20px]"
                    >
                      Subir imagen
                    </button>
                  </div>
                </div>
                <div className="flex flex-col  items-center">
                  <h2 className="text-[#384B59] text-xl  text-center px-8 max-md:text-[20px] m-3">
                    Llena los espacios de los datos que desees actualizar.
                  </h2>
                  <div className="grid grid-cols-2 max-md:grid-cols-1">
                    {formData.map(({ name, type, placeholder }) => {
                      if (name !== "password" && name !== "confirmpassword") {
                        return (
                          <div
                            className="flex flex-col items-center mx-5 my-1"
                            key={name}
                          >
                            <label className="w-[256px] text-[#384B59] ">
                              {placeholder}:
                            </label>
                            <input
                              className="text-black h-[40px] w-[256px] rounded-[15px] px-2 outline-0 mx-5  border-black bg-white"
                              type={type}
                              id={name}
                              name={name}
                              value={data[name as keyof IRegister]}
                              placeholder={placeholder}
                              onChange={handleChange}
                            />
                            {errors[name as keyof IRegister] ? (
                              <span className="text-red-500 block w-[256px] text-sm">
                                {errors[name as keyof IRegister]}
                              </span>
                            ) : null}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="flex justify-center ">
                <button
                  type="submit"
                  // disabled={Object.keys(errors).some(
                  //   (e) => errors[e as keyof IRegister],
                  // )}
                  className="bg-sih-blue text-white py-2 px-4 rounded-[10px] hover:bg-sih-orange hover:text-sih-blue"
                >
                  Actualizar datos
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-[10px] ml-2 hover:bg-sih-red"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center">
        <div className="mb-5 text-gray-700 text-lg">
          Propietarios ingresados en el periodo 2024
        </div>
        <div className="m-auto relative flex w-4/5">
          <BarStadisticsGraphicsComponent users={Users} />
          <StatisticsPolarGraphicsComponent users={Users} />
        </div>
      </div>
      <div className="m-auto my-2 relative flex flex-col w-4/5 h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
          <div className="flex flex-col justify-between gap-8 mb-4 md:flex-row md:items-center">
            {/* <div>
              <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Recent Transactions
              </h5>
              <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                These are details about the last transactions
              </p>
            </div> */}
            <div className="flex w-full gap-2 shrink-0 md:w-max">
              <div className="w-full md:w-72">
                <div className="my-3 relative h-10 w-full min-w-[200px]">
                  <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Buscar
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tabla */}

        <div className="p-6 px-0 overflow-scroll h-[600px]">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className=" p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none ">
                    Propietario
                  </p>
                </th>
                <th className=" p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none ">
                    Rol
                  </p>
                </th>
                <th className=" p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none ">
                    Contactos
                  </p>
                </th>
                <th className=" p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none ">
                    Documento
                  </p>
                </th>
                <th className=" p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none">
                    Estado
                  </p>
                </th>
                <th className="  p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none">
                    Ult. Login
                  </p>
                </th>
                <th className=" p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((userData) => renderUserButton(userData))}
            </tbody>
          </table>
        </div>
        {/* Table footer */}
        <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
          {/* <button
            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            <button
              className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                1
              </span>
            </button>
            <button
              className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                2
              </span>
            </button>
            <button
              className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                3
              </span>
            </button>
            <button
              className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                ...
              </span>
            </button>
            <button
              className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                8
              </span>
            </button>
            <button
              className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                9
              </span>
            </button>
            <button
              className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                10
              </span>
            </button>
          </div>
          <button
            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Next
          </button> */}
        </div>
      </div>
    </main>
  );
};

export default OwnerTable;
