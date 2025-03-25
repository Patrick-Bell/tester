import React from 'react';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from '../context/AuthContext';


const LoginPage = ({ isOpen, setIsOpen, setRegisterModalOpen }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { login, googleLogin } = useAuth()

  const handleOpenRegister = () => {
    setIsOpen(false)
    setRegisterModalOpen(true)
  }

  const handleLogin = async (e) => {
    console.log(formData)
    e.preventDefault()
    try{
      const response = await login(formData)
      console.log(response)
    }catch(e){
      console.log(e)
      console.log('error')
    }
  }

  const handleGoogleLogin = async () => {
    const response = await googleLogin()
  }


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-96">
              {/* Header */}
              <div className="flex justify-between items-center">
                <Dialog.Title className="text-xl font-semibold text-gray-800">Log In</Dialog.Title>
                <button onClick={() => setIsOpen(false)}>
                  <XMarkIcon className="w-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              <p className="text-gray-500 text-sm mb-4">Enter your details to continue</p>

              {/* Form */}
              <form>
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    value={formData.email}
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-gray-700 text-sm">Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    value={formData.password}
                  />
                </div>

                <button onClick={(e) => handleLogin(e, formData)} className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-2 mb-2 hover:bg-indigo-700 cursor-pointer">
                  Log In
                </button>
                <button onSuccess={handleGoogleLogin} class="w-full mt2 px-4 py-2 border rounded-lg flex justify-center gap-2 cursor-pointer hover:bg-gray-100">
                    <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                    <span>Login with Google</span>
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="h-px flex-1 bg-gray-300"></div>
                <span className="mx-3 text-gray-500 text-sm">or</span>
                <div className="h-px flex-1 bg-gray-300"></div>
              </div>

              {/* Sign Up Button */}
              <button onClick={() => handleOpenRegister()} className="w-full border py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
                Sign Up
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoginPage;
