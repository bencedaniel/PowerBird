import express from 'express';
import auth from '../controllers/auth.js';
import Validate from "../middleware/Validate.js";

import twofaController from '../controllers/twofaController.js';
import { CheckLoggedIn, UserIDValidator, Verify, VerifyRole, StoreUserWithoutValidation, VerifyNoerror, VerifyWithoutTwoFA } from "../middleware/Verify.js";

/**
 * twoFaRouter.
 * Minden twoFaRouter végpontjai.
 *
 * Minden végpont csak hitelesített, megfelelő jogosultságú felhasználó számára érhető el.
 */
const twoFaRouter = express.Router();


/**
 * GET /generate
 * Kétfaktoros hitelesítés kód generálása a felhasználó számára.
 * Csak azok a felhasználók férhetnek hozzá, akik még nem végezték el a kétfaktoros hitelesítést.
 * @access Csak hitelesített felhasználók, akik még nem végezték el a kétfaktoros hitelesítést
 * @middleware VerifyWithoutTwoFA
 */
twoFaRouter.get('/generate', VerifyWithoutTwoFA, twofaController.generate2FACode);

/**
 * POST /check
 * Kétfaktoros hitelesítés kód ellenőrzése a felhasználó számára.
 * Csak azok a felhasználók férhetnek hozzá, akik még nem végezték el a kétfaktoros hitelesítést.
 * @access Csak hitelesített felhasználók, akik még nem végezték el a kétfaktoros hitelesítést
 * @middleware VerifyWithoutTwoFA
 */
twoFaRouter.post('/check', VerifyWithoutTwoFA, twofaController.check2FACode);

/**
 * DELETE /disable
 * Kétfaktoros hitelesítés letiltása a felhasználó számára.
 * Csak azok a felhasználók férhetnek hozzá, akik engedélyezték a kétfaktoros hitelesítést.
 * @access Csak hitelesített felhasználók, akik engedélyezték a kétfaktoros hitelesítést
 * @middleware Verify
 */
twoFaRouter.delete('/disable', Verify, twofaController.disable2FAForUser);

/**
 * GET /verify
 * Kétfaktoros hitelesítés kód ellenőrzése a felhasználó számára.
 * Csak azok a felhasználók férhetnek hozzá, akik engedélyezték a kétfaktoros hitelesítést.
 * @access Csak hitelesített felhasználók, akik engedélyezték a kétfaktoros hitelesítést
 * @middleware StoreUserWithoutValidation
 */
twoFaRouter.get('/verify',StoreUserWithoutValidation, twofaController.getverify2FACode);
/**
 * POST /verify
 * Kétfaktoros hitelesítés kód ellenőrzése a felhasználó számára.
 * Csak azok a felhasználók férhetnek hozzá, akik engedélyezték a kétfaktoros hitelesítést.
 * @access Csak hitelesített felhasználók, akik engedélyezték a kétfaktoros hitelesítést
 * @middleware StoreUserWithoutValidation
 */
twoFaRouter.post('/verify',StoreUserWithoutValidation, twofaController.verify2FACode);
/**
 * twoFaRouter exportálása.
 */
export default twoFaRouter;
