import type { NextPage } from "next";
import UploadForm from "../features/recaptcha/components/UpLoadForm";

const Home: NextPage<{ drive: string }> = (props: { drive: string }) => {
  return (
    <>
      <UploadForm acceptType="image/*" />
    </>
  );
};

export default Home;
