import {
  IColour,
  IProducts,
  IProjectType,
  IProjectTypeSector,
  ISector,
  ISectorProduct,
} from "../../types";

interface IFormProps {
  data: {
    projectTypes: IProjectType[];
    sectors: ISector[];
    products: IProducts[];
    colour: IColour[];
    projectType_sector: IProjectTypeSector[];
    sector_product: ISectorProduct[];
  };
}

const FormRenderer = ({ data }: IFormProps) => {
  return <form></form>;
};

export default FormRenderer;
