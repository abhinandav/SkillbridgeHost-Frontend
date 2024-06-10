import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { set_authentication } from '../../../Redux/autehnticationSlice';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import loadingAnimation from '../../../Images/loading animation2.json';
import Testimonial from '../LoginTestimonial';


const UserLogin = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const baseURL = 'https://skillbridge.store';
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const authentication_user = useSelector(state => state.authentication_user);
  console.log('auth admin', authentication_user.isAdmin);
  console.log('auth teacher', authentication_user.isTeacher);
  console.log('name', authentication_user.isAuthenticated);

  useEffect(() => {
    if ((authentication_user.isAuthenticated && !authentication_user.isAdmin && !authentication_user.isTeacher)) {
      console.log('User is already authenticated. Redirecting...');
      navigate('/');
    }
  }, [authentication_user.isAuthenticated, authentication_user.isAdmin, authentication_user.Teacher, navigate]);

  useEffect(() => {
    if (state) {
      setMessage(state);
    }
  }, [state, navigate]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');
    setLoginError('');
    setLoading(true);

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email.trim()) {
      setEmailError('Email is required');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      setLoading(false);
      return;
    }

    if (password.length > 0 && password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('email', event.target.email.value);
    formData.append('password', event.target.password.value);

    setTimeout(async () => {
      try {
        const res = await axios.post(baseURL + '/api/accounts/login/', formData);
        console.log('Response', res);
        if (res.status === 200) {
          localStorage.setItem('access', res.data.access_token);
          localStorage.setItem('refresh', res.data.refresh_token);
          localStorage.setItem('userid', res.data.userid);

          console.log('logined', res.data);
          console.log('Access Token:', res.data.access_token);
          console.log('Refresh Token:', res.data.refresh_token);

          dispatch(
            set_authentication({
              name: jwtDecode(res.data.access_token).username,
              isAuthenticated: true,
              userid: res.data.userid,
              isAdmin: false,
              isTeacher: false,
              isActive: res.data.userid,
            })
          );
          navigate('/');
        }
      } catch (error) {
        console.error('Error during login:', error);
        if (error.response) {
          console.error('Response data:', error.response);
          if (error.response.status === 403) {
            toast.error('Your account is blocked by admin', {
              style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              },
            });
          } else {
            setLoginError('Invalid Credentials');
          }
        } else {
          setLoginError('Invalid Credentials');
        }
      }
      setLoading(false);
    }, 3000);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };


  return (
    <div
      className="px-3  border-t border-b  bg-opacity-40"
      style={{
        backgroundImage: "url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')",
      }}
    >

      <div className="flex -mt-2 px-10 py-5">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <Lottie options={defaultOptions} height={300} width={400} className="p-3 m-2" />
          </div>
        )}

        <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center">
          <div className="py-8 white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
            <Testimonial/>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 flex w-full lg:w-1/2 justify-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form method='post' onSubmit={handleLoginSubmit} className="bg-white rounded-md shadow-2xl p-5">
              <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
              <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>

              <div className='mb-5'>
                <div className="flex items-center border-2 mb-2 py-2 px-3 rounded-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input id="email" className="pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" />
                </div>
                {emailError && <span className="text-md text-red-800 mt-1 mb-5">{emailError}</span>}
              </div>

              <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>

                <input
                  className="pl-4 w-full outline-none border-none"
                  name="password" id="password" placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                />

                <div className="right-0 z-30 inset-y-1 flex items-center px-4">
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="z-30">
                    {!showPassword ? (
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {passwordError ? (
                <>
                  {passwordError && <span className="text-md text-red-800 ">{passwordError}</span>}
                </>
              ) : (
                <>
                  {loginError && <span className="text-md text-red-800 ">{loginError}</span>}
                </>
              )}

              <button type="submit" className="block w-full bg-orange-600 mt-5 py-2 rounded-2xl hover:bg-orange-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>

              <div className="flex justify-between mt-4">
                <Link className='nav-link' to='/fpemail'>
                  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</span>
                </Link>
                <Link className='nav-link' to='/signup'>
                  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</span>
                </Link>
              </div>
              <div className='mt-5'>

              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full bg-indigo-600 shadow-xl shadow-indigo-200 py-10 px-20 flex justify-between items-center">
        <p className="text-white">
          <span className="text-4xl font-medium">Still Confused ?</span>
          <br />
          <span className="text-lg">Book For Free Career Consultation Today!</span>
        </p>
        <button className="px-5 py-3 font-medium text-slate-700 shadow-xl hover:bg-white duration-150 bg-yellow-400">
          BOOK AN APPOINTMENT
        </button>
      </div>
    </div>
  );
};

export default UserLogin;



