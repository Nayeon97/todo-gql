/** @jsxImportSource @emotion/react */
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

export type Alignment = "create" | "search";

interface ToggleSearchProps {
  alignment: Alignment;
  setAlignment: Dispatch<SetStateAction<Alignment>>;
}

const ToggleSearch = ({ alignment, setAlignment }: ToggleSearchProps) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: Alignment
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      onChange={handleChange}
      exclusive
      color='primary'
    >
      <ToggleButton value='create' key='create'>
        Todo 추가
      </ToggleButton>
      <ToggleButton value='search' key='search'>
        Todo 검색
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleSearch;
