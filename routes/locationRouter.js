import express from 'express';
import auth from '../controllers/auth.js';
import Validate from "../middleware/Validate.js";
import LocationController from '../controllers/locationController.js';

import { CheckLoggedIn, UserIDValidator, Verify, VerifyRole, StoreUserWithoutValidation, VerifyNoerror, VerifyWithoutTwoFA } from "../middleware/Verify.js";


const locationRouter = express.Router();


/**
 * GET /dashboard
 * Minden helyszín lekérése és megjelenítése a dashboardon.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
locationRouter.get('/dashboard', Verify,VerifyRole(), LocationController.getAllLocations);
/**
 * GET /new
 * Új helyszín létrehozására szolgáló űrlap lekérése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
locationRouter.get('/new', Verify,VerifyRole(), LocationController.getNewLocationForm);
/**
 * POST /new
 * Új helyszín létrehozása az űrlap adatai alapján.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
locationRouter.post('/new', Verify, VerifyRole(), LocationController.createLocation);
/**
 * GET /:id/edit
 * Egy adott helyszín szerkesztésére szolgáló űrlap lekérése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
locationRouter.get('/edit/:id', Verify, VerifyRole(), LocationController.getupdateLocationForm);
/**
 * POST /:id/edit
 * Egy adott helyszín frissítése az űrlap adatai alapján.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
locationRouter.post('/edit/:id', Verify, VerifyRole(), LocationController.updateLocation);
/**
 * POST /:id/delete
 * Egy adott helyszín törlése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
locationRouter.delete('/delete/:id', Verify, VerifyRole(), LocationController.deleteLocation);

export default locationRouter;