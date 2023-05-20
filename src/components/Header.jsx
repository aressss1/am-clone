'use client'

import Image from "next/image"
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon
} from "@heroicons/react/outline"
import { auth, provider } from "../../firebase";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "@/store/basketSlice";
import { loginCompeleted, logoutCompeleted, selectUser } from "@/store/userSlice";
import { LoginIcon } from "@heroicons/react/solid";
import { signInWithPopup, signOut } from "firebase/auth";



const Header = () => {
    const dispatch = useDispatch()

    const router = useRouter();
    const items = useSelector(selectItems)

    const loggedInUser = useSelector(selectUser)



    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const loginUser = result.user;

                dispatch(loginCompeleted(loginUser))

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode, errorMessage)
            });

    }

    //not working
    const signnOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            console.log(error)
        });
        dispatch(logoutCompeleted)

    }
    return (
        <header>
            {/* // Top Nav */}
            <div
                className="flex items-center bg-amazon_blue p-1 flex-grow py-2"
            >
                <div
                    onClick={() => router.push('/')}
                    className="mt-2 flex items-center flex-grow sm:flex-grow-0"
                >
                    <Image
                        src="https://links.papareact.com/f90"
                        width={160}
                        height={40}
                        // fill
                        alt="Amazon Logo"
                        className="cursor-pointer pl-4 mt-2"
                    />
                </div>

                {/* SearchBar */}
                <div
                    className="bg-yellow-400 hover:bg-yellow-500 h-10 rounded-md ml-3 hidden sm:flex flex-grow cursor-pointer items-center"
                >
                    <input
                        className="p-2 h-full w-6 flex-shrink rounded-l-md flex flex-grow hover:outline-none px-4 "
                        type="text" />
                    <SearchIcon className="h-12 p-4" />
                </div>

                {/* RS Icon Section */}
                <div
                    className="text-white flex  items-center text-sm space-x-6 mx-6 whitespace-nowrap "
                >
                    {loggedInUser ?
                        <>
                            <div
                                onClick={signnOut}
                                className="link">
                                <p>Hello {loggedInUser?.displayName}</p>
                                <p className="font-extrabold md:tetx-sm" >Account & Lists</p>
                            </div>
                        </>
                        :
                        <>
                            <div
                                onClick={signIn}
                                className="link">
                                <p>Log In</p>
                                <p className="font-extrabold md:tetx-sm" >
                                    <LoginIcon className="h-7" />
                                </p>
                            </div>
                        </>
                    }

                    <div
                        // onClick={loggedInUser && router.push('/orders')} 
                        className="link">
                        <p>Returns</p>
                        <p className="font-extrabold md:tetx-sm">& Orders</p>
                    </div>

                    <div
                        onClick={() => router.push('/checkout')}
                        className="link relative flex items-center">
                        <span
                            className="absolute -top-1 right-0  md:right-10 w-4 h-5 bg-yellow-400 text-center rounded-full text-black font-bold"
                        >
                            {items?.length}
                        </span>
                        <ShoppingCartIcon className="h-10" />
                        <p
                            className="hidden md:inline font-extrabold md:tetx-sm mt-2"
                        >
                            Basket
                        </p>
                    </div>
                </div>
            </div>

            {/* // Bottom Nav */}
            <div
                className="flex items-center bg-amazon_blue-light text-white text-sm space-x-5 p-2 pl-6 "
            >
                <p className="link flex items-center" >
                    <MenuIcon className="h-6 mr-1" />
                    All
                </p>
                <p className="link">Prime Video</p>
                <p className="link">Amazon Business</p>
                <p className="link">Today's Deals</p>
                <p className="link hidden lg:inline-flex">Electronics</p>
                <p className="link hidden lg:inline-flex">Food & Grocery</p>
                <p className="link hidden lg:inline-flex">Prime</p>
                <p className="link hidden lg:inline-flex">Buy Again</p>
                <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
                <p className="link hidden lg:inline-flex">Health & Personal Care</p>
            </div>
        </header>
    )
}

export default Header
