# Portal Comunitário - Guia de Configuração

## 📋 Sobre o Projeto

O Portal Comunitário é uma plataforma web para gerenciar eventos e oportunidades de emprego em sua comunidade. Este protótipo foi desenvolvido para um trabalho acadêmico e implementa operações CRUD completas.

## 🌐 Estrutura do Projeto

### Páginas
- **`/`** - Página inicial pública (visualização de eventos e empregos em destaque)
- **`/admin`** - Painel de administração (criar, editar, deletar eventos e empregos)
- **`/jobs`** - Listagem completa de todos os empregos
- **`/events`** - Listagem completa de todos os eventos

### Arquivos Principais
- **`src/services/api.ts`** - Configuração e chamadas da API (endpoints de Jobs e Events)
- **`src/types/index.ts`** - Definição dos tipos de dados
- **`src/pages/Index.tsx`** - Página inicial
- **`src/pages/Admin.tsx`** - Painel administrativo
- **`src/components/`** - Componentes reutilizáveis (Header, JobCard, EventCard)

## ⚙️ Configuração da API

### 1. Configurar URL Base da API

Edite o arquivo `src/services/api.ts` e atualize a constante `API_BASE_URL`:

```typescript
const API_BASE_URL = "http://localhost:3000/api"; // Altere para a URL da sua API
```

### 2. Endpoints Implementados

#### Jobs (Empregos)
- `GET /api/jobs` - Listar todos os empregos
- `GET /api/jobs/{id}` - Buscar emprego por ID
- `POST /api/jobs` - Criar novo emprego
- `PUT /api/jobs/{id}` - Atualizar emprego
- `DELETE /api/jobs/{id}` - Deletar emprego

#### Events (Eventos)
- `GET /api/events` - Listar todos os eventos
- `GET /api/events/{id}` - Buscar evento por ID
- `POST /api/events` - Criar novo evento
- `PUT /api/events/{id}` - Atualizar evento
- `DELETE /api/events/{id}` - Deletar evento

### 3. Formato dos Dados

**Job (Emprego):**
```json
{
  "id": "string",
  "title": "string",
  "company": "string",
  "description": "string",
  "salary": "string",
  "phone": "string"
}
```

**Event (Evento):**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "date": "string",
  "location": "string",
  "organizer": "string"
}
```

## 🚀 Deploy no GitHub Pages

### 1. Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. Adicionar Scripts no package.json

Adicione estes scripts no seu `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### 3. Configurar Base no vite.config.ts

Adicione a propriedade `base` no arquivo `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/nome-do-seu-repositorio/', // Altere para o nome do seu repo
  // ... resto da configuração
});
```

### 4. Fazer Deploy

```bash
npm run deploy
```

### 5. Configurar GitHub Pages

1. Vá até as configurações do seu repositório no GitHub
2. Navegue até **Settings > Pages**
3. Em **Source**, selecione a branch `gh-pages`
4. Clique em **Save**

Seu site estará disponível em: `https://seu-usuario.github.io/nome-do-repositorio/`

## 🎨 Personalização

### Cores e Design

As cores principais do Portal Comunitário estão definidas em `src/index.css`:
- Verde principal: `--primary: 162 100% 33%` (HSL)

Para alterar as cores, edite as variáveis CSS no arquivo `src/index.css`.

### Componentes

Os componentes foram desenvolvidos seguindo o padrão do shadcn/ui e podem ser facilmente customizados.

## 📝 Desenvolvimento

### Instalar Dependências

```bash
npm install
```

### Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:8080`

### Build para Produção

```bash
npm run build
```

## 🔧 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - JavaScript com tipagem estática
- **Vite** - Ferramenta de build rápida
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI reutilizáveis
- **React Router** - Roteamento de páginas
- **Lucide React** - Ícones

## 📖 Comentários no Código

O código contém comentários explicativos em pontos importantes:
- Funções de API (o que cada endpoint faz)
- Componentes React (propósito de cada componente)
- Tipos de dados (estrutura dos dados)

## 🤝 Contribuindo

Este é um projeto acadêmico. Para fazer alterações:

1. Clone o repositório
2. Crie uma branch para sua feature
3. Faça suas alterações
4. Teste localmente
5. Faça commit e push
6. Abra um Pull Request

## 📄 Licença

Este é um projeto acadêmico desenvolvido para fins educacionais.
