import  { useContext, useState } from "react";
import InputElement from "./InputElement";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const {  updateAuthToken } = useContext(AuthContext); // Access token and setter
  const [email, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    // setAuthToken(response.token)
    if (response.ok) {
      const result = await response.json();

      updateAuthToken(result.user.token);
      navigation('/')
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        fontSize: "50px",
      }}
    >
      <form action="" method="post">
        <InputElement
          label="email"
          type="text"
          name="email"
          set={setUseremail}
        />
        <InputElement
          label="Password"
          type="password"
          name="password"
          set={setPassword}
        />
        {/* <button>Submit</button> */}
        <input type="submit" value="submit" onClick={handleLogin} />
      </form>
    </div>
  );
}

export default Login;
