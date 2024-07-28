import { ErrorMessage, Field } from "formik";

export default function FormField({ type, placeholder, name }) {
  return (
    <>
      <div className="mb-4 w-full">
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full p-3 rounded-md border border-transparent outline-none bg-[#EBEBEB] text-[#606060] focus:border focus:border-zinc-400"
        />
        <ErrorMessage name={name} component="p" className="text-xs text-red-600 mt-1" />
      </div>
    </>
  );
}
