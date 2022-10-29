const API_ROOT = 'https://norma.nomoreparties.space/api';

describe('Burger constructor', () => {
  it('main functional', () => {
    cy.intercept('GET', `${API_ROOT}/ingredients`, (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'ingredients.json',
      });
    });

    // cy.intercept('POST', `${API_ROOT}/auth/login`, (req) => {
    //   req.reply({
    //     statusCode: 200,
    //     fixture: 'login.json',
    //   });
    // });

    cy.intercept('POST', `${API_ROOT}/orders`, (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'order.json',
      });
    });

    cy.visit('http://172.17.0.1:3000');

    cy.contains('Соберите бургер');
    cy.get('[class*=BurgerIngredients_BurgerIngredientsItemsGroup__]').should('have.length', 3);
    cy.get('[class*=BurgerIngredients_BurgerIngredientsItemsGroup__]').eq(0).children().should('have.length', 2);
    cy.get('[class*=BurgerIngredients_BurgerIngredientsItemsGroup__]').eq(1).children().should('have.length', 4);
    cy.get('[class*=BurgerIngredients_BurgerIngredientsItemsGroup__]').eq(2).children().should('have.length', 9);
    cy.get('[class*=BurgerIngredients_BurgerIngredientsItem__]').should('have.length', 15);
    cy.get('[class*=BurgerConstructorDropTarget]').should('have.length', 1);
    cy.get('[class*=BurgerConstructorDropTargetItem]').should('have.length', 0);

    cy.get('[class*=BurgerIngredients_BurgerIngredientsItemsGroup__]').eq(0).children().first().as('bunIngredient');
    cy.get('[class*=BurgerIngredients_BurgerIngredientsItemsGroup__]').eq(1).children().first().as('sauceIngredient');
    cy.get('[class*=BurgerIngredients_BurgerIngredientsItemsGroup__]').eq(2).children().first().as('mainIngredient');
    cy.get('[class*=BurgerConstructorDropTarget]').first().as('burgerConstructor');

    cy.get('@bunIngredient').click()
    cy.get('[class*=Modal_Modal__]').should('have.length', 1);
    cy.contains('Детали ингредиента');
    cy.get('[class*=IngredientDetails_IngredientDetails__]').should('have.length', 1);
    cy.get('[class*=IngredientDetails_IngredientDetailsData__]').should('have.length', 1);
    cy.get('[class*=Modal_ModalHeaderClose__]').eq(0).click()
    cy.get('[class*=Modal_Modal__]').should('have.length', 0);

    const dataTransfer = new DataTransfer;

    cy.get('@bunIngredient').trigger('dragstart', { dataTransfer });
    cy.get('@burgerConstructor').trigger('drop', { dataTransfer });
    cy.get('@bunIngredient').trigger('dragend');
    cy.get('[class*=BurgerConstructorDropTargetItem]').should('have.length', 2);

    cy.get('@sauceIngredient').trigger('dragstart', { dataTransfer });
    cy.get('@burgerConstructor').trigger('drop', { dataTransfer });
    cy.get('@sauceIngredient').trigger('dragend');
    cy.get('[class*=BurgerConstructorDropTargetItem]').should('have.length', 3);

    cy.get('@mainIngredient').trigger('dragstart', { dataTransfer });
    cy.get('@burgerConstructor').trigger('drop', { dataTransfer });
    cy.get('@mainIngredient').trigger('dragend');
    cy.get('[class*=BurgerConstructorDropTargetItem]').should('have.length', 4);

    cy.get('button').contains('Оформить заказ').click();

    // cy.contains('Вход');
    // cy.contains('Соберите бургер').should('not.exist');
    //
    // cy.get('input[name=email]').should('have.length', 1);
    // cy.get('input[name=email]').first().type('e@ma.il');
    // cy.get('input[name=password]').should('have.length', 1);
    // cy.get('input[name=password]').first().type('password');
    //
    // cy.get('button').contains('Войти').click();
    //
    // cy.contains('Соберите бургер');
    // cy.contains('Вход').should('not.exist');
    //
    // cy.get('[class*=BurgerConstructorDropTargetItem]').should('have.length', 4);
    //
    // cy.get('button').contains('Оформить заказ').click();

    cy.get('[class*=Modal_Modal__]').should('have.length', 1);

    cy.contains('Оформление заказа началось.');

    cy.contains('123456');
    cy.contains('идентификатор заказа');

    cy.get('[class*=Modal_ModalHeaderClose__]').eq(0).click()
    cy.get('[class*=Modal_Modal__]').should('have.length', 0);
  });
});
