import express from 'express';
import auth from '../controllers/auth.js';
import Validate from "../middleware/Validate.js";
import BasicCheckTypesController from '../controllers/basicCheckTypesController.js';

import { CheckLoggedIn, UserIDValidator, Verify, VerifyRole, StoreUserWithoutValidation, VerifyNoerror, VerifyWithoutTwoFA } from "../middleware/Verify.js";


const basicCheckTypeRouter = express.Router();


/**
 * GET /dashboard
 * Minden eszköztípus lekérése és megjelenítése a dashboardon.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
basicCheckTypeRouter.get('/dashboard', Verify,VerifyRole(), BasicCheckTypesController.getAllBasicCheckTypes);
/**
 * GET /new
 * Új eszköztípus létrehozására szolgáló űrlap lekérése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
basicCheckTypeRouter.get('/new', Verify,VerifyRole(), BasicCheckTypesController.getNewBasicCheckTypeForm);
/**
 * POST /new
 * Új eszköztípus létrehozása az űrlap adatai alapján.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
basicCheckTypeRouter.post('/new', Verify, VerifyRole(), BasicCheckTypesController.createBasicCheckType);
/**
 * GET /:id/edit
 * Egy adott eszköztípus szerkesztésére szolgáló űrlap lekérése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
basicCheckTypeRouter.get('/edit/:id', Verify, VerifyRole(), BasicCheckTypesController.getupdateBasicCheckTypeForm);
/**
 * POST /:id/edit
 * Egy adott eszköztípus frissítése az űrlap adatai alapján.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
basicCheckTypeRouter.post('/edit/:id', Verify, VerifyRole(), BasicCheckTypesController.updateBasicCheckType);
/**
 * POST /:id/delete
 * Egy adott eszköztípus törlése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
basicCheckTypeRouter.delete('/delete/:id', Verify, VerifyRole(), BasicCheckTypesController.deleteBasicCheckType);

export default basicCheckTypeRouter;