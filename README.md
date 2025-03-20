# Sistema de Chat por Email

Este é um sistema que permite gerenciar emails em formato de chat, com suporte a configurações SMTP personalizadas e histórico de conversas.

## Requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 5.7 ou superior)
- NPM ou Yarn
- Conta Gmail (para envio de emails)

## Configuração do Banco de Dados

1. Crie um banco de dados MySQL chamado `email_system`
2. Execute o arquivo `backend/database.sql` para criar as tabelas necessárias
3. Configure as variáveis de ambiente no arquivo `backend/.env`:
   ```
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=email_system
   ```

## Configuração do Gmail

Para usar o Gmail como servidor SMTP, você precisa:

1. Ativar a verificação em duas etapas na sua conta Google
2. Gerar uma senha de app:
   - Acesse sua conta Google
   - Vá em Segurança
   - Procure por "Senhas de app"
   - Selecione "App" e escolha "Outro (nome personalizado)"
   - Digite um nome (ex: "Chat por Email")
   - Copie a senha gerada

## Instalação

1. Clone o repositório
2. Instale as dependências do backend:
   ```bash
   cd backend
   npm install
   ```
3. Instale as dependências do frontend:
   ```bash
   cd frontend
   npm install
   ```

## Configuração do SMTP

1. Configure suas credenciais SMTP no arquivo `backend/.env`:
   ```
   EMAIL_USER=seu_email@gmail.com
   EMAIL_PASS=sua_senha_de_app
   ```

2. Configure o email do usuário no arquivo `frontend/.env`:
   ```
   REACT_APP_EMAIL_USER=seu_email@gmail.com
   ```

## Executando o Projeto

1. Inicie o servidor backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Em outro terminal, inicie o frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Acesse a aplicação em `http://localhost:3000`

## Primeiro Acesso

1. Ao acessar a aplicação pela primeira vez, um modal de configuração SMTP será exibido
2. Preencha as informações:
   - Host: smtp.gmail.com
   - Porta: 587
   - Email: seu email Gmail
   - Senha: senha de app gerada no Gmail
3. O sistema enviará um email de teste para lucasmvlog3@gmail.com
4. Se o email de teste for enviado com sucesso, você poderá começar a usar o chat

## Funcionalidades

- Configuração personalizada de servidor SMTP
- Visualização de emails em formato de chat
- Histórico de conversas
- Notificações em tempo real de novos emails
- Interface responsiva e moderna
- Validação de configuração SMTP com email de teste

## Estrutura do Projeto

```
.
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── SmtpConfig.js
│   │   └── EmailThread.js
│   ├── routes/
│   │   ├── smtp.js
│   │   └── email.js
│   ├── database.sql
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ChatInterface.js
    │   │   ├── EmailList.js
    │   │   ├── MessageList.js
    │   │   ├── MessageInput.js
    │   │   └── SmtpConfigModal.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Solução de Problemas

### Erro de Autenticação SMTP

Se você receber um erro de autenticação ao configurar o SMTP:

1. Verifique se a verificação em duas etapas está ativada no Gmail
2. Certifique-se de estar usando uma senha de app e não a senha normal da conta
3. Verifique se o email e a senha estão corretos
4. Confirme se a porta 587 está correta para seu servidor SMTP

### Email de Teste não Recebido

Se o email de teste não for recebido:

1. Verifique a pasta de spam
2. Confirme se o email de destino está correto
3. Verifique se há erros no console do navegador ou do servidor
