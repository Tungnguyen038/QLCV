import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SignForm from "./auth/SignForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/apiRequest";
import InputHook from "../components/input/InputHook";

const schema = yup
  .object({
    userName: yup.string().required("Please enter your username"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters or greater")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Your password must have at least 1 uppercase, 1 lowercase, 1 special character",
        }
      )
      .required("Please enter your password"),
  })
  .required();
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmitHandler = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      // resolve();
      // loginUser(values, dispatch, navigate);
      // reset({
      //   username: "",
      //   password: "",
      // });
      setTimeout(() => {
        resolve();
        loginUser(values, dispatch, navigate);
        reset({
          userName: "",
          password: "",
        });
      }, 500);
    });
  };
  return (
    <SignForm
      Children={
        <div className="bg-white w-[400px] h-[470px] relative z-10 m-auto rounded-lg p-5 flex flex-col shadow-md ">
          <h2 className="text-[#5E6C84] text-3xl mb-3 text-center mt-5">
            Sign In
          </h2>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="">
              <div className="flex flex-col mb-2">
                <label className="cursor-pointer" htmlFor="userName">
                  Username
                </label>
                <InputHook
                  name="userName"
                  placeholder="enter your username"
                  id="userName"
                  control={control}
                  type="text"
                ></InputHook>
                {errors.userName && (
                  <p className="text-sm text-red-500">
                    {errors.userName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-2">
                <label className="cursor-pointer" htmlFor="password">
                  Password
                </label>
                <InputHook
                  name="password"
                  placeholder="enter your password"
                  id="password"
                  control={control}
                  type="password"
                ></InputHook>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                className={`w-full p-4 continue-btn text-white rounded-lg mt-5 font-semibold ${
                  isSubmitting ? "opacity-50" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <span className="mt-2 text-sm text-[#AAA2A2] text-center">or</span>
          <button className="flex p-3 mt-2 border rounded-lg border-1 border-slate-400">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3.95833C11.475 3.95833 12.7958 4.46667 13.8375 5.45833L16.6917 2.60417C14.9583 0.991667 12.6958 0 10 0C6.09167 0 2.7125 2.24167 1.06667 5.50833L4.39167 8.0875C5.17917 5.71667 7.39166 3.95833 10 3.95833Z"
                fill="#EA4335"
              />
              <path
                d="M19.575 10.2292C19.575 9.57504 19.5125 8.94171 19.4167 8.33337H10V12.0917H15.3917C15.15 13.325 14.45 14.375 13.4 15.0834L16.6208 17.5834C18.5 15.8417 19.575 13.2667 19.575 10.2292Z"
                fill="#4285F4"
              />
              <path
                d="M4.3875 11.9125C4.1875 11.3083 4.07083 10.6666 4.07083 9.99997C4.07083 9.3333 4.18333 8.69163 4.3875 8.08747L1.0625 5.5083C0.383333 6.8583 0 8.3833 0 9.99997C0 11.6166 0.383333 13.1416 1.06667 14.4916L4.3875 11.9125Z"
                fill="#FBBC05"
              />
              <path
                d="M10 20C12.7 20 14.9708 19.1125 16.6208 17.5792L13.4 15.0792C12.5042 15.6833 11.35 16.0375 10 16.0375C7.39167 16.0375 5.17917 14.2792 4.3875 11.9083L1.0625 14.4875C2.7125 17.7583 6.09167 20 10 20Z"
                fill="#34A853"
              />
            </svg>
            <span className="justify-center flex-1 text-sm text-[#42526E] select-none">
              Continue with Google
            </span>
          </button>
          <div className="mt-8 border border-1 border-slate-300"></div>
          <div className="flex items-center justify-center mt-8">
            <span className="ml-4 text-sm text-blue-700 cursor-pointer">
              Can't login?
            </span>
            <div className="w-[4px] h-[4px] rounded-full bg-slate-600 ml-4"></div>
            <Link to="../register">
              <span className="ml-4 text-sm text-blue-700 cursor-pointer">
                Sign up for account
              </span>
            </Link>
          </div>
        </div>
      }
    ></SignForm>
  );
};

export default LoginPage;
