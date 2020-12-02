import React, { useState }from 'react'
import { navigate } from "@reach/router"

export const CustomerLoginPage = () => {
    const [name, setName] = useState('');

    return (
        <div className="flex justify-center items-center h-main">
            <div className="flex flex-col space-y-10 bg-white p-14 rounded-lg text-center text-xl -mt-20">
                <div>
                    <label htmlFor="item" className="mr-4">
                        Enter your name:
                    </label>
                    <input type="text" id="item" className="div-input border-2 border-gray-400 rounded-md block mt-4 w-80" onChange={(e) => { setName(e.target.value) }} />
                </div>
                <button disabled={!name} onClick={() => {navigate(`/customer/${name}`)}} className='hover:bg-green-600 hover:text-white py-2 px-4 rounded-lg border-2 border-green-600 text-green-600 mx-auto'>Login</button>
            </div>
        </div>
    )
}
