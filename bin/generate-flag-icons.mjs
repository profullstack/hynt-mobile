import fs from "fs";
import path from "path";

// Use top-level await
const main = async () => {
  // Path to the country.json file
  const jsonFilePath = path.join(process.cwd(), "./src/data/country.json");

  // Read the country.json file using promises instead of callbacks
  const countryCodes = JSON.parse(
    await fs.promises.readFile(jsonFilePath, "utf-8")
  );

  // Start building the content of the flagIcons.js module using template literals
  const imports = countryCodes
    .map(
      (code) => {
        const key = code.code.replace("-", "_")+"_svg";

        return `import ${key} from '../../assets/flags/4x3/${
          code.code
        }.svg';`
      }
    )
    .join("\n");

  const exports = countryCodes
    .map((code) => {
      const key = code.code.replace("-", "_")+"_svg";

      code.path = key;

      return `"${key}": ${JSON.stringify(code).replace(
        /"path":"([^"]*)"/,
        '"path":$1'
      )}`;
    })
    .join(",\n");

  const content = `
// Auto-generated file

${imports}

export const flagIcons = {
${exports}
};
  `;

  // Write the content to the flagIcons.js module using promises
  await fs.promises.writeFile(
    path.join(process.cwd(), "flagIcons.js"),
    content
  );

  console.log("Generated flagIcons.js module!");
};

main().catch((error) => console.error("Error:", error.message));
