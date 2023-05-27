import { useState, useEffect } from "react";
// import Cookies from "universal-cookie";
import Content from "./js/Content";
import Navbar from "./js/Navbar";

function App() {
	//Initializing Cookies

	// const cookies = new Cookies();

	//------------------------------

	const API_BASE = "http://localhost:3001";
	const [editCheck, setEditCheck] = useState(false);
	const [loged, setLoged] = useState(false);
	const [loginCheck, setLoginCheck] = useState(false);
	const [signinCheck, setSigninCheck] = useState(false);

	const [Uname, setUname] = useState("Guest");

	//---------------Users---------------

	const [user, setUser] = useState(null);
	const [admin, setAdmin] = useState(false);

	const [newUsername, setNewUsername] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [email, setEmail] = useState("");

	//---------------Users-Functions---------------

	const addUser = () => {
		if ((newUsername != null) & (newPassword != null) & (email != null)) {
			var exists = true;

			fetch(API_BASE + "/user/correct", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: newUsername,
				}),
			})
				.then((res) => res.json())
				.then((req) => {
					if(req.length === 0){
						console.log("123");
						exists = false;
					}else{
						exists = true;
						alert("This account already exists");
					}
					console.log(exists)
				});
			if (exists === false) {
				console.log("dostalem sie")
				fetch(API_BASE + "/user/new", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: newUsername,
						password: newPassword,
						email: email,
					}),
				}).then((res) => res.json()).finally(() => console.log("Account successfully created"));

				setSigninCheck(false);
				setNewUsername("");
				setNewPassword("");
				setEmail("");
			}
		}
	};

	// useEffect(() => {
	// 	CreateGuest();
	// }, [])
	

	// const changeAdmin = async (id) => {
	// 	const data = await fetch(API_BASE + "/user/admin/" + id).then((res) => res.json());

	// const deleteUser = async (id) => {
	// 	const data = await fetch(API_BASE + "/user/delete/" + id, { method: "DELETE" }).then((res) => res.json());
	// 	setUsers((users) => users.filter((user) => user._id !== data._id));
	// };

	const LogIN = async () => {
		setAdmin(false);
		if ((newUsername != null) & (newPassword != null)) {
			await fetch(API_BASE + "/user/find", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: newUsername,
					password: newPassword,
				}),
			})
				.then((res) => res.json())
				.then((req) => {
					if (req.length > 0) {
						setUser(req);
						setLoged(true);
						setUname(req[0].username);
						setNewUsername("");
						setNewPassword("");
						setLoginCheck(false);
						if (req[0] !== undefined) {
							if (req[0].admin === true) {
								setAdmin(true);
							}
						} else {
							setAdmin(false);
						}
					} else {
						alert("Username or Password is incorrect");
					}
				});
		}

		// cookies.set("login");
	};

	const LogOUT = () => {
		setUser(null);
		setAdmin(false);
		setLoged(false);
		setUname("Guest");
		// cookies.remove("login");
	};

	return (
		<div className="App">
			<Navbar
				editCheck={editCheck}
				setEditCheck={setEditCheck}
				loginCheck={loginCheck}
				setLoginCheck={setLoginCheck}
				signinCheck={signinCheck}
				setSigninCheck={setSigninCheck}
				newUsername={newUsername}
				setNewUsername={setNewUsername}
				newPassword={newPassword}
				setNewPassword={setNewPassword}
				email={email}
				setEmail={setEmail}
				API_BASE={API_BASE}
				admin={admin}
				loged={loged}
				// account={account} setAccount={setAccount}
				//Functions
				LogIN={LogIN}
				LogOUT={LogOUT}
				setUser={setUser}
				setAdmin={setAdmin}
				addUser={addUser}
				Uname={Uname}
			/>
			<Content editCheck={editCheck} API_BASE={API_BASE} />
		</div>
	);
}

export default App;
