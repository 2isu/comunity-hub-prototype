import { Job, Event } from "@/types";

/**
 * Configuração da API
 * IMPORTANTE: Atualize esta URL com a URL base da sua API
 */
const API_BASE_URL = "http://localhost:3000/api"; // Altere para a URL da sua API

/**
 * Serviço de API para Empregos (Jobs)
 */
export const jobsApi = {
  // GET /api/jobs - Buscar todos os empregos
  getAll: async (): Promise<Job[]> => {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    if (!response.ok) throw new Error("Erro ao buscar empregos");
    return response.json();
  },

  // GET /api/jobs/{id} - Buscar emprego por ID
  getById: async (id: string): Promise<Job> => {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar emprego");
    return response.json();
  },

  // POST /api/jobs - Criar novo emprego
  create: async (job: Job): Promise<Job> => {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (!response.ok) throw new Error("Erro ao criar emprego");
    return response.json();
  },

  // PUT /api/jobs/{id} - Atualizar emprego
  update: async (id: string, job: Job): Promise<Job> => {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (!response.ok) throw new Error("Erro ao atualizar emprego");
    return response.json();
  },

  // DELETE /api/jobs/{id} - Deletar emprego
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar emprego");
  },
};

/**
 * Serviço de API para Eventos (Events)
 */
export const eventsApi = {
  // GET /api/events - Buscar todos os eventos
  getAll: async (): Promise<Event[]> => {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) throw new Error("Erro ao buscar eventos");
    return response.json();
  },

  // GET /api/events/{id} - Buscar evento por ID
  getById: async (id: string): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar evento");
    return response.json();
  },

  // POST /api/events - Criar novo evento
  create: async (event: Event): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!response.ok) throw new Error("Erro ao criar evento");
    return response.json();
  },

  // PUT /api/events/{id} - Atualizar evento
  update: async (id: string, event: Event): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!response.ok) throw new Error("Erro ao atualizar evento");
    return response.json();
  },

  // DELETE /api/events/{id} - Deletar evento
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar evento");
  },
};
