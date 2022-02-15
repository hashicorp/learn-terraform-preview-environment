import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import imageLoader from '../../loader'

import ChevronsIcon from '@hashicorp/flight-icons/svg/chevrons-right-24.svg'

export default function CheckoutButton(props) {
  const router = useRouter()

  const handleClick = async (event) => {
    router.push("/checkout")
  };

  return (
    <button className={`${props.disabled ? 'bg-gray-200 dark:bg-white/5 text-black/25 dark:text-white/25' : 'bg-black/90 dark:bg-white/90 hover:bg-black dark:hover:bg-white text-white dark:text-black/75 shadow-subtle'} relative flex items-center justify-between h-[72px] px-8 text-left text-white rounded-lg group transition duration-500 ease-in-out overflow-hidden translate-x-0 flex-shrink-0 mx-8 xs:mx-0 mb-8 xs:mb-0`} disabled={props.disabled} onClick={handleClick}>
      <span className={`${props.disabled ? 'opacity-0' : 'opacity-100'} absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-white/0 via-white/20 dark:via-white/75 to-white/0 shimmer transition ease-in-out`}></span>
      <span className="uppercase tracking-widest text-lg pr-4 block xs:hidden sm:block">Checkout</span>
      <span className={`${props.disabled ? 'opacity-0' : 'opacity-75 group-hover:opacity-100'} flex items-center invert dark:invert-0 group-hover:translate-x-[8px] transition duration-500 ease-in-out`}>
        <Image src={ChevronsIcon} loader={imageLoader} unoptimized />
      </span>
    </button>
  )
}
