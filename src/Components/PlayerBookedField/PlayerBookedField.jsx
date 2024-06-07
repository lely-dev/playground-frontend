import React, { useContext } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEInput,
} from "tw-elements-react";
import { useState } from "react";
import { AuthPlayer } from "../../Context/AuthPlayerProvider";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PlayerBookedField({
  from,
  to,
  center,
  image,
  typology,
  _id,
  fetchBook,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const formatDate = (date) => format(new Date(date), "dd/MM/yyyy HH:mm");
  const { tokenPlayer, playerId } = useContext(AuthPlayer);
  const { idUrlPlayer } = useParams();
  const navigate = useNavigate();

  //CONTROLLO CHE L UTENTE SIA AUTENTICATO E CORRISPONDA AL CENTER ID
  const isAuthenticatedPlayer = () => {
    return !!tokenPlayer && playerId === idUrlPlayer;
  };

  //   FUNZIONE MODALE DELETE
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const goToField = () => {
    navigate(`/field/${_id}`);
  };

  const urlDeleteBook = `http://localhost:3020/book/${_id}`;
  //   DELETE FETCH
  const confirmDelete = async () => {
    try {
      const response = await fetch(urlDeleteBook, {
        method: "DELETE",
      });

      if (response.ok) {
        setShowDeleteModal(false);
        fetchBook();
      } else {
        console.error("Failed to delete field");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
        <img
          className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={image}
          alt="photo"
          onClick={goToField}
        />
        <div className="flex flex-col justify-start p-6">
          <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
            {center}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {typology}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-300">
            {formatDate(from)} / {formatDate(to)}
          </p>
          {isAuthenticatedPlayer && (
            <div className="flex flex-col md:flex-row lg:flex-row md:items-center md:justify-start mt-4 space-y-4 sm:space-y-10 md:space-y-0 md:space-x-4">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete modal */}
      <TEModal show={showDeleteModal} setShow={setShowDeleteModal}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowDeleteModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            <TEModalBody>
              <p className="text-neutral-600 dark:text-neutral-200">
                Are you sure you want to cancel the reservation?
              </p>
              <div className="flex mt-4 space-x-4">
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Confirm
                </button>
                <button
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </>
  );
}
