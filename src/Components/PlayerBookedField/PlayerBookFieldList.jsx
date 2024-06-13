import React from "react";
import PlayerBookedField from "./PlayerBookedField";

export default function PlayerBookFieldList({ booking, fetchBookField }) {
  //   console.log(booking);

  return (
    <>
      {booking && (
        <div className="grid gap-4 md grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 p-4">
          {booking.map((book) => (
            <PlayerBookedField
              key={book._id}
              _id={book._id}
              from={book.disponibility.from}
              to={book.disponibility.from}
              center={book.disponibility.fieldId.center.name}
              image={book.disponibility.fieldId.image[0]}
              typology={book.disponibility.fieldId.typology}
              fetchBook={fetchBookField}
            />
          ))}
        </div>
      )}
    </>
  );
}
