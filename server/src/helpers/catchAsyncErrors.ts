import type { NextFunction, Request, Response } from 'express';

export default (
	callback: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
	return (req: Request, res: Response, next: NextFunction) => {
		callback(req, res, next).catch(next);
	};
};
