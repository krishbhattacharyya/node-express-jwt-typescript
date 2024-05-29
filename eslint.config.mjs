import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { dirname } from 'path';


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  //...tseslint.configs.strict,
  //...tseslint.configs.stylistic,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: dirname,
        sourceType: "module",
      },
    },
  },
];