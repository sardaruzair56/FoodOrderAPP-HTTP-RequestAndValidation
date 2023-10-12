import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting]=useState(false);
  const [isSubmited, setIsSubmited]=useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const modalAction=
    <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>;
 

  const orderSubmitHandler=(userData)=>{
    setIsSubmitting(true);
     fetch('https://food-order-a3669-default-rtdb.firebaseio.com/order.json',{
     method:'POST',
     body:JSON.stringify({
     user:userData,
     orderItem:cartCtx.items
     })
  });
  setIsSubmitting(false);
  setIsSubmited(true);
  cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent=<React.Fragment>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={orderSubmitHandler} onCancel={props.onClose}/>}
      {!isCheckout && modalAction}
      </React.Fragment>

  

  
  const isSubmittingModalContent=<p>Submitting....</p>;
  const didSubmittingModalContent=( <React.Fragment>
      <p>Successfully Submited </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
        </div>
    </React.Fragment>);

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !isSubmited  && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && isSubmited && didSubmittingModalContent}
    </Modal>
  );
};

export default Cart;
