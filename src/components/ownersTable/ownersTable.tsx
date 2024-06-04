"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../UserProvider";
import { IUser } from "@/helpers/types";
import { useRouter } from "next/navigation";

const GETUsers_URL = process.env.NEXT_PUBLIC_API_URL;

const OwnerTable: React.FC = (): React.ReactElement => {
  const [Users, setUsers] = useState<IUser[]>([]);
  const [usersFilter, setUsersFilter] = useState<IUser[]>(Users); // [usersFilter]
  // const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterColumn, setFilterColumn] = useState({
    type: "",
    order: true,
  });
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

      setUsersFilter(response.data);
    };

    fetchUsers();
  }, [setToken]);

  useEffect(() => {
    const checkToken = async () => {
      const filteredUsers = [...Users].filter((userData) => {
        const searchString = `${userData.name} ${userData.lastName} ${userData.document} ${userData.username} ${userData.email}`;
        return searchString.toLowerCase().includes(searchTerm.toLowerCase());
      });
      if (filterColumn.type === "Propietario") {
        if (filterColumn.order) {
          filteredUsers.sort((a: IUser, b: IUser) => {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            // a debe ser igual b
            return 0;
          });
        } else {
          filteredUsers.sort((a: IUser, b: IUser) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            // a debe ser igual b
            return 0;
          });
        }
      }
      if (filterColumn.type === "Estado") {
        if (filterColumn.order) {
          filteredUsers.sort((a: IUser, b: IUser) => {
            if (String(a.state) < String(b.state)) {
              return 1;
            }
            if (String(a.state) > String(b.state)) {
              return -1;
            }
            // a debe ser igual b
            return 0;
          });
        } else {
          filteredUsers.sort((a: IUser, b: IUser) => {
            if (String(a.state) < String(b.state)) {
              return -1;
            }
            if (String(a.state) > String(b.state)) {
              return 1;
            }
            // a debe ser igual b
            return 0;
          });
        }
      }

      if (filterColumn.type === "Documento") {
        if (filterColumn.order) {
          filteredUsers.sort((a: IUser, b: IUser) => a.document - b.document);
        } else {
          filteredUsers.sort((a: IUser, b: IUser) => b.document - a.document);
        }
      }
      if (filterColumn.type === "Ult. Login") {
        if (filterColumn.order) {
          filteredUsers.sort(
            (a: IUser, b: IUser) =>
              new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime(),
          );
        } else {
          filteredUsers.sort(
            (a: IUser, b: IUser) =>
              new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime(),
          );
        }
      }
      if (filterColumn.type === "Rol") {
        if (filterColumn.order) {
          filteredUsers.sort((a: IUser, b: IUser) => {
            if (a.rol < b.rol) {
              return 1;
            }
            if (a.rol > b.rol) {
              return -1;
            }
            // a debe ser igual b
            return 0;
          });
        } else {
          filteredUsers.sort((a: IUser, b: IUser) => {
            if (a.rol < b.rol) {
              return -1;
            }
            if (a.rol > b.rol) {
              return 1;
            }
            // a debe ser igual b
            return 0;
          });
        }
      }
      setUsersFilter(filteredUsers);
    };
    checkToken();
  }, [searchTerm, filterColumn, Users]);

  const dateTimeConvert = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  // const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
  //   const searchBar = event.target.value;
  //   setSearch(searchBar);
  // };

  // const filteredUsers = [...Users].filter((userData) =>
  //   userData.name.toLowerCase().includes(searchTerm.toLowerCase()),
  // );

  // setUsersFilter(
  //   [...Users].filter((userData) =>
  //     userData.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //   ),
  // );
  const renderUserButton = (user: IUser) => {
    return (
      <tr key={user.id}>
        <td className="p-4 border-b border-blue-gray-50 ">
          <div className="flex items-center gap-3 ">
            <img
              src={user.image}
              alt={user.name || "user img"}
              className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
            />
            <div className="flex flex-col w-[150px] sm:w-[250px]  lg:w-full">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 overflow-hidden text-ellipsis">
                {user.name} {user.lastName} | {user.username}
              </p>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70  truncate">
                {user.email}
              </p>
              <dl className="sm:hidden">
                <dt className="sr-only">Estado</dt>
                <dd className="">
                  {user?.state === true ? (
                    <div className="ml-14 inline-block  text-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                      <span className="">Activo</span>
                    </div>
                  ) : user?.state === false ? (
                    <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-red-900 uppercase rounded-md select-none whitespace-nowrap bg-red-500/20">
                      <span className="">Inactivo</span>
                    </div>
                  ) : (
                    <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
                      <span className="">No Estado</span>
                    </div>
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </td>
        <td className="hidden lg:table-cell p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {user.rol === "owner" ? "Usuario" : "Usuario Temp."}
          </p>
        </td>
        <td className="hidden lg:table-cell p-4 border-b border-blue-gray-50">
          <div className="flex flex-col">
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              {user.cellphone}
            </p>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
              {user.phone}
            </p>
          </div>
        </td>
        <td className="hidden lg:table-cell p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {user.document}
          </p>
        </td>
        <td className="hidden sm:table-cell p-4 border-b border-blue-gray-50">
          <div className="w-max">
            {user?.state === true ? (
              <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                <span className="">Activo</span>
              </div>
            ) : user?.state === false ? (
              <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-red-900 uppercase rounded-md select-none whitespace-nowrap bg-red-500/20">
                <span className="">Inactivo</span>
              </div>
            ) : (
              <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
                <span className="">No Estado</span>
              </div>
            )}
          </div>
        </td>
        <td className=" sm:table-cell   p-4 border-b border-blue-gray-50">
          <p className="lg:w-auto w-[100px] block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {dateTimeConvert(user.lastLogin)}
          </p>
        </td>
        <td className="hidden lg:table-cell p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"></p>
        </td>
      </tr>
    );
  };

  const onClickName = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLButtonElement;
    const innerText = target.innerText;

    if (filterColumn.order) {
      setFilterColumn({ type: innerText, order: false });
    } else {
      setFilterColumn({ type: innerText, order: true });
    }
  };
  // !!
  return (
    <main>
      <div className="xs:w-4/5 m-auto my-2 relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
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
                <th
                  className="cursor-pointer p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                  onClick={onClickName}
                >
                  <p className="block font-sans text-sm antialiased font-bold leading-none ">
                    Propietario
                  </p>
                </th>
                <th
                  className=" hidden lg:table-cell  cursor-pointer p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                  onClick={onClickName}
                >
                  <p className=" font-sans text-sm antialiased font-bold  leading-none ">
                    Rol
                  </p>
                </th>
                <th className="hidden lg:table-cell p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className=" font-sans text-sm antialiased font-bold  leading-none ">
                    Contactos
                  </p>
                </th>
                <th
                  className="hidden lg:table-cell cursor-pointer p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                  onClick={onClickName}
                >
                  <p className=" block font-sans text-sm antialiased font-bold  leading-none ">
                    Documento
                  </p>
                </th>
                <th
                  className="hidden sm:table-cell cursor-pointer p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                  onClick={onClickName}
                >
                  <p className="block font-sans text-sm antialiased font-bold  leading-none">
                    Estado
                  </p>
                </th>
                <th
                  className=" sm:table-cell cursor-pointer  p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                  onClick={onClickName}
                >
                  <p className="block font-sans text-sm antialiased font-bold  leading-none">
                    Ult. Login
                  </p>
                </th>
                <th className="hidden lg:table-cell p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-bold  leading-none"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              {usersFilter.map((userData) => renderUserButton(userData))}
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
