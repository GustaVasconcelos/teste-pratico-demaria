# **To-Do List - Instruções para Rodar o Projeto**

Este é um projeto de gerenciamento de tarefas (To-Do List) utilizando Docker para facilitar o processo de configuração e execução.

## **Passos para Rodar o Projeto**

### **1. Clonar o Repositório**

Se você ainda não tiver o projeto, clone o repositório:

```bash
git clone https://github.com/GustaVasconcelos/teste-pratico-demaria.git
cd teste-pratico-demaria
```

### **2. Configurar o Ambiente do Backend**

Entre na pasta do backend:

```bash
cd backend
```

rode o comando abaixo para construir e iniciar os containers:

```bash
docker-compose up -d --build
```

Preencha o arquivo .env com as configurações do banco de dados e outras variáveis necessárias. Utilize o arquivo .env.example como base.

```bash
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=todo_list
DB_USERNAME=user
DB_PASSWORD=password
```


### **3. Configurar o Ambiente do front-end**

saia da pasta backend:

```bash
cd ..
```

Entre na pasta do frontend:

```bash
cd front-end
```

Construa e inicie o container do frontend com o comando:

```bash
docker-compose up -d --build
```

### **4. Acessar a Aplicação**

O frontend estará disponível em: http://localhost:5173.
O backend estará disponível em: http://localhost:8000.