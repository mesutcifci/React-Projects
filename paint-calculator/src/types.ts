export interface IProjectType {
  name: string;
}

export interface ISector {
  name: string;
  costMultiplier: number;
}

export interface IProducts {
  name: string;
  price: number;
  redecorationCycle: number;
}

export interface IColour {
  name: string;
  hex: string;
}

export interface IProjectTypeSector {
  type: string;
  sector: string;
}

export interface ISectorProduct {
  sector: string;
  product: string;
}
