import React from "react";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <section className="page_404">
      <div className="four_zero_four_bg">
        <h2>404</h2>
      </div>

      <div className="contant_box_404">
        <p>Look like you're lost</p>
        <span>the page you are looking for not avaible!</span>
        <a href="/" className="link_404">
          Go to Home
        </a>
      </div>
    </section>
  );
};

export default ErrorPage;
