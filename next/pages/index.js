import axios from 'axios';
import styles from '../styles/Home.module.css'
import{useEffect, useState} from'react';

export default function Home() {
  const [posts,setPosts]=useState();
  const [id,setId]=useState('');
  const [title,setTitle]=useState(''); 
  const [author,setAuthor]=useState('');

  const getPosts = async() => {
    const response = await axios.get('http://localhost:8000/users')
    setPosts(response.data)

}
useEffect(()=>{
getPosts()
},[])

console.log(posts);
const postUsers = async(e)=>{
  e.preventDefult()
  const response =await axios.post('http://localhost:8000/users',{id,title,author})
  if (response.status==200){
    getPosts()
  }
}
  return (
   <div className={styles.container}>
    <div>
      <form onSubmit={postUsers}>
        <input onChange ={(e)=>setId(e.target.value)} value={id} placeholder='id'></input>
        <input onChange ={(e)=>setTitle(e.target.value)} value={title} placeholder='title'></input>
        <input onChange ={(e)=>setAuthor(e.target.value)} value={author} placeholder='author'></input>
        <input type="submit"/>
        </form>
        {posts?.map((posts,i)=>{
          return(
            <div key={i}>
            <h1>
            {posts?.id}
            </h1>
            <h2>{posts.title}</h2>
            <h2>{posts.author}</h2>
            <hr/>
          </div>
          
        )
      })}
    </div>
   </div>
  )
}
