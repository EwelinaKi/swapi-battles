describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('localhost:4200');
  })

  it('should display reset game', () => {
    cy.get('[data-testid="controlBtn"]').as('controlBtn');
    cy.get('[data-testid="score1"]').as('score1');
    cy.get('[data-testid="score2"]').as('score2');

    cy.get('[data-testid="roundNumber"]').should('not.exist');
    cy.get('[data-testid="battleType"]').should('not.exist');

    cy.get('@score1').should('have.text', '0');
    cy.get('@score2').should('have.text', '0');
    cy.get('[data-testid="empty"]').should('to.exist');

    cy.contains('Start new Game');
    cy.contains('Prepare for a battle');
  })

  it('should start new game', () => {
    cy.contains('Start new Game').click();

    cy.get('[data-testid="controlBtn"]').as('controlBtn');
    cy.get('[data-testid="score1"]').as('score1');
    cy.get('[data-testid="score2"]').as('score2');

    cy.get('[data-testid="roundNumber"]').should('to.exist');
    cy.get('[data-testid="battleType"]').should('to.exist');
    cy.get('[data-testid="vote1a"]').as('vote1a').should('to.exist');
    cy.get('[data-testid="vote1b"]').should('to.exist');
    cy.get('[data-testid="vote2a"]').as('vote2a').should('to.exist');
    cy.get('[data-testid="vote2b"]').should('to.exist');
    cy.get('@score1').should('have.text', '0');
    cy.get('@score2').should('have.text', '0');
    cy.get('@controlBtn').should('be.disabled');
  })

  it('should be able to vote an end game', () => {
    cy.contains('Start new Game').click();

    cy.contains("round -1-");
    cy.get('[data-testid="controlBtn"]').as('controlBtn');
    cy.get('[data-testid="vote1a"]').as('vote1a').click();
    cy.get('[data-testid="vote2a"]').as('vote2a').click();
    cy.contains('Reveal');
    cy.get('@controlBtn').click();
    cy.contains('Next round');
    cy.get('@controlBtn').click();

    cy.contains("round -2-");
    cy.get('@vote1a').click();
    cy.get('@vote2a').click();
    cy.contains('Reveal');
    cy.get('@controlBtn').click();
    cy.contains('Next round');
    cy.get('@controlBtn').click();

    cy.contains("round -3-");
    cy.get('@vote1a').click();
    cy.get('@vote2a').click();
    cy.contains('Last reveal')
    cy.get('@controlBtn').click();
    cy.contains('End Game');
    cy.get('@controlBtn').click();

    cy.contains('Start new Game');
  })
})
