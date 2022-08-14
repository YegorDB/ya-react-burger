import cn from 'classnames';

import { IngredientShape } from '../../prop-types/ingredient'
import { Ingredient } from '../../types/ingredient'

import styles from './IngredientDetails.module.css';

function IngredientDetails(props: {
  ingredient: Ingredient,
}) {
  const {ingredient} = props;

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

IngredientDetails.propTypes = {
  ingredient: IngredientShape,
};

export default IngredientDetails
