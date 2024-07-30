import { z } from "zod";

const selectValueSchema = z
  .array(z.string())
  .min(1, { message: "At least one option is required" });
// validating the value of fields that are of type select

export const fieldSchema = z.object({
  id: z.string(),
  type: z.enum(["text", "email", "number", "select"]),
  label: z.string().min(1, { message: "Label is required" }),
  placeholder: z.string().min(1, { message: "Placeholder is required" }),
  value: z
    .union([
      z.string().min(1, { message: "Value is required" }),
      z.number().min(1, { message: "Value must be a number" }),
      selectValueSchema,
    ])
    .optional(),
});
// defines the structure for an individual form field.

export const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  fields: z.array(fieldSchema),
});
//defines the structure of the form data.
