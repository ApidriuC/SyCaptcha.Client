import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.js",
            format: "cjs",
            sourcemap: true
        },
        {
            file: "dist/index.esm.js",
            format: "esm",
            sourcemap: true
        }
    ],
    external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    plugins: [
        resolve(),
        commonjs(),
        typescript()
    ]
};
