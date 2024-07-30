import React, { useState } from "react";
import { FieldType, FormField } from "../../services/types";

interface FormBuilderProps {
  fields: FormField[];
  setFields: React.Dispatch<React.SetStateAction<FormField[]>>;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ fields, setFields }) => {
  const [showModal, setShowModal] = useState(false);
  const [newField, setNewField] = useState<Partial<FormField>>({
    type: FieldType.TEXT,
    label: "",
    placeholder: "",
    value: "",
  });

  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");

  const handleAddField = () => {
    if (!newField.label || !newField.placeholder) return;

    const field: FormField = {
      ...newField,
      id: Math.random().toString(36).substr(2, 9),
      value: newField.type === FieldType.SELECT ? options.join(",") : "",
    } as FormField;

    setFields([...fields, field]);
    setNewField({
      type: FieldType.TEXT,
      label: "",
      placeholder: "",
      value: "",
    });
    setOptions([]);
    setNewOption("");
    setShowModal(false);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value as FieldType;
    setNewField({ ...newField, type: selectedType });

    if (selectedType !== FieldType.SELECT) {
      setOptions([]);
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewOption(e.target.value);
  };

  const addOption = () => {
    if (newOption && !options.includes(newOption)) {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        type="button"
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transform transition-colors duration-300"
      >
        Add Field
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Field</h2>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Label:
                <input
                  type="text"
                  value={newField.label || ""}
                  onChange={(e) =>
                    setNewField({ ...newField, label: e.target.value })
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Placeholder:
                <input
                  type="text"
                  value={newField.placeholder || ""}
                  onChange={(e) =>
                    setNewField({ ...newField, placeholder: e.target.value })
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Type:
                <select
                  value={newField.type}
                  onChange={handleTypeChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                >
                  {Object.values(FieldType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              {newField.type === FieldType.SELECT && (
                <>
                  <label className="text-sm font-medium text-gray-700">
                    Options:
                    <div className="space-y-2">
                      {options.map((option, index) => (
                        <div
                          key={index}
                          className="flex gap-2 items-center justify-center border border-slate-200 p-2 rounded-lg"
                        >
                          <span className="text-xs">{option}</span>
                        </div>
                      ))}
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={newOption}
                          onChange={handleOptionChange}
                          placeholder="Add option"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                        <button
                          type="button"
                          onClick={addOption}
                          className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </label>
                </>
              )}
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={handleAddField}
                  type="button"
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded text-sm transform transition-colors duration-300 hover:bg-blue-700"
                >
                  Add Field
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="mt-4 bg-gray-500 text-white px-4 py-2 rounded ml-2 text-sm hover:bg-gray-700 transform transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
