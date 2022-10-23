import {
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import {
  IColour,
  IProduct,
  IProjectType,
  IProjectTypeSector,
  ISector,
  ISectorProduct,
} from "../../types";

interface IFormProps {
  data: {
    projectTypes: IProjectType[];
    sectors: ISector[];
    products: IProduct[];
    colour: IColour[];
    projectType_sector: IProjectTypeSector[];
    sector_product: ISectorProduct[];
  };
}

const FormRenderer = ({ data }: IFormProps) => {
  const {
    projectTypes,
    sectors,
    projectType_sector,
    products,
    sector_product,
  } = data;

  // States start
  const [selectedProjectType, setSelectedProjectType] = useState(
    projectTypes[0].name
  );

  const [filteredSectors, setFilteredSectors] =
    useState<IProjectTypeSector[]>();
  const [selectedSector, setSelectedSector] = useState<ISector>();

  const [filteredProducts, setFilteredProducts] = useState<ISectorProduct[]>();
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();

  const [area, setArea] = useState(0);
  const [cost, setCost] = useState(0);
  // States end

  useEffect(() => {
    const sectorsByProjectType = projectType_sector.filter(
      (sector) => sector.type === selectedProjectType
    );
    const sectorWithCostMultiplier = sectors.find(
      (sector) => sector.name === sectorsByProjectType[0].sector
    );

    const productsBySector = sector_product.filter(
      (product) => product.sector === sectorWithCostMultiplier?.name
    );

    const productWithPrice = products.find(
      (product) => product.name === productsBySector[0].product
    );

    setFilteredSectors(sectorsByProjectType);
    setSelectedSector(sectorWithCostMultiplier);
    setFilteredProducts(productsBySector);
    setSelectedProduct(productWithPrice);
  }, [selectedProjectType]);

  useEffect(() => {
    if (selectedProduct && selectedSector) {
      const yearlyCost =
        selectedSector.costMultiplier * selectedProduct.price * area;
      const thirtyYearsMultiplier = 30 / selectedProduct.redecorationCycle;
      const thirtyYearCost = yearlyCost * thirtyYearsMultiplier;
      setCost(Number(thirtyYearCost.toFixed(2)));
    }
  }, [area, selectedProduct, selectedSector]);

  const handleClickSector = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;

    const sectorWithCostMultiplier = sectors.find(
      (sector) => sector.name === value
    );

    setSelectedSector(sectorWithCostMultiplier);
  };

  const handleClickProduct = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;

    const productWithPrice = products.find((product) => product.name === value);
    setSelectedProduct(productWithPrice);
  };

  if (!filteredSectors || !projectTypes) {
    return <CircularProgress color="inherit" size={16} />;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "500px", mx: "auto", pt: "100px" }}>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: "20px" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <InputLabel id="projectTypes">Project Type: </InputLabel>
          <Select
            labelId="projectTypes"
            id="projectTypes"
            value={selectedProjectType}
            onChange={(e) => setSelectedProjectType(e.target.value)}
          >
            {projectTypes.map((type) => (
              <MenuItem key={type.name} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <InputLabel id="sectors">Sector: </InputLabel>
          <Select
            labelId="sectors"
            id="sectors"
            value={selectedSector?.name}
            onChange={(event) => handleClickSector(event)}
          >
            {filteredSectors?.map((sector) => (
              <MenuItem key={sector.sector} value={sector.sector}>
                {sector.sector}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <InputLabel id="product">Product: </InputLabel>
          <Select
            labelId="product"
            id="product"
            value={selectedProduct?.name}
            onChange={(event) => handleClickProduct(event)}
          >
            {filteredProducts?.map((product) => (
              <MenuItem key={product.product} value={product.product}>
                {product.product}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField
          id="area"
          label="Area"
          variant="outlined"
          value={area}
          onChange={(e) => setArea(Number(e.target.value))}
        />
        <Typography variant="body1" component="h2">
          Cost: {` ${cost}`}
        </Typography>
      </Stack>
    </Box>
  );
};

export default FormRenderer;
