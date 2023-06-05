import "../css/Content.css";
import { useState, useEffect } from "react";
import ContentRecords from "./ContentRecords";

const Content = (props) => {
	//---------------Props---------------

	const API_BASE = props.API_BASE;
	const editCheck = props.editCheck;

	//---------------Records---------------

	const [records, setRecords] = useState([]);
	const [popupActive, setPopupActive] = useState(false);

	const [newTrainNr, setNewTrainNr] = useState();
	const [newDriver, setNewDriver] = useState();
	const [newDepartureDate, setNewDepartureDate] = useState();
	const [newArrival, setNewArrival] = useState();
	const [newDelay, setNewDelay] = useState();
	const [newBrand, setNewBrand] = useState();

	//---------------Records-Functions---------------

	const GetRecords = () => {
		fetch(API_BASE + "/records")
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);

				for(let i = 0; i < data.length; ++i) {
					if (data[i].favByAdmin) {
						// data.$(record).insertBefore(data);
						let obj = data[i]
						delete data[i]
						data.splice(0, 0, obj);
						break;
					};
				}

				// let one = data[0];
				// let two = data[num];

				// data[0] = two;
				// data[num] = one;
				setRecords(data);
			})
			.catch((err) => console.error("Error: ", err));
	};

	useEffect(() => {
		GetRecords();
	});

	// const checkFunc = async (id) => {
	// 	const data = await fetch(API_BASE + "/record/favByAdmin/" + id).then((res) => res.json());

	// 	setRecords((records) =>
	// 		records.map((record) => {
	// 			if (record._id === data._id) {
	// 				record.favByAdmin = data.favByAdmin;
	// 			}
	// 			return record;
	// 		})
	// 	);
	// };

	const deleteFunc = async (id) => {
		const data = await fetch(API_BASE + "/record/delete/" + id, { method: "DELETE" }).then((res) => res.json());
		setRecords((records) => records.filter((record) => record._id !== data._id));
	};

	const addRecord = async () => {
		if (
			newTrainNr != null &&
			newDriver != null &&
			newDepartureDate != null &&
			newArrival != null &&
			newDelay != null &&
			newBrand != null &&
			newDepartureDate < newArrival &&
			isNaN(newDriver) &&
			!isNaN(newDelay) &&
			newDelay >= 0
		) {
			const data = await fetch(API_BASE + "/record/new", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					trainNr: newTrainNr,
					driver: newDriver,
					departureDate: newDepartureDate,
					arrival: newArrival,
					delay: newDelay,
					brand: newBrand,
				}),
			}).then((res) => res.json());

			setRecords([...records, data]);
			setPopupActive(false);
			setNewTrainNr();
			setNewDriver();
			setNewDepartureDate();
			setNewArrival();
			setNewDelay();
			setNewBrand();
		} else {
			alert("Something is wrong");
		}
	};

	const editFunc = async (id) => {
		if (
			(newTrainNr !== undefined) &
			(newDriver !== undefined) &
			(newDepartureDate !== undefined) &
			(newArrival !== undefined) &
			(newDelay !== undefined) &
			(newBrand !== undefined)
		) {
			await fetch(API_BASE + "/record/put/" + id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					trainNr: newTrainNr,
					driver: newDriver,
					departureDate: newDepartureDate,
					arrival: newArrival,
					delay: newDelay,
					brand: newBrand,
				}),
			}).then((res) => res.json());

			// setRecords([...records, data]);
			setPopupActive(false);
			setNewTrainNr();
			setNewDriver();
			setNewDepartureDate();
			setNewArrival();
			setNewDelay();
			setNewBrand();
		} else {
			alert("You haven't filled cells correctly");
		}
	};

	//---------------------------------

	return (
		<div id="contentBody">
			<ContentRecords
				records={records}
				// checkFunc={checkFunc}
				deleteFunc={deleteFunc}
				editFunc={editFunc}
				setNewTrainNr={setNewTrainNr}
				setNewDriver={setNewDriver}
				setNewDepartureDate={setNewDepartureDate}
				setNewArrival={setNewArrival}
				setNewDelay={setNewDelay}
				setNewBrand={setNewBrand}
				newTrainNr={newTrainNr}
				newDriver={newDriver}
				newDepartureDate={newDepartureDate}
				newArrival={newArrival}
				newDelay={newDelay}
				newBrand={newBrand}
				editCheck={editCheck}
			/>

			{editCheck ? (
				<div className="addPopup" onClick={() => setPopupActive(popupActive ? false : true)}>
					+
				</div>
			) : (
				""
			)}

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>
						x
					</div>
					<div className="content">
						<h3>Add Record</h3>
						<div id="addInputs">
							<label className="label">
								<p className="additional-text">Departure Date: </p>
								<input
									type="datetime-local"
									placeholder="Departure Date"
									className="add-record-input date"
									onChange={(e) => setNewDepartureDate(e.target.value)}
									value={newDepartureDate}
								/>
							</label>
							<label className="label">
								<p className="additional-text">Arrival Date: </p>
								<input
									type="datetime-local"
									placeholder="Arrival Date"
									className="add-record-input date"
									onChange={(e) => setNewArrival(e.target.value)}
									value={newArrival}
								/>
							</label>
							<label className="label">
								<p className="additional-text">Train Number: </p>
								<input
									type="number"
									placeholder="Train NR"
									className="add-record-input date"
									onChange={(e) => setNewTrainNr(e.target.value)}
									value={newTrainNr}
								/>
							</label>
							<label className="label">
								<p className="additional-text">Drivers Name: </p>
								<input
									type="text"
									placeholder="Driver"
									className="add-record-input date"
									onChange={(e) => setNewDriver(e.target.value)}
									value={newDriver}
								/>
							</label>
							<label className="label">
								<p className="additional-text">Delay in Minutes: </p>
								<input
									type="number"
									placeholder="Delay ( in min )"
									className="add-record-input date"
									onChange={(e) => setNewDelay(e.target.value)}
									value={newDelay}
								/>
							</label>
							<label className="label">
								<p className="additional-text">Name of Carrier: </p>
								<input
									type="text"
									placeholder="Carrier"
									className="add-record-input date"
									onChange={(e) => setNewBrand(e.target.value)}
									value={newBrand}
								/>
							</label>
						</div>
						<div className="button" onClick={addRecord}>
							Create Record
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Content;
