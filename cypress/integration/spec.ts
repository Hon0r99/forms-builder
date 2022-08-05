describe('My First Test', () => {
  
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Login Page');
  })

  it('Login', () => {
    cy.get('input[type="email"]').type('test1@mail.ru');
    cy.get('input[type="password"]').type('123123123');
    cy.get('button').click();
    cy.url().should('include', '/formbuilder');
  });

  it('Change theme', () => {
    cy.get('#mat-expansion-panel-header-0 > .mat-content > .mat-expansion-panel-header-title').click()
    cy.get('.ng-tns-c36-2 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
    cy.get('#mat-option-1 > .mat-option-text').click()
    cy.get('.mat-expansion-panel-body > .ng-tns-c36-2 > .mat-focus-indicator').click();

    cy.get(':nth-child(3) > .ng-star-inserted > .mat-focus-indicator') 
      .should('have.attr', 'ng-reflect-color')
      .and('match', /accent/);
    cy.get('#mat-expansion-panel-header-0 > .mat-content > .mat-expansion-panel-header-title').click()
  });

  it('works (simply)', () => {
    const draggable = Cypress.$('#cdk-drop-list-1 > :nth-child(1)')[0];
    const droppable = Cypress.$('#cdk-drop-list-0')[0];
    
    const coords = droppable.getBoundingClientRect();
    draggable.dispatchEvent(new MouseEvent('mousedown'));
    draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: 10, clientY: 0}));
    draggable.dispatchEvent(new MouseEvent('mousemove', {
      clientX: coords.x+100,   
      clientY: coords.y+100 
    }));
    draggable.dispatchEvent(new MouseEvent('mouseup'));

    cy.get('#cdk-drop-list-0').should('contain', 'Placeholder text');
  
  });

  it('Select filed', () => {
    cy.get('#cdk-drop-list-0 > :nth-child(1)').click();
    cy.get('#mat-expansion-panel-header-1').should('have.attr', 'aria-disabled').and('eq', 'false');
  });

  it('Change filed', () => {
    cy.get('#cdk-drop-list-0 > :nth-child(1)').click();
    cy.get('#mat-input-5').type('Change field');
    cy.get('.change-feilds > .mat-raised-button').click();

    cy.get('#cdk-drop-list-0 > :nth-child(1)').should('contain', 'Change field');
  });

  
})

