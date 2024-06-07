import React from "react";
import backgroundImage from "../../../Asset/pic_sport-01.png";
import { useNavigate } from "react-router-dom";

export default function HeaderPage() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/HomePage");
  };

  return (
    <>
      <div
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="text-center text-dark-green bg-light-green p-4 bg-opacity-80">
          <h1 className="text-4xl font-bold mb-4">
            Choose your weapon and <br />
            book your field online!
          </h1>
          <button
            onClick={goToHomePage}
            className="px-6 py-3 font-semibold bg-green-500 text-dark-green rounded-full text-lg hover:bg-dark-green hover:text-white transition duration-300"
          >
            Search for fields
          </button>
        </div>
      </div>
    </>
  );
}
