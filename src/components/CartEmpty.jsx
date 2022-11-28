import React from 'react';
import { Link } from 'react-router-dom';

import CartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
  return (
    <div className="content">
      <div className="cart cart--empty">
        <h2>Cart is empty</h2>
        <p>
          You probably haven't ordered a burger yet.
          <br />
          To order a burger, go to the home page.
        </p>
        <img src={CartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Go back</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
