import express, { Express, Request, Response } from "express";

// Create express an app instance
const app: Express = express();

const port = 8000;

// This enables to use of req.body
app.use(express.json())

// GET all products
app.get("/api/v1/products/", (req: Request, res: Response) => {
  res.status(200).json({ message: "All Products Fetched" });
});

// GET one product
app.get("/api/v1/products/:id", (req: Request, res: Response) => {
  console.log(req.params)
  res.status(200).json({message: "Product Fetched With Id"})
})

// Add new product
app.post("/api/v1/products", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({message: "Product Successfully Created"})
})

// Update a product
app.patch("/api/v1/products/:id", (req: Request, res: Response) => {
  res.status(200).json({message: "Product Successfully Updated"})
})

// Delete a product
app.delete("/api/v1/products/:id", (req:Request, res: Response) => {
  res.status(204).json({message: "Product Successfully Deleted"})
})

app.listen(port, () => {
  console.log("express init");
});
