import React from "react";
import { toast } from "react-hot-toast";

const Schedules = ({ all_booking, refetch }) => {
  const {
    first_name,
    last_name,
    email,
    status,
    _id,
    event: { title, date },
  } = all_booking;

  const handleStatus = (_id) => {
    fetch(`http://localhost:5000/all-bookings/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(`Completed`);
          refetch();
        }
      });
  };
  return (
    <div>
      <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl relative">
        <div className="p-5">
          <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
            <svg
              className="w-8 h-8 text-deep-purple-accent-400"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <p className="mb-2 font-bold">{title}</p>
          <p className="text-sm leading-5 text-gray-900">
            Name : {`${first_name} ${last_name}`}
          </p>
          <p className="text-sm leading-5 text-gray-900">Email : {email}</p>
          <p className="text-sm leading-5 text-gray-900">
            Appointment Date : {date}
          </p>
          <button
            onClick={() => handleStatus(_id)}
            className={
              status
                ? "text-sm leading-5  bg-green-300  rounded px-2 py-1 mt-2 text-white"
                : "text-sm leading-5  bg-red-300 rounded px-2 py-1 mt-2 text-white"
            }
          >
            {status ? "Completed" : "Pending . . ."}
          </button>
        </div>
        <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
      </div>
    </div>
  );
};

export default Schedules;
