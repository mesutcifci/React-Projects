import { Request, Response } from "express";

export const getAllProducts = (req: Request, res: Response) => {
  res.status(200).json({ message: "All Products Fetched" });
};

export const getProduct = (req: Request, res: Response) => {
  console.log(req.params);
  res.status(200).json({ message: "Product Fetched With Id" });
};

export const createProduct = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ message: "Product Successfully Created" });
};

export const updateProduct = (req: Request, res: Response) => {
  res.status(200).json({ message: "Product Successfully Updated" });
};

export const deleteProduct = (req: Request, res: Response) => {
  res.status(204).json({ message: "Product Successfully Deleted" });
};
