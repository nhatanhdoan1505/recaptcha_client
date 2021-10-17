import React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hook";
import { selectAnswer, recaptchaAction } from "../recaptchaSlice";

function Button({ index }: { index: number }) {
  const dispatch = useAppDispatch();
  const answser = useAppSelector(selectAnswer);

  const postion = [
    { top: "0px", left: "0px" },
    { top: "0px", left: "131px" },
    { top: "0px", left: "262px" },
    { top: "131px", left: "0px" },
    { top: "131px", left: "131px" },
    { top: "131px", left: "262px" },
    { top: "262px", left: "0px" },
    { top: "262px", left: "131px" },
    { top: "262px", left: "262px" },
  ];

  const hanlderClickButton = () => {
    dispatch(recaptchaAction.choosePicture(index.toString()));
  };

  return (
    <button
      style={{
        width: "130px",
        height: "130px",
        position: "absolute",
        ...postion[index],
        backgroundColor: "Transparent",
        border: !answser.includes(index.toString())
          ? "1px white solid"
          : "2.5px dashed #4BB543",
      }}
      onClick={hanlderClickButton}
    ></button>
  );
}

export default Button;
