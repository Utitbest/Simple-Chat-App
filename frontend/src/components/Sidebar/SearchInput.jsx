import React, { useState } from 'react'
import {IoSearchSharp} from "react-icons/io5"
import useConversation from '../../zustand/useConversation'
import useGetConversations from '../../hooks/useGetConversations'
import toast from 'react-hot-toast'
const SearchInput = () => {
  const [search, setSearch] = useState("")
  const { setSelectedConversation } = useConversation()
  const { conversations } = useGetConversations()

  const handlSubmition = (e)=>{
    e.preventDefault()

    if(!search) return;

    if(search.length < 3) return toast.error("Search term must be at least 3 Characters long")

      const conversation = conversations.find((e) => e.fullName.toLowerCase().includes(search.toLowerCase()))

      if(conversation){
        setSelectedConversation(conversation)
        setSearch("")
      }else toast.error("No such user found!")
  }

  return (
    <form className='flex items-center gap-2' onSubmit={handlSubmition}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search...' className='input input-bordered rounded-full'/>

        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput;