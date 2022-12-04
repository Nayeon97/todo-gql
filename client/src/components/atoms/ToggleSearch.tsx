/** @jsxImportSource @emotion/react */
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

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
      value={alignment}
      onChange={handleChange}
      exclusive
      color="primary"
    >
      <ToggleButton value="create" key="create">
        Todo 추가
      </ToggleButton>
      <ToggleButton value="search" key="search">
        Todo 검색
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleSearch;
