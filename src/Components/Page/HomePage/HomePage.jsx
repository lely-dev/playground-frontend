import React, { useContext } from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import SearchBar from "../../SearchBar/SearchBar";
import CenterCardList from "../../CenterCard/CenterCardList";
import { useState, useEffect } from "react";

const urlGetField = "http://localhost:3020/field";

export default function HomePage() {
  const [fields, setFields] = useState([]);
  const [filteredField, setFilteredField] = useState([]);

  //fetch get per i field
  const getField = async () => {
    try {
      // console.log("fetch get field");
      const response = await fetch(urlGetField);
      const data = await response.json();
      // console.log(data);
      setFields(data);
      setFilteredField(data);
      // console.log(filteredField);
    } catch (error) {
      console.error("Errore nel recupero dei dati:", error);
    }
  };

  useEffect(() => {
    getField();
  }, []);

  //ricerca fields
  const lookForTypology = (typology) => {
    if (typology) {
      const filtered = fields.filter((field) =>
        field.typology.toLowerCase().includes(typology.toLowerCase())
      );
      setFilteredField(filtered);
    } else {
      setFilteredField(fields);
    }
  };

  // console.log(fields);

  // Funzione per cercare i field per city
  const lookForCity = (city) => {
    if (city) {
      const filtered = fields.filter(
        (field) =>
          field.center.city.toLowerCase().includes(city.toLowerCase()) ||
          field.center.country.toLowerCase().includes(city.toLowerCase())
      );
      setFilteredField(filtered);
    } else {
      setFilteredField(fields);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="flex items-center justify-center">
          <SearchBar
            onTypologyChange={lookForTypology}
            onCityChange={lookForCity}
          />
        </div>
        <CenterCardList centers={filteredField} />
      </div>
      <Footer />
    </>
  );
}
