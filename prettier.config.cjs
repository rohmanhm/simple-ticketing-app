module.exports = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  tabWidth: 2,
  useTabs: false,
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['twMerge'],
  singleQuote: true,
  trailingComma: 'es5',
  semi: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/features/(.*)$',
    '^@/(.*)$',
    '^../(.*)$',
    '^./(.*)$',
    '(.css)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
