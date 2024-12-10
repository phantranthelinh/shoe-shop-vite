
const Cart = () => {
  return (
    <div className="small-container cart-page">
      <table>
        <tbody>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          <tr>
            <td>
              <div className="cart-info">
                <img src="images/buy-1.jpg" />
                <div>
                  <p>Red Printed T-Shirt</p>
                  <small>Price: $50.00</small>
                  <br />
                  <a>Remove</a>
                </div>
              </div>
            </td>
            <td>
              <input type="number" />
            </td>
            <td>$50.00</td>
          </tr>
          <tr>
            <td>
              <div className="cart-info">
                <img src="images/buy-2.jpg" />
                <div>
                  <p>Red Printed T-Shirt</p>
                  <small>Price: $50.00</small>
                  <br />
                  <a>Remove</a>
                </div>
              </div>
            </td>
            <td>
              <input type="number" />
            </td>
            <td>$50.00</td>
          </tr>
          <tr>
            <td>
              <div className="cart-info">
                <img src="images/buy-3.jpg" />
                <div>
                  <p>Red Printed T-Shirt</p>
                  <small>Price: $50.00</small>
                  <br />
                  <a>Remove</a>
                </div>
              </div>
            </td>
            <td>
              <input type="number" />
            </td>
            <td>$50.00</td>
          </tr>
        </tbody>
      </table>
      <div className="total-price">
        <table>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>$200.00</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>$35.00</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>$230.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
