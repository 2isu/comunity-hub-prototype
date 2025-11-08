# Notas Importantes sobre a API

## ⚠️ Configuração Obrigatória

### 1. Atualizar URL da API

Antes de usar o projeto, você **DEVE** atualizar a URL base da API no arquivo `src/services/api.ts`:

```typescript
const API_BASE_URL = "http://localhost:3000/api"; // ⚠️ ALTERE ESTA URL
```

Substitua por:
- URL do seu servidor local (desenvolvimento): `http://localhost:PORTA/api`
- URL do seu servidor em produção: `https://seu-servidor.com/api`

### 2. Problema de CORS

Se você estiver desenvolvendo localmente e a API estiver em outro domínio/porta, você provavelmente encontrará erros de CORS no console do navegador:

```
Access to fetch at 'http://localhost:3000/api/jobs' from origin 'http://localhost:8080' 
has been blocked by CORS policy
```

#### Solução 1: Configurar CORS no Backend

No seu servidor backend, você precisa habilitar CORS. Exemplos:

**Node.js/Express:**
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8080' // URL do seu frontend
}));
```

**Spring Boot:**
```java
@CrossOrigin(origins = "http://localhost:8080")
```

**Django:**
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
]
```

#### Solução 2: Usar Proxy no Vite (Desenvolvimento)

Adicione no seu `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
```

E altere a URL no `api.ts` para apenas:
```typescript
const API_BASE_URL = "/api";
```

### 3. Dados de Exemplo (Mock)

Se você quiser testar o frontend sem uma API real, pode criar dados mockados:

#### Opção A: Criar um arquivo de dados mockados

Crie `src/services/mockData.ts`:

```typescript
import { Job, Event } from "@/types";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Analista de Marketing Digital",
    company: "Empresa de Marketing",
    description: "Buscamos um profissional criativo...",
    salary: "R$ 3.500,00",
    phone: "(44) 98765-4321"
  },
  // Adicione mais empregos aqui
];

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Feira de Trocas Sustentáveis",
    description: "Participe da nossa Feira de Trocas...",
    date: "20/12/2025",
    location: "Parque da Lagoa",
    organizer: "Prefeitura Municipal"
  },
  // Adicione mais eventos aqui
];
```

#### Opção B: Usar JSON Server (API Fake)

1. Instale json-server:
```bash
npm install -g json-server
```

2. Crie um arquivo `db.json` na raiz:
```json
{
  "jobs": [
    {
      "id": "1",
      "title": "Desenvolvedor Frontend",
      "company": "Tech Company",
      "description": "Vaga para desenvolvedor React",
      "salary": "R$ 5.000,00",
      "phone": "(44) 99999-9999"
    }
  ],
  "events": [
    {
      "id": "1",
      "title": "Workshop de React",
      "description": "Aprenda React do zero",
      "date": "25/12/2025",
      "location": "Centro de Eventos",
      "organizer": "Dev Community"
    }
  ]
}
```

3. Execute o json-server:
```bash
json-server --watch db.json --port 3000
```

4. Sua API estará disponível em `http://localhost:3000`

### 4. Ambiente de Produção

Para produção (GitHub Pages), você precisa:

1. **Ter uma API hospedada** em algum servidor (Heroku, Railway, Vercel, etc.)
2. **Atualizar a URL** no `api.ts` para a URL de produção
3. **Configurar CORS** no servidor para aceitar requisições do GitHub Pages

Exemplo de URL de produção:
```typescript
const API_BASE_URL = "https://minha-api.herokuapp.com/api";
```

### 5. Checklist Antes de Testar

- [ ] URL da API configurada em `src/services/api.ts`
- [ ] Backend rodando e acessível
- [ ] CORS configurado no backend
- [ ] Endpoints retornando dados no formato correto
- [ ] Frontend consegue se comunicar com o backend

### 6. Testando os Endpoints

Você pode testar seus endpoints usando:

**cURL:**
```bash
curl http://localhost:3000/api/jobs
```

**Postman/Insomnia:**
- Importe os endpoints e teste cada um
- Verifique os status codes e respostas

**DevTools do navegador:**
- Abra o Console (F12)
- Vá em Network
- Faça ações no site e veja as requisições
