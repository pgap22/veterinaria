import { MdPets } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useAuth } from "../store/auth";

export default function Home() {
  const user = useAuth((state) => state.user, shallow);
  const setUser = useAuth((state) => state.setUser, shallow);

  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
    navigate("/");
  };

  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
        body{
            background: #f0f0f0;
        }
        `}
      </style>

      <header aria-label="Page Header" className="bg-white shadow-md">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Bienvenido {user.nombre}
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Aqui estan tus citas veterinarias! 🐶
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <button
                className="block rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring"
                type="button"
              >
                Mis mascotas
              </button>
              <button
                className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
              >
                Soliciar cita
              </button>
              <button
                onClick={logout}
                className="block rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring"
                type="button"
              >
                Cerrar sesion
              </button>
            </div>
          </div>
        </div>
      </header>
      <CitasContainer />
    </>
  );
}

const CitasContainer = () => {
  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <h2 className="font-bold text-3xl my-6">Tus citas</h2>
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/3 cursor-pointer">
            <div
              className=" 
           flex-col
           p-5
           flex
           gap-3
           md:px-7
           xl:px-6
           rounded-[20px]
           bg-white
           shadow-md
           hover:shadow-lg
           mb-8
           "
            >
              <MdPets size={40} />
              <h4 className="font-bold text-xl text-dark mb-3">
                Nombre de la cita
              </h4>
              <p className="text-body-color">
                We dejoy working with discerning clients, people for whom
                qualuty, service, integrity & aesthetics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
