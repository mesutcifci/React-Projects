import express, { Request, Response } from "express";

const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json({ message: "All Users Fetched" });
};

const getUser = (req: Request, res: Response) => {
  console.log(req.params);
  res.status(200).json({ message: "User Fetched With Id" });
};

const createUser = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ message: "User Successfully Created" });
};

const updateUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "User Successfully Updated" });
};

const deleteUser = (req: Request, res: Response) => {
  res.status(204).json({ message: "User Successfully Deleted" });
};

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
