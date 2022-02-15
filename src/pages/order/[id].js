import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import imageLoader from '../../../loader'

import Header from 'components/Header'
import Footer from 'components/Footer'

import CheckIcon from '@hashicorp/flight-icons/svg/check-circle-16.svg'
import FailIcon from '@hashicorp/flight-icons/svg/x-square-16.svg'

import { queryVarFetcher } from 'gql/apolloClient';
import { ORDER_QUERY } from 'gql/gqlQueries';

export default function Order(props) {
  const router = useRouter();
  const { id } = router.query

  const { data, error } = useSWR({
    query: ORDER_QUERY,
    variables: { orderID: String(id) }
  }, queryVarFetcher);

  const dismiss = async (event) => {
    router.back()
  }

  // If data exists, set to order object
  let order;
  if (data) order = data.data.order

  let total = 0
  if (order) {
    total = order.items.reduce((t, next) => {
      return t + (next.coffee.price * next.quantity)
    }, 0)
  }

  let pay = {}
  if (typeof window !== "undefined") {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"))

      // if orders exist in localstorage, return payment information
      if (orders[id]) pay = orders[id]
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header accountVisible={props.accountVisible} setAccountVisible={props.setAccountVisible} isAuthed={props.isAuthed} setIsAuthed={props.setIsAuthed} token={props.token} setToken={props.setToken} username={props.username} setUsername={props.setUsername} />

      <main className="relative flex flex-col items-center justify-center w-full flex-1 space-y-12 py-12 px-8 text-center dark:text-white/90 z-30">
        {order && (
          <>
            <header className="flex items-center items-start max-w-[1080px] w-full xs:px-8 space-x-4">
              <div className="flex flex-col text-left space-y-2">
                <h1 className="font-semibold text-4xl sm:text-5xl leading-none sm:leading-tight sm:truncate">Order confirmation</h1>
                <p className="text-black/75 dark:text-white/75 text-sm sm:text-base">(Order confirmed, but no payment was taken, because this is just a demo)</p>
              </div>
            </header>

            <section className="relative max-w-[1080px] w-full bg-white dark:bg-[#0B0B0B] rounded-xl shadow-high dark:shadow-highlight">

              <div className="flex items-center justify-center bg-gray-100/25 dark:bg-black/10 border-b border-gray-100 dark:border-white/10 mb-3 overflow-hidden">
                <div className="flex items-center justify-center -space-x-20">
                  {order.items.map((item) => (
                    <div className="flex items-center flex-shrink-0">
                      {item.amount > 2 && (
                        <img className="relative mr-[-170px] scale-90 z-0 flex-shrink-0 opacity-80" src={`/images/thumbnails${item.coffee.image}`} width={200} height={200} />
                      )}
                      {item.amount > 1 && (
                        <img className="relative mr-[-170px] scale-95 z-0 flex-shrink-0 opacity-90" src={`/images/thumbnails${item.coffee.image}`} width={200} height={200} />
                      )}
                      <img key={item.coffee.id} className="test relative flex-shrink-0" src={`/images/thumbnails${item.coffee.image}`} width={200} height={200} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col items-start px-6 xs:px-8 pt-4 pb-8">
                <p className="font-semibold text-2xl sm:text-4xl pb-6">Order #{order.id}</p>

                <div className="flex flex-col items-start space-y-2 mb-5 w-full">
                  <p className="text-black/75 dark:text-white/75">Items</p>
                  <ul className="w-full">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between border-b border-dashed border-gray-200 dark:border-white/20 last:border-none py-3 pr-3">
                        <span className="flex items-center pl-1">
                          <img key={item.coffee.id} className="relative flex-shrink-0" src={`/images/thumbnails${item.coffee.image}`} width={40} height={40} loader={imageLoader} unoptimized />
                          {item.quantity} x {item.coffee.name}
                        </span>
                        <NumberFormat displayType={'text'} prefix="$" value={(item.coffee.price / 100).toFixed(2)} className="opacity-75" />
                      </li>
                    ))}
                  </ul>
                  <NumberFormat displayType={'text'} prefix="$" value={(total / 100).toFixed(2)} className="self-end font-semibold text-2xl sm:text-4xl pr-3" />
                </div>

                {Object.keys(pay).length > 0 && (
                  <>
                    <div className="flex flex-wrap flex-col md:flex-row w-full">
                      <div className="flex flex-col items-start space-y-1 px-6 py-4 bg-gray-100/50 dark:bg-white/5 shadow-stroke dark:shadow-highlight rounded-lg mb-6 md:mr-6">
                        <p className="text-black/75 dark:text-white/75">Plain text card number</p>
                        <NumberFormat className="font-mono" format="#### #### #### ####" value={pay.card_plaintext} displayType="text" />
                      </div>

                      <div className="flex flex-col items-start space-y-1 px-6 py-4 dark:bg-white/5 shadow-stroke dark:shadow-highlight rounded-lg mb-6 md:mr-6">
                        <p className="text-black/75 dark:text-white/75">Status</p>
                        <p className="flex space-x-3 text-base">
                          {pay.message.includes("success") ? (
                            <Image src={CheckIcon} className="icon-green" loader={imageLoader} unoptimized />
                          ) : (
                            <Image src={FailIcon} className="icon-red" loader={imageLoader} unoptimized />
                          )}
                          <span>{pay.message.split(",")[0]}</span>
                        </p>
                      </div>

                      <div className="flex flex-col items-start space-y-1 px-6 py-4 dark:bg-white/5 shadow-stroke dark:shadow-highlight rounded-lg mb-6 md:mr-6">
                        <p className="text-black/75 dark:text-white/75">Encryption Status</p>
                        <p className="flex space-x-3 text-base">
                          {!pay.card_ciphertext.includes("Disabled") ? (
                            <Image src={CheckIcon} className="icon-green" loader={imageLoader} unoptimized />
                          ) : (
                            <Image src={FailIcon} className="icon-red" loader={imageLoader} unoptimized />
                          )}
                          <span>{pay.card_ciphertext}</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-black/75 dark:text-white/75 text-sm text-left">Card details returned for demo purposes, not for production.</p>
                  </>
                )}
              </div>

            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}