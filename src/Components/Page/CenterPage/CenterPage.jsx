import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import Footer from "../../Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import FieldCenterList from "../../FieldsCenter/FieldCenterList.jsx";
import { AuthCenter } from "../../../Context/AuthCenterProvider.jsx";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEInput,
} from "tw-elements-react";

// const urlGetCenter = "http://localhost:3020/center";

export default function CenterPage() {
  // const { centers, selectedCenter } = useContext(GetCenter);
  // const { fields, getField } = useContext(GetField);
  const { id } = useParams();
  const [showModalNewField, setShowModalNewField] = useState(false);
  const { centerId, token } = useContext(AuthCenter);
  const [name, setName] = useState();
  const [typology, setTypology] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [allFields, setAllFields] = useState();

  const getUrlNewField = `http://localhost:3020/field`;
  const getAllFieldsCenter = `http://localhost:3020/field/center/${id}`;

  //CONTROLLO CHE L UTENTE SIA AUTENTICATO E CORRISPONDA AL CENTER ID
  const isAuthenticatedCenter = () => {
    // console.log(id);
    // console.log(centerId);
    // console.log(token);
    return !!token && centerId === id;
  };

  //CERCO I FIELD CORRISPONDENTI ALL CENTRO DA PASSARE AL COMPONENTE
  const getFieldCenterId = async () => {
    try {
      const response = await fetch(getAllFieldsCenter);

      if (!response.ok) {
        console.log("Errore durante il recupero dei fields");
      }

      const data = await response.json();
      setAllFields(data);
      // console.log(data);
    } catch (error) {
      console.error("Errore durante il recupero dei field del centro:", error);
    }
  };

  useEffect(() => {
    getFieldCenterId();
  }, [id]);

  // console.log(allFields);

  //PATCH PER CARICARE LE IMMAGINI IN CLAUDINARY
  const uploadImageField = async (file, fieldId) => {
    try {
      const newImg = new FormData();

      let newImages = [...file];

      newImages.forEach((item, index) => {
        newImg.append("image[" + index + "]", item);
      });

      if (fieldId) {
        const response = await fetch(
          `http://localhost:3020/field/${fieldId}/image`,
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

  //FUNZIONE PER CANCELLARE IL FORM
  const handleReset = () => {
    setName("");
    setTypology("");
    setDescription("");
    setImage("");
  };

  //   POST PER UN NUOVO FIELD
  const postNewField = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      typology: typology,
      description: description,
      center: centerId,
    };

    try {
      const response = await fetch(getUrlNewField, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Errore durante la chiamata al backend");
      }

      const result = await response.json();
      console.log("Success:", result);

      //FACCIAMO PARTIRE LA CHIAMATA PER UPLOAD IMMAGINI
      await uploadImageField(image, result._id);

      setShowModalNewField(false);
      handleReset();
      getFieldCenterId();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      {/* MODALE VISIBILE SOLO ALL UTENTE LOGGATO COME CENTER */}

      <div>
        {isAuthenticatedCenter() && (
          <div className="flex justify-center m-10">
            <TERipple>
              <button
                onClick={() => setShowModalNewField(true)}
                className="mx-6 mt-3 px-6 pb-2 pt-2.5 bg-nav-green text-white text-lg font-medium uppercase rounded hover:bg-light-green hover:text-dark-green transition duration-300"
              >
                Create New Field
              </button>
            </TERipple>
          </div>
        )}

        <TEModal show={showModalNewField} setShow={setShowModalNewField}>
          <TEModalDialog size="lg">
            <TEModalContent>
              <TEModalHeader>
                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                  Create New Field
                </h5>
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => setShowModalNewField(false)}
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
                    {/* <!--Name input--> */}
                    <TEInput
                      type="text"
                      label="Name"
                      className="mb-6"
                      onChange={(e) => setName(e.target.value)}
                    ></TEInput>

                    {/* <!--Typology input--> */}
                    <TEInput
                      type="text"
                      label="Typology"
                      className="mb-6"
                      onChange={(e) => setTypology(e.target.value)}
                    ></TEInput>

                    {/* <!--Image input--> */}
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
                        onChange={(e) => setImage(e.target.files)}
                      />
                    </div>

                    {/* <!--Description input--> */}
                    <TEInput
                      type="text"
                      label="Description"
                      className="mb-6"
                      onChange={(e) => setDescription(e.target.value)}
                    ></TEInput>

                    {/* <!--Submit button--> */}
                    <TERipple rippleColor="light" className="w-full">
                      <button
                        type="button"
                        className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
                        onClick={postNewField}
                      >
                        Create a new field
                      </button>
                    </TERipple>
                  </form>
                </div>
              </TEModalBody>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>

      {allFields && (
        <FieldCenterList fields={allFields} getfieldCenter={getFieldCenterId} />
      )}

      <Footer />
    </>
  );
}
