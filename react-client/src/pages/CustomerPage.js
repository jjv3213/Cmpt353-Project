import React, { useState, useEffect, useRef } from 'react'
import { getOrders, getMenu, makeOrder, deleteOrder } from '../services'

function getOrderData(container) {
    var menuItems = container.querySelectorAll('.menu-item');
    var menuItemsArr = [].slice.call(menuItems);
    var orderData = [];

    menuItemsArr.forEach(item => {
        var quantity = item.getElementsByClassName("quantity")[0].value;
        var itemName = item.getElementsByClassName("item")[0].innerHTML;
        if (quantity > 0) {
            orderData.push({ item: itemName, quantity: quantity })
        }
    })

    return orderData;
}

export const CustomerPage = ({name}) => {
    const [order, setOrder] = useState(null)
    const [menu, setMenu] = useState([]);
    const [error, setError] = useState('');
    const menuRef = useRef(null);

    useEffect(() => {
        getOrders()
        .then(result => {
            const customerOrder = result.filter(order => order.customer === name)[0];
            setOrder(customerOrder)
        })

        getMenu()
        .then(result => {
            setMenu(result)
        })
    }, [name])

    function makeNewOrder() {
        if (order) {
            console.log(order)
            setError('You already have an order. Cancel or pick up your current order to make a new one.')
        } else {
            setError('')
            const data = getOrderData(menuRef.current)
            if (data.length > 0) {
                makeOrder(name, data)
                .then(result => {
                    const customerOrder = result.filter(order => order.customer === name)[0];
                    setOrder(customerOrder)
                })
            }
        }
    }

    function removeOrder() {
        deleteOrder(name)
        .then(result => {
            setOrder(null)
        })
    }

    return (
        <div>
        {error && <p className="text-center text-red-600 pt-8">{error}</p>}
        <div className="h-main flex space-x-52 pt-10 justify-center">
            <div ref={menuRef}>
                <h1 className="text-4xl text-center font-semibold">Best Of Our Menu</h1>
                {menu.length <= 0 ? (
                    <p className="text-lg text-center mt-6 p-4">There are currently no menu items.</p>
                ) : ''}
                {
                menu.map((item, index) => {
                    return (
                        <div key={index} className="text-lg flex max-w-5xl mx-auto justify-center space-x-28 mt-6 items-center menu-item">
                            <p className="item">{item.item}</p>
                            <p>${item.price.toFixed(2)}</p>
                            <div>
                                <label htmlFor={`${item.item}-quantity`} className="mr-4">Quantity:</label>
                                <input type="number" min="0" id={`${item.item}-quantity`} className='w-10 border-2 border-gray-400 rounded-md quantity' />
                            </div>
                        </div>
                    )
                })
                }
                <div className="flex justify-center">
                    <button onClick={makeNewOrder} className='text-lg hover:bg-green-600 hover:text-white py-2 px-4 rounded-lg border-2 border-green-600 text-green-600 mt-6'>
                        Make order
                    </button>
                </div>
            </div>
            <div>
                <h1 className="text-4xl text-center font-semibold">Your Order:</h1>
                {(order && order.data) ? (
                    <div className="text-lg mt-6">
                        <div className="text-center">
                            {JSON.parse(order.data).map(item => {
                                return <p key={item.item}>{item.item} x {item.quantity}</p>
                            })}
                        </div>
                        {order.is_ready === 'false' ? (
                            <div className="mt-6 flex space-x-4 items-center">
                                <span>Your order is not ready yet</span>
                                <button className='hover:bg-red-600 hover:text-white py-2 px-4 rounded-lg border-2 border-red-600 text-red-600' onClick={removeOrder}>Cancel order</button>
                            </div>
                        ) : (
                            <div className="mt-6 flex space-x-4 items-center">
                                <span>Your order is ready!</span>
                                <button className='hover:bg-green-600 hover:text-white py-2 px-4 rounded-lg border-2 border-green-600 text-green-600' onClick={removeOrder}>Pick up order</button>
                            </div>
                        )}
                    </div>
                ) : 
                <p className="text-center mt-4">You have no orders. Go ahead and choose something nice from the menu :)</p>
                }
            </div>
        </div>
        </div>
    )
}
