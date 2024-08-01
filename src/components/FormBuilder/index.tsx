import React, { useState } from "react";
import { FieldType, FormField } from "../../services/types";

// Interface for the props accepted by the FormBuilder component
interface FormBuilderProps {
  fields: FormField[];
  setFields: React.Dispatch<React.SetStateAction<FormField[]>>;
}

// FormBuilder component
const FormBuilder: React.FC<FormBuilderProps> = ({ fields, setFields }) => {
  // State for showing the modal
  const [showModal, setShowModal] = useState(false);
  // State for the new field being added
  const [newField, setNewField] = useState<Partial<FormField>>({
    type: FieldType.TEXT,
    label: "",
    placeholder: "",
    value: "",
  });

  // State for the options of a dropdown field
  const [options, setOptions] = useState<string[]>([]);
  // State for a new option being added to the dropdown field
  const [newOption, setNewOption] = useState("");

  // Function to handle adding a new field
  const handleAddField = () => {
    // Check if the label and placeholder are provided
    if (!newField.label || !newField.placeholder) return;

    // Create a new field object
    const field: FormField = {
      ...newField,
      id: Math.random().toString(36).substr(2, 9),
      value: newField.type === FieldType.SELECT ? options.join(",") : "",
    } as FormField;

    // Update the fields state with the new field
    setFields([...fields, field]);

    // Reset the new field state
    setNewField({
      type: FieldType.TEXT,
      label: "",
      placeholder: "",
      value: "",
    });
    // Reset the options and new option states
    setOptions([]);
    setNewOption("");
    // Close the modal
    setShowModal(false);
  };

  // Function to handle changing the type of the new field
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value as FieldType;
    setNewField({ ...newField, type: selectedType });

    // Clear options if the selected type is not 'SELECT'
    if (selectedType !== FieldType.SELECT) {
      setOptions([]);
    }
  };

  // Function to handle changing the value of the new option
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewOption(e.target.value);
  };

  // Function to add a new option to the options state
  const addOption = () => {
    if (newOption && !options.includes(newOption)) {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  return (
    <div>
      {/* Button to show the modal for adding a new field */}
      <button
        onClick={() => setShowModal(true)}
        type="button"
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transform transition-colors duration-300"
      >
        Add Field
      </button>

      {/* Modal for adding a new field */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Field</h2>
            <div className="space-y-2">
              {/* Input for the label of the new field */}
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
              {/* Input for the placeholder of the new field */}
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
              {/* Select for the type of the new field */}
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
              {/* Inputs for adding options if the type is 'SELECT' */}
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
              {/* Buttons to add the new field or cancel */}
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
