/// <reference types="cypress" />

describe("webapp deve estar online", () => {
  it("webapp deve estar online", () => {
    cy.visit("/");
    cy.title().should("eq", "Samurai Barbershop by QAninja");
  });
});
