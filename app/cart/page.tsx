'use client';

import React from 'react';

import Category1 from '@/images/Americano/americano.png';
import Category2 from '@/images/Cappuccino/cappuccino.png';

function Cart() {
    const cartItems: { [key: number]: number } = {
        1: 2,
        2: 1,
    };

    const food_list = [
        { _id: 1, name: 'Classic Americano', price: 40, image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//98/MTA-54187613/freshly_baked_by_origin_bakery_americano_full02_kd07blpv.jpg' },
        { _id: 2, name: 'Salted Caramel Cold Brew', price: 40, image: 'https://xliiicoffee.com/wp-content/uploads/2023/08/202308301021-2.jpg' },
    ];

    const removeFromCart = (id: number): void => {
        console.log(`Remove item with ID: {id}`);
    };

    const getTotalCartAmount = (): number => {
        return food_list.reduce((total, item) => {
            if (cartItems[item._id]) {
                total += item.price * cartItems[item._id];
            }
            return total;
        }, 0);
    };

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-item-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                <br />
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div className="cart-items-item" key={item._id}>
                                <img src={item.image} alt={item.name} />
                                <p>{item.name}</p>
                                <p>Rp. {item.price}.000</p>
                                <p>{cartItems[item._id]}</p>
                                <p>Rp. {item.price * cartItems[item._id]}.000</p>
                                <p className="cross" onClick={() => removeFromCart(item._id)}>x</p>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <hr />
            <div className="card-bottom">
                <div className="cart-total">
                    <h2>Cart totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>Rp. {getTotalCartAmount()}.000</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>Rp. {getTotalCartAmount() === 0 ? 0 : 8}.000</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>Rp. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 8}.000</b>
                        </div>
                    </div>
                    <button onClick={() => console.log('Proceed to Checkout')}>Proceed To Checkout</button>
                </div>
            </div>
            <div className="empty-space" />
            <style jsx>{`
                .cart {
                    margin-top: 100px;
                    padding-bottom: 50px; /* Add padding to create space at the bottom */
                }
                .cart-item-title {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr 0.5fr;
                    align-items: center;
                    color: grey;
                    font-size: max(1vw, 12px);
                }
                .cart-items-item {
                    display: grid;
                    align-items: center;
                    margin: 10px 0px;
                    color: black;
                    grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr 0.5fr;
                }
                .cart-items-item img {
                    width: 50px;
                }
                .cart hr {
                    height: 1px;
                    background-color: #e2e2e2;
                    border: none;
                }
                .cross {
                    cursor: pointer;
                }
                .card-bottom {
                    margin-top: 80px;
                    justify-content: space-between;
                    gap: max(12vw, 20px);
                    display: flex;
                    margin-bottom: 50px; /* This creates space between the cart and footer */
                }
                .cart-total {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .cart-total-details {
                    display: flex;
                    justify-content: space-between;
                    color: #555;
                }
                .cart-total hr {
                    margin: 10px 0px;
                }
                .cart-total button {
                    border: none;
                    color: white;
                    background-color: #967B58;
                    width: max(15vw, 200px);
                    padding: 12px 0px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .cart-promocode {
                    flex: 1;
                }
                .cart-promocode p {
                    color: #555;
                }
                .cart-promocode-input {
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #eaeaea;
                    border-radius: 4px;
                }
                .cart-promocode-input input {
                    background: transparent;
                    border: none;
                    outline: none;
                    padding-left: 10px;
                }
                .cart-promocode-input button {
                    width: max(10vw, 150px);
                    padding: 12px 5px;
                    background-color: black;
                    color: white;
                    border-radius: 4px;
                }
                @media (max-width: 750px) {
                    .card-bottom {
                        flex-direction: column-reverse;
                    }
                    .cart-promocode {
                        justify-content: start;
                    }
                }
            `}</style>
        </div>
    );
}

export default Cart;
