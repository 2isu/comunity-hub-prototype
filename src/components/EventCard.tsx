import { Event } from "@/types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";

/**
 * EventCard - Card para exibir informações de um evento
 */
interface EventCardProps {
  event: Event;
  onViewMap?: () => void;
}

export const EventCard = ({ event, onViewMap }: EventCardProps) => {
  return (
    <Card className="p-6 border-2 border-primary/30 hover:border-primary transition-all">
      <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {event.description}
      </p>

      <div className="space-y-1 mb-4">
        <p className="text-sm">
          <span className="font-semibold">Data:</span> {event.date}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Localização:</span> {event.location}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Organizador:</span> {event.organizer}
        </p>
      </div>

      <Button 
        variant="portal" 
        className="w-full font-semibold"
        onClick={onViewMap}
      >
        VER NO MAPA
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </Card>
  );
};
