import { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

const GET_USER = gql`
  query User($userId: String!) {
    user(id: $userId) {
      id
      name
    }
  }
`;

const Login = () => {
  const [userId, setUserId] = useState("");
  const [getUser, { loading, error, data }] = useLazyQuery(GET_USER);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error}`;

  const onChange = (e) => {
    setUserId(e.target.value);
  };

  const onClick = () => {
    getUser({ variables: { userId: userId } });
    checkUser();
  };

  const checkUser = () => {
    if (data) {
      navigate("todos");
    } else {
      window.confirm("잘못된 유저 아이디입니다.");
      setUserId("");
    }
  };

  return (
    <div>
      <input type="id" name="id" value={userId} onChange={onChange} />
      <button onClick={onClick}>Login</button>
    </div>
  );
};

export default Login;
