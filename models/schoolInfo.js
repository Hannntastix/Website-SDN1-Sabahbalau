import mongoose from "mongoose";

const schoolInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    stats: [{
        label: String,
        value: String
    }],
    facilities: [
        {
            type: String,
            required: true,
            trim: true
        }
    ],
    contact: {
        address: String,
        city: String,
        phone: String,
        email: String
    },
    operationalHours: {
        weekdays: String,
        saturday: String,
        sunday: String
    }
}, {
    timestamps: true
});

const SchoolInfo = mongoose.models.SchoolInfo || mongoose.model("SchoolInfo", schoolInfoSchema);

export default SchoolInfo;
