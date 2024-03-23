import { Request, Response } from "express";

export const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json({ message: "All Users Fetched" });
};

export const getUser = (req: Request, res: Response) => {
  console.log(req.params);
  res.status(200).json({ message: "User Fetched With Id" });
};

export const createUser = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ message: "User Successfully Created" });
};

export const updateUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "User Successfully Updated" });
};

export const deleteUser = (req: Request, res: Response) => {
  res.status(204).json({ message: "User Successfully Deleted" });
};
