    import { Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
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

        const toast=useToast();
    const {data:PostsData, isLoading:PostsLoading}=useQuery('posts',fetchPosts,{onError:(error)=>{
        toast({status:"error", title:error.message})
    }});
        
        console.log("Posts Data is",PostsData)
        return (
        <Container maxW="1300px" mt="4">
            {PostsLoading?<Grid placeItems="center" height="100vh">
                <Spinner/>
            </Grid>:
            <>
            {PostsData?.data?.map((post)=>(
            <Stack key={post.id} 
            p="4" boxShadow="md"
             borderRadius="xl"
              border="1px solid #ccc"
              mb="4"
              >

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
            </>
            }
            
           
        </Container>
        )
    }

    export default Home;