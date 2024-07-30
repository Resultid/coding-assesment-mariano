export interface FormData {
  [key: string]: string;
}

export enum FieldType {
  TEXT = "Text",
  NUMBER = "Number",
  SELECT = "Select",
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  value: string;
  options?: string[];
  placeholder?: string;
}
