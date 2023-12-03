"use client"
import React, { useState } from "react";

const FeedbackForm = () => {
  const initialFormData = {
    email: '',
    subject: '',
    message: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Feedback berhasil dikirim:", result);
        alert('Feedback has been sent');

        setFormData(initialFormData);

      } else {
        console.error("Feedback gagal dikirim");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="mt-8 md:w-1/2 mx-auto border my-[80px] pt-2 pb-10 px-12 rounded-md" id="feedback" onSubmit={handleSubmit}>
      <h1 className="flex justify-center mt-[40px] font-extrabold text-main">
        GIVE US FEEDBACK
      </h1>
      <hr className="mt-4 my-[40px]" />
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold text-main">
          EMAIL
        </label>
        <input
          type="email"         
            name="email"
          className="mt-1 p-2 w-full border"
          placeholder="Enter your email"
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-bold text-main">
          SUBJECT
        </label>
        <input
          type="text"
          name="subject"
          className="mt-1 p-2 w-full border"
          placeholder="Enter the subject"
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="feedback" className="block text-sm font-bold text-main">
          MESSAGE
        </label>
        <textarea
          name="message"
          rows="4"
          className="mt-1 p-2 w-full border"
          placeholder="Enter your message"
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="flex justify-center text-center">
        <button
          type="submit"
          className="bg-main text-white font-bold rounded-md py-2 px-12 hover:bg-slate transition duration-300"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
