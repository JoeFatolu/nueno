import { JobsListResponseParams } from "@api-contracts/jobs/list";

/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useQuery } from "react-query";

import Shell from "@components/Shell";

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@exsaample.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@esxample.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@exsaample.com",
    telephone: "+1-202-5sa55-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

export default function Candidates() {
  const { isLoading } = useQuery("jobs", getJobs);

  async function getJobs() {
    const response = await axios.get("/api/jobs/list");
    const responseData: JobsListResponseParams = response.data;
    return responseData;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Shell>
      <header>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 md:px-0 lg:flex lg:items-center lg:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
          <span className="sm:ml-3">
            {/* <Link href="/jobs/new">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create a new job
              </button>
            </Link> */}
          </span>
        </div>
      </header>
      <main>
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <li key={person.email} className="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow">
              <div className="flex items-center justify-between w-full p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{person.name}</h3>
                    {/* <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      {person.role}
                    </span> */}
                  </div>
                  <p className="mt-1 text-sm text-gray-500 truncate">{person.title}</p>
                </div>
                {/* <img
                  className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"
                  src={person.imageUrl}
                  alt=""
                /> */}
                <div></div>
              </div>
              <div>
                <div className="flex -mt-px divide-x divide-gray-200">
                  <div className="flex flex-1 w-0">
                    <a
                      href={`mailto:${person.email}`}
                      className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500">
                      <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-3">Email</span>
                    </a>
                  </div>
                  <div className="flex flex-1 w-0 -ml-px">
                    <a
                      href={`tel:${person.telephone}`}
                      className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500">
                      <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-3">Call</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </Shell>
  );
}
