import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { Fragment } from 'react'
import { useDispatch,useSelector} from "react-redux";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import{userLogout} from "../../redux/userSlice"

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Destination', href: '/destination', current: false },
  { name: 'Availabilty', href: '/avalibility', current: false },
  { name: 'Bookings', href: '/myBooking', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

 function Navbar() {
  const navigate  = useNavigate()
  const { name,id } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const handleSignout = ()=>{
    const expires = "expires=" + 'Thu, 01 Jan 1970 00:00:01 GMT';
    // Thu, 01 Jan 1970 00:00:01 GMT
    // document.cookie =
    //     "userToken=Bearer "+";" + expires + "; path=/";
    localStorage.removeItem("userToken")
   dispatch(userLogout());
    navigate("/login");
  }
  
  return (
    <Disclosure as="nav" 
    // className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% gap-6">
    className="bg-transparent">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="block h-8 w-auto lg:hidden"
                    // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_G5wsCV6wy25Lk9aPcBt-eEgturCRCK6Qw&usqp=CAU"
                    alt="Your Company"
                  /> */}
                  {/* <img
                    className="hidden h-8 w-auto lg:block"
                    // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_G5wsCV6wy25Lk9aPcBt-eEgturCRCK6Qw&usqp=CAU"
                    alt="Your Company"
                  /> */}
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ?'bg-transparent text-black' : 'text-black hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className=" "
                >
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        src="data:image/png;base64,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"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/register"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Signup
                          </a>
                        )}
                      </Menu.Item>
                      {!id&&<Menu.Item>
                        {({ active }) => (
                          <a
                            href="/login"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Login
                          </a>
                        )}
                      </Menu.Item>}
                     { id&&<Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={()=>{
                              handleSignout()
                            }}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                           Logout
                          </a>
                        )}
                      </Menu.Item>}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar;
