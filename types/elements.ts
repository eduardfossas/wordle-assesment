import { RefObject } from "react";

export type ArrayStringType = Array<string>
export type RowsArrayType = Array<Array<HTMLInputElement>>
export type RowsArrayTypeRef = RefObject<RowsArrayType>
export type DialogType = {
    icon?: string;
    title?: string;
    text?: string;
}