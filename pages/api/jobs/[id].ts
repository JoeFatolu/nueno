import { JobsCreateResponseParams as ResponseParams } from "@api-contracts/jobs/create";
import JobEntity from "@business-logic/Job";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import HttpError from "@helpers/errors/HttpError";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;

  const session = await getSession({ req });
  if (!session) return res.status(401).json("Not authenticated");
  const entity = new JobEntity();
  const jobUid = typeof req.query.id === "string" && req.query.id;

  if (!jobUid) {
    return;
  }

  try {
    const response: ResponseParams = await entity.find(jobUid, session.user.id);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof HttpError) return res.status(error.code).json(error.message);
    throw error;
  }
}
