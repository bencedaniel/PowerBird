import DeviceTypes from "../models/DeviceTypes.js";
import { logDb } from "../logger.js";


/**
 * Az összes eszköztípus lekérése az adatbázisból, név szerint rendezve.
 * @returns {Promise<Array>} - A eszköztípusok listája.
 */
export async function getAllDeviceTypesdata(isActive = true) {
    const deviceTypes = await DeviceTypes.find({ isActive }).sort({ name: 1 });
    return deviceTypes;
}
/**
 * Eszköztípus lekérése azonosító alapján
 * @param {string} id - A keresett eszköztípus azonosítója
 * @returns {Promise<Object>} - A megtalált eszköztípus
 * @throws {Error} - Ha az eszköztípus nem található
 */
export async function getDeviceTypeById(id) {
    const deviceType = await DeviceTypes.findById(id);
    if (!deviceType) {
        throw new Error("Device type not found");
    }
    return deviceType;
}

/**
 * Új eszköztípus létrehozása
 * @param {Object} data - Az új eszköztípus adatai
 * @returns {Promise<Object>} - A létrehozott eszköztípus
 */
export async function createDeviceTypedata(data) {
    const newDeviceType = new DeviceTypes(data);
    await newDeviceType.save();
    logDb('CREATE', 'DeviceTypes', `${newDeviceType._id}`);
    return newDeviceType;
}

/**
 * Eszköztípus frissítése azonosító alapján
 * @param {string} id - A frissítendő eszköztípus azonosítója
 * @param {Object} data - Új adatok
 * @returns {Promise<Object>} - A frissített eszköztípus
 * @throws {Error} - Ha az eszköztípus nem található
 */
export async function updateDeviceTypedata(id, data) {
    const deviceType = await DeviceTypes.findByIdAndUpdate(id, data, { runValidators: true });
    if (!deviceType) {
        throw new Error("Device type not found");
    }
    logDb('UPDATE', 'DeviceTypes', `${id}`);
    return deviceType;
}
/**
 * Eszköztípus törlése azonosító alapján
 * @param {string} id - A törlendő eszköztípus azonosítója
 * @returns {Promise<Object>} - A törölt eszköztípus
 * @throws {Error} - Ha az eszköztípus nem található
 */
export async function deleteDeviceTypedata(id) {
    const deviceType = await DeviceTypes.findByIdAndUpdate(id, { isActive: false }, { runValidators: true });
    if (!deviceType) {
        throw new Error("Device type not found");
    }
    logDb('SOFT-DELETE', 'DeviceTypes', `${id}`);
    return deviceType;
}
