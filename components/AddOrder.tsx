import { FieldAttributes } from "@api-contracts/application-forms/create";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

const Radio = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="relative flex items-start">
      <div className="absolute flex items-center h-5">
        <input
          id="privacy-public"
          name="privacy"
          aria-describedby="privacy-public-description"
          type="radio"
          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          value={value}
          onChange={onChange}
        />
      </div>
      <div className="text-sm pl-7">
        <label htmlFor="privacy-public" className="font-medium text-gray-900">
          {label}
        </label>
      </div>
    </div>
  );
};

type Form = {
  label: string;
  type: "SHORT_TEXT" | "LONG_TEXT" | "CHECKBOX" | "SELECT" | "MULTI_SELECT" | "";
};
type Type = "SHORT_TEXT" | "LONG_TEXT" | "CHECKBOX" | "SELECT" | "MULTI_SELECT" | "";

export default function AddOrder({
  addOrder,
  closeModal,
}: {
  addOrder: (e: FieldAttributes) => void;
  closeModal: () => void;
}) {
  const [open, setOpen] = useState(true);
  const [field, setField] = useState<Form>({
    label: "",
    type: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!field.label) {
      toast.error("Label is required");
      return;
    }
    if (!field.type) {
      toast.error("Type is required");
      return;
    }

    addOrder(field as FieldAttributes);
    closeModal();
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setField({ ...field, type: e.target.value as Type });
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-40" />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full">
              <div className="w-screen max-w-md pointer-events-auto">
                <form
                  className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl"
                  onSubmit={handleSubmit}>
                  <div className="flex-1 h-0 overflow-y-auto">
                    <div className="px-4 py-6 bg-indigo-700 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white"> Add Ordeer </Dialog.Title>
                        <div className="flex items-center ml-3 h-7">
                          <button
                            type="button"
                            className="text-indigo-200 bg-indigo-700 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}>
                            <span className="sr-only">Close panel</span>
                            <XIcon className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-indigo-300">
                          {/* Get started by filling in the information below to create your new project. */}
                          Fill Order Info
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div className="px-4 divide-y divide-gray-200 sm:px-6">
                        <div className="pt-6 pb-5 space-y-6">
                          <div>
                            <label htmlFor="project-name" className="block text-sm font-medium text-gray-900">
                              Label name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="project-name"
                                id="project-name"
                                className="block w-full h-8 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={field.label}
                                onChange={(e) => setField({ ...field, label: e.target.value })}
                              />
                            </div>
                          </div>
                          <fieldset>
                            <legend className="text-sm font-medium text-gray-900">Type</legend>
                            <div className="mt-2 space-y-5">
                              <Radio label="Short Text" value={"SHORT_TEXT"} onChange={handleChange} />
                              <Radio label="Long Text" value={"LONG_TEXT"} onChange={handleChange} />
                              <Radio label="Checkbox" value={"CHECKBOX"} onChange={handleChange} />
                              <Radio label="Select One" value={"SELECT"} onChange={handleChange} />
                              <Radio label="Select Multiple" value={"MULTI_SELECT"} onChange={handleChange} />
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end flex-shrink-0 px-4 py-4">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
