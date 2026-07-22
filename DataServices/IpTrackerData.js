// Felhasználó modell importálása
// Token feketelista modell importálása
// Jelszó hash-eléshez szükséges könyvtár
// Naplózó és autentikációs naplózó függvények importálása
import { logDb, logAuth } from '../logger.js';
import { FAILED_LOGINS_PER_IP, BAN_TIME } from '../config/env.js';
import IpTracker from '../models/IpTracker.js';


/**
 * IP-cím ellenőrzése és új rekord létrehozása, ha nem létezik.
 * @param {string} ipAddress - Az IP-cím, amit ellenőrizni kell.
 * @returns {Promise<Object>} - Az IP-cím rekordja.
 */
export async function checkIPandCreateNew(ipAddress) {
    const existingIp = await IpTracker.findOne({ ip: ipAddress });
    if (!existingIp) {
        const newIp = new IpTracker({ ip: ipAddress });
        newIp.lastAttempt = new Date();
        newIp.attempts = 1;
        newIp.bannedUntil = null;
        logDb('CREATE', 'IpTracker', `${ipAddress}`);
        
        await newIp.save();
        return newIp;
    }
    existingIp.lastAttempt = new Date();
    existingIp.attempts += 1;
    logAuth('UPDATE', 'IpTracker +1', `${ipAddress}`);
    if (existingIp.attempts >= FAILED_LOGINS_PER_IP) {
        existingIp.bannedUntil = new Date(Date.now() + BAN_TIME * 60 * 1000);
        logDb('UPDATE', 'IpTracker', `${ipAddress}`);
    }
    await existingIp.save();
    return existingIp;
}
/**
 * IP-cím kitiltásának ellenőrzése.
 * @param {string} ipAddress - Az IP-cím, amit ellenőrizni kell.
 * @returns {Promise<boolean>} - Igaz, ha az IP-cím kitiltott, különben hamis.
 */
export async function checkIPandCreateNewHard(ipAddress, attempts) {
    const existingIp = await IpTracker.findOne({ ip: ipAddress });
    if (!existingIp) {
        const newIp = new IpTracker({ ip: ipAddress });
        newIp.lastAttempt = new Date();
        newIp.attempts = attempts;
        newIp.bannedUntil = null;
        logDb('CREATE', 'IpTracker', `${ipAddress}`);
        
        await newIp.save();
        return newIp;
    }
    existingIp.lastAttempt = new Date();
    existingIp.attempts += attempts;
    logAuth('UPDATE', 'IpTracker +1', `${ipAddress}`);
    if (existingIp.attempts >= FAILED_LOGINS_PER_IP) {
        existingIp.bannedUntil = new Date(Date.now() + BAN_TIME * 60 * 1000);
        logDb('UPDATE', 'IpTracker', `${ipAddress}`);
    }
    await existingIp.save();
    return existingIp;
}

/**
 * IP-cím kitiltásának ellenőrzése.
 * @param {string} ipAddress - Az IP-cím, amit ellenőrizni kell.
 * @returns {Promise<boolean>} - Igaz, ha az IP-cím kitiltott, különben hamis.
 */
export async function checkIPbanStatus(ipAddress) {
    const ipRecord = await IpTracker.findOne({ ip: ipAddress });
    if (!ipRecord) {
        return false;
    }
    if (ipRecord.bannedUntil && new Date() < ipRecord.bannedUntil) {
        return true;
    }
    return false;
}
/**
 * IP-cím rekordjának lekérése.
 * @param {string} ipAddress - Az IP-cím, amit lekérdezni kell.
 * @returns {Promise<Object|null>} - Az IP-cím rekordja vagy null, ha nem található.
 */

export async function listIPRecords() {
    const ipRecords = await IpTracker.find({});
    return ipRecords;
}
/**
 * IP törlése az adatbázisból az azonosító alapján.
 * @param {string} id - Az IP rekord azonosítója.
 * @returns {Promise<boolean>} - Igaz, ha a rekord sikeresen törölve lett, különben hamis.
 */
export async function deleteIPRecord(id) {
    const ipRecord = await IpTracker.findById(id);
    if (ipRecord) {
        await IpTracker.deleteOne({ _id: id });
        logDb('DELETE', 'IpTracker', `${ipRecord.ip}`);
        logAuth('DELETE', 'IpTracker', `${ipRecord.ip}`);
    
        return true;
    }

    return false;
}
/**
 * IP törlése az adatbázisból az IP-cím alapján.
 * @param {string} ipAddress - Az IP-cím, amit törölni kell.
 * @returns {Promise<boolean>} - Igaz, ha a rekord sikeresen törölve lett, különben hamis.
 */
export async function deleteIPRecordbyIP(ipAddress) {
    const ipRecord = await IpTracker.findOne({ ip: ipAddress });
    if (ipRecord) {
        await IpTracker.deleteOne({ ip: ipAddress });
            logDb('DELETE', 'IpTracker', `${ipRecord.ip}`);
         logAuth('DELETE', 'IpTracker', `${ipRecord.ip}`);
            return true;


    }
    
    return false;
}