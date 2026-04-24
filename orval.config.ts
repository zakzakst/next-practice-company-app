import { defineConfig } from "orval";

// NOTE: 規模が大きかったり、DB構成が複雑な場合はファイル分割するの適切でないかもしれない。componentsのスキーマ参照が分かれてしまうことで、出力されるファイル毎に型指定の記述が出る
// ⇒ 「単一のyamlファイルから単一のtsファイルを出力」があるべき形？ 出力されたファイルが記述量が多くて見通し悪いかもだが、そこは受け入れる
// ⇒ 少人数での運用ならいいかもだが、中規模以上のチームでorvalを利用するのはいまいちかも（記述が整理されるので、サービス規模が小さい初期とかに向いてる？）
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
  myData: {
    input: "./openapi/my-data.yaml",
    output: {
      target: "./orval/myData.ts",
      client: "swr",
      baseUrl: "/api",
      prettier: true,
    },
  },
});
