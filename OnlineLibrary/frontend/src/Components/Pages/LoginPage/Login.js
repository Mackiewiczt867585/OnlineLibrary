import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./Login.css";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="card-header"><h1>Login </h1><br></br></div>
        <hr />
        <div className="card d-flex justify-content-center col-md-4">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Enter Username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter Password" />
        <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;