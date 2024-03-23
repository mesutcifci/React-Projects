import express, { Express, Request, Response } from "express";

const port = 8000;

// Create express an app instance
const app: Express = express();


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

// Routes
const productRouter = express.Router();
const userRouter = express.Router();

productRouter.route('/')
  .get(getAllProducts)
  .post(createProduct);

productRouter.route('/:id')
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

app.route('/')
  .get(getAllUsers)
  .post(createUser);

  app.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

// Start And Listen Server
app.listen(port, () => {
  console.log("express init");
});
