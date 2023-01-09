import React from "react";

function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer class="  sticky bottom-0 z-50 bg-blue-400 text-center lg:text-left ">
      <div
        class="text-gray-700 text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        {footerYear} Made by
        <a href="https://github.com/FurkanCodes"> Furkan</a>
      </div>
    </footer>
  );
}

export default Footer;
