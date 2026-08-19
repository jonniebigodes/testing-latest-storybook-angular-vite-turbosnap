import { defineConfig } from 'vitest/config';
import { chromaticPlugin } from '@chromatic-com/vitest/plugin';

// The Angular CLI unit-test builder filters out plugins whose names start with 'vitest'.
// Renaming the plugin bypasses this filter so it gets applied to each browser project.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { storybookAngularVitest } from '@storybook/angular-vite/vitest';
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const plugin = chromaticPlugin({
  disableAutoSnapshot: true,
  reporter: {
    enabled: true,
    verbose: true,
  },
});
export default defineConfig({
  plugins: [
    {
      ...plugin,
      name: 'chromatic-plugin',
    },
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // Forwards Angular build options (styles, assets, zoneless, …) into standalone vitest runs
          storybookAngularVitest({}),
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
});
