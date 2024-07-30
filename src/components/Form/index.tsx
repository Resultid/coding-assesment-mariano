import React, { useState } from "react";
import { sendForm } from "../../services/formService";
import { FormField, FieldType } from "../../services/types";
import FormBuilder from "../FormBuilder";
import { formSchema } from "../../services/validations";
import TrashIcon from "../../assets/icons/TrashIcon";

const FormSubmitter: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [fields, setFields] = useState<FormField[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);
    setFieldErrors({});

    const formData = { email, fields };

    //TODO:check validations!!
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const errors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path.length === 1 && err.path[0] === "email") {
          setError(err.message);
        } else {
          const [index, field, ...rest] = err.path;
          if (typeof index === "number" && field === "fields") {
            errors[`${index}.${rest.join(".")}`] = err.message;
          }
        }
      });
      setFieldErrors(errors);
      setIsSending(false);
      return;
    }

    try {
      const formattedData = fields.reduce((acc, field) => {
        acc[field.label] = field.value;
        return acc;
      }, {} as Record<string, string>);
      console.log("Formatted data for submission:", formattedData);
      await sendForm(email, formattedData);
      alert("Form submitted successfully!");
    } catch (err) {
      setError("An error occurred while submitting the form.");
    } finally {
      setIsSending(false);
    }
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Form Submission
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Recipient Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>

              {field.type === FieldType.SELECT ? (
                <div className="flex gap-2 items-center justify-center">
                  <select
                    id={field.id}
                    value={field.value}
                    onChange={(e) => {
                      const newFields = fields.map((f) =>
                        f.id === field.id ? { ...f, value: e.target.value } : f
                      );
                      setFields(newFields);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {field.value.split(",").map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div
                    onClick={() => handleRemoveField(field.id)}
                    className="cursor-pointer"
                  >
                    <TrashIcon />
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 items-center justify-center">
                  <input
                    type={field.type}
                    id={field.id}
                    value={field.value}
                    onChange={(e) => {
                      const newFields = fields.map((f) =>
                        f.id === field.id ? { ...f, value: e.target.value } : f
                      );
                      setFields(newFields);
                    }}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <div
                    onClick={() => handleRemoveField(field.id)}
                    className="cursor-pointer"
                  >
                    <TrashIcon />
                  </div>
                </div>
              )}

              {fieldErrors[`${index}.value`] && (
                <div className="text-red-500 text-sm">
                  {fieldErrors[`${index}.value`]}
                </div>
              )}
            </div>
          ))}
          <FormBuilder fields={fields} setFields={setFields} />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
            disabled={isSending}
          >
            {isSending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormSubmitter;
