import React, { useEffect, useState } from "react";
import ButtonClick from "./Button";
import { Button, useToast, Heading, VStack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  selectLoading,
  recaptchaAction,
  selectAnswer,
  selectId,
  selectIsSuccess,
} from "../recaptchaSlice";

function AnwserForm({ src, question }: { src: string; question: string }) {
  const toast = useToast();
  const dispatch = useAppDispatch();

  const answer = useAppSelector(selectAnswer);
  const loading = useAppSelector(selectLoading);
  const _id = useAppSelector(selectId);
  const isSuccess = useAppSelector(selectIsSuccess);

  const [isFirstSubmit, setIsFirstSubmit] = useState(true);

  const handlerSubmitAwnser = () => {
    setIsFirstSubmit(false);
    if (answer.length === 0) {
      toast({
        title: "Submit fail",
        description: "Pick at least one anwser to submit",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } else {
      dispatch(recaptchaAction.submitAwnser({ answer, _id: _id }));
    }
  };

  useEffect(() => {
    if (!isFirstSubmit && isSuccess && !loading) {
      toast({
        title: "Submit successfully",
        description: "You can try again",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } else if (!isFirstSubmit && !isSuccess && !loading) {
      toast({
        title: "Submit fail",
        description: "Try again",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  }, [loading]);
  return (
    <>
      <VStack boxShadow="base" px={6} py={4} borderRadius="md">
        <Heading my={3} as="h5">{question}</Heading>
        <div style={{ position: "relative" }}>
          <img src={src} />
          {Array.from(Array(9).keys()).map((b, index) => (
            <ButtonClick key={index} index={index} />
          ))}
          <Button
            colorScheme="green"
            my={5}
            loading={loading}
            onClick={handlerSubmitAwnser}
          >
            Submit
          </Button>
        </div>
      </VStack>
    </>
  );
}

export default AnwserForm;
