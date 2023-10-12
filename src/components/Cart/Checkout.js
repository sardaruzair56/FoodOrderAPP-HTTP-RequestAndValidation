import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    console.log(
      enteredName +
        "-------" +
        enteredStreet +
        "-------" +
        enteredPostalCode +
        "-------" +
        enteredCity
    );

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalCodeIsValid = isFiveChar(enteredPostalCode);
    const cityIsValid = !isEmpty(enteredCity);

    console.log(
      nameIsValid +
        "-------" +
        streetIsValid +
        "-------" +
        postalCodeIsValid +
        "-------" +
        cityIsValid
    );

    setFormInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      postalCode: postalCodeIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      city:enteredCity,
      postalCode:enteredPostalCode
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputValidity.postalCode ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Enter Name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Enter Street Name</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && (
          <p>Enter Valid postalCode (5 characters)</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Enter City Name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
