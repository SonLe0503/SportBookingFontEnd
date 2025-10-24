/* eslint-disable @typescript-eslint/no-explicit-any */
export enum EUserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  FACILITY_OWNER = "FACILITY_OWNER",
}

export interface DynamicKeyObject {
  [key: string]: any;
}