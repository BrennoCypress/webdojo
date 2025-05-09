import { personal, company } from '../fixtures/consultancy.json'

describe(`Formulario de Consultoria`, () => {

    beforeEach(() => {
        cy.login()
        cy.goTo(`Formulários`, 'Consultoria')
    })

    it(`Deve solicitar Consultoria Individual`, () => {

        cy.fillConsultancyForm(personal)
        cy.submitConsultancyForm()
        cy.validateConsultancyModal()

    })

    it(`Deve solicitar Consultoria In Company`, () => {

        cy.fillConsultancyForm(company)
        cy.submitConsultancyForm()
        cy.validateConsultancyModal()
    })

    it(`Deve verificar os campos obrigatorios`, () => {
        cy.start()
        cy.submitLoginForm(`papito@webdojo.com`, `katana123`)

        cy.goTo(`Formulários`, 'Consultoria')

        cy.submitConsultancyForm()

        const requiredFields = [
            { label: `Nome Completo`, message: `Campo obrigatório` },
            { label: `Email`, message: `Campo obrigatório` },
            { label: `termos de uso`, message: `Você precisa aceitar os termos de uso` }
        ]

        //label[text()="Nome Completo *"]/..//p

        requiredFields.forEach =(({label, message}) => {
            cy.contains(`label`, label)
            .parent()
            .find(`p`)
            .should(`be.visible`)
            .should(`have.text`, message)
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')
        })

        
        cy.contains(`label`, `Email`)
            .parent()
            .find(`p`)
            .should(`be.visible`)
            .should(`have.text`, `Campo obrigatório`)
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains(`label`, `termos de uso`)
            .parent()
            .find(`p`)
            .should(`be.visible`)
            .should(`have.text`, `Você precisa aceitar os termos de uso`)
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

    })
    afterEach(() => {
        cy.log(`Isso acontece depois de cada teste `)
    })
})

