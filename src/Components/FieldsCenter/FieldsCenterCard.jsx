import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEInput,
} from "tw-elements-react";
import { AuthCenter } from "../../Context/AuthCenterProvider";

export default function FieldsCenterCard({
  name,
  description,
  typology,
  image,
  _id,
  data,
}) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editTypology, setEditTypology] = useState(typology);
  const [editDescription, setEditDescription] = useState(description);
  const [editImage, setEditImage] = useState(image);
  const { centerId, token } = useContext(AuthCenter);

  //CONTROLLO CHE L UTENTE SIA AUTENTICATO E CORRISPONDA AL CENTER ID
  const isAuthenticatedCenter = () => {
    // console.log(centerId);
    // console.log(selectedCenter);
    return !!token && centerId === data.center._id;
  };

  const goToField = () => {
    navigate(`/field/${_id}`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const urlDeleteModifyField = `http://localhost:3020/field/${_id}`;

  //DELETE FETCH
  const confirmDelete = async () => {
    try {
      const response = await fetch(urlDeleteModifyField, {
        method: "DELETE",
      });

      if (response.ok) {
        setShowDeleteModal(false);
      } else {
        console.error("Failed to delete field");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //PATCH PER CARICARE LE IMMAGINI IN CLAUDINARY
  const uploadImageField = async (file, _id) => {
    try {
      const newImg = new FormData();

      let newImages = [...file];

      newImages.forEach((item, index) => {
        newImg.append("image[" + index + "]", item);
      });

      if (_id) {
        const response = await fetch(
          `http://localhost:3020/field/${_id}/image`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: newImg,
          }
        );

        if (!response.ok) {
          throw new Error(
            "Errore durante il caricamento dell'immagine su Cloudinary"
          );
        }

        const data = await response.json();
        console.log("Immagine caricata su Cloudinary:", data);
      } else {
        console.error("L'ID dell'articolo è vuoto o non valido.");
      }
    } catch (error) {
      console.error(
        "Si è verificato un errore durante il caricamento dell'immagine su Cloudinary:",
        error
      );
    }
  };

  // EDIT FIELD FETCH PUT
  const updateField = async () => {
    try {
      const response = await fetch(urlDeleteModifyField, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          typology: editTypology,
          description: editDescription,
        }),
      });

      if (response.ok) {
        setShowEditModal(false);

        const result = await response.json();
        console.log("Success:", result);

        //FACCIAMO PARTIRE LA CHIAMATA PER UPLOAD IMMAGINI
        await uploadImageField(editImage, result._id);
      } else {
        console.error("Failed to update field");
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
            {name}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {typology}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-300">
            {description}
          </p>
          {isAuthenticatedCenter && (
            <div className="flex flex-col md:flex-row lg:flex-row md:items-center md:justify-start mt-4 space-y-4 sm:space-y-10 md:space-y-0 md:space-x-4">
              <button
                className="px-4 py-2 text-white bg-nav-green rounded hover:bg-blue-700"
                onClick={handleEdit}
              >
                Edit
              </button>
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
                Are you sure you want to delete this field?
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

      {/* Edit Modal */}
      <TEModal show={showEditModal} setShow={setShowEditModal}>
        <TEModalDialog size="lg">
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Edit Field
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowEditModal(false)}
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
              <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <form>
                  {/* Name input */}
                  <TEInput
                    type="text"
                    label="Name"
                    className="mb-6"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  ></TEInput>

                  {/* Typology input */}
                  <TEInput
                    type="text"
                    label="Typology"
                    className="mb-6"
                    value={editTypology}
                    onChange={(e) => setEditTypology(e.target.value)}
                  ></TEInput>

                  {/* Image input */}
                  <div className="mb-3 w-96">
                    <label
                      htmlFor="formFileMultiple"
                      className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                    >
                      Pictures
                    </label>
                    <input
                      className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      type="file"
                      id="formFileMultiple"
                      multiple
                      onChange={(e) => setEditImage(e.target.files)}
                    />
                  </div>

                  {/* Description input */}
                  <TEInput
                    type="text"
                    label="Description"
                    className="mb-6"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  ></TEInput>

                  {/* Submit button */}
                  <TERipple rippleColor="light" className="w-full">
                    <button
                      type="button"
                      className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                      onClick={updateField}
                    >
                      Save Changes
                    </button>
                  </TERipple>
                </form>
              </div>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </>
  );
}
