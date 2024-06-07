
import { Button, Container, Flex, Grid, Heading, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const fetchPosts = async (postId) => {
  try {
    const { data } = await axios.get(`https://gorest.co.in/public/v1/posts/${postId}`);
    return data;
  } catch (error) {
    throw Error("Unable to fetch Post.");
  }
};

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  

  const { data: PostsData, isLoading: PostsLoading } = useQuery(['post', id], () => fetchPosts(id), {
 
    onError: (error) => {
      toast({ status: "error", title: error.message });
    }
  });

  console.log("Posts Data is", PostsData);

  return (
    <Container maxW="1300px" mt="4">
      {PostsLoading ? (
        <Grid placeItems="center" height="100vh">
          <Spinner />
        </Grid>
      ) : (
        <>
      
          <Stack
              key={PostsData?.data?.id}
              p="4"
              boxShadow="md"
              borderRadius="xl"
              border="1px solid #ccc"
              mb="4"
            >
              <Flex justify="space-between">
                <Text>
                  UserId: {PostsData?.data?.user_id}
                </Text>
                <Text>
                  PostId: {PostsData?.data?.id}
                </Text>
              </Flex>
              <Heading fontSize="2xl">
                {PostsData?.data?.title}
              </Heading>
              <Text>{PostsData?.data?.body}</Text>
            </Stack>
        </>
      )}
    </Container>
  );
};

export default Post;
