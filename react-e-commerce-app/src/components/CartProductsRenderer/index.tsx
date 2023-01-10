import { IModifiedProduct } from "../../types/product";

interface IProps {
  products?: IModifiedProduct[];
}

const CartProductsRenderer = ({ products }: IProps) => {
  return <div></div>;
};

export default CartProductsRenderer;
