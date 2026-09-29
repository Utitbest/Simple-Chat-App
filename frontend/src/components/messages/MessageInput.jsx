import React, { useState } from 'react'
import { BsSend } from "react-icons/bs"
import useSendMessage from '../../hooks/useSendMessage'

const MessageInput = () => {
  const [value, setValue] = useState("") 
  const {loading, sendMessage} = useSendMessage()

  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(!value) return
    await sendMessage(value)
    setValue("")
  }


  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input 
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Send a message' 
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' 
            />
            <button disabled={loading} type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                {loading ? <span className='loading loading-spinner'></span> : <BsSend/>}
            </button>
        </div>
    </form>
  )
}

export default MessageInput;  