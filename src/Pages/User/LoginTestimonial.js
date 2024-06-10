import React from 'react';

const Testimonial = () => {
  return (
    <div>
      <div className=" mt-2 border border-red-500 grid grid-cols-1 md:lg:xl:grid-cols-2 group bg-white shadow-xl shadow-neutral-100 border">
        
        <div className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-orange-50 cursor-pointer transform transition duration-300 ease-in-out hover:scale-105">
          <span className="p-5 rounded-full bg-red-500 text-white shadow-lg shadow-red-200 transition duration-300 ease-in-out group-hover:rotate-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </span>
          <p className="text-xl font-medium text-slate-700 mt-3">Most Experienced Team</p>
          <p className="mt-2 text-sm text-slate-500">Team BrainEdge education is a bunch of highly focused, energetic set of people.</p>
        </div>

        <div className="p-10 flex flex-col items-center text-center group md:lg:xl:border-b hover:bg-orange-50 cursor-pointer transform transition duration-300 ease-in-out hover:scale-105">
          <span className="p-5 rounded-full bg-yellow-500 text-white shadow-lg shadow-yellow-200 transition duration-300 ease-in-out group-hover:rotate-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </span>
          <p className="text-xl font-medium text-slate-700 mt-3">Admission Process Guidance</p>
          <p className="mt-2 text-sm text-slate-500">Professional advice for higher education abroad and selecting the top institutions worldwide.</p>
        </div>

        <div className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r hover:bg-orange-50 cursor-pointer transform transition duration-300 ease-in-out hover:scale-105">
          <span className="p-5 rounded-full bg-lime-500 text-white shadow-lg shadow-lime-200 transition duration-300 ease-in-out group-hover:rotate-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </span>
          <p className="text-xl font-medium text-slate-700 mt-3">Best Track Record</p>
          <p className="mt-2 text-sm text-slate-500">Yet another year! Yet another jewel in our crown!</p>
        </div>

        <div className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r hover:bg-orange-50 cursor-pointer transform transition duration-300 ease-in-out hover:scale-105">
          <span className="p-5 rounded-full bg-teal-500 text-white shadow-lg shadow-teal-200 transition duration-300 ease-in-out group-hover:rotate-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </span>
          <p className="text-xl font-medium text-slate-700 mt-3">Free Mock Exams</p>
          <p className="mt-2 text-sm text-slate-500">Get topic-wise tests, section-wise, and mock tests for your preparation.</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
