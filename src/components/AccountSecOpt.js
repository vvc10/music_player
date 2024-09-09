import React from 'react';
import { signInWithGoogle, logOut, auth } from '../auth/firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LiaSignOutAltSolid } from "react-icons/lia";
import { CiUser } from "react-icons/ci";

const AccountSecOpt = () => {
  const [user] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div className='flex justify-end w-full p-4'>
        {user ? (
          <div className='items-center flex flex-row gap-[2px]'>
            <p className="text-white hidden md:block">Welcome, {user.displayName}</p>
            <button
              className='ml-4 text-[18px] text-white px-4 py-2 rounded hover:text-[#6200ff] transition-colors duration-200'

              onClick={logOut}
            >
              <LiaSignOutAltSolid />
            </button>



            <button
              className='block md:hidden'

            
            >
              <CiUser />
            </button>
          </div>
        ) : (
          <div className='maintopbarfl_acc'>
            <div className='maintop_box flex justify-end'>
              <button onClick={handleOpenModal} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'>
                <Link to='/login'>Login</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AccountSecOpt;
