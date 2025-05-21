//import { config } from "dotenv";
//import loginPage from "../pages/LoginPage";

Feature('login');

Scenario('Успешная авторизация', ({ I, loginPage, config}) => {
    loginPage.login(config.credentials)
    I.dontSee('Login')
})

Scenario('Нельзя авторизоваться без пароля', ({ I, loginPage, config}) => {
    loginPage.login({
        email: config.credentials.user.email,
        password: ''
    })
    I.seeInCurrentUrl('/login/error?error=CredentialsSignin&provider=credentials')
})

Scenario('Нельзя авторизоваться без почты', ({ I, loginPage, config}) => {
    loginPage.login({
        email: '',
        password: config.credentials.user.password
    })
    I.seeInCurrentUrl('/login/error?error=CredentialsSignin&provider=credentials')
})

Scenario('Нельзя авторизоваться несуществующему пользователю', ({ I, loginPage, config}) => {
    loginPage.login({
        email: 'user@mail.net',
        password: 'secret'
    })
    I.seeInCurrentUrl('/login/error?error=CredentialsSignin&provider=credentials')
})

// Scenario('test something', ({ I })=>{
//     I.amOnPage('/login')
// })