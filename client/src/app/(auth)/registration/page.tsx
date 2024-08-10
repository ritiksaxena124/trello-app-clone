"use client";
import FormField from "@/components/FormField";
import Image from "next/image";
import Gradient from "@/../public/circuit-board.svg";

import { useRouter } from "next/navigation";
import { PrimaryBtn } from "@/components/Button";
import { Formik, Form, useFormik } from "formik";

interface FormFields {
  fullName?: string;
  email?: string;
  password?: string;
}

export default function Page() {
  const router = useRouter();
  const initialValues: FormFields = {
    fullName: "",
    email: "",
    password: "",
  };

  function handleValidate(values: FormFields) {
    const errors: FormFields = {};
    if (!values.email) {
      errors.email = "Email is required*";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.fullName) {
      errors.fullName = "Name is required";
    }

    return errors;
  }

  async function handleSubmit(values: FormFields) {
    const res = await fetch("http://localhost:9081/api/v1/user/register", {
      method: "POST",
      body: JSON.stringify(values, null, 2),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.statusCode === 201) {
      router.push("/login");
    } else {
      router.push("/registration");
    }
  }

  return (
    // <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#AFA3FF]">
    //   <div className="max-w-lg w-full bg-slate-50 rounded-lg border border-zinc-300 p-8 space-y-8">
    //     <h1 className="text-3xl text-[#2d2d2d] text-center font-semibold">
    //       Welcome to <span className="text-[#4534AC]">Workflo</span>!
    //     </h1>
    //     <Formik
    //       initialValues={initialValues}
    //       validate={(values) => handleValidate(values)}
    //       onSubmit={(values, actions) => {
    //         handleSubmit(values);
    //         actions.setSubmitting(false);
    //       }}
    //     >
    //       <Form>
    //         <FormField type="text" name="fullName" placeholder="Full name" />
    //         <FormField type="email" name="email" placeholder="Your email" />
    //         <FormField type="password" name="password" placeholder="Password" />
    //         <PrimaryBtn type="submit" title="Signup" />
    //       </Form>
    //     </Formik>
    //     <p className="text-center text-[#606060]">
    //       Already have an account?
    //       <a href="/login" className="text-blue-700 cursor-pointer">
    //         Login
    //       </a>
    //       .
    //     </p>
    //   </div>
    // </div>

    <div className="w-full min-h-screen h-screen px-4 lg:px-0 bg-zinc-950 flex">
      <div className="w-full flex items-center justify-center lg:w-2/3 h-full bg-zinc-950 rounded-lg p-4 lg:p-16 space-y-8">
        <div className="max-w-lg w-full h-full flex flex-col justify-center items-center gap-8">
          <div className="w-full">
            <h1 className="text-3xl text-zinc-50 font-semibold">
              Create Your <span className="">Workflo</span>! Account
            </h1>
            <p className="text-zinc-600 mt-2">
              Signup to access the application.
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
                <FormField
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                />
                <FormField type="email" name="email" placeholder="Your email" />
                <FormField
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <PrimaryBtn type="submit" title="Signup" />
              </Form>
            </Formik>
          </div>
          <p className="w-full text-left text-zinc-600">
            Already have an account? {" "}
            <a href="/login" className="text-blue-700 cursor-pointer">
              Login
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
