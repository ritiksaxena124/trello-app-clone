"use client";
import FormField from "@/components/FormField";
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
    const res = await fetch("http://localhost:9081/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(values, null, 2),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === 201) {
      router.push("/dashboard");
    } else {
      router.push("/registration");
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#AFA3FF]">
      <div className="max-w-lg w-full bg-slate-50 rounded-lg border border-zinc-300 p-8 space-y-8">
        <h1 className="text-3xl text-[#2d2d2d] text-center font-semibold">
          Welcome to <span className="text-[#4534AC]">Workflo</span>!
        </h1>
        <Formik
          initialValues={initialValues}
          validate={(values) => handleValidate(values)}
          onSubmit={(values, actions) => {
            handleSubmit(values);
            actions.setSubmitting(false);
          }}
        >
          <Form>
            <FormField type="text" name="fullName" placeholder="Full name" />
            <FormField type="email" name="email" placeholder="Your email" />
            <FormField type="password" name="password" placeholder="Password" />
            <PrimaryBtn icon="" type="submit" title="Signup" />
          </Form>
        </Formik>
        <p className="text-center text-[#606060]">
          Already have an account?
          <a href="/login" className="text-blue-700 cursor-pointer">
            Login
          </a>
          .
        </p>
      </div>
    </div>
  );
}
