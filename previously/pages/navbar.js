  import 'bootstrap/dist/css/bootstrap.min.css';
  import { Navbar, Container, Nav } from 'react-bootstrap';
  import React, { useState, useEffect } from "react";





  function Navv(){
     const [id, setId] = useState("");
     const [token, setToken] = useState("");

    function logout() {
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = '/login';
  };
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        setToken(user.token)
    }
  }, []);

  console.log(token)


      return (token) ? (
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand >Previously</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link href="/profil">Profile</Nav.Link>
        <Nav.Link href="/membreSeries">My series</Nav.Link>
          <Nav.Link href="/series">All series</Nav.Link>
          <Nav.Link onClick={logout}>Deconnexion</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      ) : (
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand >Previously</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link href="/series">Shows</Nav.Link>
          <Nav.Link href="/login">Connexion</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      )
  }

  export default Navv
