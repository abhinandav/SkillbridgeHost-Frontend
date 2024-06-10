import React, { useEffect, useState } from 'react';
import logo from '../../Images/default/favicon.png'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import html2pdf from 'html2pdf.js';
import { FaDownload } from "react-icons/fa";



const Certificate = () => {
    const baseURL = "https://skillbridge.store";
  const authentication_user=useSelector(state=>(state.authentication_user))
  const {id}=useParams()
  const [detail,setDetail]=useState({'course_name':null,'user_name':null})

  const generatePDF = () => {
    const element = document.getElementById('maindiv');
    html2pdf()
      .from(element)
      .save(`Certificate.pdf`);
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + '/student/certificate/', {
          params: {
            id: id,
            uid: authentication_user.userid
          }
        }
      );
        if (response.status === 200) {
          setDetail(response.data);
          console.log(response.data);
        } else {
          console.log('Error occurred');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, authentication_user.userid]);


  console.log(detail);

    const styles = {
    body: {
      margin: 0,
      padding:' 50px',
      color: 'black',
      display: 'table',
      fontFamily: 'Georgia, serif',
      fontSize: '24px',
      textAlign: 'center',
    },
    container: {
      border: '20px solid tan',
      width: '750px',
      height: '563px',
      display: 'table-cell',
      verticalAlign: 'middle',
    },
    logo: {
      color: 'tan',
      fontSize: '36px',
      marginBottom: '20px',
    },
    mainlogo: {
       width:'100px'
      },
    assignment: {
      fontSize: '24px',
      marginBottom: '20px',
    },
    person: {
      borderBottom: '2px solid black',
      fontSize: '32px',
      fontStyle: 'italic',
      margin: '20px auto',
      width: '400px',
    },
    reason: {
      fontSize: '24px',
      margin: '20px',
    },
  };

  return (<>
    <div id='maindiv' className=' flex justify-center item-center'>
        <div style={styles.body}>
        <div style={styles.container}>
            <img src={logo} style={styles.mainlogo} className='ml-80 mb-10' alt=''/>
            <div style={styles.logo}>Course Completion Certificate</div>
            <div style={styles.assignment}>This certificate is presented to</div>
            <div style={styles.person}>{detail.user_name}</div>
            <div className=''>
                For Successfully completing course -
            </div>
            <div className='px-5'>{detail.course_name}</div>
        </div>
        </div>
    </div>

    <div className='flex pb-10 bg-gray-200 flex justify-center'>
                <button onClick={generatePDF} className='text-ornage-500 mr-10 mt-5 flex border p-3 border-gray-500 rounded-xl text-white bg-orange-500'><span>Download</span> <FaDownload className='ml-3 mt-1' /></button>
                <Link className='mt-5 border p-3 border-gray-500 rounded-xl bg-blue-500  text-white-500' to={`/course_view/${id}`}>
                 <span className='text-white mt-5'>Go back</span>
                 </Link>
    </div>
  </>);
};

export default Certificate;
