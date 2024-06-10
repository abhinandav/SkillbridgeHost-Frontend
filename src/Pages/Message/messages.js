import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Link, useParams } from 'react-router-dom';
import msgimg from '../../Images/msg1.jpg'
import loadingAnimation from '../../Images/loading animation2.json'

function Messages() {
    const baseURL = "https://skillbridge.store";
    const token = localStorage.getItem('access');

    const { orderId } = useParams()
    const chatContainerRef = useRef(null);
    const [client, setClient] = useState('');
    const [receiverId, setRecieverId] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const authentication_user = useSelector(state => state.authentication_user);
    // console.log('auth',authentication_user);
    const userid=parseInt(authentication_user.id)
    console.log('auth',userid);
    console.log('orderid',orderId);


    


    useEffect(() => {
        if (orderId) {
            console.log(orderId);
            const wsURL = `wss://skillbridge.store/ws/socket-server/${orderId}/`;
            console.log(wsURL);
            connectToWebSocket(wsURL);
            return () => {
                client && client.close();
            };
        }
    }, [orderId]);



    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };


// fetch reciver(teacher)

const fetchReciever = async (orderId) => {
    try {
        const response = await axios.get(`${baseURL}/chat/created_teacher/${orderId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setRecieverId(response.data[0].id)
        console.log('rrr',response.data);

        return response.data;
    } catch (error) {
        console.error('Error fetching added user:', error);
        return null;
    }
};

useEffect(() => {
    if (orderId) {
        fetchReciever(orderId)
    }
}, [orderId]);



// websocket connection

    const connectToWebSocket = (url) => {
        if (client) {
        client.close();
        setChatMessages([]);
        }


        const newClient = new W3CWebSocket(url);
        setClient(newClient);
        newClient.onopen = () => {
            console.log("WebSocket Client Connected");
            fetchExistingMessages();
        };
    
       


        newClient.onmessage = (message) => {
            const data = JSON.parse(message.data);
            
            if (parseInt(data.sender) === parseInt(userid)) {
                setChatMessages((prevMessages) => [...prevMessages, { ...data, sender: userid }]);
            } else {
                setChatMessages((prevMessages) => [...prevMessages, data]);
            }
            fetchExistingMessages()
        };

    };


    const fetchExistingMessages = async () => {
        try {
          const response = await fetch(
            `${baseURL}/chat/chat-messages/${orderId}/`
          );
  
          if (!response.ok) {
            console.error(
              "Error fetching existing messages. Status:",
              response.status
            );
            return;
          }
  
          const data = await response.json();
          console.log('data',data);
  
          const messagesTextArray = data.map((item) => ({
            message: item.message,
            sender: item.sender,
            receiver:item.receiver,
            timestamp:item.timestamp,
            receiver_profile_pic:item.receiver_profile_pic,
            sender_profile_pic:item.sender_profile_pic
          }));
  
          setChatMessages(messagesTextArray);
          
        } catch (error) {
          console.error("Error fetching existing messages:", error);
        }
    };



    const sendMessage = (e) => {
        e.preventDefault();
        if (!client || client.readyState !== client.OPEN) {
          console.error("WebSocket is not open");
          return;
        }

        if (message.length===0){
            return
        }
    
        const senderId = authentication_user.userid;
        const messageData = { 
            'message': message, 
            'order_id': orderId, 
            'sender_id': senderId, 
            'receiver_id': receiverId 
        };
        const messageString = JSON.stringify(messageData);
    
        console.log("Sending Message:", messageString);
    
        client.send(messageString);
        setMessage('')

        // fetchExistingMessages();
    };
    


    // sidebar
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get(baseURL+'/chat/ordercourse_teachers/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTeachers(response.data);
                console.log('data recieved.......',response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);


    // chat screen

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]); 

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };


    console.log("Chat messages:", chatMessages);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };


    return (

    
        <div style={{height:570}} className="flex  antialiased text-gray-800">

            <div className="flex flex-row h-full w-full overflow-x-hidden">

        {/*-------------------- sidebar start --------------------*/}

                
            <div style={{width:220}} className="flex flex-col py-8 px-10 pl-2 mt-3 pr-5 w-64 bg-white flex-shrink-0 border-r border-gray-50">
                <div className="flex flex-row items-center justify-center h-12 w-full">
                    <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10" >
                        <svg className="w-6 h-6"  fill="none"  stroke="currentColor"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        ></path>
                        </svg>
                    </div>
                    <div className="ml-2 font-bold text-2xl">Chat</div>
                </div>
                
                <div className="flex flex-row mt-8 ml-5">
                    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 ">
                        {teachers.map((order) => (
                            <span key={order.id} className={`flex flex-row items-center hover:bg-gray-150 ${parseInt(orderId) === parseInt(order.id) ? 'bg-gray-300' : ''} rounded-lg p-1 px-10`}>
                                <Link to={`/inbox/${order.id}/`} className="flex items-center">
                                    <div className="h-8 w-8 bg-indigo-200 rounded-full flex items-center justify-center">
                                        <img src={`${baseURL}/media/${order.user_profile.profile_pic}`} alt='profile'  className="h-8 w-8 bg-indigo-200 rounded-full flex items-center justify-center"/>
                                    </div>
                                    <div className="ml-5  font- text-md">{order.user.username}</div>
                                </Link>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        {/*----------------------sidebar end--------------------*/}

        { !(orderId === 'undefined' ) ? (
            <>
            <div className="flex flex-col flex-auto h-full p-6">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-50 h-40 p-4" >
                    <div className="flex flex-col flex-auto h-full px-3">

                        <div className="flex flex-col flex-auto flex-shrink-0 overflow-hidden rounded-2xl bg-gray-50 h-full ">
                            <div ref={chatContainerRef} className="flex flex-col h-full overflow-y-auto  mb-4" style={{ WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                                <div className="flex flex-col h-full">

                                    {chatMessages.map((message, index) => (
                                        <div key={index}>
                                            {!(parseInt(message.sender) === parseInt(authentication_user.userid) ) ? (
                                                <div className="col-start-1 col-end-5 p-3 rounded-lg mb-2 ml-auto">
                                                <div className="flex flex-row items-center">
                                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 flex-shrink-0">
                                                    <img src={`${baseURL}${message.receiver_profile_pic}`} alt='profile'  className="h-8 w-8 bg-indigo-200 rounded-full flex items-center justify-center"/>
                                                    </div>

                                                    {/* <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                        <div>{message.message}</div>
                                                    </div> */}
                                                    <div className="flex flex-col relative ml-3 bg-white py-1 px-4 shadow rounded-xl">
                                                        <div style={{ maxWidth: 500 }} className='text-sm mr-5 '>{message.message}</div>
                                                        <div className="flex justify-end">
                                                            <div style={{ fontSize: '10px' }} className='text-sm text-gray-500 ml-5 -mt-1'>
                                                                {formatTime(message.timestamp)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            ) : (
                                            <div className="col-start-8 col-end-12 p-3 rounded-lg mb-2 mr-auto">
                                            <div className="flex items-center justify-start flex-row-reverse">
                                                <div className=" ml-2 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 flex-shrink-0">
                                                    <img src={`${baseURL}${message.sender_profile_pic}`} alt='profile'  className="h-8 w-8 bg-indigo-200 rounded-full flex items-center justify-center"/>

                                                </div>

                                                {/* <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                    <div>{message.message}</div>
                                                </div> */}
                                                <div className="flex flex-col relative ml-3 bg-white py-1 px-4 shadow rounded-xl">
                                                    <div style={{ maxWidth: 500 }} className='text-sm mr-5 '>{message.message}</div>
                                                        <div className="flex justify-end">
                                                            <div style={{ fontSize: '10px' }} className='text-sm text-gray-500 ml-5 -mt-1'>
                                                                {formatTime(message.timestamp)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                            </div>
                                        </div>
                                    )}
                                        </div>
                                    ))}




                                </div>
                            </div>                            
                        </div>

                        
                    
                        <form onSubmit={sendMessage} className='flex -mt-10 '>
                            <div className="flex flex-row items-center h-16 rounded-xl bg-gray w-full px-4">
                                <div className="flex-grow ml-4">
                                    <div className="relative w-full">
                                    <input
                                        type="text"
                                        name="message"
                                        value={message}
                                        onChange={handleMessageChange}
                                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                    />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                        <span>Send</span>
                                        <span className="ml-2">
                                        <svg
                                            className="w-4 h-4 transform rotate-45 -mt-px"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            ></path>
                                        </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            </>
            ):(
                <div >
                    <div className='flex flex-col justify-center'>
                        <img src={msgimg} className='mt-4 pl-10 mx-80 ' style={{height:450 , width:520}} alt=''/>
                        <h1 className='px-40 mx-80 text-lg font-semibold'>Select a User To start Conversation</h1>
                    </div>
                    
                </div>
            )}




            </div>
        </div>
      );
    }
    
export default Messages;



                 