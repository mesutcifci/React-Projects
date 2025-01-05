import { type Request } from 'express';

type BodyType = Record<string, unknown>;

/* eslint-disable @typescript-eslint/no-confusing-void-expression */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const filterRequestBody = (req: Request, allowedParams: string[]) => {
	const filteredBody: BodyType = {};
	Object.entries(req.body as BodyType).forEach((item) => {
		if (allowedParams.includes(item[0])) {
			filteredBody[item[0]] = item[1];
		}
	});
	return filteredBody;
};
