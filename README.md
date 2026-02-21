#  MagiTech — E-commerce de Hardware & Games

> Plataforma de e-commerce completa voltada para entusiastas de tecnologia e hardware.

🔗 **[Acesse o projeto ao vivo](https://magitech-store.vercel.app)**

---

##  Preview
<img width="980" height="487" alt="image" src="https://github.com/user-attachments/assets/253e78d9-e177-4210-9ea7-01cb0e5e3b41" />

<img width="980" height="487" alt="image" src="https://github.com/user-attachments/assets/94cf7ef4-19bd-4a42-b06c-bf9caff381ca" />


---

##  Sobre o Projeto

A **MagiTech** é um e-commerce fullstack desenvolvido do zero com o objetivo de praticar e demonstrar habilidades em desenvolvimento web moderno. O design foi inspirado em grandes lojas do segmento tech, com foco em uma experiência de compra fluida e responsiva. O projeto conta com frontend em React + TypeScript, backend em Java com Spring Boot, banco de dados PostgreSQL, e está totalmente em produção na nuvem.

---

## ✅ Funcionalidades

-  Cadastro e login de usuários com senha criptografada (BCrypt)
-  Listagem de produtos com cards interativos
-  Busca de produtos processada no servidor
-  Filtro por categorias (Hardware, Periféricos, Computadores, Celulares, TV & Audio)
-  Página de detalhe do produto com descrição, especificações e avaliações
-  Carrinho de compras com Context API
-  Layout totalmente responsivo (mobile, tablet e desktop)
-  Breadcrumb clicável navegando para categorias
-  Dark mode nativo

---

##  Tecnologias Utilizadas

### Frontend
- [React.js](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- CSS puro com responsividade manual
- Deploy: [Vercel](https://vercel.com/)

### Backend
- [Java 17](https://openjdk.org/)
- [Spring Boot 3.4](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security) + BCrypt
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) + Hibernate
- [Bean Validation](https://beanvalidation.org/)
- [Lombok](https://projectlombok.org/)
- Deploy: [Railway](https://railway.app/)

### Banco de Dados
- [PostgreSQL](https://www.postgresql.org/) — hospedado no Railway

---

##  Arquitetura

```
├── FrontEnd/                  # Aplicação React
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home/          # Página principal, carrinho, produtos, busca
│   │   │   └── Login/         # Autenticação
│   │   └── App.tsx
│   └── vercel.json
│
└── src/                       # Backend Spring Boot
    └── main/java/kabum/demo/
        ├── Controller/        # Endpoints REST
        ├── Service/           # Regras de negócio
        ├── Repository/        # Acesso ao banco
        ├── Model/             # Entidades JPA
        ├── Dto/               # Data Transfer Objects
        ├── Config/            # Segurança e CORS
        └── Exception/         # Tratamento global de erros
```

---

##  Como Rodar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18+
- [Java 17](https://openjdk.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Maven](https://maven.apache.org/)

### Backend

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/projeto-eccomerce.git
cd projeto-eccomerce

# Configure as variáveis de ambiente
# Crie um banco PostgreSQL local e defina as variáveis abaixo:
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/magitech
export SPRING_DATASOURCE_USERNAME=seu_usuario
export SPRING_DATASOURCE_PASSWORD=sua_senha

# Rode o projeto
./mvnw spring-boot:run
```

### Frontend

```bash
cd FrontEnd

# Instale as dependências
npm install

# Configure o .env.local
echo "VITE_API_URL=http://localhost:8080" > .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173`

---

## 🔌 Principais Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/usuarios` | Cadastro de usuário |
| `POST` | `/usuarios/login` | Login |
| `GET` | `/api/produtos` | Listar todos os produtos |
| `GET` | `/api/produtos/{id}` | Buscar produto por ID |
| `GET` | `/api/produtos/busca?nome=` | Buscar produtos por nome |
| `GET` | `/api/produtos/categoria/{nome}` | Listar por categoria |
| `POST` | `/api/produtos` | Criar produto |
| `PUT` | `/api/produtos/{id}` | Atualizar produto |
| `DELETE` | `/api/produtos/{id}` | Deletar produto |

---

##  Segurança

- Senhas armazenadas com hash **BCrypt**
- DTOs separados das entidades — dados sensíveis nunca expostos na API
- Validações no frontend e no backend
- CORS configurado para aceitar apenas o domínio do frontend em produção

---

##  Aprendizados

Este projeto foi desenvolvido para praticar:
- Arquitetura REST com Spring Boot
- Separação de responsabilidades com DTOs, Services e Repositories
- Autenticação segura sem JWT (sessão simples com BCrypt)
- Gerenciamento de estado global com Context API
- Deploy fullstack em nuvem (Vercel + Railway + PostgreSQL)
- Responsividade sem frameworks CSS

---

##  Autor

Feito por **Lucas**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/lucas-gabriel-b83733312/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sensintido)
