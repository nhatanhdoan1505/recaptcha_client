import { InferGetServerSidePropsType } from "next";
import recaptchaApi from "../../api/recaptchaApi";
import { downloadImage } from "../../helper/common";
import AnwserForm from "../../features/recaptcha/components/AnwserForm";
import { useAppDispatch } from "../../app/hook";
import { recaptchaAction } from "../../features/recaptcha/recaptchaSlice";
import { Center } from "@chakra-ui/react";
import { useEffect } from "react";

function Recaptcha({
  _id,
  question,
  filePath,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(recaptchaAction.setRecaptchaId(_id));
  }, []);

  const src = `http://localhost:8080/static/${filePath}`;
  return (
    <Center my={10}>
      <AnwserForm src={src} question={question} />
    </Center>
  );
}

export const getServerSideProps = async (context: any) => {
  const { _id } = context.query;
  const respone = await recaptchaApi.getRecaptcha(_id);
  return { props: respone.data };
};

export default Recaptcha;
