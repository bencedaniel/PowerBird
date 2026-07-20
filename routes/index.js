
import router from './routes.js';
import adminRouter from './adminRouter.js';
import alertRouter from './alertRouter.js';
import helpMessageRouter from './helpMessageRouter.js';
import twoFaRouter from './twoFaRouter.js';

/**
 * Alkalmazás route-regisztráló függvény.
 *
 * Feladata az összes modul-router megfelelő URL prefix alá történő felcsatolása.
 * A csoportosítás célja az átláthatóság: fő útvonalak, admin, entitás alapú,
 * operatív, valamint pontozási/eredmény útvonalak külön blokkban szerepelnek.
 *
 * @param {import('express').Application} app - Az Express alkalmazás példány.
 * @returns {void}
 */
const setupRoutes = (app) => {
  // ============================================
  // MAIN ROUTES
  // ============================================

  // Alap (root) route-ok: pl. kezdőoldal, auth oldalak, közös belépési pontok.
  app.use('/', router);

  // ============================================
  // ADMIN ROUTES
  // ============================================

  // Admin felülethez tartozó route-ok.
  app.use('/admin', adminRouter);

  // ============================================
  // ENTITY ROUTES
  // ============================================


  // ============================================
  // OPERATIONAL ROUTES
  // ============================================

  app.use('/alerts', alertRouter);
  app.use('/helpmessages', helpMessageRouter);

  // ============================================
  // SCORING & RESULTS ROUTES
  // ============================================


  app.use('/2fa', twoFaRouter);
};

export default setupRoutes;
