// Navbar Component
import React from 'react';
import { NotificationIcon } from '../../assets/NotificationIcon';
// import MagnifyingIcons from '../../assets/MagnifyingIcons'
import { MagnifyingIcons } from '../../assets/MagnifyingIcons';
import VerticalBar from '../../assets/VerticalBar';
import { CustomCalendarIcon } from '../../assets/CustomCalendarIcon';
import UserPfp from "../../assets/images/userpfp.png"


export const Navbar = (props) => {
    return (
      <header className="bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
          
          <h1 className="text-xl font-[Nunito] text-[(var--darkBlue)] max-sm:hidden flex flex-row font-bold">
            <span className='mt-2 mr-10 ml-2'><svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 5L0.646447 4.64645L0.292893 5L0.646447 5.35355L1 5ZM13 5.5C13.2761 5.5 13.5 5.27614 13.5 5C13.5 4.72386 13.2761 4.5 13 4.5V5.5ZM4.64645 0.646447L0.646447 4.64645L1.35355 5.35355L5.35355 1.35355L4.64645 0.646447ZM0.646447 5.35355L4.64645 9.35355L5.35355 8.64645L1.35355 4.64645L0.646447 5.35355ZM1 5.5H13V4.5H1V5.5Z" fill="#222222"/>
</svg>
</span>
{props.heading}</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
              style={{borderBottomLeftRadius:'20px',borderBottomRightRadius:'20px',fontFamily:"Nunito"}}
                type="text"
                placeholder="Quick Search..."
                className="pl-8 pr-4 py-2   bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
             <div  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"> <MagnifyingIcons  /></div>
            </div>
            <VerticalBar />
            <button className="p-2 rounded-full bg-[var(--darkBlue)] hover:bg-gray-300">
              <CustomCalendarIcon className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-[var(--darkBlue)] hover:bg-gray-300">
              <NotificationIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"> */}
                {/* <UserIcon className="w-5 h-5 text-gray-600" /> */}
           <div>
            <img className='w-[35px] h-[45px]' style={{borderBottomLeftRadius:'100px',borderBottomRightRadius:"100px"}} src={UserPfp}/>
           </div>
                {/* <ProfileImageClip imageUrl={UserPfp}/> */}
              {/* </div> */}
              <span className="text-sm font-medium" style={{lineHeight:'15px'}}>Agency<br></br>@mail</span>
            </div>
          </div>
        </div>
      </header>
    );
  };
  
  