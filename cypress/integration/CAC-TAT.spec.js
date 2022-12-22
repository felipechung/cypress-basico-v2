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

  it("seleciona campo de selecao suspensa", () => {
    cy.get("select").select("YouTube").should("have.value", "youtube");
    cy.get("select").select("Mentoria").should("have.value", "mentoria");
    cy.get("select").select("Blog").should("have.value", "blog");
  });

  it("marca tipo de atendimento feedback", () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("seleciona cada campo de radio", () => {
    cy.get("input[type='radio']")
      .should("have.length", 3)
      .each((radio) => {
        cy.wrap(radio).check().should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o ultimo", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando drag and drop", () => {
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]')
      .selectFile("@sampleFile")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
    cy.contains("Talking About Testing").should("be.visible");
  });
});
