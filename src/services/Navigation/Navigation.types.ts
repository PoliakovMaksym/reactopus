import { History, LocationDescriptorObject, Path } from 'history';

export type Options = LocationDescriptorObject & {
  urlParams?: { [key: string]: string | number };
  persistState?: boolean;
};

export type Navigation = {
  readonly history: History;
  goTo(path: Path, options?: Options): void;
};
