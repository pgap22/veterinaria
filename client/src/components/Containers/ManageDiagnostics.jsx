// import { useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
// import useSWR, { mutate } from "swr";
import { useQuery } from "react-query";
import {
  editDiagnosticAxios,
  deleteDiagnosticAxios,
  getDiagnosticAxios,
} from "../../api/vet";

import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import useDiagnostico from "../../store/useDiagnostico";

export const ManageDiagnostics = () => {
  const { id } = useParams();
  const setDiagnostico = useDiagnostico((state) => state.setDiagnostico);
  const diagnostico = useDiagnostico((state) => state.diagnostico);

  useEffect(() => {
    const loadDiagnostico = async () => {
      const cita = await getDiagnosticAxios(id);
      setDiagnostico(cita.diagnostico);
    };
    loadDiagnostico();
  }, []);

  return (
    <>
      <div className="w-4/5 mx-auto mt-5 flex flex-col gap-5">
        {!diagnostico.length ? (
          <>
            <h1>NO HAY DIAGNOSTICOS</h1>
          </>
        ) : (
          diagnostico.map((diagnostic, i) => {
            return <Card key={i} data={diagnostic} />;
          })
        )}
      </div>
    </>
  );
};

const Card = ({ data }) => {
  return (
    <>
      <div className="flex flex-col p-4 h-auto shadow-lg gap-5 rounded-lg">
        <div className="flex flex-col gap-5">
          <div>
            <p className=" text-xl font-bold">Descricpion:</p>
            <p className="text-base font-normal text-justify">
              {data.descripcion}
            </p>
          </div>

          <div>
            <p className=" text-xl font-bold">Recomendaciones:</p>
            <p className="text-base font-normal text-justify">
              {data.recomendaciones}
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <ModalEditDiagnostic id={data.id} data={data} />
          <ModalDeleteDiagnostic id={data.id} />
        </div>
      </div>
    </>
  );
};

const ModalDeleteDiagnostic = ({ id }) => {
  const [showModal, setShowModal] = useState(false);

  const setDiagnostico = useDiagnostico((state) => state.setDiagnostico);
  const diagnostico = useDiagnostico((state) => state.diagnostico);

  const deletePetHandleClick = async () => {
    await deleteDiagnosticAxios(id);
    setDiagnostico(diagnostico.filter((d) => d.id !== id));
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="py-3 px-10 bg-red-500 rounded-md text-white hover:bg-red-600 font-medium"
      >
        ELIMINAR
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Eliminar diagnostico
                  </h3>
                  <IoIosClose
                    className="fill-black cursor-pointer"
                    size={40}
                    onClick={() => setShowModal(false)}
                  />
                </div>
                {/* body */}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Are you sure that you what to delete this diagnostic?
                  </p>
                </div>
                {/* footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-blue-500 hover:text-blue-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-red-500  text-white hover:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => deletePetHandleClick()}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
};

const ModalEditDiagnostic = ({ id, data }) => {
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      descripcion: data.descripcion,
      recomendaciones: data.recomendaciones,
    },
  });
  const setDiagnostico = useDiagnostico((state) => state.setDiagnostico);
  const diagnostico = useDiagnostico((state) => state.diagnostico);



  const sucessSubmit = async (data) => {
    const updatedCita = await editDiagnosticAxios({
      ...data,
      idCita: id,
    });
    setDiagnostico(diagnostico.map(d => d.id == id ? updatedCita : d))
    setShowModal(false)
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="py-3 px-10 bg-blue-500 rounded-md text-white hover:bg-blue-600 font-medium "
      >
        EDITAR
      </button>
      {showModal ? (
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
                    onClick={() => setShowModal(false)}
                  />
                </div>
                {/* body */}
                <div className="relative p-6 flex-auto">
                  <form
                    className="bg-white rounded"
                    onSubmit={handleSubmit(sucessSubmit)}
                  >
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Descripcion:
                      </label>
                      <textarea
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                        placeholder="Write your descripcion"
                        {...register("descripcion", { required: true })}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Recomendations:
                      </label>
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
                        Edit diagnostic
                      </button>
                      <button
                        className=" hover:text-blue-800 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => setShowModal(false)}
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
      ) : null}
    </>
  );
};
