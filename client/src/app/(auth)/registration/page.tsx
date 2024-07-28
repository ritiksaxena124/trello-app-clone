"use client";
import FormField from "@/components/FormField";
import { PrimaryBtn } from "@/components/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface FormFields {
  fullName?: string;
  email?: string;
  password?: string;
}

export default function Page() {
  const initialValues: FormFields = {};

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

  function handleSubmit(values: FormFields) {
    console.log(values);
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#AFA3FF]">
      <div className="max-w-lg w-full bg-slate-50 rounded-lg border border-zinc-300 p-8 space-y-8">
        <h1 className="text-3xl text-[#2d2d2d] text-center font-semibold">
          Welcome to <span className="text-[#4534AC]">Workflo</span>!
        </h1>
          <Formik
            initialValues={initialValues}
            validate={handleValidate}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormField type="text" name="fullName" placeholder="Full name" />
              <FormField type="email" name="email" placeholder="Your email" />
              <FormField
                type="password"
                name="password"
                placeholder="Password"
              />
              <PrimaryBtn type="submit" title="Login" />
            </Form>
          </Formik>
        <p className="text-center text-[#606060]">
          Already have an accout?
          <a href="/login" className="text-blue-700 cursor-pointer"> Log in</a>.
        </p>
      </div>
    </div>
  );
}
