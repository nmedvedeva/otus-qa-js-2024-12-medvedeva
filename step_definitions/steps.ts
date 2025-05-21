import { Given, When, Then } from '@cucumber/cucumber';
const { I, loginPage, config } = inject();

Given('Пользователь открывает страницу авторизации', () => {
  loginPage.visit()
});

When('Пользователь вводит правильные учетные данные', () => {
  const { user } = config.credentials
  loginPage.fillEmail(user.email)
  loginPage.fillPassword(user.password)
  loginPage.submitForm()
});

Then('Пользователь успешно авторизован и перенаправлен на главную страницу', () => {
  I.dontSee('Login')
});

When('Пользователь вводит логин {word} и пароль {word}', (email, password) => {
  loginPage.login({
    email,
    password
  })
});

When('Пользователь не вводит пароль', () => {
  const { user } = config.credentials
  loginPage.fillEmail(user.email)
  loginPage.submitForm()
});

Then('Открывается страница с ошибкой авторизации', () => {
  I.seeInCurrentUrl('/login/error?error=CredentialsSignin&provider=credentials')
})