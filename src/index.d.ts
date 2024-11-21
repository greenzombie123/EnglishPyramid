declare module "*.png" {
  const value: URL;
  export = value;
}

declare interface NodeRequire {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
  ): {
    keys(): string[];
    <T = unknown>(id: string): T;
  };
}
