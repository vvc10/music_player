import React from 'react';
import { signInWithGoogle } from '../auth/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

const LoginPage = ({ onClose }) => {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const user = await signInWithGoogle();
            if (user) {
                navigate('/'); // Navigate to home after successful login
            }
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-[100000000]'>
            <div className='relative bg-black-800 rounded-lg p-8 w-[90%] max-w-[100%] h-fit transform transition-transform duration-300 ease-out scale-100 animate-pop'>
                <h1 className='text-white text-2xl mb-4 text-center w-[100%]'>Login</h1>
                <p className='text-white text-center w-[100%]'>Hello pookie's, welcome back!</p>
                <div className='text-center w-[100%]'>
                    <button
                    style={{backgroundColor:'white'}}
                        onClick={handleGoogleSignIn}
                        className='mx-auto w-fit text-[16px] text-black rounded-[10px] px-4 py-3 my-4 flex flex-row gap-[10px] items-center'>
                      <FaGoogle/>   Sign in with Google
                    </button>
                </div>

            </div>
        </div>
    );
}

export default LoginPage;
