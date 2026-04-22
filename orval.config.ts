import { defineConfig } from "orval";

export default defineConfig({
  auth: {
    input: "./openapi/auth.yaml",
    output: {
      target: "./orval/auth.ts",
      client: "swr",
      baseUrl: "/api",
    },
    hooks: {
      // TODO: 調べて修正。ファイル全体にprettierがかかっている
      afterAllFilesWrite: "npm run lint:prettier",
    },
  },
  adminUsers: {
    input: "./openapi/admin-users.yaml",
    output: {
      target: "./orval/adminUsers.ts",
      client: "swr",
      baseUrl: "/api",
    },
    hooks: {
      afterAllFilesWrite: "npm run lint:prettier",
    },
  },
});
