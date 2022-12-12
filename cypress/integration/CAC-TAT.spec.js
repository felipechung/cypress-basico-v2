/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });
  it("verifica o titulo da aplicacao", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("preenche os campos obrigatórios e envia o formulário", function () {
    cy.get("#firstName").type("Felipe");
    cy.get("#lastName").type("Chung");
    cy.get("#email").type("fchung.dev@gmail.com");
    cy.get("#open-text-area").type(
      "Teste dasiodasioj aiosjdoasjd asdjqwioejqw ejqwo jasidj osaij eioqwje ioasj diosajdiosa djiosa djasoid asjio sdioj ",
      { delay: 0 }
    );
    cy.get('button[type="submit"]').click();
    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Felipe");
    cy.get("#lastName").type("Chung");
    cy.get("#email").type("fchung.dev@gmail,com");
    cy.get("#open-text-area").type(
      "Teste dasiodasioj aiosjdoasjd asdjqwioejqw ejqwo jasidj osaij eioqwje ioasj diosajdiosa djiosa djasoid asjio sdioj ",
      { delay: 0 }
    );
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("verifica se campo de telefone continua vazio quando preenchido com valor nao numerico", function () {
    cy.get("#phone").type("teste").should("have.value", "");
  });
});
