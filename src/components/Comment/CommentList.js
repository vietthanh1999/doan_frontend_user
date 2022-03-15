import React, {useEffect, useState} from 'react'
// import { Button, Comment, Form, Header } from 'semantic-ui-react'
import Comment from "./Comment"
import '../../css/Comment.css';
import { Container, Row, Col } from 'react-bootstrap';
import API, { endpoints } from '../Config/Api'
import { useParams } from 'react-router-dom';
import cookie from 'react-cookies';

function CommentList(){

    const [comment, setComment] = useState("");
    const [listComment, setListComment] = useState([]);
    let { id } = useParams();
    let  token = { 
        headers: {
            "Authorization": `Bearer ${cookie.load("access_token")}`} 
    }

    useEffect(() => {
            API.get(`house/list-comment/${id}`).then((response)=> {
				console.log(response.data.results)
				console.log(typeof (response.data.results))
                setListComment(response.data.results);
            }).catch((error) =>{
            })
			console.log(listComment)
    }, [comment])

    const commentHouse = () => {
        let formData = new FormData()
        formData.append("content", comment)

        API.post(`houses/${id}/add-comment/`, formData, token).then((response) => {
            setComment("")
        }).catch((error) => {

        });
    }

    return (
        <div className='listComment'>
                <div className='listComment__info'>
                <p>Đánh giá</p>
                <div className='comment'>
                    <img src="https://static.trip101.com/paragraph_media/pictures/001/676/061/large/969ae4bb-efd1-4fb9-a4e3-5cb3316dd3c9.jpg?1562227937" alt="" />
                        <div className="comment__send">
                            <input type="text" placeholder='Nhận xét' onChange={e => setComment(e.target.value)} value={comment}></input>
                            <button onClick={commentHouse}>Gửi</button>
                        </div>
                </div>
            </div>
            {listComment.map((commentConent, index) => (
                <Comment key={index}
                    id={1}
                    img={commentConent.creator.avatar}
                    time="Today at 5:42PM"
                    content={commentConent.content}
                    user={commentConent.creator.first_name + " " + commentConent.creator.last_name}
                />
            ))}
        </div>
    )
}

export default CommentList