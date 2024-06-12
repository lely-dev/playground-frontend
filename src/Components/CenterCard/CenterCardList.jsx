import React from "react";
import CenterCard from "./CenterCard";

export default function CenterCardList({ centers }) {
  // console.log(centers);
  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-4">
        {centers.map((center) => (
          <CenterCard
            key={center.name}
            _id={center._id}
            logo={center.center.logo}
            image={center.image[0]}
            name={center.center.name}
            city={center.center.city}
            typology={center.typology}
            data={center}
          />
        ))}
      </div>
    </>
  );
}
