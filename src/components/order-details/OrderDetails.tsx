import cn from 'classnames';
import PropTypes from 'prop-types';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './OrderDetails.module.css';

function OrderDetails(props: {
  orderId: string,
}) {
  const {orderId} = props;

  return (
    <div style={{textAlign: 'center'}}>
      <p className="mt-10 mb-8 text text_type_digits-large">{orderId}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <div className={cn('mb-15 mt-15', styles.OrderDetailsCircle)}>
        <div className={styles.OrderDetailsCircleInner}>
          <CheckMarkIcon type="primary" />
        </div>
      </div>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="mt-2 mb-20 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderId: PropTypes.string,
};

export default OrderDetails