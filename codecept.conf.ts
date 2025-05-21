exports.config = {
  output: 'reports',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://rwa-194.87.102.103.sslip.io',
      show: true
    }
  },
  include: {
    I: './steps_file',
    loginPage: './pages/LoginPage.ts',
    config: './config.ts'
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.ts']
  },
  plugins: {
    cucumber: {

    },
    screenshotOnFail: {
      enabled: true
    },
    tryTo: {
      enabled: false
    },
    retryTo: {
      enabled: false
    },
    retryFailedStep: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {}
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: 'tests/*_test.ts',
  name: 'otus-qa-js-2024-12-medvedeva'
}