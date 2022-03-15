import React, {useContext, useEffect, useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import "../../css/Messenger.css"
import Conversation from './Conversation'
import Message from './Message'
// import { w3cwebsocket as W3CWebSocket } from "websocket"
import cookie from 'react-cookies'
import { SOCKET_URL } from "./Setting";
import API from '../Config/Api'
import Pusher from 'pusher-js';

function Messenger() {
    const [chatList, setChatList] = useState()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [sendMessage, setSendMessage] = useState()
    const [username, setUsername] = useState({
        send_by: cookie.load("user").username || "",
        send_to: "thienle"
    })
    const [roomName, setRoomName] = useState(1)
    // let username 
    // username = cookie.load("user").username
    // const roomName = location.pathname.substr(1);
    const socketPath = `${SOCKET_URL}/ws/chat/${roomName}/`;
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('758fa0ecf943da6556da', {
          cluster: 'ap1'
        });
        var channel = pusher.subscribe('chat');
        channel.bind('message', function(data) {
          alert(JSON.stringify(data));
          console.log(data)
        });

        API.get(`get-chat-list/`, {
            headers: {
              "Authorization": `Bearer ${cookie.load("access_token")}`
            }
          }).then((response)=> {
            console.log(response.data)
            setChatList(response.data)
        }).catch((error) =>{
        })
    }, [])


    const sendMessageHandler = () => {

        // chatSocket.send(JSON.stringify({
        //     command: "new_message",
        //     from: username.send_by,
        //     to: username.send_to,
        //     message: message,
        //     chatId: 1
        // }));

        // setMessage("")
    }


    return (
        <div className='messenger'>
            <div className='chatMenu'>
                <div className='chatMenuWrapper'>
                    <input placeholder='Tìm kiếm bạn bè' className='chatMenuInput' />
                    { chatList && chatList.map((chat, index) => (
                        <Conversation key={index}
                            src={chat.send_to.avatar}
                            name={chat.send_to.first_name + chat.send_to.last_name}
                        />
                    ))}
                </div>
            </div>
            <div className='chatBox'>
                <div className='chatBoxWrapper'>
                    <div className='chatBoxTop' id='chatBoxTop' >
                    { messages && messages.map((message, index) => (
                        <div ref={messagesEndRef} key={index}>
                            <Message key={index}
                                src={message.created_by.avatar}
                                own={message.created_by.username == username.send_by ? true : false }
                                message={message.content}
                                timeAgo={message.created_date}
                            />
                        </div>

                    ))}
                    {/* {sendMessage && <Message own={true} message={sendMessage.content}/>} */}

                    </div>
                    <div className='chatBoxBottom'>
                        <textarea className='chatMessageInput' placeholder="Viết một cái gì đó..."
                            onChange={e => setMessage(e.target.value)} value={message}></textarea>
                        <button className='chatSubmitButton' onClick={sendMessageHandler}>Send</button>
                    </div>
                </div>
            </div>
            {/* <div className='chatOnline'>
                <div className='chatOnlineWrapper'>online</div>
            </div> */}
        </div>
    )
}

export default Messenger

    {/* useEffect(() => {
        API.get(`get-message/${roomName}`, {
            headers: {
              "Authorization": `Bearer ${cookie.load("access_token")}`
            }
          }).then((response)=> {
            console.log(response.data)
            setMessages(response.data)
            scrollToBottom()
        }).catch((error) =>{
        })

        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data)
            setSendMessage(data.message)
        };

        API.get(`get-chat-list/`, {
            headers: {
              "Authorization": `Bearer ${cookie.load("access_token")}`
            }
          }).then((response)=> {
            console.log(response.data)
            setChatList(response.data)
        }).catch((error) =>{
        })

        scrollToBottom()
    }, [sendMessage])

    const renderMessages = (messages) => {
        messages.map(message => 
            <Message message={message.content}/>
        )
    } */}