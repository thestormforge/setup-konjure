import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		ignores: ["dist/"],
	},
	{
		files: ["**/*.js"],
		plugins: {js},
		extends: ["js/recommended"],
		rules: {
			semi: "error",
		},
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.node,
				...globals.jest,
			},
		},
	},
]);
