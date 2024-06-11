import { Heading, Stack, Toast, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
const addNewPostCall = async ({ title, body }) => {
  try {
    const { data } = await axios.post(
      "https://gorest.co.in/public/v1/users/6952391/posts",
      {
        title,
        body,
      },
      {
        headers: {
          Authorization:
            "Bearer cd6807e42e3e13a8d56a28acd067d23e76d2b2b254f449e970cebf0406c09a13",
        },
      }
    );
    return data;
  } catch (error) {
    throw Error(error.response.statusText);
  }
};

const AddNewPOst = () => {
  const toast = useToast();
  const cache = useQueryClient();
  const { isLoading, data, mutateAsync } = useMutation(
    "addNewPost",
    addNewPostCall,
    {
      onSuccess: () => {
        cache.invalidateQueries("posts");
      },
      onError: (error) => {
        toast({ status: "error", title: error.message });
      },
    }
  );
  return (
    <div style={{ marginBottom: "20px" }}>
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={async (values) => {
          await mutateAsync({ title: values.title, body: values.body });
        }}
      >
        <Form>
          <Stack my="4" mb="2">
            <Heading fontSize="2xl" textAlign="center">
              {" "}
              Add New POST
            </Heading>
          </Stack>
          <InputControl name="title" label="Title" />
          <TextareaControl name="body" label="Body" />
          <SubmitButton my="4">ADD--POST</SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default AddNewPOst;
