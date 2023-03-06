import { IoIosClose } from "react-icons/io";
import { IoReturnUpBack } from "react-icons/io5";
import { useForm } from "react-hook-form";

import { FiArrowRight } from "react-icons/fi";
import { AddDiagnosticAxios, finishAppointement, getActiveAppointement } from "../../api/vet";
import useSWR, { mutate } from "swr";
import { Link } from "react-router-dom";
import { useCitaVet } from "../../store/useCitaVet";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";

export const VetContainer = () => {

  const { modalDiagnostico, modalFinalizar } = useCitaVet(
    (state) => ({
      modalDiagnostico: state.modalDiagnostico,
      modalFinalizar: state.modalFinalizar,

      // setModalDiagnostico: state.setModalDiagnostico,
      // setModalFinalizar: state.setModalFinalizar,
    }),
    shallow
  );

  const { data: appointments, error, isLoading } = useSWR(
    "/citas/activos",
    getActiveAppointement
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;


  return (
    <section className="mx-auto w-4/5 flex flex-col">
      <div className=" w-full flex justify-start items-start">
        <h2 className="font-bold text-3xl my-6">Active appointments</h2>
      </div>

      <div className=" gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-auto mb-5">
        {!appointments.length ? (
          <div>
            <h1>NO HAY CITAS ACTIVAS</h1>
          </div>
        ) : (
          appointments.map((appointment, i) => {
            return <Appointment key={i} data={appointment} />;
          })
        )}
      </div>

      {modalFinalizar && <ModalFinalizarCita />}
      {modalDiagnostico && <ModalCreateDiagnostico />}
    </section>
  );
};

const Appointment = ({ data }) => {
  const setCita = useCitaVet((state) => state.setCita, shallow);
  const { setModalDiagnostico, setModalFinalizar } = useCitaVet(
    (state) => ({
      setModalDiagnostico: state.setModalDiagnostico,
      setModalFinalizar: state.setModalFinalizar,
    }),
    shallow
  );

  return (
    <div className="container">
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="flex-col p-5 flex gap-3 md:px-7 xl:px-6 rounded-[20px] bg-white border mb-3">
            <div className="flex items-center justify-start">
              <h4 className="font-bold text-2xl text-dark">{data.motivo}</h4>
            </div>
            <div className="flex w-full justify-start gap-4 items-start flex-col ">
              <div className="flex gap-2">
                <p className="px-3 py-1 bg-[#a3afb8] rounded-lg font-medium text-white">
                  {data.mascota.especie}
                </p>
                <p className="text-white px-3 py-1 font-medium rounded-lg capitalize bg-green-400">
                  Activa
                </p>
              </div>
              <div className="flex gap-2 h-auto">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    setCita(data);
                    setModalFinalizar(true);
                  }}
                >
                  Resolve
                </button>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    setCita(data);
                    setModalDiagnostico(true);
                  }}
                >
                  Add diagnostic
                </button>
                {/* <ResolveDiagnostic /> */}
                {/* <AddDiagnostic /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold text-[#303030]">
              {data.mascota.raza}
            </p>
            <div className="flex w-full justify-between items-center">
              <p className="opacity-60 ">Age - {data.mascota.edad}meses</p>
              <p className="opacity-60 ">Date - 25/03/2023</p>
              <Link to={`/vet/diagnostic/${data.id}`}>
                <div className="bg-gray-200 p-2 rounded-full group hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500">
                  <FiArrowRight
                    size={25}
                    className="stroke-[#7b7b7b] group-hover:stroke-white"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalFinalizarCita = () => {
  const cita = useCitaVet(state => state.cita);
  const { setModalFinalizar } = useCitaVet(
    (state) => ({
      setModalFinalizar: state.setModalFinalizar,
    }),
    shallow
  );

  const handleClick = async () => {
    mutate("/citas/activos", async () => {
      await finishAppointement(cita.id);
      setModalFinalizar(false);
    });
  };

  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/* content */}

            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* header */}
              <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t gap-5">
                <h3 className="text-3xl font-semibold">
                  Resolve the appointment
                </h3>
                <IoIosClose
                  className="fill-black cursor-pointer"
                  size={40}
                  onClick={() => setModalFinalizar(false)}
                />
              </div>
              {/* body */}
              <div className="p-6 flex gap-5 flex-col">
                <p>Resolve all the diagnostics for this appointment</p>
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleClick}
                  >
                    Resolve appointment
                  </button>
                  <button
                    className=" hover:text-blue-800 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setModalFinalizar(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black" />
      </>
    </>
  );
};
const ModalCreateDiagnostico = () => {
  const cita = useCitaVet(state => state.cita);

  const { setModalDiagnostico } = useCitaVet(
    (state) => ({
      setModalDiagnostico: state.setModalDiagnostico,
    }),
    shallow
  );

  const { register, handleSubmit } = useForm();

  const sucessSubmit =  (data) => {
    mutate('/diagnosticos', async () => {
      await AddDiagnosticAxios({
        ...data,
        idCita: cita.id
      })
    })
    setModalDiagnostico(false)
  }


  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content */}

          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t gap-5">
              <h3 className="text-3xl font-semibold">
                Add diagnostic to the appointment
              </h3>
              <IoIosClose
                className="fill-black cursor-pointer"
                size={40}
                onClick={() => setModalDiagnostico(false)}
              />
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">
              <form
                className="bg-white rounded"
                // {Error primaria 4}
                onSubmit={handleSubmit(sucessSubmit)}
              >
                <div className="mb-4">
                  <p className="block text-gray-700 text-sm font-bold mb-2">
                    Descripcion:
                  </p>
                  <textarea
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="Write your descripcion"
                    {...register("descripcion", { required: true })}
                  />
                </div>

                <div className="mb-4">
                  <p className="block text-gray-700 text-sm font-bold mb-2">
                    Recomendations:
                  </p>
                  <textarea
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="Write your recomendations"
                    {...register("recomendaciones", { required: true })}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Add diagnostic
                  </button>
                  <button
                    className=" hover:text-blue-800 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setModalDiagnostico(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
};
