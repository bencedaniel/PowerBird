// Logger és naplózó függvények importálása
import { logger, logOperation, logAuth, logError, logValidation, logWarn } from '../logger.js';

// Aszinkron hibakezelő middleware importálása
import { asyncHandler } from '../middleware/asyncHandler.js';

// HTTP státuszkódok és üzenetek konstansainak importálása
import { HTTP_STATUS, MESSAGES } from '../config/index.js';

import { FAILED_LOGINS_PER_USER, FAILED_LOGINS_PER_IP, BAN_TIME, BACKUP_CONTAINER, TIMEOUT,modifyEnvVariables} from '../config/env.js';


import {getAllLocationsdata, createLocationdata, getLocationById, updateLocationdata, deleteLocationdata} from '../DataServices/locationData.js';


const getAllLocations = asyncHandler(async (req, res) => {
    const locations = await getAllLocationsdata(true);
    res.render('locations/locationDashboard', {
        locations,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
    req.session.failMessage = null;
    req.session.successMessage = null;
});


const getNewLocationForm = asyncHandler(async (req, res) => {

    res.render('locations/newLocation', {
        formData: req.session.formData,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
    req.session.failMessage = null;
    req.session.successMessage = null;
});

const createLocation = asyncHandler(async (req, res) => {
    const newLocationData = req.body;
        const newLocation = await createLocationdata(newLocationData);
        logOperation('LOCATION_CREATE', `Location created: ${newLocation._id}`, req.user.username, HTTP_STATUS.CREATED);
        req.session.successMessage = MESSAGES.SUCCESS.LOCATION_CREATED;
        res.redirect('/location/dashboard');
});

const getupdateLocationForm = asyncHandler(async (req, res) => {
    const locationId = req.params.id;
    const location = await getLocationById(locationId);
    
    if (!location || !location.isActive) {
        req.session.failMessage = MESSAGES.ERROR.LOCATION_NOT_FOUND;
        return res.redirect('/locations');
    }
    res.render('locations/updateLocation', {
        formData: location,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
});
const updateLocation = asyncHandler(async (req, res) => {
    const locationId = req.params.id;
    const updatedLocationData = req.body;
        const updatedLocation = await updateLocationdata(locationId, updatedLocationData);
        logOperation('LOCATION_UPDATE', `Location updated: ${updatedLocation._id}`, req.user.username, HTTP_STATUS.OK);
        req.session.successMessage = MESSAGES.SUCCESS.LOCATION_UPDATED;
        res.redirect(`/location/dashboard`);

});

const deleteLocation = asyncHandler(async (req, res) => {
    const locationId = req.params.id;
        await deleteLocationdata(locationId);
        logOperation('LOCATION_DELETE', `Location deleted: ${locationId}`, req.user.username, HTTP_STATUS.OK);
        req.session.successMessage = MESSAGES.SUCCESS.LOCATION_DELETED;
        res.status(HTTP_STATUS.OK).json({ message: MESSAGES.SUCCESS.LOCATION_DELETED });
});

// A vezérlő által exportált handler függvények
export default {
    getAllLocations, // Összes helyszín lekérdezése
    getLocationById,  // Egy adott helyszín lekérdezése ID alapján
    getNewLocationForm, // Új helyszín létrehozásához szükséges űrlap megjelenítése
    createLocation,    // Új helyszín létrehozása
    getupdateLocationForm,
    updateLocation,
    deleteLocation
};


