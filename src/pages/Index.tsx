import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { JobCard } from "@/components/JobCard";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { jobsApi, eventsApi } from "@/services/api";
import { Job, Event } from "@/types";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

/**
 * Index - Página principal para visualização pública
 * Exibe eventos e empregos em destaque
 */
const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Carregar dados ao montar o componente
  useEffect(() => {
    loadData();
  }, []);

  // Função para carregar eventos e empregos da API
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
        description: "Não foi possível carregar os dados. Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pegar apenas os primeiros 2 itens em destaque
  const featuredJobs = jobs.slice(0, 2);
  const featuredEvents = events.slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Seção de Eventos */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2">EVENTOS</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {events.length} eventos disponíveis
                </p>
                <p className="text-sm text-muted-foreground">
                  Participe de eventos de seu interesse
                </p>
              </div>
              <Link to="/events">
                <Button variant="portal" className="font-semibold">
                  VER TODOS
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Carregando eventos...</p>
            </div>
          ) : featuredEvents.length > 0 ? (
            <>
              <h3 className="text-xl font-bold text-primary mb-4">EVENTOS EM DESTAQUE</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event}
                    onViewMap={() => toast({
                      title: "Ver no mapa",
                      description: `Abrindo localização de ${event.title}...`,
                    })}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-primary/30 rounded-lg">
              <p className="text-muted-foreground">Nenhum evento disponível no momento</p>
            </div>
          )}
        </section>

        {/* Seção de Empregos */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2">EMPREGOS</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {jobs.length} oportunidades disponíveis
                </p>
                <p className="text-sm text-muted-foreground">
                  Impulsione sua carreira profissional, veja uma vaga perto de você!
                </p>
              </div>
              <Link to="/jobs">
                <Button variant="portal" className="font-semibold">
                  VER TODOS
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Carregando empregos...</p>
            </div>
          ) : featuredJobs.length > 0 ? (
            <>
              <h3 className="text-xl font-bold text-primary mb-4">EMPREGOS EM DESTAQUE</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job}
                    onApply={() => toast({
                      title: "Candidatura enviada",
                      description: `Sua candidatura para ${job.title} foi enviada!`,
                    })}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-primary/30 rounded-lg">
              <p className="text-muted-foreground">Nenhum emprego disponível no momento</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
