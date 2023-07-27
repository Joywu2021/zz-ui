import Home from './home/Home';
import List from './list/List';
import Login from './login/Login';
import Aboutus from './aboutus/Aboutus';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
	return (
		<>
			<Navbar bg="dark" data-bs-theme="dark" fixed="top">
				<Container>
					<Navbar.Collapse>
						<Navbar.Brand>ZZ</Navbar.Brand>
						<Nav className="me-auto">
							<Nav.Link href="/">Home</Nav.Link>
							<Nav.Link href="/list">Data Center</Nav.Link>
							<Nav.Link href="/aboutus">About Us</Nav.Link>
						</Nav>
						
					</Navbar.Collapse>
					<Nav className="me-auto">
						<NavDropdown title="Account" id="AccountDropdown">
							<NavDropdown.Item href="/profile">Your Profile</NavDropdown.Item>
							<NavDropdown.Item href="/payment">Payment Setting</NavDropdown.Item>
							<NavDropdown.Item href="/payment">Help</NavDropdown.Item>
							<NavDropdown.Divider />
						</NavDropdown>
						<Nav.Link href="/login">Login</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/list" element={<List />} />
				<Route path="/login" element={<Login />} />
				<Route path="/aboutus" element={<Aboutus />} />
			</Routes>
		</Router>
		</>
	);
}

export default App;