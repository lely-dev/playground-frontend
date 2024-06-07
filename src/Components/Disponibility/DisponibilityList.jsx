import React from "react";
import { useState } from "react";
import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
  TERipple,
} from "tw-elements-react";
import { format } from "date-fns";

export default function DisponibilityList({ data, bookingField }) {
  //   console.log(data);

  const [selectedDispo, setSelectedDispo] = useState(null);
  const [showModalOkayDispo, setShowModalOkayDispo] = useState(false);
  const formatDate = (date) => format(new Date(date), "dd/MM/yyyy HH:mm");

  const openModalDispoOkay = (dispo) => {
    setSelectedDispo(dispo);
    setShowModalOkayDispo(true);
  };

  const confirmBook = () => {
    bookingField(selectedDispo);
    setShowModalOkayDispo(false);
  };

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-3">
      {data.map((dispo, index) => (
        <button
          key={index}
          aria-current="true"
          type="button"
          className="my-2 w-full cursor-pointer rounded-lg p-4 text-left text-dark-green border border-dark-green hover:bg-nav-green hover:text-white"
          onClick={() => openModalDispoOkay(dispo)}
        >
          {formatDate(dispo.from)} / {formatDate(dispo.to)}
        </button>
      ))}

      {selectedDispo && (
        <TEModal show={showModalOkayDispo} setShow={setShowModalOkayDispo}>
          <TEModalDialog size="lg">
            <TEModalContent>
              <TEModalHeader>
                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                  Book Field
                </h5>
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => setShowModalOkayDispo(false)}
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
                Would you like to confirm the camp reservation from
                {formatDate(selectedDispo.from)} to{" "}
                {formatDate(selectedDispo.to)}?
              </TEModalBody>
              <TEModalFooter>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                    onClick={confirmBook}
                  >
                    Book
                  </button>
                </TERipple>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="inline-block rounded bg-secondary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                    onClick={() => setShowModalOkayDispo(false)}
                  >
                    Cancel
                  </button>
                </TERipple>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      )}
    </div>
  );
}
