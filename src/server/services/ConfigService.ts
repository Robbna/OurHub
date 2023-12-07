import firebaseService from "./FirebaseService";

export const getMaintenanceMode = async () => {
  return await firebaseService.getMaintenanceMode();
};
