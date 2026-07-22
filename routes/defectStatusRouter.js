import express from 'express';
import auth from '../controllers/auth.js';
import Validate from "../middleware/Validate.js";
import DefectStatusController from '../controllers/defectStatusController.js';
import { CheckLoggedIn, UserIDValidator, Verify, VerifyRole, StoreUserWithoutValidation, VerifyNoerror, VerifyWithoutTwoFA } from "../middleware/Verify.js";


const defectStatusRouter = express.Router();


/**
 * GET /dashboard
 * Minden eszköztípus lekérése és megjelenítése a dashboardon.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
defectStatusRouter.get('/dashboard', Verify,VerifyRole(), DefectStatusController.getAllDefectStatus);
/**
 * GET /new
 * Új eszköztípus létrehozására szolgáló űrlap lekérése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
defectStatusRouter.get('/new', Verify,VerifyRole(), DefectStatusController.getNewDefectStatusForm);
/**
 * POST /new
 * Új eszköztípus létrehozása az űrlap adatai alapján.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
defectStatusRouter.post('/new', Verify, VerifyRole(), DefectStatusController.createDefectStatus);
/**
 * GET /:id/edit
 * Egy adott eszköztípus szerkesztésére szolgáló űrlap lekérése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
defectStatusRouter.get('/edit/:id', Verify, VerifyRole(), DefectStatusController.getupdateDefectStatusForm);
/**
 * POST /:id/edit
 * Egy adott eszköztípus frissítése az űrlap adatai alapján.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
defectStatusRouter.post('/edit/:id', Verify, VerifyRole(), DefectStatusController.updateDefectStatus);
/**
 * POST /:id/delete
 * Egy adott eszköztípus törlése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
defectStatusRouter.delete('/delete/:id', Verify, VerifyRole(), DefectStatusController.deleteDefectStatus);

export default defectStatusRouter;