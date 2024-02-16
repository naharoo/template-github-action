import { getInput } from "@actions/core";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const configSchema = z.object({
  name: z.string(),
});

function parseConfig() {
  return configSchema.parse({
    name: getInput("name", { required: true }),
  });
}

let config: z.infer<typeof configSchema>;

try {
  config = parseConfig();
} catch (err) {
  if (err instanceof z.ZodError) {
    throw fromZodError(err);
  }
  throw err;
}

export default config;
