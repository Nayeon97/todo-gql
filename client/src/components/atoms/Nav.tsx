/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Nav = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 60px;
        top: 0;
        position: fixed;
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.09);
      `}
    >
      Todo
    </div>
  );
};

export default Nav;
