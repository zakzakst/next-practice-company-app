import yaml from "js-yaml";
import merge from "lodash.merge";
import fs from "node:fs";

const loadYaml = (filePath: string) => {
  const content = fs.readFileSync(filePath, "utf8");
  return yaml.load(content);
};

const auth = loadYaml("openapi/auth.yaml");
const adminUsers = loadYaml("openapi/admin-users.yaml");
const myData = loadYaml("openapi/my-data.yaml");
const attendances = loadYaml("openapi/attendances.yaml");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const merged: any = merge({}, auth, adminUsers, myData, attendances);
merged.info = merged.info || {};
merged.info.title = "My App API";

fs.writeFileSync("openapi/_bundle.yaml", yaml.dump(merged), "utf8");
console.log("_bundle.yamlを生成しました");
