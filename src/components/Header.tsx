import { Menu, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

/**
 * Header component - Cabeçalho principal do Portal Comunitário
 * Contém logo, menu hamburguer, busca e ícone de perfil
 */
export const Header = () => {
  return (
    <header className="border-b border-primary/20 bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Menu hamburguer - mobile */}
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-background rounded-full" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Portal</h1>
              <p className="text-xs text-muted-foreground">Comunitário</p>
            </div>
          </div>
        </Link>

        {/* Ações do header */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/admin">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
