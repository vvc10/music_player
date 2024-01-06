import React, { useState } from 'react';

const AccountSecOpt = () => {
  const [user, setUser] = useState(false);
  return (
    <>
      {
        user ? (
          <div className='maintopbarfl_acc'>
            <div className='maintop_box'>
              <div className='acc_profile'>Y</div>
              <p>You</p>
            </div>

          </div>
        )
          : (
            <div className='maintopbarfl_acc'>
            <div className='maintop_box'>
              <button>Login</button>
            </div>

          </div>
          )
      }

    </>
  )
}

export default AccountSecOpt
