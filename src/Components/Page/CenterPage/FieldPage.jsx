import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import Footer from "../../Footer/Footer.jsx";
import DisponibilityList from "../../Disponibility/DisponibilityList.jsx";
import { AuthCenter } from "../../../Context/AuthCenterProvider.jsx";
import { useContext } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEInput,
} from "tw-elements-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthPlayer } from "../../../Context/AuthPlayerProvider.jsx";

export default function FieldPage() {
  const [dispo, setDispo] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [showModalDispo, setShowModalDispo] = useState(false);
  const { token, centerId } = useContext(AuthCenter);
  const { tokenPlayer, playerId } = useContext(AuthPlayer);
  const navigate = useNavigate();
  const { id } = useParams();
  const [fieldId, setFieldId] = useState(null);

  const isAuthenticatedCenter = () => {
    // console.log(id);
    // console.log(centerId);
    // console.log(token);
    if (fieldId) {
      return !!token && centerId === fieldId.center._id;
    }
  };

  const getUrlFieldId = `http://localhost:3020/field/${id}`;
  const getUrlDispo = `http://localhost:3020/disponibility/${id}`;
  const postUrlBook = `http://localhost:3020/book/`;

  //FETCH GET PER RECUPERARE IL FIELD TRAMITE ID

  const getFieldId = async () => {
    try {
      const response = await fetch(getUrlFieldId);
      const data = await response.json();
      // console.log(data);
      setFieldId(data);
    } catch (error) {
      console.error("Errore nel recupero dei dati:", error);
    }
  };

  console.log(fieldId);

  useEffect(() => {
    getFieldId();
  }, [id]);

  //GET PER LA DISPONIBILITY
  const fetchDisponibility = async () => {
    try {
      const response = await fetch(getUrlDispo);
      const data = await response.json();
      setDispo(data);
    } catch (error) {
      console.error("Errore durante la richiesta GET:", error);
    }
  };

  useEffect(() => {
    fetchDisponibility();
  }, [id]);

  const resetModalDisponibility = () => {
    setFrom("");
    setTo("");
  };

  //   POST PER UNA NUOVA DISPONIBILITA
  const postDisponibility = async (e) => {
    e.preventDefault();

    const data = {
      from: from,
      to: to,
      fieldid: id,
    };

    try {
      const response = await fetch(getUrlDispo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", result);

      resetModalDisponibility();
      setShowModalDispo(false);
      fetchDisponibility();
      getFieldId();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goToCenter = () => {
    navigate(`/center/${fieldId.center._id}`);
  };

  // console.log(fieldId);

  //POST PER LA PRENOTAZIONE
  const bookField = async (dispo) => {
    try {
      console.log("dentro la funzione post", dispo);
      const response = await fetch(postUrlBook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenPlayer}`,
        },
        body: JSON.stringify({
          disponibilityId: dispo._id,
        }),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong!");
      }

      const result = await response.json();
      console.log("The field has been booked", result);

      fetchDisponibility();
    } catch (error) {
      console.error("Errore durante la prenotazione:", error);
    }
  };

  return (
    <>
      <Navbar />

      {/* CAROSELLO + INFO CENTRO SPORTIVO */}

      {fieldId && (
        <div className="flex justify-center align-middle mx-10 my-10">
          <div className="w-7/12 pr-4">
            <TECarousel showControls showIndicators ride="carousel">
              <div
                className="relative w-full overflow-hidden after:clear-both after:block after:content-['']"
                style={{ height: "400px", objectFit: "contain" }}
              >
                {fieldId.image.map((picture, index) => (
                  <TECarouselItem
                    key={index}
                    itemID={index + 1}
                    className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                  >
                    <img src={picture} className="block w-full" alt="picture" />
                  </TECarouselItem>
                ))}
              </div>
            </TECarousel>
          </div>

          <div className="w-5/12" onClick={goToCenter}>
            <div className="text-center">
              <img
                src={fieldId.center.logo}
                className="mx-auto mb-4 w-32 rounded-lg cursor-pointer"
                alt="Avatar"
              />
              <h5 className="my-5 text-xl font-bold leading-tight cursor-pointer">
                {fieldId.center.name}
              </h5>
              <p className="font-bold text-lg">Indirizzo:</p>
              <p className="text-neutral-500 dark:text-neutral-400">
                {fieldId.center.address}
              </p>
              <p className="text-neutral-500 dark:text-neutral-400">
                {fieldId.center.city}, {fieldId.center.cap}
              </p>
              <p className="font-bold mt-10 text-lg">About us</p>
              <p>{fieldId.center.bio}</p>
            </div>
          </div>
        </div>
      )}

      {/* DESCRIZIONE DEL CAMPO */}
      {fieldId && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold mb-4">Descrizione del Campo</h3>
          <p>{fieldId.description}</p>
        </div>
      )}

      {/* MODALE VISIBILE SOLO ALL UTENTE LOGGATO COME CENTER */}

      <div>
        {isAuthenticatedCenter() && (
          <div className="flex justify-center m-10">
            <TERipple>
              <button
                onClick={() => setShowModalDispo(true)}
                className="mx-6 mt-3 px-6 pb-2 pt-2.5 bg-nav-green text-white text-lg font-medium uppercase rounded hover:bg-light-green hover:text-dark-green transition duration-300"
              >
                Enter the availability of the field.
              </button>
            </TERipple>
          </div>
        )}

        <TEModal show={showModalDispo} setShow={setShowModalDispo}>
          <TEModalDialog size="lg">
            <TEModalContent>
              <TEModalHeader>
                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                  Enter the availability of the field.
                </h5>
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => setShowModalDispo(false)}
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
              <TEModalBody className="flex justify-center">
                <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <form>
                    {/* <!--Name input--> */}
                    <TEInput
                      type="text"
                      label="From gg/mm/aaaa 00:00"
                      className="mb-6"
                      onChange={(e) => setFrom(e.target.value)}
                    ></TEInput>

                    {/* <!--Email input--> */}
                    <TEInput
                      type="text"
                      label="To gg/mm/aaaa 00:00"
                      className="mb-6"
                      onChange={(e) => setTo(e.target.value)}
                    ></TEInput>

                    {/* <!--Submit button--> */}
                    <TERipple rippleColor="light" className="w-full">
                      <button
                        type="button"
                        className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
                        onClick={postDisponibility}
                      >
                        Set Disponibility
                      </button>
                    </TERipple>
                  </form>
                </div>
              </TEModalBody>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>

      {/* LISTA DELLE DISPONIBILITA */}

      {dispo && <DisponibilityList data={dispo} bookingField={bookField} />}

      <Footer />
    </>
  );
}
