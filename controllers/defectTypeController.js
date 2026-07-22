// Logger és naplózó függvények importálása
import { logger, logOperation, logAuth, logError, logValidation, logWarn } from '../logger.js';

// Aszinkron hibakezelő middleware importálása
import { asyncHandler } from '../middleware/asyncHandler.js';

// HTTP státuszkódok és üzenetek konstansainak importálása
import { HTTP_STATUS, MESSAGES } from '../config/index.js';

import { FAILED_LOGINS_PER_USER, FAILED_LOGINS_PER_IP, BAN_TIME, BACKUP_CONTAINER, TIMEOUT,modifyEnvVariables} from '../config/env.js';


import {getAllDefectTypesdata,getDefectTypeById,updateDefectTypedata,createDefectTypedata,deleteDefectTypedata}from '../DataServices/defectTypeData.js';


const getAllDefectTypes = asyncHandler(async (req, res) => {
    const defecttypes = await getAllDefectTypesdata(true);
    res.render('defectTypes/defectTypesDashboard', {
        defecttypes,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
    req.session.failMessage = null;
    req.session.successMessage = null;
});


const getNewDefectTypeForm = asyncHandler(async (req, res) => {

    res.render('defectTypes/newDefectType', {
        formData: req.session.formData,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
    req.session.failMessage = null;
    req.session.successMessage = null;
});

const createDefectType = asyncHandler(async (req, res) => {
    const newDefectTypeData = req.body;
        const newDefectType = await createDefectTypedata(newDefectTypeData);
        logOperation('DEFECT_TYPE_CREATE', `Defect type created: ${newDefectType._id}`, req.user.username, HTTP_STATUS.CREATED);
        req.session.successMessage = MESSAGES.SUCCESS.DEFECT_TYPE_CREATED;
        res.redirect('/defecttypes/dashboard');
});

const getupdateDefectTypeForm = asyncHandler(async (req, res) => {
    const defectTypeId = req.params.id;
    const defectType = await getDefectTypeById(defectTypeId);

    if (!defectType || !defectType.isActive) {
        req.session.failMessage = MESSAGES.ERROR.DEFECT_TYPE_NOT_FOUND;
        return res.redirect('/defecttypes/dashboard');
    }
    res.render('defectTypes/updateDefectType', {
        formData: defectType,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
});
const updateDefectType = asyncHandler(async (req, res) => {
    const defectTypeId = req.params.id;
    const updatedDefectTypeData = req.body;
        const updatedDefectType = await updateDefectTypedata(defectTypeId, updatedDefectTypeData);
        logOperation('DEFECT_TYPE_UPDATE', `Defect type updated: ${updatedDefectType._id}`, req.user.username, HTTP_STATUS.OK);
        req.session.successMessage = MESSAGES.SUCCESS.DEFECT_TYPE_UPDATED;
        res.redirect(`/defecttypes/dashboard`);

});

const deleteDefectType = asyncHandler(async (req, res) => {
    const defectTypeId = req.params.id;
        await deleteDefectTypedata(defectTypeId);
        logOperation('DEFECT_TYPE_DELETE', `Defect type deleted: ${defectTypeId}`, req.user.username, HTTP_STATUS.OK);
        req.session.successMessage = MESSAGES.SUCCESS.DEFECT_TYPE_DELETED;
        res.status(HTTP_STATUS.OK).json({ message: MESSAGES.SUCCESS.DEFECT_TYPE_DELETED });
});

// A vezérlő által exportált handler függvények
export default {
    getAllDefectTypes,
    getNewDefectTypeForm,
    createDefectType,
    getupdateDefectTypeForm,
    updateDefectType,
    deleteDefectType
};



