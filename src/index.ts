import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { AppwriteContext } from "./types";
import { requestFromContext, responseForContext } from "./utils";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

if (process.env.NODE_ENV === "development") {
  const port = 3000;
  console.log(`Server is running on port ${port}`);

  serve({
    fetch: app.fetch,
    port,
  });
}

export default async function (context: AppwriteContext) {
  const request = requestFromContext(context);
  const response = await app.fetch(request);
  return await responseForContext(context, response);
}
