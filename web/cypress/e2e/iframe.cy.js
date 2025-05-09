describe(`iframe`, () => {
    it(`Deve poder tocar o video de exemplo`, () => {
        cy.login()

        cy.contains(`Video`).click()
        cy.get(`iframe[title="Video Player"]`) //obtendo a tag HTML com o title video player que eh o elemento que renderiza essa pagina dentro de outra pagina
            .should('exist') //to verificando se existe na pagina
            .its(`0.contentDocument.body`) //funcao do cypress que pode ser usada para obter propriedades de elementos, objetos, propriedades da janelas etc...o 0 eh a posicao, pegando o corpo desse html que eh exibido dentro do iframe
            .then(cy.wrap) //then eh um callback e cy.wrap eh um recurso do cypress pra conseguir pegar o valor de um objeto ou de um array ou de um elemento que esta dentro de uma pagina, to recuperando essa informaçao e transformando em um objeto cypress
            .as(`iFramePlayer`) // Alias, e to gravando isso dentro de um Alias

            cy.get('@iFramePlayer')
            .find('.play-button') //buscar esse elemento dentro de "iFramePlayer"
            .click()

            cy.get('@iFramePlayer')
            .find('.pause-button')
            .should('be.visible')
        })
})