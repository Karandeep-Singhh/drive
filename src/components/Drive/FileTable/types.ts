import type { APIFile } from "~/service/types";

type Open = {
  __tag: "open";
  file: APIFile;
};
type Close = {
  __tag: "close";
};

export const shouldOpenPreview = (state: PreviewDialogState): state is Open => {
    return state.__tag === 'open'
}

export type PreviewDialogState = Open | Close;
