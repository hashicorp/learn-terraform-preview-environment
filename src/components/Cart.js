import Image from 'next/image'
import { useState } from 'react'
import NumberFormat from 'react-number-format'

import CheckoutButton from 'components/CheckoutButton'

import CheckIcon from '@hashicorp/flight-icons/svg/check-circle-16.svg'
import FailIcon from '@hashicorp/flight-icons/svg/x-square-16.svg'

export default function Cart(props) {
  const removeItemFromCart = (coffeeID) => {
    delete props.cart[coffeeID]

    if (props.onRemoveItem != undefined) {
      props.onRemoveItem()
    }

    if (props.isSticky && Object.keys(props.cart).length === 0) {
      props.setCartVisible(false)
    }

    // Refreshes cart
    props.setCart({ ...props.cart })
  };

  return (
    <>
      {props.isSticky ? (
        <div className={`${props.cartVisible ? 'sticky h-[240px] xs:h-[150px]' : 'relative h-[0px]'} flex items-end w-screen bottom-0 z-40`}>
          <div className={`${props.cartVisible ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[240px] xs:translate-y-[150px]'} fixed bottom-0 w-screen h-[240px] xs:h-[150px] flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-lg bottom-0 shadow-cart dark:shadow-darkCart transition ease-in-out duration-500`}>
            <div className="flex flex-col xs:flex-row xs:items-center xs:space-x-8 xs:pr-8">
              {props.cart && Object.keys(props.cart).length !== 0 ? (
                <div className="flex xs:border-r border-gray-200 dark:border-white/20 h-[150px]">
                  <CartItems data={props.cart} removeItemFromCart={removeItemFromCart} />
                </div>
              ) : (
                <p className="py-8">No items in your cart</p>
              )}

              <CheckoutButton color="#000" setCartVisible={props.setCartVisible} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          {props.cart && Object.keys(props.cart).length !== 0 ? (
            <CartItems data={props.cart} allowOverflow={true} removeItemFromCart={removeItemFromCart} />
          ) : (
            <p className="py-8 px-8">No items in your cart</p>
          )}
        </div>
      )}
    </>
  )
}

function CartItems(props) {
  return (
    <>
      <ul className={`${props.allowOverflow ? 'flex-wrap' : 'overflow-x-auto overflow-y-hidden scroll-style'} flex items-center `}>
        {Object.values(props.data).map((item) => (
          <CartItem key={item.coffee.id} coffee={item.coffee} count={item.quantity} price={item.coffee.price} removeItemFromCart={props.removeItemFromCart} />
        ))}
      </ul>
    </>
  )
}

function CartItem(props) {
  function handleClick(event) {
    props.removeItemFromCart(props.coffee.id)
  }

  return (
    <li className="relative flex items-center group flex-shrink-0 last:pr-8">
      <div className="relative flex flex-col items-center overflow-hidden">
        <div className="flex">
          {props.count > 2 && (
            <img className="relative mr-[-85px] scale-90 z-0 flex-shrink-0 opacity-80" src={`/images/thumbnails${props.coffee.image}`} width={100} height={100} />
          )}
          {props.count > 1 && (
            <img className="relative mr-[-85px] scale-95 z-0 flex-shrink-0 opacity-90" src={`/images/thumbnails${props.coffee.image}`} width={100} height={100} />
          )}
          <img className="relative flex-shrink-0" src={`/images/thumbnails${props.coffee.image}`} width={100} height={100} />
        </div>
        <span className="absolute right-5 top-3 text-sm text-white dark:text-black px-2 bg-black/75 dark:bg-white/90 backdrop-blur-md rounded-full">{props.count}</span>
      </div>
      <div className="relative flex flex-col items-start -ml-2">
        <span className="whitespace-nowrap text-black/75 dark:text-white/75 uppercase text-[10px] tracking-widest text-center">{props.coffee.name}</span>
        <span className="whitespace-nowrap text-black/75 dark:text-white/75 uppercase text-[10px] tracking-widest text-center"><NumberFormat displayType={'text'} prefix="$" value={(props.price / 100).toFixed(2)} /></span>
        <button className="whitespace-nowrap text-black/50 dark:text-white/50 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-600/10 rounded-md px-2 py-1 -mx-2 uppercase text-[10px] tracking-widest text-center mt-1 transition" onClick={handleClick}>Remove</button>
      </div>
    </li>
  )
}