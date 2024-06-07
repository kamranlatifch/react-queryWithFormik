

import { Button, Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import AddNewPost from "./Components/AddNewPost";

const fetchPosts = async (pageNumber) => {
  try {
    const { data } = await axios.get(`https://gorest.co.in/public/v1/posts?page=${pageNumber}`, {
      headers: {
        Authorization: 'Bearer cd6807e42e3e13a8d56a28acd067d23e76d2b2b254f449e970cebf0406c09a13', // Add your custom header here
       
      }
    });
    
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
   keepPreviousData:true,
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
    if (pageNumber < totalPages) {
      navigate(`/${pageNumber + 1}`);
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePageClick = (page) => {
    navigate(`/${page}`);
    setPageNumber(page);
  };

  const totalPages = PostsData?.meta?.pagination?.pages || 1;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const displayPages = () => {
    const maxPagesToShow = window.innerWidth > 768 ? 7 : 3; // Show more pages on larger screens
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(pageNumber - half, 1);
    let end = Math.min(pageNumber + half, totalPages);

    if (end - start < maxPagesToShow - 1) {
      if (pageNumber <= half) {
        end = Math.min(maxPagesToShow, totalPages);
      } else if (pageNumber > totalPages - half) {
        start = Math.max(totalPages - maxPagesToShow + 1, 1);
      }
    }

    const visiblePages = [];
    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    if (start > 1) {
      visiblePages.unshift('...');
      visiblePages.unshift(1);
    }
    if (end < totalPages) {
      visiblePages.push('...');
      visiblePages.push(totalPages);
    }

    return visiblePages;
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


        <AddNewPost/>
          <Flex justify="space-between" mb="4" flexWrap="wrap">
            <Button colorScheme="red" onClick={handlePrev} disabled={pageNumber === 1}>
              Prev
            </Button>
            <Flex gap="2" wrap="wrap">
              {displayPages().map((page, index) => (
                typeof page === 'number' ? (
                  <Button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    colorScheme={page === pageNumber ? "blue" : "gray"}
                  >
                    {page}
                  </Button>
                ) : (
                  <Button key={index} disabled>
                    {page}
                  </Button>
                )
              ))}
            </Flex>
            <Button colorScheme="green" onClick={handleNext} disabled={pageNumber === totalPages}>
              Next
            </Button>
          </Flex>
          {PostsData?.data?.map((post) => (

            <Link key={post.id} to={`/post/${post.id}`}>
            <Stack
              
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
            </Link>
          ))}
        </>
      )}
    </Container>
  );
};

export default Home;
