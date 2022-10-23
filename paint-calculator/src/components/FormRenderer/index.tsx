import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
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
  const { projectTypes, sectors, projectType_sector } = data;
  const [selectedProjectType, setSelectedProjectType] = useState(
    projectTypes[0].name
  );

  const [filteredSectors, setFilteredSectors] =
    useState<IProjectTypeSector[]>();
  const [selectedSector, setSelectedSector] = useState<ISector | undefined>(
    sectors[0]
  );
  useEffect(() => {
    const sectorsByProjectType = projectType_sector.filter(
      (sector) => sector.type === selectedProjectType
    );
    const sectorWithCostMultiplier = sectors.find(
      (sector) => sector.name === sectorsByProjectType[0].sector
    );

    setFilteredSectors(sectorsByProjectType);
    setSelectedSector(sectorWithCostMultiplier);
  }, [selectedProjectType]);

  const handleClickSector = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;

    const sectorWithCostMultiplier = sectors.find(
      (sector) => sector.name === value
    );

    setSelectedSector(sectorWithCostMultiplier);
  };

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
      </Stack>
    </Box>
  );
};

export default FormRenderer;
