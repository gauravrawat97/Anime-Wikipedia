import React from "react";
function Footer() {
  return (
    <footer
      style={{ position: "fixed", bottom: "0", width: "100%" }}
      className="page-footer font-small blue"
    >
      <div className="footer-copyright text-center py-3">
        React webapp created by
        <a href="https://gauravrawat97.github.io/"> Gaurav Rawat</a>
      </div>
    </footer>
  );
}

export default Footer;
