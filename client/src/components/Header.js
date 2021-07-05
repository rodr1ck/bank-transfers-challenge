import React, { useState } from "react";

const Header = () => {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div className="Navbar">
      <div className="rightSide">
        <h3>Mi Banco - Nueva Transferencia</h3>
      </div>
      <div className="leftSide">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <a href="/">Nuevo Destinatario</a>
          <a href="/transferencia">Transferir</a>
          <a href="/verhistorial">Historial</a>
        </div>
        <button>Open</button>
      </div>
    </div>
  );
};

export default Header;
