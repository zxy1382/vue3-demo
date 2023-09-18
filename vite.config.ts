import path from "path";
import type { ConfigEnv } from "vite";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { mars3dPlugin } from "vite-plugin-mars3d";
import {
  createStyleImportPlugin,
  AndDesignVueResolve,
} from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const root = process.cwd();
  const ENV = loadEnv(mode, root);

  return defineConfig({
    plugins: [
      vue(),
      mars3dPlugin(),
      // 按需加载
      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()],
        // libs: [
        //   {
        //     libraryName: "vant",
        //     esModule: true,
        //     resolveStyle: (name) => `../es/${name}/style`,
        //   },
        // ],
      }),
    ],
    define: {
      "process.env": {
        mode: mode,
        BASE_URL: ENV.VITE_BASE_URL,
        API_BASE: ENV.VITE_API_BASE,
      },
      buildTime: new Date(),
    },
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(
            __dirname,
            "src/components/mars-ui/base.less"
          )}";`,
        },
      },
    },
  });
};
