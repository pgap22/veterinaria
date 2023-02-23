import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
export default function Login() {
  return (
    <>
      <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
        <Header />
        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">
              Bienvenido a nuestro sistema 👋
            </h3>
            <p className="text-gray-600 pt-2">Inicia sesion en tu cuenta</p>
          </section>

          <section className="mt-10">
            <Form />
          </section>
        </main>
      </div>
    </>
  );
}
const Header = () => {
  return (
    <>
      <header className="max-w-lg mx-auto">
        <a href="#">
          <h1 className="text-4xl font-bold text-center">
            Consultorio de citas de veterinaria
          </h1>
        </a>
      </header>
    </>
  );
};
const Form = () => {
  const [hidePassword, toggleHide] = useState(false);
  const { register, handleSubmit } = useForm();
  const successSubmit = (data) => {
    console.log(data);
  };
  const togglePasswordText = () => {
    if (hidePassword) {
      toggleHide(false);
      return;
    }
    toggleHide(true);
  };
  return (
    <>
      <form onSubmit={handleSubmit(successSubmit)} className="flex flex-col">
        <div className="mb-6 pt-3 rounded bg-gray-200">
          <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
            Email
          </label>
          <input
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            id="email"
            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
        <div className="mb-6 pt-3 rounded bg-gray-200">
          <div className="flex justify-between items-center px-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 ">
              Contraseña
            </label>
            <AiFillEye
              className="cursor-pointer"
              onClick={togglePasswordText}
              size={20}
            />
          </div>
          <input
            {...register("password")}
            type={hidePassword ? "text" : "password"}
            id="password"
            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-4 pb-3"
          />
        </div>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
          type="submit"
        >
          Iniciar sesion
        </button>
      </form>
    </>
  );
};
