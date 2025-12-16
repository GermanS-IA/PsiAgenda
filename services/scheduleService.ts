import { Appointment } from '../types';

// Simulating Google Sheets interaction using LocalStorage
const STORAGE_KEY = 'agenda_medica_data';
const BACKUP_DATE_KEY = 'agenda_medica_last_backup';
const INITIALIZED_KEY = 'agenda_medica_initialized';

export const getAppointments = (): Appointment[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveAppointment = (appointment: Appointment): Appointment[] => {
  const currentAppointments = getAppointments();
  const newAppointments = [...currentAppointments];

  if (appointment.RECURRENCIA) {
    const startDate = new Date(appointment.FECHA_INICIO + 'T00:00:00');
    const sixMonthsLater = new Date(startDate);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    const daysToAdd = appointment.FRECUENCIA === 'quincenal' ? 14 : 7;

    const parentId = crypto.randomUUID();
    const currentDate = new Date(startDate);

    while (currentDate <= sixMonthsLater) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      const newAppt: Appointment = {
        ...appointment,
        ID_TURNO: crypto.randomUUID(),
        PARENT_ID: parentId,
        FECHA_INICIO: `${year}-${month}-${day}`,
      };

      newAppointments.push(newAppt);
      currentDate.setDate(currentDate.getDate() + daysToAdd);
    }
  } else {
    newAppointments.push({
      ...appointment,
      ID_TURNO: crypto.randomUUID(),
      PARENT_ID: crypto.randomUUID(),
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newAppointments));
  return newAppointments;
};

export const updateAppointment = (updatedAppt: Appointment): Appointment[] => {
  const currentAppointments = getAppointments();
  const index = currentAppointments.findIndex(a => a.ID_TURNO === updatedAppt.ID_TURNO);
  if (index !== -1) {
    currentAppointments[index] = updatedAppt;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentAppointments));
  }
  return currentAppointments;
};

/**
 * Edita EN MASA una serie recurrente: aplica `patch` a todos los turnos
 * del mismo PARENT_ID que sean POSTERIORES al turno editado (fecha+hora).
 *
 * IMPORTANTÍSIMO:
 * - fromDate debe ser ISO "YYYY-MM-DD"
 * - fromTime debe ser "HH:mm"
 * - NO tocamos FECHA_INICIO ni IDs al editar serie
 */
export const updateRecurringSeries = (
  parentId: string,
  fromDate: string,
  fromTime: string,
  patch: Partial<Appointment>
): Appointment[] => {
  const currentAppointments = getAppointments();
  const cutoffKey = `${fromDate}T${fromTime}`;

  const updated = currentAppointments.map((a) => {
    if (!a.RECURRENCIA) return a;
    if (a.PARENT_ID !== parentId) return a;

    const apptKey = `${a.FECHA_INICIO}T${a.HORA_INICIO}`;
    const isAfterOrEqual = apptKey >= cutoffKey; // incluye el turno actual

    if (!isAfterOrEqual) return a;

    const safePatch: Partial<Appointment> = { ...patch };
    delete (safePatch as any).ID_TURNO;
    delete (safePatch as any).PARENT_ID;
    delete (safePatch as any).FECHA_INICIO;

    return { ...a, ...safePatch };
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteAppointment = (id: string): Appointment[] => {
  const currentAppointments = getAppointments();
  const newAppointments = currentAppointments.filter(a => a.ID_TURNO !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newAppointments));
  return newAppointments;
};

export const deleteRecurringSeries = (parentId: string): Appointment[] => {
  const currentAppointments = getAppointments();
  const newAppointments = currentAppointments.filter(a => a.PARENT_ID !== parentId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newAppointments));
  return newAppointments;
};

export const exportToJSON = (): string => {
  const data = getAppointments();
  localStorage.setItem(BACKUP_DATE_KEY, new Date().toISOString());
  return JSON.stringify(data, null, 2);
};

export const importFromJSON = (jsonData: string): Appointment[] => {
  try {
    const data: Appointment[] = JSON.parse(jsonData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(BACKUP_DATE_KEY, new Date().toISOString());
    return data;
  } catch (error) {
    console.error('Error importing JSON:', error);
    throw new Error('Invalid JSON format.');
  }
};

export const isBackupNeeded = (): boolean => {
  const lastBackup = localStorage.getItem(BACKUP_DATE_KEY);
  if (!lastBackup) return true;

  const lastBackupDate = new Date(lastBackup);
  const diffDays = (Date.now() - lastBackupDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays > 7;
};

export const markBackupDone = (): void => {
  localStorage.setItem(BACKUP_DATE_KEY, new Date().toISOString());
};

export const isInitialized = (): boolean => {
  return localStorage.getItem(INITIALIZED_KEY) === 'true';
};

export const markInitialized = (): void => {
  localStorage.setItem(INITIALIZED_KEY, 'true');
};
