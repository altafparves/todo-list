import FormItem from "../components/formItem"
import Button from "../components/button";
import PasswordForm from "../components/passwordForm";
export default function Login(){
    return (
      <>
        <section className="w-full h-screen overflow-hidden bg-base flex justify-center items-center px-[20px]">
          <div className="content flex w-full h-auto flex-col items-center gap-[37px]">
            <p className="flex flex-col items-center text-center text-26-700">
              Login
              <span className="text-14-500">or create an account</span>
            </p>
            <div className="form w-full flex flex-col gap-[16px]">
              <FormItem label="Username" placeholder="blablac@gmail.com" />
              <PasswordForm label="Password" placeholder="blablac@gmail.com" />
              <div className="flex flex-col gap-[8px] w-full">
                <p className="mt-[3px] pl-[14px] text-11-400 text-red-500">error</p>
                <Button className="mt-[16px]">Login</Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}