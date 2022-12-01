import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <ReactLoading type={"bubbles"} color="pink" />
    </SpinnerWrapper>
  );
};

export default Spinner;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
