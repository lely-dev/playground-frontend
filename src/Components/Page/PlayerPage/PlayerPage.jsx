import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import Footer from "../../Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import PlayerBookFieldList from "../../PlayerBookedField/PlayerBookFieldList.jsx";

export default function PlayerPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState();
  const [booked, setBooked] = useState("");

  const urlPlayerId = `http://localhost:3020/player/${id}`;

  //GT PER AVERE I DATI PLAYER
  const getPlayer = async () => {
    try {
      const response = await fetch(urlPlayerId);

      if (!response.ok) {
        console.log("Errore durante il recupero del player");
      }

      const data = await response.json();
      setPlayer(data);
      // console.log(data);
    } catch (error) {
      console.error("Errore durante il recupero del player:", error);
    }
  };

  const getAllBookedField = `http://localhost:3020/book/player/${id}`;
  //CERCO LE PRENOTAZIONI FATTE DAL PLAYER
  const getBookedField = async () => {
    try {
      const response = await fetch(getAllBookedField);
      console.log(response);
      if (!response.ok) {
        console.log("Errore durante il recupero dei fields");
      }

      const data = await response.json();
      setBooked(data);
      // console.log(data);
    } catch (error) {
      console.error("Errore durante il recupero dei field del centro:", error);
    }
  };

  useEffect(() => {
    getPlayer();
    getBookedField();
  }, [id]);

  // console.log(player);

  return (
    <>
      <Navbar />

      {player && (
        <div className=" container mx-auto">
          <div className="text-center m-10">
            <img
              src={player.avatar}
              className="mx-auto mb-4 w-32 rounded-lg"
              alt="Avatar"
            />
            <h5 className="mb-2 text-xl font-medium leading-tight">
              {player.name}
            </h5>
            <p className="text-neutral-500 dark:text-neutral-400">
              {player.surname}
            </p>
            <div className="text-neutral-500 dark:text-neutral-400">
              {player.bio}
            </div>
          </div>
          <div className="text-center text-xl text-bold mb-5">Booked Field</div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              {booked && (
                <PlayerBookFieldList
                  booking={booked}
                  fetchBookField={getBookedField}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
