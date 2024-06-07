    import { Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
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
        return (
        <Container maxW="1300px" mt="4">
            {PostsData?.data?.map((post)=>(
            <Stack p="4" boxShadow="md" borderRadius="xl" border="1px solid #ccc">

            <Flex justify="space-between">
                <Text>
                    UserId:{post?.user_id}
                </Text>
                <Text>
                    PostId:{post?.id}
                </Text>
            </Flex>
            <Heading fontSize="2xl">
                {post?.title}
            </Heading>
            <Text>{post?.body}</Text>
            </Stack>
            ))}
           
        </Container>
        )
    }

    export default Home;