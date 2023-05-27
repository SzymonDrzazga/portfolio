import "../css/Navbar.css";

const Navbar = (props) => {
	//---------------Props---------------

	const editCheck = props.editCheck;
	const setEditCheck = props.setEditCheck;

	const loginCheck = props.loginCheck;
	const setLoginCheck = props.setLoginCheck;
	const signinCheck = props.signinCheck;
	const setSigninCheck = props.setSigninCheck;

	const API_BASE = props.API_BASE;
	const admin = props.admin;
	const Uname = props.Uname;

	//-----          -----          -----

	const newUsername = props.newUsername;
	const setNewUsername = props.setNewUsername;
	const newPassword = props.newPassword;
	const setNewPassword = props.setNewPassword;
	const email = props.email;
	const setEmail = props.setEmail;
	const LogIN = props.LogIN;
	const LogOUT = props.LogOUT;
	const loged = props.loged;
	const addUser = props.addUser;
	// const account = props.account;
	// const setAccount = props.setAccount;

	//------------------------------

	return (
		<nav className="navbar">
			<div id="lHeader">
				<a id="lHeader" className="links" href="/">
					Pociagowo
				</a>
			</div>
			<div id="mHeader">
				{Uname}
				<div id="usersPanel">
					<div id="Panel">
						
					</div>
				</div>
			</div>
			<div id="rHeader">
				{admin ? (
					<div
						className="links"
						onClick={() => {
							editCheck ? setEditCheck(false) : setEditCheck(true);
						}}>
						Edit
					</div>
				) : (
					""
				)}

				{!loged ? (
					<div
						className="links"
						onClick={() => {
							if (signinCheck) {
								setSigninCheck(false);
							} else {
								setSigninCheck(true);
								setLoginCheck(false);
							}
						}}>
						Sign In
					</div>
				) : (
					""
				)}

				{!loged ? (
					<div
						className="links"
						onClick={() => {
							if (loginCheck) {
								setLoginCheck(false);
							} else {
								setLoginCheck(true);
								setSigninCheck(false);
							}
						}}>
						Log In
					</div>
				) : (
					""
				)}

				{loged ? (
					<div className="links" onClick={() => LogOUT()}>
						Log Out
					</div>
				) : (
					""
				)}
			</div>
			{loginCheck ? (
				<div id="loginForm">
					<input
						type="text"
						placeholder="Username"
						className="login"
						onChange={(e) => setNewUsername(e.target.value)}
						value={newUsername}
					/>
					<input
						type="password"
						placeholder="Password"
						className="login"
						onChange={(e) => setNewPassword(e.target.value)}
						value={newPassword}
					/>
					{/* <input type="email" placeholder="email" className="login" onChange={(e) => setEmail(e.target.value)} value={email} /> */}
					<div className="sendLogin" onClick={() => LogIN()}>
						Log in
					</div>
				</div>
			) : (
				""
			)}
			{signinCheck ? (
				<div id="loginForm">
					<input
						type="text"
						placeholder="Username"
						className="login"
						onChange={(e) => setNewUsername(e.target.value)}
						value={newUsername}
					/>
					<input
						type="password"
						placeholder="Password"
						className="login"
						onChange={(e) => setNewPassword(e.target.value)}
						value={newPassword}
					/>
					<input type="email" placeholder="email" className="login" onChange={(e) => setEmail(e.target.value)} value={email} />
					<div className="sendLogin" onClick={() => addUser()}>
						Sign in
					</div>
				</div>
			) : (
				""
			)}
		</nav>
	);
};

export default Navbar;
