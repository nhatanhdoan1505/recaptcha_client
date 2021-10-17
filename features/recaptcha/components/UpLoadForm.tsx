import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Center,
  Input,
  useToast,
  VStack,
  useClipboard,
  HStack,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  recaptchaAction,
  selectId,
  selectIsSuccess,
  selectLoading,
} from "../recaptchaSlice";

function UpLoadForm({ acceptType }: { acceptType: string }) {
  const [file, setFile] = useState<any>(null);
  const [question, setQuestion] = useState<string>("");
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);

  const dispatch = useAppDispatch();
  const _id = useAppSelector(selectId);
  const isSuccess = useAppSelector(selectIsSuccess);
  const loading = useAppSelector(selectLoading);

  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(_id);

  const handlerInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
  };
  const handlerInputQuestion = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handlerUpload = () => {
    setIsFirstSubmit(false);
    if (!file || !question) {
      toast({
        title: "Insufficient Value",
        description: "Fill both file and question",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      dispatch(recaptchaAction.uploadRecaptcha({ file, question }));
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
      <Center my={10}>
        <VStack>
          <HStack my={6} w="100%">
            <Input value={_id} isReadOnly placeholder="Result" />
            <Button onClick={onCopy} ml={2}>
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </HStack>
          <VStack boxShadow="md" py={4} px={6} borderRadius="2xl" spacing="10">
            <Input
              type="file"
              accept={acceptType}
              onChange={handlerInputFileChange}
            />
            <Input
              type="text"
              placeholder="Input Question"
              onChange={handlerInputQuestion}
            />

            <Button colorScheme="teal" onClick={handlerUpload}>
              Upload
            </Button>
          </VStack>
        </VStack>
      </Center>
    </>
  );
}

export default UpLoadForm;
