"use client";
import FormField from "@/components/FormField";
import { PrimaryBtn } from "@/components/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";

interface FormFields {
  email?: string;
  password?: string;
}

export default function Page() {
  const router = useRouter();

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
      router.push("/dashboard");
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#AFA3FF]">
      <div className="max-w-lg w-full bg-slate-50 rounded-lg border border-zinc-300 p-8 space-y-8">
        <h1 className="text-3xl text-[#2d2d2d] text-center font-semibold">
          Welcome to <span className="text-[#4534AC]">Workflo</span>!
        </h1>
        <div>
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
              <PrimaryBtn type="submit" title="Login" />
            </Form>
          </Formik>
        </div>
        <p className="text-center text-[#606060]">
          Don&apos;t have an account? Create a{" "}
          <a href="/registration" className="text-blue-700 cursor-pointer">
            new account
          </a>
          .
        </p>
      </div>
    </div>
  );
}
