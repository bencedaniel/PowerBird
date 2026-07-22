import DefectType from "../models/DefectTypes.js";
import { logDb } from "../logger.js";


/**
 * Az összes Defekt típus lekérése az adatbázisból, név szerint rendezve.
 * @returns {Promise<Array>} - A Defekt típusok listája.
 */
export async function getAllDefectTypesdata(isActive = true) {
    const defectTypes = await DefectType.find({ isActive }).sort({ name: 1 });
    return defectTypes;
}
/**
 * Defekt típus lekérése azonosító alapján
 * @param {string} id - A keresett Defekt típus azonosítója
 * @returns {Promise<Object>} - A megtalált Defekt típus        
 * @throws {Error} - Ha az Deket állapot nem található
 */
export async function getDefectTypeById(id) {
    const defectType = await DefectType.findById(id);
    if (!defectType) {
        throw new Error("Defect type not found");
    }
    return defectType;
}

/**
 * Új Defekt típus létrehozása
 * @param {Object} data - Az új Defekt típus adatai
 * @returns {Promise<Object>} - A létrehozott Defekt típus
 */
export async function createDefectTypedata(data) {
    const newDefectType = new DefectType(data);
    await newDefectType.save();
    logDb('CREATE', 'DefectType', `${newDefectType._id}`);
    return newDefectType;
}

/**
 * Defekt típus frissítése azonosító alapján
 * @param {string} id - A frissítendő Defekt típus azonosítója
 * @param {Object} data - Új adatok
 * @returns {Promise<Object>} - A frissített Defekt típus
 * @throws {Error} - Ha az Defekt típus nem található
 */
export async function updateDefectTypedata(id, data) {
    const defectType = await DefectType.findByIdAndUpdate(id, data, { runValidators: true });
    if (!defectType) {
        throw new Error("Defect type not found");
    }
    logDb('UPDATE', 'DefectType', `${id}`);
    return defectType;
}
/**
 *   Defekt típus törlése azonosító alapján
 * @param {string} id - A törlendő Defekt típus azonosítója
 * @returns {Promise<Object>} - A törölt Defekt típus
 * @throws {Error} - Ha az Defekt típus nem található
 */
export async function deleteDefectTypedata(id) {
    const defectType = await DefectType.findByIdAndUpdate(id, { isActive: false }, { runValidators: true });
    if (!defectType) {
        throw new Error("Defect type not found");
    }
    logDb('SOFT-DELETE', 'DefectType', `${id}`);
    return defectType;
}
