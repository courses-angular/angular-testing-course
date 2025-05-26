describe('My First Test', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3004/todos',
      },
      {
        statusCode: 200,
        body: [
          {
            id: '1',
            text: 'Learn Angular Testing',
            isCompleted: true,
          },
          {
            id: '4',
            text: 'Review testing best practices',
            isCompleted: false,
          },
          {
            id: '5',
            text: 'Set up CI/CD pipeline',
            isCompleted: true,
          },
          {
            id: 'd097',
            text: 'aaa',
            isCompleted: false,
          },
          {
            id: 'e670',
            text: 'aaa',
            isCompleted: false,
          },
        ],
      },
    )
      .intercept(
        {
          method: 'POST',
          url: 'http://localhost:3004/todos',
        },
        {
          statusCode: 201,
          body: {
            id: '6',
            text: 'New Todo',
            isCompleted: false,
          },
        },
      )
      .intercept(
        {
          method: 'DELETE',
          url: 'http://localhost:3004/todos/1',
        },
        {
          statusCode: 200,
        },
      )
      .intercept(
        {
          method: 'PATCH',
          url: 'http://localhost:3004/todos/1',
        },
        {
          statusCode: 200,
          body: {
            id: '1',
            text: 'Learn Angular Testing',
            isCompleted: false,
          },
        },
      )
      .visit('/');
  });
  it('Visits the initial project page', () => {
    cy.contains('todos');
  });
  it('should render all todos from API', () => {
    cy.visit('/');
    cy.get('[data-cy=todo]').should('have.length', 5);
    cy.get('[data-cy=todo]').each(($el, index) => {
      cy.wrap($el).should(
        'contain',
        [
          'Learn Angular Testing',
          'Review testing best practices',
          'Set up CI/CD pipeline',
          'aaa',
          'aaa',
        ][index],
      );
    });
    cy.get('[data-cy="checkboxToggle"]').each(($el, index) => {
      if (index === 0 || index === 2) {
        cy.wrap($el).should('be.checked', true);
      } else {
        cy.wrap($el).should('not.be.checked');
      }
    });
  });

  it('should render footer', () => {
    cy.get('[data-cy="todoCount"]').should('contain.text', '3 items left');

    cy.get('[data-cy=filterLink]')
      .eq(0)
      .should('contain.text', 'All')
      .should('have.class', 'selected');
    cy.get('[data-cy=filterLink]').eq(1).should('contain.text', 'Active');
    cy.get('[data-cy=filterLink]').eq(2).should('contain.text', 'Completed');
  });
  it('should change the filter', () => {
    cy.get('[data-cy=filterLink]').eq(1).click();
    cy.get('[data-cy=filterLink]')
      .eq(1)
      .should('contain.text', 'Active')
      .should('have.class', 'selected');
  });
  it('should create a new todo', () => {
    cy.get('[data-cy="newTodoInput"]').type('New Todo{enter}');
    cy.get('[data-cy=todo]').should('have.length', 6);
    cy.get('[data-cy=todo]').last().should('contain.text', 'New Todo');
    cy.get('[data-cy=todo]')
      .last()
      .find('[data-cy="checkboxToggle"]')
      .should('not.be.checked');
  });
  it('should remove todo', () => {
    //Force: true is used to click the button even if it is not visible
    cy.get('[data-cy=destroyButton').eq(0).click({ force: true });
    cy.get('[data-cy=todo]').should('have.length', 4);
  });

  it('should toggle todo', () => {
    cy.get('[data-cy="checkboxToggle"]').eq(0).click();
    cy.get('[data-cy="checkboxToggle"]').eq(0).should('not.be.checked');
  });
  it('should toggle all todos', () => {
    cy.intercept(
      {
        method: 'PATCH',
        url: 'http://localhost:3004/todos/*',
      },
      {
        statusCode: 200,
        body: {
          id: '1',
          text: 'Learn Angular Testing',
          isCompleted: true,
        },
      },
    );
    cy.get('[data-cy="toggleAll"]').click();
    cy.get('[data-cy="checkboxToggle"]').eq(0).should('be.checked');
    cy.get('[data-cy="checkboxToggle"]').eq(1).should('be.checked');
    cy.get('[data-cy="checkboxToggle"]').eq(2).should('be.checked');
    cy.get('[data-cy="checkboxToggle"]').eq(3).should('be.checked');
    cy.get('[data-cy="checkboxToggle"]').eq(4).should('be.checked');
  });

  it('should update todo', () => {
    cy.intercept(
      {
        method: 'PATCH',
        url: 'http://localhost:3004/todos/1',
      },
      {
        statusCode: 200,
        body: {
          id: '1',
          text: 'Bar',
          isCompleted: false,
        },
      },
    ).visit('/');
    cy.get('[data-testid="todoLabel"]').eq(0).dblclick();

    cy.get('[data-cy="editInput"]').type('Bar{enter}');
    cy.get('[data-testid="todoLabel"]').eq(0).contains('Bar');
  });
});
