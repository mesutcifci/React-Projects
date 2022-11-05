import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import {
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
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
    colour,
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

  const [selectedColour, setSelectedColourState] = useState(colour[0]);
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
      const isCostValid = !isNaN(thirtyYearCost);
      isCostValid && setCost(Number(thirtyYearCost.toFixed(2)));
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

  const handleClickColour = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const matchedColour = colour.find((item) => item.name === value);
    if (matchedColour) {
      setSelectedColourState(matchedColour);
    }
  };
  if (!filteredSectors || !projectTypes) {
    return (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <CircularProgress color="inherit" size={30} />
      </Stack>
    );
  }
  return (
    <>
      <header>
        <Typography
          variant="h1"
          fontSize={"30px"}
          textAlign="center"
          mb="20px"
          mt="100px"
        >
          Paint Calculator
        </Typography>
      </header>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          px: "20px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(auto-fill, minmax(250px, 1fr))",
            },
            gap: "20px",
            width: { xs: "max-content", sm: "100%" },
            maxWidth: { xs: "100%", sm: "540px" },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <InputLabel sx={{ cursor: "pointer" }} id="projectTypes">
              Project Type:{" "}
            </InputLabel>
            <Select
              labelId="projectTypes"
              id="projectTypes"
              value={selectedProjectType}
              sx={{ width: { xs: "200px", sm: "150px" } }}
              onChange={(e) => setSelectedProjectType(e.target.value)}
            >
              {projectTypes.map((type) => (
                <MenuItem key={type.name} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <InputLabel sx={{ cursor: "pointer" }} id="sectors">
              Sector:{" "}
            </InputLabel>
            <Select
              labelId="sectors"
              id="sectors"
              value={selectedSector?.name}
              sx={{ width: { xs: "200px", sm: "150px" } }}
              onChange={(event) => handleClickSector(event)}
            >
              {filteredSectors?.map((sector) => (
                <MenuItem key={sector.sector} value={sector.sector}>
                  {sector.sector}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <InputLabel sx={{ cursor: "pointer" }} id="product">
              Product:{" "}
            </InputLabel>
            <Select
              labelId="product"
              id="product"
              value={selectedProduct?.name}
              sx={{ width: { xs: "200px", sm: "150px" } }}
              onChange={(event) => handleClickProduct(event)}
            >
              {filteredProducts?.map((product) => (
                <MenuItem key={product.product} value={product.product}>
                  {product.product}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            justifyContent="space-between"
            sx={{ position: "relative" }}
          >
            <Stack>
              <InputLabel sx={{ cursor: "pointer" }} id="colour">
                Colour:{" "}
              </InputLabel>
              <Box
                sx={{
                  width: "50px",
                  height: "15px",
                  background: `${selectedColour.hex}`,
                  border: "1px solid black",
                }}
              ></Box>
            </Stack>
            <Select
              labelId="colour"
              id="colour"
              value={selectedColour?.name}
              sx={{
                width: { xs: "200px", sm: "150px" },
              }}
              onChange={handleClickColour}
            >
              {colour?.map((colour) => (
                <MenuItem key={colour.name} value={colour.name}>
                  {colour.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Box>
            <TextField
              id="area"
              label="Area"
              variant="outlined"
              value={area}
              onChange={(e) => {
                const areaValue = Number(e.target.value);
                const isInputValid = !isNaN(areaValue);
                isInputValid && setArea(areaValue);
              }}
              fullWidth
            />
          </Box>

          <Box>
            <Stack justifyContent={"center"} height="100%">
              <Typography variant="body1" component="h2">
                Cost: {` ${cost}`}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FormRenderer;
