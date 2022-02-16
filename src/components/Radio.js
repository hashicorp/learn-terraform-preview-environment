import Image from 'next/image'


export default function Radio(props) {

  return (
    <li className="relative">
      <label htmlFor={props.id} className={`${props.isChecked ? 'bg-white dark:bg-white/10 text-black/100 dark:text-white shadow-highest dark:shadow-glare' : 'bg-gray-50 dark:bg-white/0 hover:bg-white dark:hover:bg-white/5 text-black/75 dark:text-white/75 shadow-stroke dark:shadow-highlight'} flex items-center justify-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition duration-500 ease-in-out`}>
        <Image src={`/images/${props.id}.svg`} width={40} height={28} />
        <span className="hidden xs:block">{props.label}</span>
      </label>
      <input type="radio" id={props.id} name="card" value={props.value} readOnly checked={props.isChecked} className="absolute top-0 left-0 opacity-0 pointer-events-none" />
    </li>
  )
}
