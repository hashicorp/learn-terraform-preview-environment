import { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'

export default function Field(props) {
  const [isFocused, setIsFocused] = useState(false);
  const isDirty = props.value !== ''
  
  const onFocus = async (event) => {
    setIsFocused(true);
  };
  
  const onBlur = async (event) => {
    if (props.value == '') {
      setIsFocused(false);
    }
  };
  
  const onChange = async (event) => {
    const currentValue = event.target.value
    props.setter(currentValue);
  };
  
  return (
    <div className="relative flex w-full pt-6">
      <label htmlFor={props.id} className={`${isFocused | isDirty && 'translate-y-[-16px] scale-75'} absolute py-3 text-black/75 dark:text-white/90 transition origin-top-left cursor-text`}>{props.label}</label>
      <Input id={props.id} type={props.type} placeholder={props.placeholder} value={props.value} onFocus={onFocus} onBlur={onBlur} onChange={onChange} />
    </div>
  )
}

function Input(props) {
  let format;
  let content;
  
  if (props.type == 'cardnumber') {
    format = "#### #### #### ####"
  } else if (props.type == 'cardexpiry') {
    format = "##/####"
  } else {
    format = "####"
  }
  
  if (props.type != 'text' && props.type != 'password') {
    content = <NumberFormat 
                className={`${!props.isFocused && 'placeholder:text-black/0'} w-full py-3 bg-transparent border-b border-gray-200 dark:border-white/25 focus:border-gray-700 dark:focus:border-white/75 dark:text-white rounded-none outline-none transition`}
                format={format}
                id={props.id} 
                value={props.value} 
                placeholder={props.placeholder} 
                onChange={props.onChange} 
                onFocus={props.onFocus} 
                onBlur={props.onBlur} 
              />
  } else {
    content = <input 
                className={`${!props.isFocused && 'placeholder:text-black/0'} w-full py-3 bg-transparent border-b border-gray-200 dark:border-white/25 focus:border-gray-700 dark:focus:border-white/75 dark:text-white rounded-none outline-none transition`}
                id={props.id} 
                type={props.type} 
                value={props.value}
                placeholder={props.placeholder} 
                onChange={props.onChange}
                onFocus={props.onFocus} 
                onBlur={props.onBlur} 
              />
  }
  
  return content;
}
