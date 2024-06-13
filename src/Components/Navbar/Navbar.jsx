import React from "react";
import { Fragment } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Disclosure,
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEInput,
} from "tw-elements-react";

import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../Asset/logo_playground.svg";
import { AuthCenter } from "../../Context/AuthCenterProvider";
import { AuthPlayer } from "../../Context/AuthPlayerProvider";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { centerId, setCenterId, centerLogo, token, setToken } =
    useContext(AuthCenter);
  const { playerId, setPlayerId, playerAvatar, tokenPlayer, setTokenPlayer } =
    useContext(AuthPlayer);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  const googleToken = localStorage.getItem("googleToken");
  const googleId = localStorage.getItem("googleId");

  // console.log(playerAvatar);

  const defaultImage =
    "https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-gris.png";
  const loggedImage = centerLogo || playerAvatar || defaultImage;

  //LOGOUT PER CENTRO O PLAYER
  const logoutUser = () => {
    navigate("/");
    localStorage.clear();
    // setToken("");
    // setTokenPlayer("");
    console.log("logout");
  };

  //NAVIGA ALL HOMEPAGE
  const goToHomePage = () => {
    navigate("/HomePage");
  };

  const goToProfile = () => {
    // console.log(playerId);
    if (centerId && token) {
      navigate(`/center/${centerId}`);
    } else if (playerId && tokenPlayer) {
      navigate(`/player/${playerId}`);
    } else if (googleId && googleToken) {
      navigate(`/player/${googleId}`);
    }
  };

  const openDeleteConfirmation = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (playerId && tokenPlayer) {
      deleteAccountPlayer();
    } else if (centerId && token) {
      deleteAccountCenter();
    }
  };

  const urlDeleteCenter = `http://localhost:3020/center/${centerId}`;
  const urlDeletePlayer = `http://localhost:3020/player/${playerId}`;
  //DELETE ACCOUNT PLAYER
  const deleteAccountPlayer = async () => {
    try {
      const response = await fetch(urlDeletePlayer, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Account deleted");
        setTokenPlayer("");
        setPlayerId("");
        navigate("/");
      } else {
        console.error("Errore durante la richiesta");
      }
    } catch (error) {
      console.error("Errore durante la richiesta", error);
    }
  };

  //DELETE ACCOUNT CENTER
  const deleteAccountCenter = async () => {
    try {
      const response = await fetch(urlDeleteCenter, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Account deleted");
        setToken("");
        setCenterId("");
        navigate("/");
      } else {
        console.error("Errore durante la richiesta");
      }
    } catch (error) {
      console.error("Errore durante la richiesta", error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-light-green">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-start justify-start sm:items-start sm:justify-start">
                <div className="flex flex-shrink-0 items-start">
                  <img
                    className="h-40 w-auto"
                    src={logo}
                    alt="Your Company"
                    onClick={goToHomePage}
                  />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}

                <TEDropdown className="flex justify-center rounded-full">
                  <TERipple rippleColor="light">
                    <TEDropdownToggle tag="a" className="flex items-center">
                      <img
                        src={loggedImage}
                        className="w-10 rounded-full  hover:bg-white focus:bg-white  active:bg-white"
                        alt="Avatar"
                      />
                    </TEDropdownToggle>
                  </TERipple>

                  <TEDropdownMenu>
                    <TEDropdownItem>
                      <a
                        href="#"
                        className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600"
                        onClick={goToProfile}
                      >
                        Your Profile
                      </a>
                    </TEDropdownItem>
                    <TEDropdownItem>
                      <a
                        href="#"
                        className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600"
                      >
                        Modify Your Account
                      </a>
                    </TEDropdownItem>
                    <TEDropdownItem>
                      <a
                        href="#"
                        className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600"
                        onClick={openDeleteConfirmation}
                      >
                        Delete Account
                      </a>
                    </TEDropdownItem>
                    <TEDropdownItem>
                      <a
                        href="#"
                        className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600"
                        onClick={logoutUser}
                      >
                        Sign out
                      </a>
                    </TEDropdownItem>
                  </TEDropdownMenu>
                </TEDropdown>
              </div>
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
                    Are you sure you want to delete your account?
                  </p>
                  <div className="flex mt-4 space-x-4">
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
                      onClick={confirmDelete}
                    >
                      Confirm
                    </button>
                    <button
                      className="px-4 py-2 text-dark-green border border-dark-green rounded hover:bg-gray-700"
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
      )}
    </Disclosure>
  );
}
