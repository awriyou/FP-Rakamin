import React from "react";

const Contact = () => {
    const brand = [ "images/contact.png" ]
        
  return (
    <div className="hidden sm:block ">
      <div className="my-[80px]">
        <div className="w-full hidden-0 relative">
             {brand.map((each,index) =>(
                    <div key={index} className='flex justify-center items-start w-screen relative'>
                        <img className='w-screen' src={each}/>
                        <div className="absolute w-72 text-center top-52 right-48">
                          <h1 className='text-xl text-light font-bold pb-8'>OUR TEAM HERE TO RESPONSE YOUR QUESTION</h1>
                          <button className="bg-black text-white font-bold rounded-md py-2 px-12 hover:opacity-75 transition duration-300">
                            CONTACT US
                          </button>                      
                        </div>
                    </div>
                ))}
        </div>
      </div>
    </div>
  );
};

export default Contact