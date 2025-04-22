import { UserContext, UserContextProps } from "@/context/admin_context";
import { UserErrorType } from "@/types/User_Types";
import React, { useContext, useState } from "react";
import { FaCaretRight } from "react-icons/fa";

import "./style.css";
interface LoginProps{
  toggleForm:()=>void;
}
const Login :React.FC<LoginProps>= ({toggleForm}) => {
  const { user, handleChange } = useContext(UserContext) as UserContextProps;

  const [error, setError] = useState<UserErrorType>({});
  const handleValidation = () => {
    const newError: UserErrorType = {};
    let isValid = false;
    if (!user.email) {
      newError.emailError = "Email is Required";
      isValid = true;
    }
    if (!user.password) {
      newError.passwordError = "Password is Required";
    }


    console.log(newError);
    
    if (isValid) {
      setError(newError);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      alert("Signin Successfully!!!");
    } else {
      alert("Invalid Email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Sign in to AxcelMart Ecommerce</h2>
        <p>Welcome back! Please sign in to continue</p>
      </div>

      <form className="login-body" onSubmit={handleSubmit}>
        <label>Email address</label>
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="Enter your email"
          required
          autoComplete="email"
          maxLength={50}
          className="input-field"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {error.emailError && <span className="error">{error.emailError}</span>}

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Enter your password"
          required
          autoComplete="current-password"
          maxLength={50}
          className="input-field"
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {error.passwordError && (
          <span className="error">{error.passwordError}</span>
        )}

        <div className="login-submit">
          <button className="continue-button" type="submit">
            {"Continue"}
            <span>
              <FaCaretRight size={14} />
            </span>
          </button>
        </div>
      </form>

      <hr />
      <div className="login-footer">
        <span>{`Don't have an account?`}</span>
        <span className="sign-up-text"  onClick={()=>toggleForm()}>Sign up</span>
      </div>
    </div>
  );
};

export default Login;
