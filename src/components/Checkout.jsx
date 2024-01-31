import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgress";
import useHttp from "../hooks/useHttp";

//este componente deve ser mostrado caso userProgressContext seja CHECKOUT,
//mudança que sera triggada ao clicar em go to checkout no componente de cart

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fs = new FormData(event.target);
    const customerData = Object.fromEntries(fs.entries());
    const { data, isLoading, error, sendRequest } = useHttp(
      "http:localhost:8080/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: {
            items: cartCtx.items,
            customer: customerData,
          },
        }),
      }
    );

    sendRequest();
  }
  return (
    <Modal onClose={handleClose} open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name"></Input>
        <Input label="E-mail Address" type="email" id="email"></Input>
        <Input label="Street" type="text" id="street"></Input>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"></Input>
          <Input label="City" type="text" id="city"></Input>
        </div>
        <p className="modal-actions">
          <Button onClick={handleClose} type="button" textOnly>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
