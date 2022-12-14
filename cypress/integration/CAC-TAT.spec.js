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

  it.only("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Felipe");
    cy.get("#lastName").type("Chung");
    cy.get("#email").type("fchung.dev@gmail,com");
    cy.get("#open-text-area").type(
      "Teste dasiodasioj aiosjdoasjd asdjqwioejqw ejqwo jasidj osaij eioqwje ioasj diosajdiosa djiosa djasoid asjio sdioj ",
      { delay: 0 }
    );
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("verifica se campo de telefone continua vazio quando preenchido com valor nao numerico", function () {
    cy.get("#phone").type("teste").should("have.value", "");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Felipe")
      .should("have.value", "Felipe")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Chung")
      .should("have.value", "Chung")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("fchung.dev@gmail.com")
      .should("have.value", "fchung.dev@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("123456")
      .should("have.value", "123456")
      .clear()
      .should("have.value", "");
  });
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formulario com sucesso, usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });
});
