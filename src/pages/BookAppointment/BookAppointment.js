import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";

const BookAppointment = () => {
  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  const info = [];

  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [booking, setBooking] = useState([]);

  const handleDateClick = (arg) => {
    const selectedDate = arg.dateStr;
    console.log(selectedDate);
  };

  booking.map((b) => info.push(b.event));
  console.log(info);

  useEffect(() => {
    fetch("http://localhost:5000/all-bookings")
      .then((res) => res.json())
      .then((data) => {
        setBooking(data.data);
      });
  }, []);

  const initialState = {
    firstname: "",
    lastname: "",
    email: user?.email,
    phone: "",
    appointment_date: "",
    event: "",
    checkbox: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };

      case "TOGGLE":
        return {
          ...state,
          checkbox: !state.checkbox,
        };

      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleBooking = (e) => {
    e.preventDefault();

    axios.all([
      axios
        .post(`http://localhost:5000/all-bookings`, {
          first_name: state.firstname,
          last_name: state.lastname,
          email: state.email,
          event: {
            date: formatDate(startDate),
            title: state.event,
          },
        })
        .then(function (res) {
          if (res.data.success) {
            toast.success("Appointment Booked");
          }
        })
        .catch(function (error) {
          console.log(error);
        }),
    ]);
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-4xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
        <form onSubmit={handleBooking}>
          <div>
            <div className="w-full bg-white px-10">
              <h1
                tabIndex={0}
                aria-label="profile information"
                className="focus:outline-none text-3xl font-bold text-gray-800 mt-2"
              >
                Book Appointment
              </h1>
              <p
                role="contentinfo"
                className=" focus:outline-nonetext-sm font-light leading-tight text-gray-600 mt-4"
              >
                Fill in the data for book an appointment. <br />
              </p>
              <h2
                aria-label="enter Personal data"
                className="text-xl font-semibold leading-7 text-gray-800 mt-10"
              >
                Booking Details
              </h2>
              <p className="text-sm font-light leading-none text-gray-600 mt-0.5">
                Your details and Booking time.
              </p>
              <div className="mt-8 md:flex items-center">
                <div className="flex flex-col">
                  <label className="mb-3 text-sm leading-none text-gray-800">
                    First name
                  </label>
                  <input
                    onBlur={(e) =>
                      dispatch({
                        type: "INPUT",
                        payload: { name: e.target.name, value: e.target.value },
                      })
                    }
                    type="name"
                    name="firstname"
                    tabIndex={0}
                    aria-label="Enter first name"
                    className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                    placeholder="William"
                    required
                  />
                </div>
                <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                  <label className="mb-3 text-sm leading-none text-gray-800">
                    Last name
                  </label>
                  <input
                    onBlur={(e) =>
                      dispatch({
                        type: "INPUT",
                        payload: { name: e.target.name, value: e.target.value },
                      })
                    }
                    type="name"
                    name="lastname"
                    tabIndex={0}
                    aria-label="Enter last name"
                    className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                    placeholder="Smith"
                    required
                  />
                </div>
              </div>
              <div className="mt-12 md:flex items-center">
                <div className="flex flex-col">
                  <label className="mb-3 text-sm leading-none text-gray-800">
                    Email Address
                  </label>
                  <input
                    onBlur={(e) =>
                      dispatch({
                        type: "INPUT",
                        payload: { name: e.target.name, value: e.target.value },
                      })
                    }
                    type="email"
                    name="email"
                    tabIndex={0}
                    aria-label="Enter email Address"
                    className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                    placeholder={user?.email}
                    required
                  />
                </div>
                <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                  <label className="mb-3 text-sm leading-none text-gray-800">
                    Phone number
                  </label>
                  <input
                    onBlur={(e) =>
                      dispatch({
                        type: "INPUT",
                        payload: { name: e.target.name, value: e.target.value },
                      })
                    }
                    type="text"
                    name="phone"
                    tabIndex={0}
                    aria-label="Enter phone number"
                    className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                    placeholder="+81 839274"
                    required
                  />
                </div>
              </div>
              <div className="mt-12 md:flex items-center">
                <div className="flex flex-col">
                  <label className="mb-3 text-sm leading-none text-gray-800">
                    Appointment Date
                  </label>

                  <DatePicker
                    name="appointment_date"
                    selected={startDate}
                    className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                    placeholder={startDate}
                    onChange={(date) => {
                      dispatch({
                        type: "INPUT",
                        payload: {
                          name: "appointment_date",
                          value: date,
                        },
                      });
                      setStartDate(date);
                    }}
                  />
                </div>
                <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                  <label className="mb-3 text-sm leading-none text-gray-800">
                    Event Name
                  </label>
                  <input
                    onBlur={(e) =>
                      dispatch({
                        type: "INPUT",
                        payload: { name: e.target.name, value: e.target.value },
                      })
                    }
                    type="name"
                    name="event"
                    tabIndex={0}
                    aria-label="Enter place of birth"
                    className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                    placeholder="Front End"
                    required
                  />
                </div>
              </div>
              <div className="mt-12">
                <div className="py-4 flex items-center">
                  <div className="bg-white dark:bg-gray-800 border rounded-sm border-gray-400 dark:border-gray-700 w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                    <input
                      onClick={(e) =>
                        dispatch({
                          type: "TOGGLE",
                        })
                      }
                      type="checkbox"
                      name="checkbox"
                      tabIndex={0}
                      aria-label="I agree with the terms of service"
                      defaultChecked={state.checkbox}
                      className="checkbox opacity-0 absolute cursor-pointer w-full h-full"
                    />
                    <div className="check-icon hidden bg-blue-500 text-white rounded-sm">
                      <svg
                        className="icon icon-tabler icon-tabler-check"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M5 12l5 5l10 -10" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm leading-none ml-2">
                    I agree with the{" "}
                    <span className="text-indigo-700">terms of service</span>
                  </p>
                </div>
              </div>
              <button
                type="submit"
                aria-label="Next step"
                disabled={!state.checkbox}
                className="flex items-center justify-center py-4 px-7 focus:outline-none bg-white border rounded border-gray-400 mt-7 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
              >
                <span className="text-sm font-medium text-center text-gray-800 capitalize">
                  Confirm Booking
                </span>
                <svg
                  className="mt-1 ml-3"
                  width={12}
                  height={8}
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.01 3H0V5H8.01V8L12 4L8.01 0V3Z" fill="#242731" />
                </svg>
              </button>
            </div>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n          .checkbox:checked + .check-icon {\n              display: flex;\n          }\n      ",
              }}
            />
          </div>
        </form>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            weekends={false}
            droppable={true}
            editable={true}
            events={[...info]}
          />
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
