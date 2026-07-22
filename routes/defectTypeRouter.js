import express from 'express';
import auth from '../controllers/auth.js';
import Validate from "../middleware/Validate.js";
import DefectTypeController from '../controllers/defectTypeController.js';
import { CheckLoggedIn, UserIDValidator, Verify, VerifyRole, StoreUserWithoutValidation, VerifyNoerror, VerifyWithoutTwoFA } from "../middleware/Verify.js";


const defectTypeRouter = express.Router();


/**
 * GET /dashboard
 * Minden defekt típus lekérése és megjelenítése a dashboardon.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
defectTypeRouter.get('/dashboard', Verify,VerifyRole(), DefectTypeController.getAllDefectTypes);
/**
 * GET /new
 * Új defekt típus létrehozására szolgáló űrlap lekérése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
defectTypeRouter.get('/new', Verify,VerifyRole(), DefectTypeController.getNewDefectTypeForm);
/**
 * POST /new
 * Új defekt típus létrehozása az űrlap adatai alapján.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
defectTypeRouter.post('/new', Verify, VerifyRole(), DefectTypeController.createDefectType);
/**
 * GET /:id/edit
 * Egy adott defekt típus szerkesztésére szolgáló űrlap lekérése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
defectTypeRouter.get('/edit/:id', Verify, VerifyRole(), DefectTypeController.getupdateDefectTypeForm);
/**
 * POST /:id/edit
 * Egy adott defekt típus frissítése az űrlap adatai alapján.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
defectTypeRouter.post('/edit/:id', Verify, VerifyRole(), DefectTypeController.updateDefectType);
/**
 * POST /:id/delete
 * Egy adott defekt típus törlése.
 * Csak azok a felhasználók férhetnek hozzá, akik rendelkeznek a megfelelő jogosultságokkal.
 * @access Csak hitelesített felhasználók, akik rendelkeznek a megfelelő jogosultságokkal
 * @middleware Verify, VerifyRole
 */
defectTypeRouter.delete('/delete/:id', Verify, VerifyRole(), DefectTypeController.deleteDefectType);

export default defectTypeRouter;