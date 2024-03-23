import express, { Request, Response } from "express";

const getAllProducts = (req: Request, res: Response) => {
  res.status(200).json({ message: "All Products Fetched" });
};

const getProduct = (req: Request, res: Response) => {
  console.log(req.params);
  res.status(200).json({ message: "Product Fetched With Id" });
};

const createProduct = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ message: "Product Successfully Created" });
};

const updateProduct = (req: Request, res: Response) => {
  res.status(200).json({ message: "Product Successfully Updated" });
};

const deleteProduct = (req: Request, res: Response) => {
  res.status(204).json({ message: "Product Successfully Deleted" });
};

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);

router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

export default router;
