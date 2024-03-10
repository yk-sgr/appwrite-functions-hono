import { AppwriteContext } from "./types";

export function requestFromContext(context: AppwriteContext) {
  const headers = new Headers();
  Object.keys(context.req.headers).forEach((key) => {
    headers.set(key, context.req.headers[key]);
  });

  const request = new Request(context.req.url, {
    method: context.req.method,
    headers,
    body: context.req.bodyRaw,
  });

  return request;
}

export async function responseForContext(
  context: AppwriteContext,
  res: Response
) {
  const headers: Record<string, any> = {};
  res.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return context.res.send(await res.text(), res.status, headers);
}
