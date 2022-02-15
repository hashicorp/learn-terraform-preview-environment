import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import NumberFormat from 'react-number-format'

import CheckIcon from '@hashicorp/flight-icons/svg/check-circle-16.svg'
import FailIcon from '@hashicorp/flight-icons/svg/x-square-16.svg'

import { queryFetcher } from 'gql/apolloClient';
import { ALL_ORDERS_QUERY } from 'gql/gqlQueries';

export default function Orders(props) {
  const { data, error } = useSWR(ALL_ORDERS_QUERY, queryFetcher);

  // If data exists, set to coffees object
  let orders;
  if (data) orders = data.data.orders

  return (
    <>
      <h2 className="font-semibold text-2xl sm:text-3xl leading-none sm:leading-tight sm:truncate">Order history</h2>

      <div className="flex flex-col flex-auto">
        {orders ? (
          <ul className="flex flex-col w-full divide-y dark:divide-white/10">
            {orders.map((order) => (
              <Order key={order.id} id={order.id} items={order.items} setAccountVisible={props.setAccountVisible} />
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100/75 dark:bg-black/25 border border-gray-200/50 dark:border-white/10 rounded-lg mt-6 mb-8">
            <p className="py-8 px-4 text-black/50 dark:text-white/50">No orders placed yet</p>
          </div>
        )}
      </div>
    </>
  )
}

function Order(props) {
  const orderClick = async (event) => {
    props.setAccountVisible(false)
  }

  const total = props.items.reduce((t, next) => {
    return t + (next.coffee.price * next.quantity)
  }, 0)

  return (
    <li className="flex flex-col xs:flex-row flex-1 xs:space-x-6 pt-6 pb-8">
      <Link href={`/order/${props.id}`}>
        <a onClick={orderClick}>
          <div className="flex items-center justify-center shadow-high dark:shadow-highlight bg-gray-100/25 dark:bg-black/10 rounded-lg w-[90px] h-[90px] mb-3 overflow-hidden">
            <div className="flex items-center justify-center -space-x-16">
              {props.items.map((item) => (
                <img key={item.coffee.id} className="relative flex-shrink-0" src={`/images/thumbnails${item.coffee.image}`} width={80} height={80} />
              ))}
            </div>
          </div>
        </a>
      </Link>
      <div className="flex flex-1 flex-col pt-1">
        <div className="flex flex-1 items-center justify-between pb-2">
          <Link href={`/order/${props.id}`}>
            <a onClick={orderClick} className="font-medium text-lg text-blue-500 dark:text-blue-400 underline hover:bg-blue-50 dark:hover:bg-blue-500/25 py-0.5 px-1 -mx-1 -my-0.5 rounded-lg transition">
              Order #{props.id}
            </a>
          </Link>
          <NumberFormat displayType={'text'} prefix="$" value={(total / 100).toFixed(2)} className="text-lg" />
        </div>

        <ul className="pb-4">
          {props.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between text-sm">
              <span>{item.quantity} x {item.coffee.name}</span>
              <NumberFormat displayType={'text'} prefix="$" value={(item.coffee.price / 100).toFixed(2)} className="opacity-75" />
            </li>
          ))}
        </ul>

        {/* <p className="flex space-x-2">
          {props.status.state == "success" ? (
            <Image src={CheckIcon} className="icon-green" />
          ) : (
            <Image src={FailIcon} className="icon-red" />
          )}
          <span>{props.status.message}</span>
        </p> */}

        {/* <p className="flex space-x-2 pb-4">
          {props.encryption.state == "success" ? (
            <Image src={CheckIcon} className="icon-green" />
          ) : (
            <Image src={FailIcon} className="icon-red" />
          )}
          <span>{props.encryption.message}</span>
        </p> */}

        {/* <div className="flex flex-col items-start space-y-0 px-3 py-2 bg-gray-100/50 dark:bg-white/5 shadow-stroke dark:shadow-highlight rounded-lg">
          <p className="text-sm text-black/75 dark:text-white/75">Plain text card number</p>
          <NumberFormat className="font-mono" format="#### #### #### ####" value={props.card} displayType="text" />
        </div> */}
      </div>
    </li>
  )
}