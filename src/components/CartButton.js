import Image from 'next/image'

export default function CartButton(props) {
  const isVault = props.id == 3

  return (
    <button className={`${isVault ? 'text-black' : 'text-white'} relative flex xs:w-1/2 items-center justify-center h-[72px] px-2 text-left rounded-lg shadow-low group transition duration-500 ease-in-out overflow-hidden translate-x-0`} onClick={props.action} style={{ backgroundColor: `${props.coffee.color}` }}>
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 transition duration-500 ease-in-out rounded-lg mix-blend-overlay"></span>
      <span className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-white/0 via-white/20 to-white/0 shimmer"></span>
      <span className="relative uppercase tracking-widest text-md lg:text-lg">Add {props.amount > 1 && (<span className={`${isVault ? 'bg-black' : 'bg-white'} rounded-full pl-2 pr-1.5 py-0.5`} style={{ color: `${props.coffee.color}` }}>{props.amount}</span>)} to cart</span>
    </button>
  )
}
