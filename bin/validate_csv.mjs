import { parse } from "csv-parse/sync";
import { readdirSync, readFileSync } from "fs";

const dataFilesDir = process.argv[2]

console.log(`Validating CSV files under ${dataFilesDir}`);

readdirSync(dataFilesDir)
  .forEach(
    fileName => {
      if (fileName.toLowerCase().endsWith(".csv")) {
        const filePath = `${dataFilesDir}/${fileName}`;

        try {
          parse(
            readFileSync(filePath).toString(),
            { columns: true, skip_empty_lines: true }
          );

          console.log(`${filePath} is valid.`);
        } catch (csvError) {
          console.log(`${filePath} is invalid!`);
          throw csvError;
        }
      }
    }
  );
