import {
  ApplicationFormsCreateRequestParams,
  FieldAttributes,
} from "@api-contracts/application-forms/create";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import React, { BaseSyntheticEvent } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

import { asStringOrUndefined } from "@helpers/type-safety";

import AddOrder from "@components/AddOrder";
import Shell from "@components/Shell";

export default function JobsNew() {
  const router = useRouter();
  const jobUid = asStringOrUndefined(router.query.id);
  const [isBrowser, setIsBrowser] = React.useState(false);
  const [showAddOrderModal, setAddOrderModal] = React.useState(false);

  const [fields, setFields] = React.useState<FieldAttributes[]>([
    { label: "First name", required: true, id: uuid() },
    { label: "Last Name", required: true, id: uuid() },
    { label: "Email", required: true, id: uuid() },
  ]);

  React.useEffect(() => {
    setIsBrowser(process.browser);
  }, []);

  function addOrder(data: FieldAttributes) {
    setFields([...fields, { ...data, id: uuid() }]);
  }

  function deleteField(id: string) {
    console.log(fields);
    let temFields: FieldAttributes[] = [...fields];
    temFields = temFields.filter((item) => item.id !== id);
    console.log(temFields);
    setFields([...temFields]);
  }

  const onDragEnd = (
    e: DropResult,
    columns: FieldAttributes[],
    setColumns: (i: FieldAttributes[]) => void
  ) => {
    if (!e?.destination) {
      return;
    }

    const { source, destination } = e;
    if (source.droppableId === destination.droppableId) {
      const copiedItems = [...columns];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns([...copiedItems]);
    } else {
      return;
    }
  };

  async function submit(e: BaseSyntheticEvent) {
    e.preventDefault();
    if (!jobUid) return;

    try {
      const requestParams: ApplicationFormsCreateRequestParams = {
        jobUid,
        fields: fields.map(({ ...props }) => props),
      };

      await axios.post(`/api/application-forms/create`, requestParams);

      router.push({ pathname: "/jobs/" });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Shell>
      <header>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 md:px-0 lg:flex lg:items-center lg:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Application form</h1>
          <span className="sm:ml-3">
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Publish
            </button>
          </span>
        </div>
      </header>
      <main>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 space-y-2 bg-white sm:p-6">
                  <h2 className="text-lg font-semibold text-gray-700">Customize your application form</h2>

                  {isBrowser && (
                    <DragDropContext onDragEnd={(e) => onDragEnd(e, fields, setFields)}>
                      <Droppable droppableId="all-columns">
                        {(provided) => (
                          <section {...provided.droppableProps} ref={provided.innerRef}>
                            {fields.map((item, id) => (
                              <Draggable key={item.id} draggableId={item.id} index={id}>
                                {(provided) => {
                                  return (
                                    <div
                                      className="flex items-center mt-2 last:mb-5"
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}>
                                      <DotsVerticalIcon
                                        className="w-5 h-5 text-gray-400 cursor-move"
                                        aria-hidden="true"
                                      />
                                      <div className="relative flex-auto p-2 bg-gray-100 rounded">
                                        <svg
                                          width="18px"
                                          height="18px"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          className="absolute top-0 right-0 h-6"
                                          onClick={() => deleteField(item.id)}>
                                          <path
                                            d="M16.5 22.25H7.49999C7.31264 22.2508 7.13176 22.1815 6.99295 22.0556C6.85415 21.9298 6.76748 21.7565 6.74999 21.57L5.24999 5.57C5.23937 5.46613 5.25178 5.36119 5.28635 5.26267C5.32092 5.16415 5.3768 5.07446 5.44999 5C5.51851 4.92149 5.60305 4.85855 5.69792 4.81543C5.79279 4.77231 5.89579 4.75 5.99999 4.75H18C18.1055 4.75109 18.2096 4.77384 18.306 4.81684C18.4023 4.85985 18.4888 4.92219 18.56 5C18.6298 5.07644 18.6827 5.16667 18.7154 5.26485C18.7482 5.36303 18.7599 5.46699 18.75 5.57L17.25 21.57C17.2325 21.7565 17.1458 21.9298 17.007 22.0556C16.8682 22.1815 16.6874 22.2508 16.5 22.25ZM8.17999 20.75H15.82L17.18 6.25H6.81999L8.17999 20.75Z"
                                            fill="red"
                                          />
                                          <path
                                            d="M19 6.25H5C4.80109 6.25 4.61032 6.17098 4.46967 6.03033C4.32902 5.88968 4.25 5.69891 4.25 5.5C4.25 5.30109 4.32902 5.11032 4.46967 4.96967C4.61032 4.82902 4.80109 4.75 5 4.75H19C19.1989 4.75 19.3897 4.82902 19.5303 4.96967C19.671 5.11032 19.75 5.30109 19.75 5.5C19.75 5.69891 19.671 5.88968 19.5303 6.03033C19.3897 6.17098 19.1989 6.25 19 6.25Z"
                                            fill="red"
                                          />
                                          <path
                                            d="M14.5 3.25H9.5C9.30109 3.25 9.11032 3.17098 8.96967 3.03033C8.82902 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.82902 2.11032 8.96967 1.96967C9.11032 1.82902 9.30109 1.75 9.5 1.75H14.5C14.6989 1.75 14.8897 1.82902 15.0303 1.96967C15.171 2.11032 15.25 2.30109 15.25 2.5C15.25 2.69891 15.171 2.88968 15.0303 3.03033C14.8897 3.17098 14.6989 3.25 14.5 3.25Z"
                                            fill="red"
                                          />
                                          <path
                                            d="M10.25 17.47C10.0519 17.4674 9.86263 17.3876 9.72253 17.2475C9.58244 17.1074 9.50259 16.9181 9.5 16.72V10.28C9.5 10.0811 9.57902 9.89032 9.71967 9.74967C9.86032 9.60902 10.0511 9.53 10.25 9.53C10.4489 9.53 10.6397 9.60902 10.7803 9.74967C10.921 9.89032 11 10.0811 11 10.28V16.72C10.9974 16.9181 10.9176 17.1074 10.7775 17.2475C10.6374 17.3876 10.4481 17.4674 10.25 17.47Z"
                                            fill="red"
                                          />
                                          <path
                                            d="M13.75 17.47C13.5519 17.4674 13.3626 17.3876 13.2225 17.2475C13.0824 17.1074 13.0026 16.9181 13 16.72V10.28C13 10.0811 13.079 9.89032 13.2197 9.74967C13.3603 9.60902 13.5511 9.53 13.75 9.53C13.9489 9.53 14.1397 9.60902 14.2803 9.74967C14.421 9.89032 14.5 10.0811 14.5 10.28V16.72C14.4974 16.9181 14.4176 17.1074 14.2775 17.2475C14.1374 17.3876 13.9481 17.4674 13.75 17.47Z"
                                            fill="red"
                                          />
                                        </svg>
                                        <p className="text-md">{item.label} </p>
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </section>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setAddOrderModal(true);
                      }}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Add field
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Tips</h3>
                <div className="mt-1 text-sm text-gray-600">...</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showAddOrderModal && (
        <AddOrder
          addOrder={addOrder}
          closeModal={() => {
            setAddOrderModal(false);
          }}
        />
      )}
    </Shell>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

//   return { props: { data: [] } };
// };
