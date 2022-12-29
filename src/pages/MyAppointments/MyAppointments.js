import React, { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../context/AuthProvider";
import MyAppointment from "./MyAppointment";

const MyAppointments = () => {
  const { user } = useContext(AuthContext);
  const { data: my_bookings = [], refetch } = useQuery({
    queryKey: ["my_bookings"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/my-bookings/${user?.email}`
      );
      const data = await res.json();

      return data;
    },
  });
  console.log(my_bookings);
  return (
    <div>
      <div className="bg-gray-100">
        <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0">
            <svg
              viewBox="0 0 88 88"
              className="w-full max-w-screen-xl text-indigo-100"
            >
              <circle fill="currentColor" cx="44" cy="44" r="15.5" />
              <circle
                fillOpacity="0.2"
                fill="currentColor"
                cx="44"
                cy="44"
                r="44"
              />
              <circle
                fillOpacity="0.2"
                fill="currentColor"
                cx="44"
                cy="44"
                r="37.5"
              />
              <circle
                fillOpacity="0.3"
                fill="currentColor"
                cx="44"
                cy="44"
                r="29.5"
              />
              <circle
                fillOpacity="0.3"
                fill="currentColor"
                cx="44"
                cy="44"
                r="22.5"
              />
            </svg>
          </div>
          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {my_bookings.map((my_booking) => (
              <MyAppointment
                key={my_booking._id}
                my_booking={my_booking}
              ></MyAppointment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
