import { useState } from "react";

const ContentRecords = (props) => {
	const records = props.records;
	const checkFunc = props.checkFunc;
	const deleteFunc = props.deleteFunc;
	const editFunc = props.editFunc;

	const setNewTrainNr = props.setNewTrainNr;
	const setNewDriver = props.setNewDriver;
	const setNewDepartureDate = props.setNewDepartureDate;
	const setNewArrival = props.setNewArrival;
	const setNewDelay = props.setNewDelay;
	const setNewBrand = props.setNewBrand;

	const newTrainNr = props.newTrainNr;
	const newDriver = props.newDriver;
	const newDepartureDate = props.newDepartureDate;
	const newArrival = props.newArrival;
	const newDelay = props.newDelay;
	const newBrand = props.newBrand;
	const editCheck = props.editCheck;

	const [edit, setEdit] = useState("");

	const repEditFunc = (call) => {
		edit === "" ? setEdit(call._id) : setEdit("");
		if (newTrainNr === undefined) {
			setNewTrainNr(call.trainNr);
		}
		if (newDriver === undefined) {
			setNewDriver(call.driver);
		}
		if (newDepartureDate === undefined) {
			setNewDepartureDate(call.departureDate);
		}
		if (newArrival === undefined) {
			setNewArrival(call.arrival);
		}
		if (newDelay === undefined) {
			setNewDelay(call.delay);
		}
		if (newBrand === undefined) {
			setNewBrand(call.brand);	
		}
	};

	const EDIT = (id) => {
		editFunc(id);
		setEdit("");
	};

	return (
		<div className="record-list">
			{records.map((call) => (
				<div className="recordBody" key={call._id}>
					{call._id === edit ? (
						<div className={"recordDiv " + (call.favByAdmin ? "is-fav" : "")}>
							<div className="recordUnderBody">
								<div className="recordHead">
									<input
										type="number"
										placeholder={call.trainNr}
										defaultValue={call.trainNr}
										className="recordCalls"
										onChange={(e) => setNewTrainNr(e.target.value)}
									/>
									<p className="recordCalls">{call.recordDate}</p>
								</div>
								<div className="recordBot">
									<input
										type="text"
										placeholder={call.brand}
										defaultValue={call.brand}
										className="recordCalls"
										onChange={(e) => setNewBrand(e.target.value)}
									/>
									<input
										type="text"
										placeholder={call.driver}
										defaultValue={call.driver}
										className="recordCalls"
										onChange={(e) => setNewDriver(e.target.value)}
									/>
									<input
										type="datetime-local"
										placeholder={call.departureDate}
										defaultValue={call.departureDate}
										className="recordCalls"
										onChange={(e) => setNewDepartureDate(e.target.value)}
									/>
									<input
										type="datetime-local"
										placeholder={call.arrival}
										defaultValue={call.arrival}
										className="recordCalls"
										onChange={(e) => setNewArrival(e.target.value)}
									/>
									<input
										type="number"
										placeholder={call.delay}
										defaultValue={call.delay}
										className="recordCalls"
										onChange={(e) => setNewDelay(e.target.value)}
									/>
								</div>
								<div onClick={() => EDIT(call._id)}>Send</div>
							</div>
						</div>
					) : (
						<div className={"recordDiv " + (call.favByAdmin ? "is-fav" : "")} key={call._id}>
							<div className="recordUnderBody">
								<div className="recordHead">
									<p className="recordCalls">{call.trainNr}</p>
									<p className="recordCalls">{call.recordDate}</p>
								</div>
								<div className="recordBot">
									<p className="recordCalls">The Name of Brand: {call.brand}</p>
									<p className="recordCalls">Sirname of Driver: {call.driver}</p>
									<p className="recordCalls">Departure Date: {call.departureDate}</p>
									<p className="recordCalls">Arrival Date: {call.arrival}</p>
									<p className="recordCalls">Delay: {call.delay} min</p>
								</div>
							</div>
						</div>
					)}
					{editCheck ? (
						<div className="recordOptionsBody">
							<div className="recordOptions" onClick={() => repEditFunc(call)}>
								<p>Edit</p>
							</div>
							<div className="recordOptions" onClick={() => deleteFunc(call._id)}>
								<p>Delete</p>
							</div>
						</div>
					) : (
						""
					)}
				</div>
			))}
		</div>
	);
};

export default ContentRecords;
