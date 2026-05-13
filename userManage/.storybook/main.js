/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  framework: "@storybook/react-vite",
  babel: async (options) => ({
    ...options,
    plugins: [
      ...options.plugins,
      ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
    ],
    overrides: [
      {
        test: /\.js$/,
        plugins: [
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
        ],
      },
    ],
  }),
};
export default config;
