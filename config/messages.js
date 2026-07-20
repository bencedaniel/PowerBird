
/**
 * Központi üzenetkonstansok az alkalmazáshoz.
 *
 * Ebben a modulban minden felhasználói és rendszerüzenet egy helyen található,
 * így biztosítva a konzisztens visszajelzéseket, hibákat és értesítéseket.
 *
 * Fő csoportok:
 * - AUTH: Hitelesítési és jogosultsági üzenetek (login, session, jogosultságok)
 * - SUCCESS: Sikeres műveletekhez tartozó visszajelző üzenetek
 * - ERROR: Hibákhoz, hiányzó adatokhoz, vagy érvénytelen műveletekhez tartozó üzenetek
 * - VALIDATION: Űrlap- és adatellenőrzési hibákhoz tartozó üzenetek
 * - HELP: Súgóüzenetek, ha nincs elérhető magyarázat vagy leírás
 */


export const MESSAGES = {
  // AUTH: Hitelesítés, jogosultság, session
  AUTH: {
    SESSION_EXPIRED: "Your session has expired or you are not authorized. Please log in to continue.",
    SESSION_LOGGED_OUT: "This session has been logged out.",
    INVALID_TOKEN: "Invalid or expired token.",
    USER_NOT_FOUND: "User not found",
    INVALID_CREDENTIALS: "Invalid username or password",
    USER_CREATED: "User created!",
    ACCOUNT_DEACTIVATED: "Your account has been deactivated. Please contact a system administrator.",
    USER_ROLE_NOT_FOUND: "User role not found.",
    ROLE_NOT_FOUND: "Role not found.",
    PERMISSION_DENIED: "You do not have permission to access this resource.",
    USER_ID_REQUIRED: "User ID is required.",
    USER_ALREADY_LOGGED_IN: "User already logged in",
    USER_BANNED: "Your account has been temporarily banned due to multiple failed login attempts. Please try again later or contact with administrator."
  },

  // SUCCESS: Sikeres műveletek visszajelzései
  SUCCESS: {
    
    TWO_FA_RESET: "Two-factor authentication reset successfully.",
    TWO_FA_VERIFIED: "Two-factor authentication verified successfully.",
    USER_BAN_RESET: "User ban status reset successfully.",
    ENV_MODIFY_RESPONSE: "Environment variables modified successfully.",

    // User Management
    USER_CREATED: "User created.",
    USER_MODIFIED: "User modified!",
    USER_INACTIVATED: "User inactivated.",
    PROFILE_UPDATED: "Profile updated!",
    
    // Admin - Cards
    CARD_ADDED: "Card added!",
    CARD_MODIFIED: "Card modified!",
    CARD_DELETED: "Card deleted.",
    
    // Admin - Permissions
    PERMISSION_CREATED: "Permission created.",
    PERMISSION_UPDATED: "Permission updated.",
    PERMISSION_DELETED: "Permission deleted.",
    
    // Admin - Roles
    ROLE_CREATED: "Role created.",
    ROLE_UPDATED: "Role updated.",
    ROLE_DELETED: "Role deleted.",
    
    // Alerts
    ALERT_CREATED: "Alert created!",
    ALERT_UPDATED: "Alert updated!",
    ALERT_DELETED: "Alert deleted",
    ALERTS_CREATED: "Alerts created!",
    
    // Help Messages
    HELP_MESSAGE_CREATED: "Help message created!",
    HELP_MESSAGE_UPDATED: "Help message updated!",
    HELP_MESSAGE_DELETED: "Help message deleted",
    // Categories
    CATEGORY_CREATED: "Category created!",
    CATEGORY_UPDATED: "Category updated!",
    CATEGORY_DELETED: "Category deleted",
    

 

    // Cards, Permissions, Roles, Users (DELETE responses)
    CARD_DELETE_RESPONSE: "Card deleted.",
    PERMISSION_DELETE_RESPONSE: "Permission deleted.",
    ROLE_DELETE_RESPONSE: "Role deleted.",
    USER_DELETE_RESPONSE: "User deleted.",
    
    // Alert & Entry
    ALERT_DELETED: "Alert deleted",
    INCIDENT_DELETED: "Incident deleted",
    


  },

  // ERROR: Hibák, hiányzó adatok, érvénytelen műveletek
  ERROR: {
    MANDATORY_TWO_FACTOR: "Two-factor authentication is mandatory for your profile!",
    TOKEN_NOT_FOUND: "Token not found.",
    TWO_FA_NOT_ENABLED: "Two-factor authentication is not enabled for this user.",
    TWO_FA_TOKEN_NOT_FOUND: "Two-factor authentication session token not found.",
    TWO_FA_NOT_SET_UP: "Two-factor authentication is not set up for this user.",
    // Permissions & Not Found
    TWO_FA_BAD_REQUEST: "Invalid 2FA code. Please try again.",
    TOO_MANY_REQUESTS: "Too many requests from this IP, please try again later.",
    PERMISSION_NOT_FOUND: "Permission not found.",
    ROLE_NOT_FOUND: "Role not found.",

    TEMPLATE_NOT_FOUND: "Template not found",
    PAGE_NOT_FOUND: "Page not found",

    

    // Validation
    PERCENTAGE_SUM_ERROR: "The sum of the percentages must be 100.",
    INVALID_CREATION_METHOD: "Invalid creation method selected.",
    COPY_METHOD_NOT_IMPLEMENTED: "Copy method not implemented yet.",
    ENVERR: {
      ENV_MODIFY_ERROR: "Failed to modify environment variables. Please check the input values and try again.",
      BACKUP_CONTAINER_ERROR: "Backup container must be true or false!",
      VALIDATION_ERROR: "All input values must be valid numbers."
    }
  },

  // VALIDATION: Űrlap- és adatellenőrzési hibák
  VALIDATION: {
    REQUIRED_FIELD: "This field is required",
    INVALID_FORMAT: "Invalid format",
    PERCENTAGE_SUM_ERROR: "The sum of the percentages must be 100."
  },
   HELP:{
    // Súgóüzenetek
    NO_HELP_AVAILABLE: "No help message available for this page."
  }

  
};
