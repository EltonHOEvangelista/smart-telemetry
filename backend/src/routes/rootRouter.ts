import { Router } from 'express';

// Import models
import { deviceModel, telemetryModel, deviceLocationModel } from '../models/payloadModel';

// Import JSON files
import jsonDataPayload from '../utils/Teltonika-device.json'

const router = Router();

// Define routes here
rootRouter.post("/load", async (req, res): Promise<any> => {
    try {
        
        
        
        // Load Parsed data into the database
        //await deviceModel.insertMany(jsonDataPayload.devices);
        //await telemetryModel.insertMany(jsonDataPayload.telemetry);
        //await deviceLocationModel.insertMany(jsonDataPayload.locations);
        
        res.status(200).send("Data loaded successfully");
    } catch (error) {
        console.error("Error loading data:", error);
        res.status(500).send("Error loading data");
    }
});

export default router;