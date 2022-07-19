import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";


const replyCommentContext = createContext()
function UseReplyComment() {
    const [show, setShow] = useState(false);
    return [show, setShow]
}

function ReplyCommentProvider({children}) {
    const [show, setShow] = UseReplyComment()
    const [items, setItems] = useState([])
    const value = {reply:[show, setShow], replyShow:[items, setItems]}
    return <replyCommentContext.Provider value={value}>{children}</replyCommentContext.Provider>
}
const useReplyCommentContext =()=>{
    const value = useContext(replyCommentContext)
    if(typeof value === 'undefined') throw new Error('value must be used inside  ReplyCommentProvider')
    return value
}

export {ReplyCommentProvider, useReplyCommentContext}