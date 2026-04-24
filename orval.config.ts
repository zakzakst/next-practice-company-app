import { defineConfig } from "orval";

export default defineConfig({
  auth: {
    input: "./openapi/auth.yaml",
    output: {
      target: "./orval/auth.ts",
      client: "swr",
      baseUrl: "/api",
      // TODO: テンプレートにも反映
      prettier: true,
    },
  },
  adminUsers: {
    input: "./openapi/admin-users.yaml",
    output: {
      target: "./orval/adminUsers.ts",
      client: "swr",
      baseUrl: "/api",
      prettier: true,
    },
  },
});
