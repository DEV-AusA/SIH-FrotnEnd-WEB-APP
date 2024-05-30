"use client";
import { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import validateGuestData from "./helpers/validateGuestData";
import { IAuthorization, IAuthorizationCreated } from "@/helpers/types";
import { useUserContext } from "../UserProvider";
import Swal from "sweetalert2";
import axios from "axios";
import validatePackageData from "./helpers/validatePackageData";
import Image from "next/image";
const WHATSAPP_URL = "https://api.whatsapp.com/send?text=";
const AUTHORIZATION_URL = process.env.NEXT_PUBLIC_API_URL;

const OwnerAuthorization: React.FC = (): React.ReactElement => {
  const { user, setUser, token, setToken } = useUserContext();
  const [authorizations, setAuthorizations] = useState([]);
  const [guest, setGuest] = useState(true);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await localStorage.getItem("token");
        setToken(storedToken);
        const currentUser = await JSON.parse(localStorage.user);
        setUser(currentUser);

        const response = await axios.get(
          `${AUTHORIZATION_URL}/authorizations/user/${currentUser?.id}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          },
        );
        setAuthorizations(response.data);
      } catch (error) {
        console.log("Error al obtener las autorizaciones:", error);
        setAuthorizations([]);
      }
    };

    checkToken();
  }, []);
  const initialGuestData = {
    type: "",
    name: "",
    document: "",
  };
  const initialPackageData = {
    type: "",
    name: "",
    shipmentNumber: "",
  };
  const [packageErrors, setPackageErrors] =
    useState<IAuthorization>(initialPackageData);
  const [guestErrors, setGuestErrors] =
    useState<IAuthorization>(initialGuestData);
  const [guestData, setGuestData] = useState<IAuthorization>(initialGuestData);
  const [packageData, setPackageData] =
    useState<IAuthorization>(initialPackageData);

  const handleChangeGuest = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setGuestData({ ...guestData, [name]: value });

    setGuestErrors(validateGuestData({ ...guestData, [name]: value }));
  };
  const handleChangePackage = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setPackageData({ ...packageData, [name]: value });

    setPackageErrors(validatePackageData({ ...packageData, [name]: value }));
  };
  const handleSubmitGuest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guestDto = {
      type: "guest",
      name: guestData.name,
      document: Number(guestData.document),
    };
    axios
      .post(`${AUTHORIZATION_URL}/authorizations/${user?.id}`, guestDto, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => data)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Se ha registrado tu invitado!",
          showConfirmButton: true,
        }).then(() => location.reload());
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
  const handleSubmitPackage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const packageDto = {
      type: "delivery",
      name: packageData.name,
      shipmentNumber: packageData.shipmentNumber,
    };
    axios
      .post(`${AUTHORIZATION_URL}/authorizations/${user?.id}`, packageDto, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => data)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Se ha registrado tu entrega!",
          showConfirmButton: true,
        }).then(() => location.reload());
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
  return (
    <div>
      <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] m-3">
        Genera autorizaciones
      </h2>
      <div className="flex justify-center">
        <div className="flex flex-col bg-sih-grey w-[300px] m-3 p-5 rounded-[15px] shadow-button ">
          <div className="flex justify-center">
            <button
              onClick={() => setGuest(true)}
              className={
                guest
                  ? "w-[120px] mx-[10px] bg-sih-orange text-sih-blue p-[6px] rounded-[10px] text-center"
                  : "w-[120px] mx-[10px] bg-sih-blue p-[6px] rounded-[10px] text-center hover:bg-sih-orange hover:text-sih-blue"
              }
            >
              Invitado
            </button>
            <button
              onClick={() => setGuest(false)}
              className={
                guest
                  ? "w-[120px] mx-[10px] bg-sih-blue p-[6px] rounded-[10px] text-center hover:bg-sih-orange hover:text-sih-blue"
                  : "w-[120px] mx-[10px] bg-sih-orange text-sih-blue p-[6px] rounded-[10px] text-center"
              }
            >
              Entrega
            </button>
          </div>

          {guest ? (
            <form id="guestForm" onSubmit={handleSubmitGuest}>
              <h2 className="text-[#384B59] text-xl font-bold text-center px-8 max-md:text-[20px] m-3">
                Invitados
              </h2>
              <div className="flex flex-col items-center mx-5 my-1" key="name">
                <label className="w-[256px] text-[#384B59] ">
                  Nombre del invitado:
                </label>
                <input
                  className="text-black h-[40px] w-[256px] rounded-[15px] px-2 outline-0 mx-5  border-black bg-white"
                  type="text"
                  id="name"
                  name="name"
                  value={guestData.name}
                  placeholder="Nombre del invitado"
                  onChange={handleChangeGuest}
                />
                {guestErrors.name ? (
                  <span className="text-red-500 block w-[256px] text-sm">
                    {guestErrors.name}
                  </span>
                ) : null}
              </div>
              <div
                className="flex flex-col items-center mx-5 my-1"
                key="document"
              >
                <label className="w-[256px] text-[#384B59] ">
                  Documento del invitado:
                </label>
                <input
                  className="text-black h-[40px] w-[256px] rounded-[15px] px-2 outline-0 mx-5  border-black bg-white"
                  type="number"
                  id="document"
                  name="document"
                  value={guestData.document}
                  placeholder="Documento del invitado"
                  onChange={handleChangeGuest}
                />
                {guestErrors.document ? (
                  <span className="text-red-500 block w-[256px] text-sm">
                    {guestErrors.document}
                  </span>
                ) : null}
                <button
                  disabled={
                    guestData.name === "" ||
                    Object.keys(guestErrors).some(
                      (e) => guestErrors[e as keyof IAuthorization],
                    )
                  }
                  type="submit"
                  className="bg-sih-blue h-[37px] w-[200px] rounded-[15px] text-base p-1 mt-[20px]"
                >
                  Generar autorización
                </button>
              </div>
            </form>
          ) : (
            <form id="packageForm" onSubmit={handleSubmitPackage}>
              <h2 className="text-[#384B59] text-xl font-bold text-center px-8 max-md:text-[20px] m-3">
                Paquetería
              </h2>
              <div className="flex flex-col items-center mx-5 my-1" key="name">
                <label className="w-[256px] text-[#384B59] ">
                  Empresa de envio:
                </label>
                <input
                  className="text-black h-[40px] w-[256px] rounded-[15px] px-2 outline-0 mx-5  border-black bg-white"
                  type="text"
                  id="name"
                  name="name"
                  value={packageData.name}
                  placeholder="Servicio de entrega"
                  onChange={handleChangePackage}
                />
                {packageErrors.name ? (
                  <span className="text-red-500 block w-[256px] text-sm">
                    {packageErrors.name}
                  </span>
                ) : null}
              </div>
              <div
                className="flex flex-col items-center mx-5 my-1"
                key="document"
              >
                <label className="w-[256px] text-[#384B59] ">
                  Referencia del envio:
                </label>
                <input
                  className="text-black h-[40px] w-[256px] rounded-[15px] px-2 outline-0 mx-5  border-black bg-white"
                  type="text"
                  id="shipmentNumber"
                  name="shipmentNumber"
                  value={packageData.shipmentNumber}
                  placeholder="Referencia del envio"
                  onChange={handleChangePackage}
                />
                {packageErrors.shipmentNumber ? (
                  <span className="text-red-500 block w-[256px] text-sm">
                    {packageErrors.shipmentNumber}
                  </span>
                ) : null}
                <button
                  disabled={
                    packageData.name === "" ||
                    Object.keys(packageErrors).some(
                      (e) => packageErrors[e as keyof IAuthorization],
                    )
                  }
                  type="submit"
                  className="bg-sih-blue h-[37px] w-[200px] rounded-[15px] text-base p-1 mt-[20px]"
                >
                  Generar autorización
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <h2 className="text-[#384B59] text-4xl font-bold text-center px-8 max-md:text-[20px] m-3">
        Tus autorizaciones
      </h2>
      <div className="flex flex-wrap justify-center">
        {authorizations && authorizations.length > 0 ? (
          authorizations.map((authorization: IAuthorizationCreated) => {
            return (
              <div
                key={authorization.id}
                className="w-[300px] bg-white m-3 p-5 flex justify-center flex-col items-center rounded-[15px] mx-[45px] my-[40px] shadow-button text-sih-blue  max-[1600px]:mx-[30px]"
              >
                <span>Número: {authorization.number}</span>
                <span>Código de acceso: {authorization.accessCode}</span>
                <span>Nombre: {authorization.name}</span>
                {authorization.document ? (
                  <span>Documento: {authorization.document}</span>
                ) : (
                  ""
                )}
                {authorization.shipmentNumber ? (
                  <span>
                    Referencia de envio: {authorization.shipmentNumber}
                  </span>
                ) : (
                  ""
                )}
                {authorization.dateUsed ? (
                  <span>Validado</span>
                ) : (
                  <span>Sin utilizar</span>
                )}

                <a
                  href={`${WHATSAPP_URL}${encodeURIComponent(`Te comparto el código de Acceso: ${authorization.accessCode}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer ml-2 flex justify-center items-center bg-[#29A71A] text-white pr-[10px] rounded-[20px] mt-[10px]"
                >
                  <Image
                    src="/icons/whatsapp.png"
                    alt="whatsapp"
                    height={40}
                    width={40}
                    className="ml-[5px]"
                  />
                  <span>Compartir en Whatsapp</span>
                </a>
              </div>
            );
          })
        ) : (
          <span className="text-sih-blue mb-[30px]">
            No has generado autorizaciones
          </span>
        )}
      </div>
    </div>
  );
};

export default OwnerAuthorization;
