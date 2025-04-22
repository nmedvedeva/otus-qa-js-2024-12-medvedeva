import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure'
import 'codeceptjs'
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS)

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins()

export const config: CodeceptJS.MainConfig = {
  tests: 'tests/*_test.ts',
  output: 'reports',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://rwa-194.87.102.103.sslip.io',
      show: true
    }
  },
  include: {
    I: './steps_file'
  },
  plugins: {
    tryTo: {
      enabled: false
    },
    retryTo: {
      enabled: false
    }
  },
  name: 'otus-qa-js-2024-12-medvedeva'
}