import React from 'react';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <CircularProgress />
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
