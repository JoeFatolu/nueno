import { ApplicationFormsCreateRequestParams } from "@api-contracts/application-forms/create";
import UserEntity from "@business-logic/User";

import BadRequestError from "@helpers/errors/BadRequestError";
import NotFoundError from "@helpers/errors/NotFoundError";
import prisma from "@helpers/prisma";

export default class ApplicationFormEntity {
  async create(params: ApplicationFormsCreateRequestParams, userId: number) {
    const user = await new UserEntity().find(userId);
    if (!user) throw new NotFoundError("Not found");
    const job = await prisma.job.findUnique({
      where: { uid: params.jobUid },
      include: {
        Field: true,
      },
    });
    if (!job) {
      throw new BadRequestError("Job does not exist");
    }

    console.log(job);
    await prisma.field.createMany({
      data: params.fields.map((data) => ({ ...data, jobId: job.id })),
    });

    return { message: "Application form updated succesfully" };
  }
}
