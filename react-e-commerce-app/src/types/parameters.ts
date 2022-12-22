export interface ITertiary {
  [key: string]: string;
}
export interface IParameter {
  primary: string;
  secondary: string[];
  tertiary: ITertiary[];
}
