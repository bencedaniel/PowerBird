import BasicCheckTypes from "../models/BasicCheckTypes.js";
import { logDb } from "../logger.js";


/**
 * Az összes Ellenőrzési típus lekérése az adatbázisból, név szerint rendezve.
 * @returns {Promise<Array>} - A Ellenőrzési típusok listája.
 */
export async function getAllBasicCheckTypesdata(isActive = true) {
    const basicCheckTypes = await BasicCheckTypes.find({ isActive }).sort({ name: 1 });
    return basicCheckTypes;
}
/**
 * Ellenőrzési típus lekérése azonosító alapján
 * @param {string} id - A keresett Ellenőrzési típus azonosítója
 * @returns {Promise<Object>} - A megtalált Ellenőrzési típus
 * @throws {Error} - Ha az Ellenőrzési típus nem található
 */
export async function getBasicCheckTypeById(id) {
    const basicCheckType = await BasicCheckTypes.findById(id);
    if (!basicCheckType) {
        throw new Error("Basic check type not found");
    }
    return basicCheckType;
}

/**
 * Új Ellenőrzési típus létrehozása
 * @param {Object} data - Az új Ellenőrzési típus adatai
 * @returns {Promise<Object>} - A létrehozott Ellenőrzési típus
 */
export async function createBasicCheckTypedata(data) {
    const newBasicCheckType = new BasicCheckTypes(data);
    await newBasicCheckType.save();
    logDb('CREATE', 'BasicCheckTypes', `${newBasicCheckType._id}`);
    return newBasicCheckType;
}

/**
 * Ellenőrzési típus frissítése azonosító alapján
 * @param {string} id - A frissítendő Ellenőrzési típus azonosítója
 * @param {Object} data - Új adatok
 * @returns {Promise<Object>} - A frissített Ellenőrzési típus
 * @throws {Error} - Ha az Ellenőrzési típus nem található
 */
export async function updateBasicCheckTypedata(id, data) {
    const basicCheckType = await BasicCheckTypes.findByIdAndUpdate(id, data, { runValidators: true });
    if (!basicCheckType) {
        throw new Error("Basic check type not found");
    }
    logDb('UPDATE', 'BasicCheckTypes', `${id}`);
    return basicCheckType;
}
/**
 *  Ellenőrzési típus törlése azonosító alapján
 * @param {string} id - A törlendő Ellenőrzési típus azonosítója
 * @returns {Promise<Object>} - A törölt Ellenőrzési típus
 * @throws {Error} - Ha az Ellenőrzési típus nem található
 */
export async function deleteBasicCheckTypedata(id) {
    const basicCheckType = await BasicCheckTypes.findByIdAndUpdate(id, { isActive: false }, { runValidators: true });
    if (!basicCheckType) {
        throw new Error("Basic check type not found");
    }
    logDb('SOFT-DELETE', 'BasicCheckTypes', `${id}`);
    return basicCheckType;
}
