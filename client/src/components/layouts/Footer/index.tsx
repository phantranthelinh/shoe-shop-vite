const Footer = () => {
  return (
    <div className="footer mt-20">
      <div className="container">
        <div className="row">
          <div className="footer-col-2">
            <img src="images/logo-white.png" />
            <p>
              Our Purpose Is To Sustainably Make the Pleasure and Benefits of
              Sports Accessible to the Many.
            </p>
          </div>
          <div className="flex gap-6 text-xl ">
            <h3>Follow us:</h3>
            <ul className="flex flex-col gap-2 *:text-sm">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Youtube</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">Copyright 2024</p>
      </div>
    </div>
  );
};

export default Footer;
