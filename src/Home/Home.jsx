//     import { Button, Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
//     import axios from "axios";
//     import React from "react";
//     import { useQuery } from "react-query";
// import { useParams} from "react-router-dom";

//     const fetchPosts=async (pageNumber)=>{
//         try{
//     const {data}=await axios.get(`https://gorest.co.in/public/v1/posts?page=${pageNumber}`);   

//     return data;
//     }catch (error){
//         throw Error("Unable to fetch posts.")
//     }


//     }


//     const Home=()=>{
//         const {id}=useParams();
      
//         const pageNumber=parseInt(id);
//         const toast=useToast();
//     const {data:PostsData, isLoading:PostsLoading}=useQuery('posts',()=>fetchPosts(pageNumber),{onError:(error)=>{
//         toast({status:"error", title:error.message})
//     }});
        
//         console.log("Posts Data is",PostsData)
//         return (
//         <Container maxW="1300px" mt="4">
//             {PostsLoading?<Grid placeItems="center" height="100vh">
//                 <Spinner/>
//             </Grid>:
//             <>
//             <Flex justify="space-between" mb="4">  
//                 <Button colorScheme="red" onClick={()=>{

//                 }}>Prev</Button>
//                 <Button colorScheme="green">Next</Button>

//             </Flex>
//             {PostsData?.data?.map((post)=>(
//             <Stack key={post.id} 
//             p="4" boxShadow="md"
//              borderRadius="xl"
//               border="1px solid #ccc"
//               mb="4"
//               >

//             <Flex justify="space-between">
//                 <Text>
//                     UserId:{post?.user_id}
//                 </Text>
//                 <Text>
//                     PostId:{post?.id}
//                 </Text>
//             </Flex>
//             <Heading fontSize="2xl">
//                 {post?.title}
//             </Heading>
//             <Text>{post?.body}</Text>
//             </Stack>
//             ))}
//             </>
//             }
            
           
//         </Container>
//         )
//     }

//     export default Home;


import { Button, Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const fetchPosts = async (pageNumber) => {
  try {
    const { data } = await axios.get(`https://gorest.co.in/public/v1/posts?page=${pageNumber}`);
    return data;
  } catch (error) {
    throw Error("Unable to fetch posts.");
  }
};

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [pageNumber, setPageNumber] = useState(parseInt(id) || 1);

  useEffect(() => {
    if (id) {
      setPageNumber(parseInt(id));
    }
  }, [id]);

  const { data: PostsData, isLoading: PostsLoading } = useQuery(['posts', pageNumber], () => fetchPosts(pageNumber), {
    onError: (error) => {
      toast({ status: "error", title: error.message });
    }
  });

  const handlePrev = () => {
    if (pageNumber > 1) {
      navigate(`/${pageNumber - 1}`);
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    navigate(`/${pageNumber + 1}`);
    setPageNumber(pageNumber + 1);
  };

  console.log("Posts Data is", PostsData);

  return (
    <Container maxW="1300px" mt="4">
      {PostsLoading ? (
        <Grid placeItems="center" height="100vh">
          <Spinner />
        </Grid>
      ) : (
        <>
          <Flex justify="space-between" mb="4">
            <Button colorScheme="red" onClick={handlePrev} disabled={pageNumber === 1}>
              Prev
            </Button>
            <Button colorScheme="green" onClick={handleNext}>
              Next
            </Button>
          </Flex>
          {PostsData?.data?.map((post) => (
            <Stack
              key={post.id}
              p="4"
              boxShadow="md"
              borderRadius="xl"
              border="1px solid #ccc"
              mb="4"
            >
              <Flex justify="space-between">
                <Text>
                  UserId: {post?.user_id}
                </Text>
                <Text>
                  PostId: {post?.id}
                </Text>
              </Flex>
              <Heading fontSize="2xl">
                {post?.title}
              </Heading>
              <Text>{post?.body}</Text>
            </Stack>
          ))}
        </>
      )}
    </Container>
  );
};

export default Home;
