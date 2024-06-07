import React from "react";
import FieldsCenterCard from "./FieldsCenterCard";

export default function FieldCenterList({ fields }) {
  // console.log(fields);
  return (
    <>
      <div className="grid gap-4 md grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-4">
        {fields.map((field) => (
          <FieldsCenterCard
            key={field.name}
            _id={field._id}
            name={field.name}
            description={field.description}
            typology={field.typology}
            image={field.image[0]}
            data={field}
          />
        ))}
      </div>
    </>
  );
}
