import React, { useEffect, useState } from 'react'
import { getOrders, makeOrderReady } from '../services'
import { Link } from "@reach/router"

function sortByTime(orders) {
    orders.sort((a, b) => {
        if (new Date(a.timestamp) < new Date(b.timestamp)) { return -1; }
        if (new Date(a.timestamp) > new Date(b.timestamp)) { return 1; }
        return 0;
    })

    return orders;
}

export const EmployeePage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders()
        .then(result => {
            const sortedOrders = sortByTime(result);
            const notReadyOrders = sortedOrders.filter(order => order.is_ready === 'false');
            setOrders(notReadyOrders);
        })
    }, [])

    function orderReady(name) {
        makeOrderReady(name)
        .then(result => {
            const sortedOrders = sortByTime(result);
            const notReadyOrders = sortedOrders.filter(order => order.is_ready === 'false');
            setOrders(notReadyOrders);
        })
    }

    return (
        <div className="h-main">
            <Link to="/employee/menu" className='inline-block mt-8 mx-10 hover:bg-blue-600 hover:text-white py-4 px-4 rounded-lg border-2 border-blue-600 text-blue-600'>
                Edit Menu
            </Link>
            <h1 className="text-4xl text-center font-semibold mt-2">All Orders</h1>
            {orders.length <= 0 ? (
                <p className="text-lg text-center p-4">There are currently no orders :(</p>
            ) : ''}
            {
                orders.map((order, index) => {
                    return (
                        <div key={index} className="text-lg flex max-w-5xl mx-auto justify-center space-x-28 mt-6 items-center">
                            <p>{order.customer}</p>
                            <div className="text-center">
                                {JSON.parse(order.data).map(item => {
                                    return <p key={item.item}>{item.item} x {item.quantity}</p>
                                })}
                            </div>
                            <button onClick={() => orderReady(order.customer)} className='hover:bg-green-600 hover:text-white py-4 px-4 rounded-lg border-2 border-green-600 text-green-600'>Make order ready</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
