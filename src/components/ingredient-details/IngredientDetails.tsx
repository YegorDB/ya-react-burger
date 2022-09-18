import cn from 'classnames';
import { useSelector } from 'react-redux';

import { Ingredient } from '../../types/ingredient'
import { State } from '../../types/states';

import styles from './IngredientDetails.module.css';

export function IngredientDetails(props: {
  ingredient?: Ingredient | null,
}) {
  const { ingredient } = props;

  if (!ingredient) return null;

  return (
    <div className={styles.IngredientDetails}>
      <img className="mb-4" src={ingredient.image_large} alt={ingredient.name} />
      <p className="mb-8 text text_type_main-medium">{ingredient.name}</p>
      <div className={cn('text_color_inactive', styles.IngredientDetailsData)}>
        <div>
          <p className="mb-2 text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>
        <div>
          <p className="mb-2 text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </div>
        <div>
          <p className="mb-2 text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>
        <div>
          <p className="mb-2 text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

export function CurrentIngredientDetails() {
  const ingredient = useSelector((state: State) => state.currentIngredient.ingredient);

  return (
    <IngredientDetails ingredient={ ingredient } />
  );
}
