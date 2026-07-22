import DefectStatus from "../models/DefectStatus.js";
import { logDb } from "../logger.js";


/**
 * Az összes Deket állapot lekérése az adatbázisból, név szerint rendezve.
 * @returns {Promise<Array>} - A Deket állapotok listája.
 */
export async function getAllDefectStatusdata(isActive = true) {
    const defectStatus = await DefectStatus.find({ isActive }).sort({ name: 1 });
    return defectStatus;
}
/**
 * Deket állapot lekérése azonosító alapján
 * @param {string} id - A keresett Deket állapot azonosítója
 * @returns {Promise<Object>} - A megtalált Deket állapot
 * @throws {Error} - Ha az Deket állapot nem található
 */
export async function getDefectStatusById(id) {
    const defectStatus = await DefectStatus.findById(id);
    if (!defectStatus) {
        throw new Error("Defect status not found");
    }
    return defectStatus;
}

/**
 * Új Deket állapot létrehozása
 * @param {Object} data - Az új Deket állapot adatai
 * @returns {Promise<Object>} - A létrehozott Deket állapot
 */
export async function createDefectStatusdata(data) {
    const newDefectStatus = new DefectStatus(data);
    await newDefectStatus.save();
    logDb('CREATE', 'DefectStatus', `${newDefectStatus._id}`);
    return newDefectStatus;
}

/**
 * Deket állapot frissítése azonosító alapján
 * @param {string} id - A frissítendő Deket állapot azonosítója
 * @param {Object} data - Új adatok
 * @returns {Promise<Object>} - A frissített Deket állapot
 * @throws {Error} - Ha az Deket állapot nem található
 */
export async function updateDefectStatusdata(id, data) {
    const defectStatus = await DefectStatus.findByIdAndUpdate(id, data, { runValidators: true });
    if (!defectStatus) {
        throw new Error("Defect status not found");
    }
    logDb('UPDATE', 'DefectStatus', `${id}`);
    return defectStatus;
}
/**
 *   Defekt állapot törlése azonosító alapján
 * @param {string} id - A törlendő Deket állapot azonosítója
 * @returns {Promise<Object>} - A törölt Deket állapot
 * @throws {Error} - Ha az Deket állapot nem található
 */
export async function deleteDefectStatusdata(id) {
    const defectStatus = await DefectStatus.findByIdAndUpdate(id, { isActive: false }, { runValidators: true });
    if (!defectStatus) {
        throw new Error("Defect status not found");
    }
    logDb('SOFT-DELETE', 'DefectStatus', `${id}`);
    return defectStatus;
}
