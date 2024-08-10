"use client";
import FormField from "@/components/FormField";
import { PrimaryBtn } from "@/components/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import Gradient from "@/../public/circuit-board.svg";
import Image from "next/image";
import { useState } from "react";

interface FormFields {
  email?: string;
  password?: string;
}

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); 

  const initialValues: FormFields = {
    email: "",
    password: "",
  };

  function handleValidate(values: FormFields) {
    const errors: FormFields = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  }

  async function handleSubmit(values: FormFields) {
    setLoading(true);
    const res = await fetch("http://localhost:9081/api/v1/user/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(values, null, 2),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (!data?.success) {
      alert("Invalid credentials");
    } else {
      setLoading(false);
      router.push("/dashboard");
    }
  }

  return (
    <div className="w-full min-h-screen h-screen px-4 lg:px-0 bg-zinc-950 flex">
      <div className="w-full flex items-center justify-center lg:w-2/3 h-full bg-zinc-950 rounded-lg p-4 lg:p-16 space-y-8">
        <div className="max-w-lg w-full h-full flex flex-col justify-center items-center gap-8">
          <div className="w-full">
            <h1 className="text-3xl text-zinc-50 font-semibold">
              Welcome Back to <span className="">Workflo</span>!
            </h1>
            <p className="text-zinc-600 mt-2">
              Enter your email and password to continue.
            </p>
          </div>
          <div className="w-full">
            <Formik
              initialValues={initialValues}
              validate={handleValidate}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Form>
                <FormField type="email" name="email" placeholder="Your email" />
                <FormField
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <PrimaryBtn type="submit" title="Login" loading={loading}/>
              </Form>
            </Formik>
          </div>
          <p className="w-full text-left text-zinc-600">
            Don&apos;t have an account? Create a{" "}
            <a href="/registration" className="text-blue-500 cursor-pointer">
              new account
            </a>
            .
          </p>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 h-full">
        <div className="w-full h-full">
          <Image
            src={Gradient?.src}
            alt="gradient"
            width={100}
            height={100}
            className="w-full h-full object-cover invert opacity-10"
          />
        </div>
      </div>
    </div>
  );
}
