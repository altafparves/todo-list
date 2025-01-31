import { useState } from "react";
import FormItem from "../components/formItem";
import Button from "../components/button";
import PasswordForm from "../components/passwordForm";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleUsernameChange = (value) => {
    setFormValues((prev) => ({
      ...prev,
      username: value,
    }));
  };

  const handlePasswordChange = (value) => {
    setFormValues((prev) => ({
      ...prev,
      password: value,
    }));
  };
    console.log(formValues);


  const handleSubmit = async () => {
    try {
      setError(null); // Reset error state
      await login(formValues); // Call the login function
      console.log(formValues);
    } catch (err) {
      setError(err.message); // Set error message if login fails
    }
  };

  const handleLoginNavigation = () => {
    navigate("/login");
  };

  return (
    <section className="w-full h-screen overflow-hidden bg-base flex flex-row justify-center items-center px-[20px] py-[24px]">
      <div className="hidden h-full md:flex w-1/2 rounded-[12px] bg-grey">adads</div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="content flex w-full md:w-[50%]  h-auto flex-col items-center gap-[37px]">
          <p className="flex flex-col items-center text-center text-text text-26-700">
            Sign Up
            <button className="text-14-500" onClick={handleLoginNavigation}>
              you have an account? 
              <span className="underline ml-[3px]">Login</span>
            </button>
          </p>
          <div className="form w-full flex flex-col gap-[16px]">
            <FormItem label="Email" onChange={handleUsernameChange} placeholder="anton@gmail.com" />
            <FormItem label="Username" onChange={handleUsernameChange} placeholder="altopmantop" />

            <PasswordForm label="Password" onChange={handlePasswordChange} placeholder="Enter your password" />
            <div className="flex flex-col gap-[8px] w-full">
              {error && <p className="mt-[3px]  pl-[14px] text-11-400 text-red">{error}</p>}
              <Button className="mt-[16px]" onClick={handleSubmit}>
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
