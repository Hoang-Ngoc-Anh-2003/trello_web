<<<<<<< HEAD
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 * Sample Eslint config for NodeJS ExpressJS MongoDB project
 */
module.exports = {
  env: { es2020: true, node: true },
  extends: [
    'eslint:recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    allowImportExportEverywhere: true
  },
  plugins: [],
  rules: {
    // Common
    'no-useless-catch':0,
    'no-console': 1,
    'no-extra-boolean-cast': 0,
=======
// Updated by trungquandev.com's author on May 13 2023
// Sample Eslint config for React project
module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {
    //react
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,
    //MUI
    'no-restricted-imports': [
      'error',
      {
        'patterns': ['@mui/*/*/*']
      }
    ],

    'no-console': 1,
>>>>>>> origin/quanganh
    'no-lonely-if': 1,
    'no-unused-vars': 1,
    'no-trailing-spaces': 1,
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'space-before-blocks': ['error', 'always'],
    'object-curly-spacing': [1, 'always'],
<<<<<<< HEAD
    'indent': ['warn', 2],
    'semi': [1, 'never'],
    'quotes': ['error', 'single'],
=======
    indent: ['warn', 2],
    semi: [1, 'never'], // semi: [1, 'always'], cho phép sử dụng dấu chấm phẩy (;)
    quotes: ['error', 'single'],
>>>>>>> origin/quanganh
    'array-bracket-spacing': 1,
    'linebreak-style': 0,
    'no-unexpected-multiline': 'warn',
    'keyword-spacing': 1,
<<<<<<< HEAD
    'comma-dangle': 1,
    'comma-spacing': 1,
    'arrow-spacing': 1
  }
=======
    'comma-dangle': 1, // kiểm tra xem có sử dụng dấu , cuối cùng trong object hoặc array hay không.
    'comma-spacing': 1,
    'arrow-spacing': 1
  }

>>>>>>> origin/quanganh
}
