import React, { useState, useEffect } from 'react'
import { Link } from "@reach/router"
import { addToMenu, getMenu, deleteMenuItem } from '../services'

export const EmployeeMenuPage = () => {
    const [menu, setMenu] = useState([]);
    const [item, setItem] = useState('');
    const [price, setPrice] = useState(0.00);

    useEffect(() => {
        getMenu()
        .then(result => {
            setMenu(result)
        })
    }, [])

    function add(e) {
        e.preventDefault();
        if (item && price) {
            addToMenu(item, price)
            .then(result => {
                setMenu(result);
                setPrice(0.00);
                setItem('');
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    function deleteItem(item) {
        deleteMenuItem(item)
        .then(result => {
            setMenu(result);
        })
    }

    return (
        <div className="h-main">
            <Link to="/employee/orders" className='inline-block mt-8 mx-10 hover:bg-blue-600 hover:text-white py-4 px-4 rounded-lg border-2 border-blue-600 text-blue-600'>
                View all orders
            </Link>
            <h1 className="text-4xl text-center font-semibold mt-2">Edit Menu</h1>
            {menu.length <= 0 ? (
                <p className="text-lg text-center p-4">There are currently no menu items. Add something in the form below!</p>
            ) : ''}
            <form className="flex max-w-5xl mx-auto justify-center items-center space-x-20 mt-6">
                <div>
                    <label htmlFor="item" className="mr-4">
                        Item:
                    </label>
                    <input type="text" id="item" className="form-input w-60 border-2 border-gray-400 rounded-md" value={item} onChange={(e) => { setItem(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="price" className="mr-4">
                        Price:
                    </label>
                    <input type="number" min="0" step=".01" id="price" className="form-input w-32 border-2 border-gray-400 rounded-md" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                </div>
                <button onClick={(e) => add(e)} className='hover:bg-green-600 hover:text-white py-2 px-4 rounded-lg border-2 border-green-600 text-green-600'>Add to menu</button>
            </form>
            {
                menu.map((item, index) => {
                    return (
                        <div key={index} className="text-lg flex max-w-5xl mx-auto justify-center space-x-28 mt-6 items-center">
                            <p>{item.item}</p>
                            <p>${item.price.toFixed(2)}</p>
                            <button onClick={() => deleteItem(item.item)} className='hover:bg-red-600 hover:text-white py-2 px-4 rounded-lg border-2 border-red-600 text-red-600'>Delete item</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
