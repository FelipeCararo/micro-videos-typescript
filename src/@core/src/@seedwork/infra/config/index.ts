import { config as readEnv } from "dotenv";
import { join } from "path";

export type Config = {
  db: {
    vendor: any;
    host: any;
    logging: boolean;
  };
};

function makeConfig(envFIle): Config {
  const output = readEnv({ path: envFIle });

  return {
    db: {
      vendor: output.parsed.DB_VENDOR as any,
      host: output.parsed.DB_HOST,
      logging: output.parsed.DB_LOGGING === "true",
    },
  };
}

const envTestingFile = join(__dirname, "../../../../.env.test");
export const configTest = makeConfig(envTestingFile);
