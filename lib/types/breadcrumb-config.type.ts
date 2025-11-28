import { BreadcrumbItem } from "./breadcrumb.type";

export type BreadcrumbType = 
  | "simple"
  | "collection"
  | "product"
  | "custom";

export interface SimpleBreadcrumbConfig {
  type: "simple";
  homeLabel: string;
  currentLabel: string;
  currentHref: string;
}

export interface CollectionBreadcrumbConfig {
  type: "collection";
  collectionSlug?: string;
  isAllProducts?: boolean;
}

export interface ProductBreadcrumbConfig {
  type: "product";
  productName: string;
  collectionSlug?: string;
}

export interface CustomBreadcrumbConfig {
  type: "custom";
  items: BreadcrumbItem[];
}

export type BreadcrumbConfig =
  | SimpleBreadcrumbConfig
  | CollectionBreadcrumbConfig
  | ProductBreadcrumbConfig
  | CustomBreadcrumbConfig;
