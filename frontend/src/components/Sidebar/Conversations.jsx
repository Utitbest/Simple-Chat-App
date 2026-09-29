import React from 'react'
import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
  const {loading, conversations} = useGetConversations()
  
  return (
    <div className='py-2 flex flex-col overflow-auto'>

        {conversations.map((convex)=>{
          return(<Conversation 
            key={convex._id}
            conversation={convex}
            emoji={getRandomEmoji()}
            lastIdx={convex === conversations.at(-1)}
          />)
        })}

         {loading && <span className="loading loading-spinner"></span>}
    </div>
  )
}

export default Conversations