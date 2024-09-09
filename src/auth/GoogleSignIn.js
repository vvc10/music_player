// GoogleSignIn.js
import React from 'react';
import { signInWithGoogle, logOut, auth } from './firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';

const GoogleSignIn = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </div>
  );
};

export default GoogleSignIn;
