import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    deviceId: { type: String, required: true, index: true },
    deviceName: { type: String, required: true }
}, {
    collection: "device"
});

const deviceModel = mongoose.model("device", deviceSchema);

const devicelocationSchema = new mongoose.Schema({
    locationId: { type: String, required: true, index: true },
    deviceId: { type: String, required: true, index: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    altitude: { type: Number, required: false },
    speed: { type: Number, required: false }, 
}, {
    collection: "location"
});

const deviceLocationModel = mongoose.model("location", devicelocationSchema);

const telemetryEventSchema = new mongoose.Schema({
    id: { type: String, required: true, index: true },
    data: { type: Date, required: true, index: false },
});

const locationSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    altitude: { type: Number, required: false },
    speed: { type: Number, required: false },
});

const telemetrySchema = new mongoose.Schema({
    telemetryId: { type: String, required: true, index: true }, // For fast updates
    deviceId: {type: String, required: true, index: true},
    timestamp: { type: Date, required: true, index: true },
    location: { type: locationSchema, required: false },
    telemetryEvents: { type: [telemetryEventSchema], required: true }
}, {
    collection: "telemetry"
});

// index for efficient queries/updates based on telemetryId
telemetrySchema.index({ telemetryId: 1 });

const telemetryModel = mongoose.model("telemetry", telemetrySchema);
    
export {deviceModel, telemetryModel, deviceLocationModel};