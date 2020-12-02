import React from 'react'
import { Link } from "@reach/router"

export const Dashboard = () => {
    return (
        <div className="flex justify-center items-center h-main">
            <Link to="/customer/login" className='mx-10 hover:bg-blue-600 hover:text-white py-6 px-6 rounded-lg border-2 border-blue-600 text-blue-600'>
                I'm a customer
            </Link>
            <Link to="/employee/orders" className='mx-10 hover:bg-blue-600 hover:text-white py-6 px-6 rounded-lg border-2 border-blue-600 text-blue-600'>
                I'm an employee
            </Link>
        </div>
    )
}
