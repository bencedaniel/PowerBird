import express from 'express';
import auth from '../controllers/auth.js';
import Validate from "../middleware/Validate.js";
import DeviceTypeController from '../controllers/deviceTypeController.js';

import { CheckLoggedIn, UserIDValidator, Verify, VerifyRole, StoreUserWithoutValidation, VerifyNoerror, VerifyWithoutTwoFA } from "../middleware/Verify.js";


const deviceTypeRouter = express.Router();


/**
 * GET /dashboard
 * Minden eszköztípus lekérése és megjelenítése a dashboardon.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
deviceTypeRouter.get('/dashboard', Verify,VerifyRole(), DeviceTypeController.getAllDeviceTypes);
/**
 * GET /new
 * Új eszköztípus létrehozására szolgáló űrlap lekérése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
deviceTypeRouter.get('/new', Verify,VerifyRole(), DeviceTypeController.getNewDeviceTypeForm);
/**
 * POST /new
 * Új eszköztípus létrehozása az űrlap adatai alapján.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
deviceTypeRouter.post('/new', Verify, VerifyRole(), DeviceTypeController.createDeviceType);
/**
 * GET /:id/edit
 * Egy adott eszköztípus szerkesztésére szolgáló űrlap lekérése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
deviceTypeRouter.get('/edit/:id', Verify, VerifyRole(), DeviceTypeController.getupdateDeviceTypeForm);
/**
 * POST /:id/edit
 * Egy adott eszköztípus frissítése az űrlap adatai alapján.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
deviceTypeRouter.post('/edit/:id', Verify, VerifyRole(), DeviceTypeController.updateDeviceType);
/**
 * POST /:id/delete
 * Egy adott eszköztípus törlése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
deviceTypeRouter.delete('/delete/:id', Verify, VerifyRole(), DeviceTypeController.deleteDeviceType);

export default deviceTypeRouter;