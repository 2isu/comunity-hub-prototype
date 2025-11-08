import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { JobCard } from "@/components/JobCard";
import { jobsApi } from "@/services/api";
import { Job } from "@/types";
import { useToast } from "@/hooks/use-toast";

/**
 * Jobs - Página com listagem completa de todos os empregos
 */
const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await jobsApi.getAll();
      setJobs(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar empregos",
        description: "Não foi possível carregar os empregos.",
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
          <h1 className="text-4xl font-bold text-primary mb-2">EMPREGOS</h1>
          <p className="text-lg text-muted-foreground">
            {jobs.length} oportunidades disponíveis
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando empregos...</p>
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
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
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-primary/30 rounded-lg">
            <p className="text-muted-foreground">Nenhum emprego disponível no momento</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Jobs;
