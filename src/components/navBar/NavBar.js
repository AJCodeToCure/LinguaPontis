// Navbar Component
import React, { useState, useEffect } from 'react';
import { NotificationIcon } from '../../assets/NotificationIcon';
// import MagnifyingIcons from '../../assets/MagnifyingIcons'
import { MagnifyingIcons } from '../../assets/MagnifyingIcons';
import VerticalBar from '../../assets/VerticalBar';
import { CustomCalendarIcon } from '../../assets/CustomCalendarIcon';
import UserPfp from "../../assets/images/userpfp.png"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_Base } from '../api/config';


export const Navbar = (props) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('access_token');
  const [userData, setUserData] = useState();
  const API = API_Base;

  const handleUpdate = () => {
    navigate('/update-user')
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API}/api/update_profile/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserData(response.data);  // Store the members in the state

    } catch (error) {
      console.error('Error fetching members:', error.response ? error.response.data : error.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between p-4">

        <h1 className="text-xl font-[Nunito] text-[(var--darkBlue)] max-sm:hidden flex flex-row font-bold">
          <span className='mt-2 mr-10 ml-2'><svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L0.646447 4.64645L0.292893 5L0.646447 5.35355L1 5ZM13 5.5C13.2761 5.5 13.5 5.27614 13.5 5C13.5 4.72386 13.2761 4.5 13 4.5V5.5ZM4.64645 0.646447L0.646447 4.64645L1.35355 5.35355L5.35355 1.35355L4.64645 0.646447ZM0.646447 5.35355L4.64645 9.35355L5.35355 8.64645L1.35355 4.64645L0.646447 5.35355ZM1 5.5H13V4.5H1V5.5Z" fill="#222222" />
          </svg>
          </span>
          {props.heading}</h1>
        <div className="flex items-center max-sm:w-full space-x-4 max-sm:flex-col">
          <div className="relative">
            <input
              style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', fontFamily: "Nunito" }}
              type="text"
              placeholder="Quick Search..."
              className="pl-8 pr-4 py-2   bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"> <MagnifyingIcons /></div>
          </div>
          <span className='max-sm:hidden'> <VerticalBar /></span>

          <span className='flex gap-x-4 max-sm:justify-between max-sm:gap-x-5 max-sm:mt-5'>
            <button className="p-3 rounded-full bg-[var(--darkBlue)] hover:bg-gray-300">
              <CustomCalendarIcon className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full bg-[var(--darkBlue)] hover:bg-gray-300">
              <NotificationIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"> */}
              {/* <UserIcon className="w-5 h-5 text-gray-600" /> */}
              <div>
                <button onClick={handleUpdate}>
                  <img
                    className='w-[35px] h-[45px]'
                    style={{ borderBottomLeftRadius: '100px', borderBottomRightRadius: "100px" }}
                    src={userData && userData.image ? `${API}/media/${userData.image}` : UserPfp}
                    alt="Profile"
                  />


                </button>
              </div>
              {/* <ProfileImageClip imageUrl={UserPfp}/> */}
              {/* </div> */}

              <span onClick={handleUpdate} className="text-sm font-medium cursor-pointer" style={{ lineHeight: '15px' }}>{userData?.first_name}<br></br>{userData?.last_name}</span>
              {/* <span className="text-sm font-medium" style={{ lineHeight: '15px' }}>
                <button onClick={handleUpdate}></button>
              </span> */}
            </div>
          </span>
        </div>
      </div>
    </header>
  );
};

