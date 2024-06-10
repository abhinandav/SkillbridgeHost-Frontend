import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseSearch from './Searchbar';

const CourseList = () => {
  const baseURL = "https://skillbridge.store";
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true); 

  const fetchCourses = (url) => {
    axios.get(url)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const filteredCourses = response.data.filter(course => !course.is_blocked && course.is_accepted);
          setCourses(filteredCourses);
          setIsLoading(false)
          // setTimeout(() => {
          //   setIsLoading(false);
          // }, 1000);
        } else {
          console.error("Error fetching courses: Data is not an array or undefined", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  useEffect(() => {
    fetchCourses(`${baseURL}/student/courses/?search=${searchQuery}`);
  }, [searchQuery]);

  return (
    <>
      <CourseSearch setSearchQuery={setSearchQuery} />
      <div className="px-10 bg-gray-100 flex items-center justify-center">
        <div className="container max--screen-lg mx-auto my-10">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <h1 className="text-4xl font-bold  m-5 text-gray-500">All Courses</h1>
              <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">

              {isLoading && Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>
                    <div className="relative my-10 block p-8 overflow-hidden border border-red-600 bg-white border-slate-300 rounded-lg ml-6 mr-6">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-400 rounded"></div>
                            <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                          </div>
                        </div>
                        <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                      </div>
                    </div>
                  </div>
                ))}

                {!isLoading && courses.length === 0 && <tr><td>No Courses Available now</td></tr>}
                {!isLoading && courses.map((course) => (
                  <div key={course.id}>
                    <Link to={`/course_view/${course.id}`}>
                      <span className="relative my-10 block p-8 overflow-hidden border border-red-600 bg-white border-slate-300 rounded-lg ml-6 mr-6">
                        <div className="justify-between sm:flex">
                          <div>
                            <h5 className="text-2xl font-bold text-slate-900">
                              {course.course_name}
                            </h5>
                            <p className="mt-1 text-xl font-medium text-slate-600">By  {course.user}  </p>
                          </div>
                          <div className="flex-shrink-0 hidden ml-3 sm:block">
                            <img
                              className="object-cover w-100 h-16 rounded-lg shadow-sm"
                              src={course.thumbnail}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="mt-4 sm:pr-8">
                          <p className="text-md text-slate-500">
                            {course.description}
                          </p>
                        </div>
                        <dl className="flex mt-6">
                          <div className="flex flex-col-reverse">
                            <dt className="text-sm font-medium text-slate-600">Published</dt>
                            <dd className="text-xs text-slate-500"> {course.date_added}</dd>
                          </div>
                          <div className="flex flex-col-reverse ml-3 sm:ml-6">
                            <dt className="text-sm font-large text-slate-600">Level</dt>
                            <dd className="text-xs text-slate-500">{course.level}</dd>
                          </div>
                          <div className="flex flex-col-reverse ml-3 sm:ml-6 mx-20">
                            <dd className="text-md text-slate-500 text-slate-500"><strike>Rs {course.original_price}</strike></dd>
                            <dd className="text-xl text-green-500">Rs {course.offer_price}</dd>
                          </div>
                        </dl>
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseList;



