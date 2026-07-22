// Logger és naplózó függvények importálása
import { logger, logOperation, logAuth, logError, logValidation, logWarn } from '../logger.js';

// Aszinkron hibakezelő middleware importálása
import { asyncHandler } from '../middleware/asyncHandler.js';

// HTTP státuszkódok és üzenetek konstansainak importálása
import { HTTP_STATUS, MESSAGES } from '../config/index.js';

import { FAILED_LOGINS_PER_USER, FAILED_LOGINS_PER_IP, BAN_TIME, BACKUP_CONTAINER, TIMEOUT,modifyEnvVariables} from '../config/env.js';


import {getAllDefectStatusdata, createDefectStatusdata, getDefectStatusById, updateDefectStatusdata, deleteDefectStatusdata} from '../DataServices/defectStatusData.js';


const getAllDefectStatus = asyncHandler(async (req, res) => {
    const defectstatus = await getAllDefectStatusdata(true);
    res.render('defectStatus/defectStatusDashboard', {
        defectstatus,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
    req.session.failMessage = null;
    req.session.successMessage = null;
});


const getNewDefectStatusForm = asyncHandler(async (req, res) => {

    res.render('defectStatus/newDefectStatus', {
        formData: req.session.formData,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
    req.session.failMessage = null;
    req.session.successMessage = null;
});

const createDefectStatus = asyncHandler(async (req, res) => {
    const newDefectStatusData = req.body;
    newDefectStatusData.isTerminal = req.body.isTerminal === 'on'; // Checkbox kezelés
    newDefectStatusData.code = req.body.code.toUpperCase(); // Kód nagybetűsítése
    newDefectStatusData.code = newDefectStatusData.code.replace(" ", "_"); // Kód whitespace eltávolítása
        const newDefectStatus = await createDefectStatusdata(newDefectStatusData);
        logOperation('DEFECT_STATUS_CREATE', `Defect status created: ${newDefectStatus._id}`, req.user.username, HTTP_STATUS.CREATED);
        req.session.successMessage = MESSAGES.SUCCESS.DEFECT_STATUS_CREATED;
        res.redirect('/defectstatus/dashboard');
});

const getupdateDefectStatusForm = asyncHandler(async (req, res) => {
    const defectStatusId = req.params.id;
    const defectStatus = await getDefectStatusById(defectStatusId);

    if (!defectStatus || !defectStatus.isActive) {
        req.session.failMessage = MESSAGES.ERROR.DEFECT_STATUS_NOT_FOUND;
        return res.redirect('/defectstatus/dashboard');
    }
    res.render('defectStatus/updateDefectStatus', {
        formData: defectStatus,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
});
const updateDefectStatus = asyncHandler(async (req, res) => {
    const defectStatusId = req.params.id;
    const updatedDefectStatusData = req.body;
    updatedDefectStatusData.isTerminal = req.body.isTerminal === 'on'; // Checkbox kezelés
    updatedDefectStatusData.code = req.body.code.toUpperCase(); // Kód nagybetűsítése
    updatedDefectStatusData.code = updatedDefectStatusData.code.replace(" ", "_"); // Kód whitespace eltávolítása
        const updatedDefectStatus = await updateDefectStatusdata(defectStatusId, updatedDefectStatusData);
        logOperation('DEFECT_STATUS_UPDATE', `Defect status updated: ${updatedDefectStatus._id}`, req.user.username, HTTP_STATUS.OK);
        req.session.successMessage = MESSAGES.SUCCESS.DEFECT_STATUS_UPDATED;
        res.redirect(`/defectstatus/dashboard`);

});

const deleteDefectStatus = asyncHandler(async (req, res) => {
    const defectStatusId = req.params.id;
        await deleteDefectStatusdata(defectStatusId);
        logOperation('DEFECT_STATUS_DELETE', `Defect status deleted: ${defectStatusId}`, req.user.username, HTTP_STATUS.OK);
        req.session.successMessage = MESSAGES.SUCCESS.DEFECT_STATUS_DELETED;
        res.status(HTTP_STATUS.OK).json({ message: MESSAGES.SUCCESS.DEFECT_STATUS_DELETED });
});

// A vezérlő által exportált handler függvények
export default {
    getAllDefectStatus,
    getDefectStatusById,
    getNewDefectStatusForm,
    createDefectStatus,
    getupdateDefectStatusForm,
    updateDefectStatus,
    deleteDefectStatus
};



