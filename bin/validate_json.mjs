import { readdirSync, readFileSync } from "fs";

const dataFilesDir = process.argv[2]

console.log(`Validating JSON files under ${dataFilesDir}`);

readdirSync(dataFilesDir)
  .forEach(
    fileName => {
      if (fileName.toLowerCase().endsWith(".json")) {
        const filePath = `${dataFilesDir}/${fileName}`;

        try {
          JSON.parse(
            readFileSync(filePath).toString()
          );

          console.log(`${filePath} is valid.`);
        } catch (jsonError) {
          console.log(`${filePath} is invalid!`);
          throw jsonError;
        }
      }
    }
  );
