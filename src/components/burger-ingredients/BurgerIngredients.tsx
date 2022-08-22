import cn from 'classnames';
import React, {useContext, useMemo, useRef} from 'react';

import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import { IngredientsContext } from '../../context/ingredients';
import { Ingredient, IngredientsByType } from '../../types/ingredient'

import styles from './BurgerIngredients.module.css';

function parseIngredients(ingredients: Ingredient[]) {
  const ingredientsByType: IngredientsByType = {bun: [], main: [], sauce: []};
  for (const item of ingredients) {
    ingredientsByType[item.type as keyof IngredientsByType].push(item);
  }
  return ingredientsByType;
}

function BurgerIngredientsItem(props: {ingredient: Ingredient}) {
  const {ingredient} = props;

  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  return (
    <div className="hidden-overflow">
      <div className={cn('mt-4 mb-4 ml-3 mr-3', styles.BurgerIngredientsItem)} onClick={handleOpenModal}>
        <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
        <div className={cn('mt-1 mb-1', styles.BurgerIngredientsItemPrise)}>
          <p className="mr-1 text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div>
          <p className={cn('text text_type_main-default', styles.BurgerIngredientsItemName)}>{ingredient.name}</p>
        </div>
        <Counter count={1} size="default" />
      </div>
      {isModalOpen && (
        <Modal handleClose={handleCloseModal} title="Детали ингредиента">
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </div>
  );
}

const BurgerIngredientsItemsGroup = React.forwardRef((
  props: {name: string, ingredients: Ingredient[]},
  ref: React.ForwardedRef<HTMLParagraphElement>,
) => (
  <div>
    <p ref={ref} className="text text_type_main-medium">
      {props.name}
    </p>
    <div className={cn('pt-2 pb-6 pl-1 pr-1', styles.BurgerIngredientsItemsGroup)}>
      {props.ingredients.map(ingredient => (
        <BurgerIngredientsItem ingredient={ingredient} key={ingredient._id}/>
      ))}
    </div>
  </div>
));

function getBurgerIngredientsTabClickHandler(ref: React.RefObject<HTMLElement>, setCurrentTab: Function) {
  return (value: string) => {
    setCurrentTab(value);
    if (ref.current === null) return;
    ref.current.scrollIntoView({behavior: 'smooth'});
  }
}

function BurgerIngredients() {
  const [currentTab, setCurrentTab] = React.useState('1');

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const bunTabClickHandler = useMemo(
    () => getBurgerIngredientsTabClickHandler(bunRef, setCurrentTab),
    [bunRef, setCurrentTab]
  );
  const sauceTabClickHandler = useMemo(
    () => getBurgerIngredientsTabClickHandler(sauceRef, setCurrentTab),
    [sauceRef, setCurrentTab]
  );
  const mainTabClickHandler = useMemo(
    () => getBurgerIngredientsTabClickHandler(mainRef, setCurrentTab),
    [mainRef, setCurrentTab]
  );

  const ingredients = useContext(IngredientsContext);

  const {
    bun: bunIngredients,
    sauce: sauceIngredients,
    main: mainIngredients,
  } = parseIngredients(ingredients);

  return (
    <div>
      <p className="mt-10 mb-5 text text_type_main-large">
        Соберите бургер
      </p>
      <div className={cn('mb-10', styles.BurgerIngredientsTabs)}>
        <Tab value="1" active={currentTab === '1'} onClick={bunTabClickHandler}>
          Булки
        </Tab>
        <Tab value="2" active={currentTab === '2'} onClick={sauceTabClickHandler}>
          Соусы
        </Tab>
        <Tab value="3" active={currentTab === '3'} onClick={mainTabClickHandler}>
          Начинки
        </Tab>
        </div>
      <div className={cn('custom-scroll', styles.BurgerIngredientsItems)}>
        <BurgerIngredientsItemsGroup ref={bunRef} name="Булки" ingredients={bunIngredients} />
        <BurgerIngredientsItemsGroup ref={sauceRef} name="Соусы" ingredients={sauceIngredients} />
        <BurgerIngredientsItemsGroup ref={mainRef} name="Начинки" ingredients={mainIngredients} />
      </div>
    </div>
  );
}

export default BurgerIngredients;
