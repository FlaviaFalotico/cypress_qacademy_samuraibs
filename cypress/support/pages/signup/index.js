/// <reference types="cypress" />

import { el } from "./elements";
import toast from "../../components/toast";

class SignupPage {
  constructor() {
    this.toast = toast;
  }

  go() {
    cy.visit("/signup");
  }

  form(user) {
    cy.get(el.name).type(user.name); // ^ = começa com
    cy.get(el.email).type(user.email); // $ = termina com
    cy.get(el.password).type(user.password); // * = contem
  }

  submit() {
    cy.contains(el.signupButton).click();
  }
}

export default new SignupPage();
