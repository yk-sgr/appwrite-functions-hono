export type AppwriteContext = {
  req: any;
  res: any;
  log: (msg: any) => void;
  error: (msg: any) => void;
};