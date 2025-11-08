import { Job } from "@/types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";

/**
 * JobCard - Card para exibir informações de um emprego
 */
interface JobCardProps {
  job: Job;
  onApply?: () => void;
}

export const JobCard = ({ job, onApply }: JobCardProps) => {
  return (
    <Card className="p-6 border-2 border-primary/30 hover:border-primary transition-all">
      <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
      <p className="text-sm font-semibold text-primary mb-3">{job.company}</p>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {job.description}
      </p>

      <div className="space-y-1 mb-4">
        <p className="text-sm">
          <span className="font-semibold">Salário:</span> {job.salary}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Fone:</span> {job.phone}
        </p>
      </div>

      <Button 
        variant="portal" 
        className="w-full font-semibold"
        onClick={onApply}
      >
        ME CANDIDATAR
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </Card>
  );
};
