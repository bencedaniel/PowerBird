// Logger és naplózó függvények importálása
import { logger, logOperation, logAuth, logError, logValidation, logWarn } from '../logger.js';

// Aszinkron hibakezelő middleware importálása
import { asyncHandler } from '../middleware/asyncHandler.js';

// HTTP státuszkódok és üzenetek konstansainak importálása
import { HTTP_STATUS, MESSAGES } from '../config/index.js';

import { FAILED_LOGINS_PER_USER, FAILED_LOGINS_PER_IP, BAN_TIME, BACKUP_CONTAINER, TIMEOUT,modifyEnvVariables} from '../config/env.js';


import {getAllDeviceTypesdata, createDeviceTypedata, getDeviceTypeById, updateDeviceTypedata, deleteDeviceTypedata} from '../DataServices/deviceTypeData.js';


const getAllDeviceTypes = asyncHandler(async (req, res) => {
    const deviceTypes = await getAllDeviceTypesdata(true);
    res.render('deviceTypes/deviceTypeDashboard', {
        deviceTypes,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
    req.session.failMessage = null;
    req.session.successMessage = null;
});


const getNewDeviceTypeForm = asyncHandler(async (req, res) => {

    res.render('deviceTypes/newDeviceType', {
        formData: req.session.formData,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
    req.session.failMessage = null;
    req.session.successMessage = null;
});

const createDeviceType = asyncHandler(async (req, res) => {
    const newDeviceTypeData = req.body;
        const newDeviceType = await createDeviceTypedata(newDeviceTypeData);
        logOperation('DEVICE_TYPE_CREATE', `Device type created: ${newDeviceType._id}`, req.user.username, HTTP_STATUS.CREATED);
        req.session.successMessage = MESSAGES.SUCCESS.DEVICE_TYPE_CREATED;
        res.redirect('/devicetypes/dashboard');
});

const getupdateDeviceTypeForm = asyncHandler(async (req, res) => {
    const deviceTypeId = req.params.id;
    const deviceType = await getDeviceTypeById(deviceTypeId);

    if (!deviceType || !deviceType.isActive) {
        req.session.failMessage = MESSAGES.ERROR.DEVICE_TYPE_NOT_FOUND;
        return res.redirect('/devicetypes/dashboard');
    }
    res.render('deviceTypes/updateDeviceType', {
        formData: deviceType,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
});
const updateDeviceType = asyncHandler(async (req, res) => {
    const deviceTypeId = req.params.id;
    const updatedDeviceTypeData = req.body;
        const updatedDeviceType = await updateDeviceTypedata(deviceTypeId, updatedDeviceTypeData);
        logOperation('DEVICE_TYPE_UPDATE', `Device type updated: ${updatedDeviceType._id}`, req.user.username, HTTP_STATUS.OK);
        req.session.successMessage = MESSAGES.SUCCESS.DEVICE_TYPE_UPDATED;
        res.redirect(`/devicetypes/dashboard`);

});

const deleteDeviceType = asyncHandler(async (req, res) => {
    const deviceTypeId = req.params.id;
        await deleteDeviceTypedata(deviceTypeId);
        logOperation('DEVICE_TYPE_DELETE', `Device type deleted: ${deviceTypeId}`, req.user.username, HTTP_STATUS.OK);
        req.session.successMessage = MESSAGES.SUCCESS.DEVICE_TYPE_DELETED;
        res.status(HTTP_STATUS.OK).json({ message: MESSAGES.SUCCESS.DEVICE_TYPE_DELETED });

    });

// A vezérlő által exportált handler függvények
export default {
    getAllDeviceTypes, // Összes eszköztípus lekérdezése
    getDeviceTypeById,  // Egy adott eszköztípus lekérdezése ID alapján
    getNewDeviceTypeForm, // Új eszköztípus létrehozásához szükséges űrlap megjelenítése
    createDeviceType,    // Új eszköztípus létrehozása
    getupdateDeviceTypeForm,
    updateDeviceType,
    deleteDeviceType
};


