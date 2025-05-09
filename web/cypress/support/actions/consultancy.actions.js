Cypress.Commands.add('fillConsultancyForm', (form) => {
    cy.get('#name').type(form.name) //caso nao tenha localizador eu posso criar um verificando o elemento no html da pagina, input[`placeholder="Digite seu nome completo"`]
    cy.get('#email').type(form.email)
    cy.get('#phone').type(form.phone)
    // .should(`have.value`, `(11) 99999-1000`)

    cy.contains('label', `Tipo de Consultoria`) //caso nao tenha localizador posso criar um Label xpath
        .parent()
        .find(`select`)
        .select(form.consultancyType)

    ////span[text()="Pessoa Física"]/..//input

    if (form.personType === `cpf`) {
        cy.contains(`span`, `Pessoa Física`)
            .parent()
            .find(`input`)
            .check()
            .should(`be.checked`)

        cy.contains(`label`, `Pessoa Jurídica`)
            .find(`input`)
            .should(`be.not.checked`)
    }

    if (form.personType === `cnpj`) {
        cy.contains(`span`, `Pessoa Jurídica`)
            .parent()
            .find(`input`)
            .check()
            .should(`be.checked`)

        cy.contains(`label`, `Pessoa Física`)
            .find(`input`)
            .should(`be.not.checked`)

        cy.contains(`label`, `CNPJ`)
            .parent()
            .find(`input`)
            .type(form.document)
        // .should(`have.value`, `795.253.160-33`)
    }

    form.discoveryChannels.forEach((channel) => {
        cy.contains(`label`, channel)
            .find(`input`)
            .check()
            .should(`be.checked`)
    })

    cy.get(`input[type="file"]`)
        .selectFile(form.file, { force: true })

    cy.get(`textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]`)
        .type(form.description)

    form.techs.forEach((tech) => {
        cy.get(`input[placeholder="Digite uma tecnologia e pressione Enter"]`)
            .type(tech)
            .type(`{enter}`)

        cy.contains(`label`, `Tecnologias`)
            .parent()
            .contains(`span`, tech)
            .should(`be.visible`)
    })

    if (form.terms === true) {
        cy.contains(`label`, `Li e aceito os`)
            .find(`input`)
            .check()
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains(`button`, `Enviar formulário`)
        .click()
})

Cypress.Commands.add('validateConsultancyModal', () => {
    cy.get(`.modal`, { timeout: 7000 })
        .should(`be.visible`)
        .find(`.modal-content`)
        .should(`be.visible`)
        .and(`have.text`, `Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.`)

    // cy.contains(`Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.`)
    //     .should(`be.visible`)
})