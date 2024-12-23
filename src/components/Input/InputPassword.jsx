import React, { useId, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

/**
 * <InputPassword label='label' name='name' value={text} onChange={event => setText(event.target.value)} />
 *
 * @param label
 * @param name
 * @param value
 * @param onChange
 */
export default function InputPassword({ label, name, value, onChange }) {
  const id = useId()
  const [isShowPassword, setShowPassword] = useState(false)

  const onClickIconShowPassword = () => {
    setShowPassword(!isShowPassword)
  }

  const PropsIcons = {
    className: 'cursor-pointer',
    onClick: onClickIconShowPassword,
  }

  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={id} className='py-2 text-main text-normal'>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          id={id}
          type={isShowPassword ? 'text' : 'password'}
          name={name}
          className='w-full p-2 rounded-md outline-none border border-normal text-main'
          value={value}
          onChange={onChange}
          autoComplete='true'
        />
        <div className='absolute top-0 bottom-0 right-2 flex items-center'>
          {isShowPassword ? (
            <FaRegEye {...PropsIcons} />
          ) : (
            <FaRegEyeSlash {...PropsIcons} />
          )}
        </div>
      </div>
    </div>
  )
}
