declare module '*.scss' {
  let content: any;
  // noinspection JSUnusedGlobalSymbols
  export default content;
}

declare type Constructor<T> = {
  new(...args: any[]): T;
}

interface Dictionary {
  [key: string]: any;
}
