import React from "react";

const FeedbackForm = () => {
  return (
    <form className="mt-8 md:w-1/2 mx-auto border my-[80px] pt-2 pb-10 px-12 rounded-md">
      <h1 className="flex justify-center mt-[40px] font-extrabold text-main">
        GIVE US FEEDBACK
      </h1>
      <hr className="mt-4 my-[40px]"/>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold text-main">
          EMAIL
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 p-2 w-full border"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-bold text-main">
          SUBJECT
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="mt-1 p-2 w-full border"
          placeholder="Enter the subject"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="feedback" className="block text-sm font-bold text-main">
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          className="mt-1 p-2 w-full border"
          placeholder="Enter your message"
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
