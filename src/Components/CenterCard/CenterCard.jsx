import React from "react";
import { useNavigate } from "react-router-dom";
import { TETooltip } from "tw-elements-react";
import { AuthCenter } from "../../Context/AuthCenterProvider";
import { AuthPlayer } from "../../Context/AuthPlayerProvider";
import { useContext } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import { useState } from "react";

export default function CenterCard({
  logo,
  name,
  city,
  typology,
  _id,
  data,
  image,
}) {
  //   console.log(data);
  const { playerId, tokenPlayer } = useContext(AuthPlayer);
  const { centerId, token } = useContext(AuthCenter);
  const [showVerticalyCenteredModal, setShowVerticalyCenteredModal] =
    useState(false);

  const navigate = useNavigate();

  const goToFieldPage = () => {
    if (token || tokenPlayer) {
      navigate(`/field/${_id}`);
    } else {
      setShowVerticalyCenteredModal(true);
    }
  };

  const closeModalLogin = () => {
    setShowVerticalyCenteredModal(false);
    console.log("chiudi modale");
  };

  const goToLoginPlayer = () => {
    navigate("/LoginPlayer");
  };

  const goToLoginCenter = () => {
    navigate("/LoginCenter");
  };

  const goToCenterRegistration = () => {
    navigate("/center/registration");
  };

  const goToPlayerRegistration = () => {
    navigate("/player/registration");
  };

  return (
    <>
      <div
        onClick={goToFieldPage}
        className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row"
      >
        <img
          className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={image}
          alt="photo"
        />
        <div className="flex flex-col justify-start p-6">
          <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
            {name}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {city}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-300">
            {typology}
          </p>
        </div>

        {/* MODALE LOGIN */}
        <TEModal
          show={showVerticalyCenteredModal}
          setShow={setShowVerticalyCenteredModal}
        >
          <TEModalDialog centered>
            <TEModalContent>
              <TEModalHeader>
                {/* <!--Modal title--> */}
                <h5 className="text-xl font-medium leading-normal text-red">
                  You are not logged in!
                </h5>
                {/* <!--Close button--> */}
                <button
                  onClick={closeModalLogin}
                  className="mx-6 mt-3 px-6 pb-2 pt-2.5 border border-red text-red text-xs font-medium uppercase rounded hover:bg-red hover:text-white transition duration-300"
                >
                  X
                </button>
              </TEModalHeader>
              {/* <!--Modal body--> */}
              <div className="flex items-center justify-center">
                <TEModalBody>
                  <div className="flex items-center justify-center  text-dark-green text-lg">
                    Go to the login page
                  </div>
                  <div className="flex items-center justify-center">
                    <TERipple>
                      <button
                        onClick={goToLoginPlayer}
                        className="mx-6 mt-3 px-6 pb-2 pt-2.5 bg-nav-green text-white text-xs font-medium uppercase rounded hover:bg-dark-green hover:text-white transition duration-300"
                      >
                        Player
                      </button>
                    </TERipple>
                    <TERipple>
                      <button
                        onClick={goToLoginCenter}
                        className="mx-6 mt-3 px-6 pb-2 pt-2.5 bg-nav-green text-white text-xs font-medium uppercase rounded hover:bg-dark-green hover:text-white transition duration-300"
                      >
                        Center
                      </button>
                    </TERipple>
                  </div>
                  <hr className="my-12 h-0.5 border-t-0 bg-dark-green opacity-100 dark:opacity-50" />
                  <div className="flex items-center justify-center  text-dark-green text-lg">
                    Haven't registered yet?
                  </div>
                  <div className="flex items-center justify-center  text-dark-green text-lg">
                    Do it now
                  </div>
                  <div className="flex items-center justify-center">
                    <TERipple>
                      <button
                        onClick={goToPlayerRegistration}
                        className="mx-6 mt-3 px-6 pb-2 pt-2.5 bg-nav-green text-white text-xs font-medium uppercase rounded hover:bg-dark-green hover:text-white transition duration-300"
                      >
                        Player
                      </button>
                    </TERipple>
                    <TERipple>
                      <button
                        onClick={goToCenterRegistration}
                        className="mx-6 mt-3 px-6 pb-2 pt-2.5 bg-nav-green text-white text-xs font-medium uppercase rounded hover:bg-dark-green hover:text-white transition duration-300"
                      >
                        Center
                      </button>
                    </TERipple>
                  </div>
                </TEModalBody>
              </div>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>
    </>
  );
}
