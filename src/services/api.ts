import { Job, Event } from "@/types";

/**
 * Configuração da API
 * IMPORTANTE: Atualize esta URL com a URL base da sua API
 */
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8080/api"; // Pode sobrescrever com VITE_API_BASE_URL

/**
 * Serviço de API para Empregos (Jobs)
 */
export const jobsApi = {
  // GET /api/jobs - Buscar todos os empregos
  getAll: async (): Promise<Job[]> => {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    if (!response.ok) throw new Error("Erro ao buscar empregos");
    const data = await response.json();
    return (Array.isArray(data) ? data : []).map((j: any) => ({
      id: j.id,
      title: j.titulo ?? j.title ?? "",
      company: j.compania ?? j.empresa ?? j.company ?? "",
      description: j.descricao ?? j.description ?? "",
      requirements: j.requer ?? j.requirements ?? "",
      salary: j.salario ?? j.salary ?? "",
      contact: j.contato ?? j.contact ?? "",
    }));
  },

  // GET /api/jobs/{id} - Buscar emprego por ID
  getById: async (id: string): Promise<Job> => {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar emprego");
    const j = await response.json();
    return {
      id: j.id,
      title: j.titulo ?? j.title ?? "",
      company: j.compania ?? j.empresa ?? j.company ?? "",
      description: j.descricao ?? j.description ?? "",
      requirements: j.requer ?? j.requirements ?? "",
      salary: j.salario ?? j.salary ?? "",
      contact: j.contato ?? j.contact ?? "",
    };
  },

  // POST /api/jobs - Criar novo emprego
  create: async (job: Job): Promise<Job> => {
    const payload: any = (job as any)?.titulo !== undefined
      ? (job as any)
      : {
          titulo: (job as any).title,
          compania: (job as any).company,
          descricao: (job as any).description,
          requer: (job as any).requirements,
          salario: (job as any).salary,
          contato: (job as any).contact,
        };
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Erro ao criar emprego");
    const j = await response.json();
    return {
      id: j.id,
      title: j.titulo ?? j.title ?? "",
      company: j.compania ?? j.empresa ?? j.company ?? "",
      description: j.descricao ?? j.description ?? "",
      requirements: j.requer ?? j.requirements ?? "",
      salary: j.salario ?? j.salary ?? "",
      contact: j.contato ?? j.contact ?? "",
    };
  },

  // PUT /api/jobs/{id} - Atualizar emprego
  update: async (id: string, job: Job): Promise<Job> => {
    const payload: any = (job as any)?.titulo !== undefined
      ? (job as any)
      : {
          titulo: (job as any).title,
          compania: (job as any).company,
          descricao: (job as any).description,
          requer: (job as any).requirements,
          salario: (job as any).salary,
          contato: (job as any).contact,
        };
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Erro ao atualizar emprego");
    const j = await response.json();
    return {
      id: j.id,
      title: j.titulo ?? j.title ?? "",
      company: j.compania ?? j.empresa ?? j.company ?? "",
      description: j.descricao ?? j.description ?? "",
      requirements: j.requer ?? j.requirements ?? "",
      salary: j.salario ?? j.salary ?? "",
      contact: j.contato ?? j.contact ?? "",
    };
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
    const data = await response.json();
    return (Array.isArray(data) ? data : []).map((e: any) => ({
      id: e.id,
      title: e.titulo ?? e.title ?? "",
      description: e.descricao ?? e.description ?? "",
      date: e.data ?? e.date ?? "",
      location: e.localizacao ?? e.location ?? "",
      organizer: e.organizador ?? e.organizer ?? "",
    }));
  },

  // GET /api/events/{id} - Buscar evento por ID
  getById: async (id: string): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar evento");
    const e = await response.json();
    return {
      id: e.id,
      title: e.titulo ?? e.title ?? "",
      description: e.descricao ?? e.description ?? "",
      date: e.data ?? e.date ?? "",
      location: e.localizacao ?? e.location ?? "",
      organizer: e.organizador ?? e.organizer ?? "",
    };
  },

  // POST /api/events - Criar novo evento
  create: async (event: Event): Promise<Event> => {
    const payload: any = (event as any)?.titulo !== undefined
      ? (event as any)
      : {
          titulo: (event as any).title,
          descricao: (event as any).description,
          data: (event as any).date,
          localizacao: (event as any).location,
          organizador: (event as any).organizer,
        };
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Erro ao criar evento");
    const e = await response.json();
    return {
      id: e.id,
      title: e.titulo ?? e.title ?? "",
      description: e.descricao ?? e.description ?? "",
      date: e.data ?? e.date ?? "",
      location: e.localizacao ?? e.location ?? "",
      organizer: e.organizador ?? e.organizer ?? "",
    };
  },

  // PUT /api/events/{id} - Atualizar evento
  update: async (id: string, event: Event): Promise<Event> => {
    const payload: any = (event as any)?.titulo !== undefined
      ? (event as any)
      : {
          titulo: (event as any).title,
          descricao: (event as any).description,
          data: (event as any).date,
          localizacao: (event as any).location,
          organizador: (event as any).organizer,
        };
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Erro ao atualizar evento");
    const e = await response.json();
    return {
      id: e.id,
      title: e.titulo ?? e.title ?? "",
      description: e.descricao ?? e.description ?? "",
      date: e.data ?? e.date ?? "",
      location: e.localizacao ?? e.location ?? "",
      organizer: e.organizador ?? e.organizer ?? "",
    };
  },

  // DELETE /api/events/{id} - Deletar evento
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar evento");
  },
};
