![DevControle](https://i.imgur.com/sO5in9a.png)

# Dev Controle

## 📖 Sobre o Projeto

**Dev Controle** é uma aplicação web projetada para facilitar a gestão de chamados técnicos e clientes. Utilizando uma interface simples e intuitiva, o usuário pode cadastrar clientes, gerenciar chamados e acompanhar os status, tudo vinculado à sua conta do Google. 

A aplicação é construída com tecnologias modernas como **Next.js**, **Tailwind CSS**, **MongoDB**, **Prisma** e **TypeScript**, garantindo uma experiência fluida e segura.


## 🚀 Funcionalidades

### **Login com Google**
- Os usuários devem realizar login com sua conta do Google para acessar as funcionalidades da aplicação.
- Os dados são vinculados à conta autenticada, garantindo privacidade e organização.

### **Página de Clientes**
- Exibe uma lista de clientes cadastrados referentes à conta do usuário logado.
- **Cadastrar Cliente:** Formulário para adicionar novos clientes.
- **Excluir Cliente:** Só é possível deletar clientes que não possuam chamados com status "Aberto".

### **Página de Chamados**
- Exibe somente os chamados abertos vinculados à conta do usuário logado.
- **Abrir Chamado:** Formulário para registrar um novo chamado e vinculá-lo a um cliente previamente cadastrado.
- **Alterar Status:** Permite trocar o status de um chamado de "Aberto" para "Fechado".
- Chamados com status "Fechado" permanecem no banco de dados, mas não aparecem na listagem.

## 🎨 Design e Interface

A interface foi criada utilizando **Tailwind CSS**, oferecendo:
- Responsividade nativa, funcionando perfeitamente em dispositivos móveis e desktops.
- Componentes modernos e estilizados, com foco em usabilidade e acessibilidade.

## 🗄️ Banco de Dados

O Prisma é utilizado como ORM para gerenciar o banco de dados MongoDB.

- Estruturas principais:
  - Clientes: Contém informações dos clientes cadastrados.
  - Chamados: Contém informações sobre os chamados vinculados aos clientes.

## 🛡️ Segurança e Controle de Acesso

- O sistema utiliza **NextAuth.js** para autenticação com Google.
- Todos os dados exibidos são filtrados de acordo com o usuário logado.
- Regras de exclusão e atualização garantem a consistência dos dados:
  - Um cliente com chamados abertos não pode ser excluído.
  - Chamados com status "Fechado" continuam armazenados no banco de dados, mas não são exibidos na interface.

### 🔨 Guia de instalação

Com o projeto baixado, você deve primeiro fazer a instalação da pasta de node_modules, para então rodar a aplicação localmente na sua máquina e acessa-lá através do link: [localhost:3000](htttp://localhost:3000).

Etapas para instalar:

```
npm install
```

Passo 2:

```
npm run dev
```

Passo 3:

```
http://localhost:3000
```

## 📦 Tecnologias usadas:

- ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## 👷 Autor - João Victor de Souza

Se você gostou do projeto ou tem alguma sugestão, sinta-se à vontade para entrar em contato comigo pelas minhas redes sociais:

- Para suporte, mande um email para joaovictordesouza9285@gmail.com
- Link para o meu linkedin [João Victor de Souza](https://url_do_link)
