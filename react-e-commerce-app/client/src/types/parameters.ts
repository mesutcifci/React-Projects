export interface ITertiaryParameter {
  [key: string]: string;
}
export interface IParameter {
  primary: string;
  secondary: string[];
  tertiary: ITertiaryParameter[];
}
