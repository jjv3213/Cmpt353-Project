export async function getOrders() {
   return fetch('http://localhost:8080/orders')
        .then(response => response.json());
}

export function makeOrder(name, data) {
    return fetch('http://localhost:8080/orders', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `customer=${name}&data=${JSON.stringify(data)}`
    })
    .then(response => response.json())
    .catch(err => {
        console.error(err);
    })
}

export async function makeOrderReady(name) {
    return fetch('http://localhost:8080/orders', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${name}`
    })
    .then(response => response.json());
}

export function getMenu() {
    return fetch('http://localhost:8080/menu')
        .then(response => response.json())
}

export function addToMenu(item, price) {
    return fetch('http://localhost:8080/menu', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `item=${item}&price=${price}`
    })
    .then(response => response.json())
    .catch(err => {
        console.error(err);
    })
}

export function deleteMenuItem(item) {
    return fetch('http://localhost:8080/menu', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `item=${item}`
    })
    .then(response => response.json())
    .catch(err => {
        console.error(err);
    })
}

export function deleteOrder(name) {
    return fetch('http://localhost:8080/orders', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${name}`
    })
    .then(response => response.json())
    .catch(err => {
        console.error(err);
    })
}