export interface AnyObject extends Object {
  [key: string]: any;
}

export type AnyFunction = (...args: any[]) => any;
