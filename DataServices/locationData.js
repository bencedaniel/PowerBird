import Locations from "../models/Locations.js";
import { logDb } from "../logger.js";


/**
 * Az összes hely lekérése az adatbázisból, név szerint rendezve.
 * @returns {Promise<Array>} - A helyek listája.
 */
export async function getAllLocationsdata(isActive = true) {
    const locations = await Locations.find({ isActive }).sort({ name: 1 });
    return locations;
}
/**
 * Hely lekérése azonosító alapján
 * @param {string} id - A keresett hely azonosítója
 * @returns {Promise<Object>} - A megtalált hely
 * @throws {Error} - Ha a hely nem található
 */
export async function getLocationById(id) {
    const location = await Locations.findById(id);
    if (!location) {
        throw new Error("Location not found");
    }
    return location;
}

/**
 * Új hely létrehozása
 * @param {Object} data - Az új hely adatai
 * @returns {Promise<Object>} - A létrehozott hely
 */
export async function createLocationdata(data) {
    const newLocation = new Locations(data);
    await newLocation.save();
    logDb('CREATE', 'Locations', `${newLocation._id}`);
    return newLocation;
}

/**
 * Hely frissítése azonosító alapján
 * @param {string} id - A frissítendő hely azonosítója
 * @param {Object} data - Új adatok
 * @returns {Promise<Object>} - A frissített hely
 * @throws {Error} - Ha a hely nem található
 */
export async function updateLocationdata(id, data) {
    const location = await Locations.findByIdAndUpdate(id, data, { runValidators: true });
    if (!location) {
        throw new Error("Location not found");
    }
    logDb('UPDATE', 'Locations', `${id}`);
    return location;
}
/**
 * Hely törlése azonosító alapján
 * @param {string} id - A törlendő hely azonosítója
 * @returns {Promise<Object>} - A törölt hely
 * @throws {Error} - Ha a hely nem található
 */
export async function deleteLocationdata(id) {
    const location = await Locations.findByIdAndUpdate(id, { isActive: false }, { runValidators: true });
    if (!location) {
        throw new Error("Location not found");
    }
    logDb('SOFT-DELETE', 'Locations', `${id}`);
    return location;
}
