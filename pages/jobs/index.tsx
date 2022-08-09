import { JobsListResponseParams } from "@api-contracts/jobs/list";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";

import Shell from "@components/Shell";

function Job({ data }) {
  return (
    <li>
      <a href={`/jobs/new/${data.uid}/application-form`} className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-600 truncate">{data.title}</p>
            <div className="flex flex-shrink-0 ml-2">
              <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                {/* {data.description} */}
              </p>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                {/* <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                {data.description}
              </p>
              <p className="flex items-center mt-2 text-sm text-gray-500 sm:mt-0 sm:ml-6">
                {/* <LocationMarkerIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                {/* {position.location} */}
              </p>
            </div>
            <div className="flex items-center mt-2 text-sm text-gray-500 sm:mt-0">
              {/* <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
              {/* <p>Closing on <time dateTime={position.closeDate}>{position.closeDateFull}</time></p> */}
              <Link href={`/jobs/apply/${data.uid}`}>
                {/* <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> */}

                <p>Applicaion Url</p>
              </Link>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}

export default function Jobs() {
  const { isLoading, data: jobs } = useQuery("jobs", getJobs);

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
          <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
          <span className="sm:ml-3">
            <Link href="/jobs/new">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create a new job
              </button>
            </Link>
          </span>
        </div>
      </header>
      <main>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {jobs?.map((job) => {
              return <Job key={job.uid} data={job} />;
            })}
          </ul>
        </div>
      </main>
    </Shell>
  );
}
