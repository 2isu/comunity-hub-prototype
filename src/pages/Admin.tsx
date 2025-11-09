import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { jobsApi, eventsApi } from "@/services/api";
import { Job, Event } from "@/types";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Admin - Página de administração
 * Permite criar, editar e deletar eventos e empregos
 */
const Admin = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const { toast } = useToast();

  // Carregar dados
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [jobsData, eventsData] = await Promise.all([
        jobsApi.getAll(),
        eventsApi.getAll()
      ]);
      setJobs(jobsData);
      setEvents(eventsData);
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Funções para Empregos
  const handleSaveJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jobData = {
      titulo: formData.get("title") as string,
      compania: formData.get("company") as string,
      descricao: formData.get("description") as string,
      requer: formData.get("requirements") as string,
      salario: formData.get("salary") as string,
      contato: formData.get("contact") as string,
    };

    try {
      if (editingJob?.id) {
        await jobsApi.update(editingJob.id, jobData as any);
        toast({ title: "Emprego atualizado com sucesso!" });
      } else {
        await jobsApi.create(jobData as any);
        toast({ title: "Emprego criado com sucesso!" });
      }
      setIsJobDialogOpen(false);
      setEditingJob(null);
      loadData();
    } catch (error) {
      toast({
        title: "Erro ao salvar emprego",
        variant: "destructive",
      });
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este emprego?")) return;
    
    try {
      await jobsApi.delete(id);
      toast({ title: "Emprego deletado com sucesso!" });
      loadData();
    } catch (error) {
      toast({
        title: "Erro ao deletar emprego",
        variant: "destructive",
      });
    }
  };

  // Funções para Eventos
  const handleSaveEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const eventData = {
      titulo: formData.get("title") as string,
      descricao: formData.get("description") as string,
      data: formData.get("date") as string,
      localizacao: formData.get("location") as string,
      organizador: formData.get("organizer") as string,
    };

    try {
      if (editingEvent?.id) {
        await eventsApi.update(editingEvent.id, eventData as any);
        toast({ title: "Evento atualizado com sucesso!" });
      } else {
        await eventsApi.create(eventData as any);
        toast({ title: "Evento criado com sucesso!" });
      }
      setIsEventDialogOpen(false);
      setEditingEvent(null);
      loadData();
    } catch (error) {
      toast({
        title: "Erro ao salvar evento",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este evento?")) return;
    
    try {
      await eventsApi.delete(id);
      toast({ title: "Evento deletado com sucesso!" });
      loadData();
    } catch (error) {
      toast({
        title: "Erro ao deletar evento",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Painel de Administração</h1>
          <p className="text-muted-foreground">Gerencie eventos e empregos do Portal Comunitário</p>
        </div>

        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="jobs">Empregos</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
          </TabsList>

          {/* Tab de Empregos */}
          <TabsContent value="jobs" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Gerenciar Empregos</h2>
              <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingJob(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Emprego
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingJob ? "Editar Emprego" : "Novo Emprego"}
                    </DialogTitle>
                    <DialogDescription>Preencha os dados do emprego</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSaveJob} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Título</Label>
                      <Input id="title" name="title" defaultValue={editingJob?.title} required />
                    </div>
                    <div>
                      <Label htmlFor="company">Empresa</Label>
                      <Input id="company" name="company" defaultValue={editingJob?.company} required />
                    </div>
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea id="description" name="description" defaultValue={editingJob?.description} required rows={4} />
                    </div>
                    <div>
                      <Label htmlFor="requirements">Requisitos</Label>
                      <Textarea id="requirements" name="requirements" defaultValue={editingJob?.requirements} required rows={3} />
                    </div>
                    <div>
                      <Label htmlFor="salary">Salário</Label>
                      <Input id="salary" name="salary" defaultValue={editingJob?.salary} required />
                    </div>
                    <div>
                      <Label htmlFor="contact">Contato</Label>
                      <Input id="contact" name="contact" defaultValue={editingJob?.contact} required />
                    </div>
                    <Button type="submit" className="w-full">Salvar</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <p className="text-center py-12">Carregando...</p>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="border-2 border-primary/30 rounded-lg p-4 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <p className="text-sm text-primary">{job.company}</p>
                      <p className="text-sm text-muted-foreground mt-2">{job.description}</p>
                      <div className="mt-2 text-sm">
                        <p><span className="font-semibold">Requisitos:</span> {job.requirements}</p>
                        <p><span className="font-semibold">Salário:</span> {job.salary}</p>
                        <p><span className="font-semibold">Contato:</span> {job.contact}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingJob(job);
                          setIsJobDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => job.id && handleDeleteJob(job.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tab de Eventos */}
          <TabsContent value="events" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Gerenciar Eventos</h2>
              <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingEvent(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Evento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingEvent ? "Editar Evento" : "Novo Evento"}
                    </DialogTitle>
                    <DialogDescription>Preencha os dados do evento</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSaveEvent} className="space-y-4">
                    <div>
                      <Label htmlFor="event-title">Título</Label>
                      <Input id="event-title" name="title" defaultValue={editingEvent?.title} required />
                    </div>
                    <div>
                      <Label htmlFor="event-description">Descrição</Label>
                      <Textarea id="event-description" name="description" defaultValue={editingEvent?.description} required rows={4} />
                    </div>
                    <div>
                      <Label htmlFor="date">Data</Label>
                      <Input id="date" name="date" type="text" placeholder="DD/MM/AAAA" defaultValue={editingEvent?.date} required />
                    </div>
                    <div>
                      <Label htmlFor="location">Localização</Label>
                      <Input id="location" name="location" defaultValue={editingEvent?.location} required />
                    </div>
                    <div>
                      <Label htmlFor="organizer">Organizador</Label>
                      <Input id="organizer" name="organizer" defaultValue={editingEvent?.organizer} required />
                    </div>
                    <Button type="submit" className="w-full">Salvar</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <p className="text-center py-12">Carregando...</p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border-2 border-primary/30 rounded-lg p-4 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                      <div className="mt-2 text-sm">
                        <p><span className="font-semibold">Data:</span> {event.date}</p>
                        <p><span className="font-semibold">Localização:</span> {event.location}</p>
                        <p><span className="font-semibold">Organizador:</span> {event.organizer}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingEvent(event);
                          setIsEventDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => event.id && handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
