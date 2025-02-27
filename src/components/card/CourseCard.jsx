import React from "react";

const CourseCard = ({ title, img, des }) => {
  return (
    <div className="flex justify-center md:justify-start">
      <div className="relative flex flex-col md:flex-row items-center shadow-md">
        <img
          src={img} // Replace with your actual image path
          alt="Woman using phone"
          className=" object-cover w-[350px]  lg:w-96 md:rounded"
        />
        <div className="block md:absolute bg-white p-6 shadow-md md:ml-6  w-[350px] md:w-[360px] lg:w-[400px] left-[90px] top-[20px] lg:left-[250px] h-[200px] lg:top-[50px] md:rounded-tl-[50px] md:rounded-br-[50px]">
          <h2 className="text-xl font-bold text-blue-700 md:text-heading-4 lg:text-heading-3 ">
            {title}
          </h2>
          <p className="text-gray-700 mt-2 md:text-des lg:text-des-3">
            {des}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
