import React, {useState} from 'react'
import authService from '../appwrite/auth.js'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice.js'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            console.log("Creating account with:", data);
            const result = await authService.createAccount(data)
            
            if (result) {
                console.log("Account creation result:", result);
                
                // Try to get current user after account creation
                try {
                    const userData = await authService.getCurrentUser()
                    console.log("User data after signup:", userData);
                    
                    if(userData) {
                        dispatch(login({userData}));
                        navigate("/")
                    } else {
                        // If we can't get user data but account was created, redirect to login
                        setError("Account created! Please login to continue.");
                        setTimeout(() => navigate("/login"), 2000);
                    }
                } catch (userError) {
                    console.log("Error getting user data:", userError);
                    setError("Account created! Please login to continue.");
                    setTimeout(() => navigate("/login"), 2000);
                }
            }
        } catch (error) {
            console.log("Signup error:", error);
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
<div className={`mx-auto w-full max-w-md lg:max-w-lg bg-gray-100 rounded-xl p-6 md:p-8 lg:p-10 border border-slate-700`}>                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup