import express, { Express, Request, Response } from "express";

// Create express an app instance
const app: Express = express();

const port = 8000;

// This enables to use of req.body
app.use(express.json())

// Products
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

// Users
const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json({ message: "All Users Fetched" });
}

const getUser = (req: Request, res: Response) => {
  console.log(req.params)
  res.status(200).json({message: "User Fetched With Id"})
}

const createUser = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({message: "User Successfully Created"})
}

const updateUser = (req: Request, res: Response) => {
  res.status(200).json({message: "User Successfully Updated"})
}

const deleteUser = (req:Request, res: Response) => {
  res.status(204).json({message: "User Successfully Deleted"})
}


// Products
app.route('/api/v1/products')
  .get(getAllProducts)
  .post(createProduct);

  app.route('/api/v1/products/:id')
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

// Users
app.route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser);

  app.route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.listen(port, () => {
  console.log("express init");
});
