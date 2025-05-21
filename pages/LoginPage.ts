const { I, config } = inject();

export = {
    visit(){
        I.amOnPage('/login')
    },

    fillEmail(email: string){
        I.fillField('[data-testid="input-email"]', email)
    },

    fillPassword(password: string){
        I.fillField('[data-testid="input-password"]', password)
    },

    submitForm(){
        I.click('[data-testid="btn-submit"]')
    },

    login(credentials: {email: string, password: string}){
        this.visit()
        this.fillEmail(credentials.email)
        this.fillPassword(credentials.password)
        this.submitForm()
    },

}