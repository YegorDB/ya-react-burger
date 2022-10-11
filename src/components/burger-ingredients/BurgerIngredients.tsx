import cn from 'classnames';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { InView } from 'react-intersection-observer';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';

import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import Modal from '../modal/Modal';
import { CurrentIngredientDetails } from '../ingredient-details/IngredientDetails';
import { useSelector, useDispatch } from '../../hooks';
import { SET_CURRENT_INGREDIENT } from '../../services/actions';
import { TBurgerIngredientsTabClickHandler } from '../../types/handlers';
import { TBurgerIngredientsItemProps, TBurgerIngredientsItemsGroupProps } from '../../types/props';
import { TBurgerIngredientsItemParams } from '../../types/router';
import { parseIngredientsByType } from '../../utils/parseIngredients';

import styles from './BurgerIngredients.module.css';

export const BurgerIngredientsItemModal: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: ingredientId } = useParams<TBurgerIngredientsItemParams>();

  const handleCloseModal = () => {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      ingredient: null,
    });
    history.goBack();
  }

  return (
    <Modal handleClose={handleCloseModal} title="Детали ингредиента">
      <CurrentIngredientDetails ingredientId={ingredientId}/>
    </Modal>
  )
}

const BurgerIngredientsItem: FC<TBurgerIngredientsItemProps> = ({ ingredient }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { bunId, itemsData } = useSelector(state => ({
    bunId: state.selectedIngredients.bunId,
    itemsData: state.selectedIngredients.itemsData,
  }));
  const [, dragRef] = useDrag({
    type: 'ingredients-item',
    item: ingredient,
  });

  const count = useMemo<number>(() => {
    const otherIds = itemsData.map(i => i.id);
    return [bunId, ...otherIds, bunId].filter(id => id === ingredient._id).length;;
  }, [bunId, itemsData, ingredient._id])

  const handleOpenModal = () => {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      ingredient: ingredient,
    });
  }

  return (
    <div ref={dragRef} className="hidden-overflow">
      <Link
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { ingredientLocation: location }
        }}
        className="undecorated-link"
      >
        <div className={cn('mt-4 mb-4 ml-3 mr-3', styles.BurgerIngredientsItem)} onClick={handleOpenModal}>
          <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
          <div className={cn('mt-1 mb-1', styles.BurgerIngredientsItemPrise)}>
            <p className="mr-1 text text_type_digits-default">{ingredient.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <div>
            <p className={cn('text text_type_main-default', styles.BurgerIngredientsItemName)}>{ingredient.name}</p>
          </div>
          {count > 0 && (
            <Counter count={count} size="default" />
          )}
        </div>
      </Link>
    </div>
  );
}

const BurgerIngredientsItemsGroup = React.forwardRef((
  { name, ingredients }: TBurgerIngredientsItemsGroupProps,
  ref: React.ForwardedRef<HTMLParagraphElement>,
) => (
  <div>
    <p ref={ref} className="text text_type_main-medium">
      {name}
    </p>
    <div className={cn('pt-2 pb-6 pl-1 pr-1', styles.BurgerIngredientsItemsGroup)}>
      {ingredients.map(ingredient => (
        <BurgerIngredientsItem ingredient={ingredient} key={ingredient._id}/>
      ))}
    </div>
  </div>
));

function getBurgerIngredientsTabClickHandler(
  ref: React.RefObject<HTMLElement>
): TBurgerIngredientsTabClickHandler {
  return (value: string) => {
    if (ref.current === null) return;
    ref.current.scrollIntoView({behavior: 'smooth'});
  }
}

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('1');
  const [wisibleTabs, setWisibleTabs] = useState<Record<'1' | '2' | '3', boolean>>({
    '1': true,
    '2': false,
    '3': false,
  });

  const bunRef = useRef<HTMLParagraphElement>(null);
  const sauceRef = useRef<HTMLParagraphElement>(null);
  const mainRef = useRef<HTMLParagraphElement>(null);

  const bunTabClickHandler = useMemo<TBurgerIngredientsTabClickHandler>(
    () => getBurgerIngredientsTabClickHandler(bunRef),
    [bunRef]
  );
  const sauceTabClickHandler = useMemo<TBurgerIngredientsTabClickHandler>(
    () => getBurgerIngredientsTabClickHandler(sauceRef),
    [sauceRef]
  );
  const mainTabClickHandler = useMemo<TBurgerIngredientsTabClickHandler>(
    () => getBurgerIngredientsTabClickHandler(mainRef),
    [mainRef]
  );

  const ingredients = useSelector(state => state.ingredients.items);

  useEffect(
    () => {
      for (let i = 1; i <= 3; i++) {
        const index = i.toString() as keyof typeof wisibleTabs;
        if (wisibleTabs[index]) {
          setCurrentTab(index);
          break;
        }
      }
    }, [wisibleTabs]
  );

  const {
    bun: bunIngredients,
    sauce: sauceIngredients,
    main: mainIngredients,
  } = parseIngredientsByType(ingredients);

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
        <InView
          as="div"
          rootMargin="-320px 0px 0px 0px"
          onChange={(inView, entry) => setWisibleTabs({...wisibleTabs, '1': inView})}
        >
          <BurgerIngredientsItemsGroup ref={bunRef} name="Булки" ingredients={bunIngredients} />
        </InView>
        <InView
          as="div"
          rootMargin="-320px 0px 0px 0px"
          onChange={(inView, entry) => setWisibleTabs({...wisibleTabs, '2': inView})}
        >
          <BurgerIngredientsItemsGroup ref={sauceRef} name="Соусы" ingredients={sauceIngredients} />
        </InView>
        <InView
          as="div"
          rootMargin="-320px 0px 0px 0px"
          onChange={(inView, entry) => setWisibleTabs({...wisibleTabs, '3': inView})}
        >
          <BurgerIngredientsItemsGroup ref={mainRef} name="Начинки" ingredients={mainIngredients} />
        </InView>
      </div>
    </div>
  );
}

export default BurgerIngredients;
