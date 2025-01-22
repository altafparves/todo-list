import { useState } from "react";
import FormItem from "../components/formItem";
import Button from "../components/button";
import PasswordForm from "../components/passwordForm";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const { login } = useAuth(); // Access the login function from useAuth

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

  return (
    <section className="w-full h-screen overflow-hidden bg-base flex flex-row justify-center items-center px-[20px] py-[24px]">
      <div className="hidden h-full md:flex w-1/2 rounded-[12px] bg-grey">adads</div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="content flex w-full md:w-[50%]  h-auto flex-col items-center gap-[37px]">
          <p className="flex flex-col items-center text-center text-26-700">
            Login
            <span className="text-14-500">or create an account</span>
          </p>
          <div className="form w-full flex flex-col gap-[16px]">
            <FormItem label="Username" onChange={handleUsernameChange} placeholder="Enter your email" />
            <PasswordForm label="Password" onChange={handlePasswordChange} placeholder="Enter your password" />
            <div className="flex flex-col gap-[8px] w-full">
              {error && <p className="mt-[3px] pl-[14px] text-11-400 text-red-500">{error}</p>}
              <Button className="mt-[16px]" onClick={handleSubmit}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
