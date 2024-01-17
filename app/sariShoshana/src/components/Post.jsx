import React, { useState } from "react";

const Post = (props) => {
const[bodyDisplay,setDisplay]=useState("none");
    const cur_post ={id:props.post.id,userId:props.post.userId,title:props.post.title,body:props.post.body};
    const [form, setUpdateForm] = useState();
    const url = "http://localhost:3002";
const [Comments,setComments]=useState();
//const [comments,setComents]=useState([]);
    const delete_post = () => {
        // event.preventDefault();
        fetch(`${url}/posts/${cur_post.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            const updatedArr = props.posts.filter(p => p.id != cur_post.id);
            props.setPosts(updatedArr);
        }).catch(error => {
            console.error(error);
        });
    }

    const update = (event) => {
        event.preventDefault()
        let post = {
            userId: cur_post.userId,
            id: cur_post.id,
            title: event.target.querySelector('#title').value == "" ? cur_post.title : event.target.querySelector('#title').value,
            body: event.target.querySelector('#body').value == "" ? cur_post.title : event.target.querySelector('#body').value
        }
        fetch(`${url}/posts/${cur_post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            let updatedArr = [];
            props.posts.map(p => p.id != cur_post.id ? updatedArr.push(p) : updatedArr.push(post));
            props.setPosts(updatedArr);
        }).then(setUpdateForm(null)).catch(error => {
            console.error(error);
        });
    }
const show_comments=()=>{
    
    fetch(`${apiUrl}/comments?postId=${cur_post.id}`, {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setComments(data[0])
        });
        // setComents(comments.push({comments:curComments,postId:cur_post.id}));


}
    return (
    <div style={{backgroundColor:bodyDisplay=="none"?"white":"lightpink",padding:"15px"}}>
        <div onClick={()=>{setDisplay(bodyDisplay=="none"?"inline":"none")}} key={cur_post.id} >
            <h3>id: {cur_post.id}</h3>
            <h3 >title: {cur_post.title}</h3>
            <h3 style={{display:bodyDisplay}}>body: {cur_post.body}</h3>
            <br />
          
        </div >
        <button  onClick={() => delete_post()}>delete</button>
        <button  onClick={() => show_comments()}>comments</button>
            <button  onClick={() => {
                form ? setUpdateForm(null) : setUpdateForm(<form onSubmit={() => update(event)}>
                    <label htmlFor="title">title: </label>
                    <input  type="text" id="title" /><br />
                    <label htmlFor="body">body </label>
                    <input type="text" id="body" /><br />
                    <button style={{height:"25px",padding:"0"}} type="submit" >update</button>
                </form>)
            }}>update</button>
            <div>{form}</div>
            <div>{comments}</div>
            </div>
    )
}

export default Post;