// Logger és naplózó függvények importálása
import { logger, logOperation, logAuth, logError, logValidation, logWarn } from '../logger.js';

// Aszinkron hibakezelő middleware importálása
import { asyncHandler } from '../middleware/asyncHandler.js';

// HTTP státuszkódok és üzenetek konstansainak importálása
import { HTTP_STATUS, MESSAGES } from '../config/index.js';

import { FAILED_LOGINS_PER_USER, FAILED_LOGINS_PER_IP, BAN_TIME, BACKUP_CONTAINER, TIMEOUT,modifyEnvVariables} from '../config/env.js';


import {getAllBasicCheckTypesdata, createBasicCheckTypedata, getBasicCheckTypeById, updateBasicCheckTypedata, deleteBasicCheckTypedata} from '../DataServices/basicCheckTypesData.js';


const getAllBasicCheckTypes = asyncHandler(async (req, res) => {
    const basicCheckTypes = await getAllBasicCheckTypesdata(true);
    res.render('basicCheckTypes/basicCheckTypeDashboard', {
        basicCheckTypes,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
    req.session.failMessage = null;
    req.session.successMessage = null;
});


const getNewBasicCheckTypeForm = asyncHandler(async (req, res) => {

    res.render('basicCheckTypes/newBasicCheckType', {
        formData: req.session.formData,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
    req.session.failMessage = null;
    req.session.successMessage = null;
});

const createBasicCheckType = asyncHandler(async (req, res) => {
    const newBasicCheckTypeData = req.body;
        const newBasicCheckType = await createBasicCheckTypedata(newBasicCheckTypeData);
        logOperation('BASIC_CHECK_TYPE_CREATE', `Basic check type created: ${newBasicCheckType._id}`, req.user.username, HTTP_STATUS.CREATED);
        req.session.successMessage = MESSAGES.SUCCESS.BASIC_CHECK_TYPE_CREATED;
        res.redirect('/basicchecktypes/dashboard');
});

const getupdateBasicCheckTypeForm = asyncHandler(async (req, res) => {
    const basicCheckTypeId = req.params.id;
    const basicCheckType = await getBasicCheckTypeById(basicCheckTypeId);

    if (!basicCheckType || !basicCheckType.isActive) {
        req.session.failMessage = MESSAGES.ERROR.BASIC_CHECK_TYPE_NOT_FOUND;
        return res.redirect('/basicchecktypes/dashboard');
    }
    res.render('basicCheckTypes/updateBasicCheckType', {
        formData: basicCheckType,
        failMessage: req.session.failMessage,
        successMessage: req.session.successMessage,
        rolePermissons: req.user?.role?.permissions,
        user: req.user
    });
});
const updateBasicCheckType = asyncHandler(async (req, res) => {
    const basicCheckTypeId = req.params.id;
    const updatedBasicCheckTypeData = req.body;
        const updatedBasicCheckType = await updateBasicCheckTypedata(basicCheckTypeId, updatedBasicCheckTypeData);
        logOperation('BASIC_CHECK_TYPE_UPDATE', `Basic check type updated: ${updatedBasicCheckType._id}`, req.user.username, HTTP_STATUS.OK);
        req.session.successMessage = MESSAGES.SUCCESS.BASIC_CHECK_TYPE_UPDATED;
        res.redirect(`/basicchecktypes/dashboard`);

});

const deleteBasicCheckType = asyncHandler(async (req, res) => {
    const basicCheckTypeId = req.params.id;
        await deleteBasicCheckTypedata(basicCheckTypeId);
        logOperation('BASIC_CHECK_TYPE_DELETE', `Basic check type deleted: ${basicCheckTypeId}`, req.user.username, HTTP_STATUS.OK);
        req.session.successMessage = MESSAGES.SUCCESS.BASIC_CHECK_TYPE_DELETED;
        res.status(HTTP_STATUS.OK).json({ message: MESSAGES.SUCCESS.BASIC_CHECK_TYPE_DELETED });
});

// A vezérlő által exportált handler függvények
export default {
    getAllBasicCheckTypes,
    getBasicCheckTypeById,
    getNewBasicCheckTypeForm,
    createBasicCheckType,
    getupdateBasicCheckTypeForm,
    updateBasicCheckType,
    deleteBasicCheckType
};



