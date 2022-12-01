/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction, useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { css } from "@emotion/react";

interface ToggleSearchProps {
  alignment: string;
  setAlignment: Dispatch<SetStateAction<string>>;
}

const ToggleSearch = ({ alignment, setAlignment }: ToggleSearchProps) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      onChange={handleChange}
      css={toggleButtonGroupStyle}
    >
      <ToggleButton value="create" css={toggleButtonStyle}>
        create
      </ToggleButton>
      <ToggleButton value="search" css={toggleButtonStyle}>
        search
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleSearch;

const toggleButtonGroupStyle = css`
  height: 20px;
  margin: 10px 0px;
`;

const toggleButtonStyle = css`
  font-size: 16px;
`;
