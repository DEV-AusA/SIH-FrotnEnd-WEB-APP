"use client";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { FormEvent, useRef } from "react";
import Swal from "sweetalert2";
import ServicesCards from "@/components/services/ServicesCards";

const ContactPage: React.FC = (): React.ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!formRef.current) return;

    const serviceId = "service_1c6ewcb";
    const templateId = "template_9n2vw1s";
    const apiKey = "wk38PYna-M0qo9XlU";

    emailjs
      .sendForm(serviceId, templateId, formRef.current, apiKey)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "¡Mensaje enviado!",
          showConfirmButton: false,
          timer: 1500,
        });
        formRef.current?.reset();
      })
      .catch((error) =>
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        }),
      );
  };

  return (
    <>
      <main className="flex justify-between px-200 bg-white min-h-[600px]">
        <div className="w-full flex flex-col  items-center px-[200px] py-24 max-[1200px]:px-[100px] max-[600px]:px-[50px]">
          <h2 className="text-[#384B59] text-4xl font-bold text-center px-[160px] max-[1330px]:px-0 max-[600px]:text-[20px] max-[500px]:text-base">
            ¿Tienes alguna duda?
            <br /> Contáctanos
          </h2>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center mt-[30px]"
          >
            <input
              className="text-black h-[40px] w-[256px] bg-sih-grey rounded-[15px] px-2 outline-0 m-[10px]"
              type="text"
              name="name"
              placeholder="Nombre"
              required
            />
            <input
              className="text-black h-[40px] w-[256px] bg-sih-grey rounded-[15px] px-2 outline-0 m-[10px]"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              required
            />
            <textarea
              name="message"
              id=""
              className="text-black w-[256px] bg-sih-grey rounded-[15px] px-2 outline-0 m-[10px] h-[150px] p-[5px] resize-none"
              placeholder="Escribe aquí tu mensaje"
            ></textarea>
            <button
              type="submit"
              className="bg-sih-blue h-[37px] w-[200px] rounded-[15px] text-base p-1 mt-[20px]"
            >
              Enviar
            </button>
          </form>

          <h2 className="text-[#384B59] text-xl mt-[30px] text-center max-[600px]:text-[20px] max-[500px]:text-base">
            O escríbenos a <br />
            secureingresshome@gmail.com
          </h2>
        </div>
        <div className="w-full h-[600]  max-[900px]:hidden">
          <Image
            className="w-full h-full object-cover"
            width={1000}
            height={600}
            src="/icons/contactFamily.jpg"
            alt="Secure Ingress Home"
          />
        </div>
      </main>
      <ServicesCards />
    </>
  );
};
export default ContactPage;
