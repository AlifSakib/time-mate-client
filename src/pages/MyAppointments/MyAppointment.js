import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Edit from "../../components/Edit";

const MyAppointment = ({ my_booking }) => {
  const {
    first_name,
    last_name,
    email,
    _id,
    event: { title, date },
  } = my_booking;

  const [edit, setEdit] = useState(false);
  const [editedDate, setEditedDate] = useState(date);
  console.log(editedDate);
  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleChange = (_id) => {
    setEdit(false);
    fetch(`http://localhost:5000/all-bookings/update-date/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ editedDate, title }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Date Updated");
        }
      });
  };
  return (
    <div>
      {/* <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl relative">
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
        </div>
        <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
        <div className="absolute top-10 right-10">
          <button>
            <Edit></Edit>
          </button>
        </div>
      </div> */}
      {/* ....... */}
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
          {!edit ? (
            <>
              <p className="text-sm leading-5 text-gray-900">
                Appointment Date : {date}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm leading-5 text-gray-900">
                Appointment Date :{" "}
                {
                  <div className="mt-1  w-full">
                    <div className="relative flex items-center justify-center">
                      <input
                        onChange={(e) => setEditedDate(e.target.value)}
                        aria-label="enter Password"
                        type="text"
                        name="appointment_date"
                        className="bg-gray-200 border rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-2 w-full pl-3 "
                        defaultValue={date}
                      />
                      <button
                        onClick={() => handleChange(_id)}
                        className="absolute right-0  mr-3 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-green-900 bg-green-400 rounded-full p-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                }
              </p>
            </>
          )}
        </div>
        <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
        <div className="absolute top-10 right-10">
          <button onClick={handleEdit}>
            <Edit></Edit>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;
