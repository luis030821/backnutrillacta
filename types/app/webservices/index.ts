export interface WebServices {
  organizationId: string;
  webPage: string;
  webPageId: string;
  version: string;
  builds: number;
  show?: boolean;
  social?: boolean;
  envs?: ENVS[];
}
export interface ENVS {
  attribute: string;
  value: string;
}
export interface ProductsProperty {
  attribute: string;
  type: string;
  required: boolean;
}
