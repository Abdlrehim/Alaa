describe("Help Center Functionality", () => {
  beforeEach(() => {
    cy.visit("https://frontend.stage.bunch.capital/")
  })

  it("should check if the help center icon exists and is clickable", () => {
    cy.get(".intercom-launcher")
      .should("be.visible")
      .invoke("attr", "aria-label")
      .then((ariaDisabled) => {
        // Probably helpful to also cy.log() the value
        cy.log(`ariaDisabled is ${ariaDisabled}`)
        if (ariaDisabled !== "Open Intercom Messenger") {
          cy.log("Button exists and is disabled!")
          return
        }
        cy.log("Button exists and is enabled!")
        cy.get(".intercom-launcher").click()
      })
  })

  it("should verify that clicking the icon opens up a popup with search bar", () => {
    cy.get(".intercom-launcher").click()
    cy.get(".intercom-messenger-frame iframe").then((iframe) => {
      cy.wrap(iframe.contents()).within(() => {
        cy.get(".intercom-5edou6").should("be.visible").click()
        cy.get(".intercom-mt46on")
          .should("be.visible")
          .within(() => {
            cy.get(".search-input-placeholder p").and(
              "have.text",
              "Search for help"
            )
          })
      })
    })
  })

  it('should search for "Rollup" and verify the results', () => {
    cy.get(".intercom-launcher").click()
    cy.get(".intercom-messenger-frame iframe").then((iframe) => {
      cy.wrap(iframe.contents()).within(() => {
        cy.get(".intercom-5edou6").should("be.visible").click()
        cy.get(".intercom-mt46on")
          .should("be.visible")
          .within(() => {
            cy.get("input").type("Rollup", { force: true })
          })
        cy.get(".intercom-o9b79t li")
          .should("be.visible")
          .and("contain", "Roll")
      })
    })
  })
})
