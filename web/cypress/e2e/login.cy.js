import { dataHojeFormatada } from "../support/utils"

describe('Login', () => {

  it('Deve logar com Sucesso', () => {
    cy.start()
    cy.submitLoginForm(`papito@webdojo.com`, `katana123`)

    cy.get('[data-cy="user-name"]')
      .should(`be.visible`) //verifica se o elemento que traz o nome do usuario esta visivel
      .and(`have.text`, `Fernando Papito`) //verifica o conteudo exibido na pagina, garante que o texto esta correto

    cy.get('[data-cy="welcome-message"]')
      .should(`be.visible`)
      .and(`have.text`, `Olá QA, esse é o seu Dojo para aprender Automação de Testes.`)

    cy.getCookie('login_date').should('exist')
    cy.getCookie('login_date').should((cookie) => {
      expect(cookie.value).to.eq(dataHojeFormatada())
    })

    cy.window().then((win)  => {
      const token = win.localStorage.getItem(`token`)
      expect(token).to.match(/^[a-f0-9]{32}$/)
    })
  })

  it('nao deve logar com senha invalida', () => {
    cy.start()
    cy.submitLoginForm(`papito@webdojo.com`, `katana321`)

    cy.contains(`Acesso negado! Tente novamente`)
      .should(`be.visible`)
  })

  it('nao deve logar com Email nao cadastrado', () => {
    cy.start()
    cy.submitLoginForm(`404@webdojo.com`, `katana123`)

    cy.contains(`Acesso negado! Tente novamente.`)
      .should(`be.visible`)
  })

})



