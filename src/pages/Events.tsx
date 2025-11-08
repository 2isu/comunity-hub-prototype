import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { EventCard } from "@/components/EventCard";
import { eventsApi } from "@/services/api";
import { Event } from "@/types";
import { useToast } from "@/hooks/use-toast";

/**
 * Events - Página com listagem completa de todos os eventos
 */
const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsApi.getAll();
      setEvents(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar eventos",
        description: "Não foi possível carregar os eventos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">EVENTOS</h1>
          <p className="text-lg text-muted-foreground">
            {events.length} eventos disponíveis
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando eventos...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
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
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-primary/30 rounded-lg">
            <p className="text-muted-foreground">Nenhum evento disponível no momento</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Events;
