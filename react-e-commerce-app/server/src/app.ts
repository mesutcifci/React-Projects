import express, { Express, Request, Response } from "express";

// Create express an app instance
const app: Express = express();

const port = 8000;

// This enables to use of req.body
app.use(express.json())

const getAllProducts = (req: Request, res: Response) => {
  res.status(200).json({ message: "All Products Fetched" });
}

const getProduct = (req: Request, res: Response) => {
  console.log(req.params)
  res.status(200).json({message: "Product Fetched With Id"})
}

const createProduct = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({message: "Product Successfully Created"})
}

const updateProduct = (req: Request, res: Response) => {
  res.status(200).json({message: "Product Successfully Updated"})
}

const deleteProduct = (req:Request, res: Response) => {
  res.status(204).json({message: "Product Successfully Deleted"})
}

app.route('/api/v1/products')
  .get(getAllProducts)
  .post(createProduct);

  app.route('/api/v1/products/:id')
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

app.listen(port, () => {
  console.log("express init");
});
