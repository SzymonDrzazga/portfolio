const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//, { timeZone: "Europe/Warsaw" }

// let currentDate = new Date()
// .toLocaleDateString("ko-KR", {year: 'numeric', month: '2-digit', day: 'numeric', hour: "2-digit", minute:"2-digit" })
// .replace('. ', '-').replace('. ', '-').replace('. 오전', '');
// console.log(currentDate)

const RecordSchema = Schema ({
    recordDate: {
        type: Date,
        default: Date.now()
    },
    trainNr: {
        type: Number,
        required: true
    },
	driver: {
        type: String,
        required: true
    },
	departureDate: {
        type: String,
        required: true
    },
	arrival: {
        type: String,
        required: true
    },
	delay: {
        type: Number,
        required: true
    },
	brand: {
        type: String,
        required: true
    },
    favByAdmin: {
        type: Boolean,
        default: false
    }
});

    const Record = mongoose.model("Record", RecordSchema);

    module.exports = Record;