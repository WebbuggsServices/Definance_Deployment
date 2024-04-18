import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { ChevronDown } from "react-bootstrap-icons";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      window.location.reload(); // Reload the page after logout
    } catch (err) {
      console.error(err);
    }
  };

  const loginHandler = () => {
    navigate("/login");
    window.location.reload();
  };

  const signupHandler = () => {
    navigate("/register");
    window.location.reload();
  };
  const profileHandler = () => {
    navigate("/profile");
    window.location.reload();
  };
  return (
    <header className="header">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Definance Passive Empire</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            {userInfo && userInfo.name}
            <ChevronDown size={15} className="ms-1" />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <Navbar.Text
                    className="d-none d-lg-block"
                    style={{
                      marginRight: "15px",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      padding: "0px",
                    }}
                  >
                    {userInfo.name}
                  </Navbar.Text>
                  <Navbar.Text
                    style={{ cursor: "pointer" }}
                    onClick={profileHandler}
                  >
                    Profile
                  </Navbar.Text>
                  <LinkContainer to="/subscription">
                    <Nav.Link>Subscriptions</Nav.Link>
                  </LinkContainer>
                  <Navbar.Text
                    style={{ cursor: "pointer" }}
                    onClick={logoutHandler}
                  >
                    Logout
                  </Navbar.Text>
                </>
              ) : (
                <>
                  <Navbar.Text
                    style={{ cursor: "pointer" }}
                    onClick={loginHandler}
                  >
                    Sign In
                  </Navbar.Text>
                  <Navbar.Text
                    style={{ cursor: "pointer", marginLeft: "20px" }}
                    onClick={signupHandler}
                  >
                    Sign Up
                  </Navbar.Text>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
