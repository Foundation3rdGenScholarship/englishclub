import React from "react";

const ServerErrorPage = () => {
  return (
    <div className="max-w-screen-xl sm:ml-64 flex flex-col items-center justify-center min-h-screen bg-bg-light-mode dark:bg-bg-dark-mode text-text-des-light-mode dark:text-text-des-dark-mode">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-bg-light-mode dark:bg-bg-dark-mode flex items-center justify-center border-2 dark:border-text-des-dark-mode border-text-des-light-mode">
            <div className=" text-3xl font-bold ">!</div>
          </div>
        </div>

        <h1 className="text-2xl font-medium mb-4">Server error</h1>

        <p className="text-base">
          An error occurred in the application and your page could not be
          served. If you are the application owner, check your logs for details.
        </p>
      </div>
    </div>
  );
};

export default ServerErrorPage;
