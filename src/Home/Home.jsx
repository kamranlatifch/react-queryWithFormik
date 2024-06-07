import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchPosts=async ()=>{
    try{
 const {data}=await axios.get('https://gorest.co.in/public/v1/posts');   

return data;
}catch (error){
    throw Error("Unable to fetch posts.")
}


}


const Home=()=>{
const {data:PostsData, isLoading:PostsLoading}=useQuery('posts',fetchPosts);
    
    console.log("Posts Data is",PostsData)
    return <div>
        Home Page
    </div>
}

export default Home;