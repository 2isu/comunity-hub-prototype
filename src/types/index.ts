/**
 * Tipos de dados do Portal Comunitário
 */

// Tipo para Empregos (Jobs)
export interface Job {
  id?: string;
  title: string;
  company: string;
  description: string;
  requirements: string;
  salary: string;
  contact: string;
}

// Tipo para Eventos (Events)
export interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
}
