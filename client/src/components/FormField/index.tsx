import { ErrorMessage, Field } from "formik";

export default function FormField({ type, placeholder, name }) {
  return (
    <>
      <div className="mb-4 w-full">
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full p-3 rounded-md border border-zinc-700 bg-zinc-950  text-zinc-50 focus:outline transition-none focus:outline-zinc-400"
        />
        <ErrorMessage name={name} component="p" className="text-xs text-red-600 mt-1" />
      </div>
    </>
  );
}
