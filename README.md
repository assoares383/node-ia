# 🚀 node-ia

<p align="center">
  <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" alt="node-ia banner" width="600"/>
</p>

<p align="center">
  <b>API Node.js para geração de sugestões inteligentes com OpenAI GPT</b><br>
  <sub>Simples, rápida e pronta para turbinar suas aplicações com IA!</sub>
</p>

---

<p align="center">
  <img src="https://img.shields.io/github/license/assoares383/node-ia?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/github/languages/top/assoares383/node-ia?style=flat-square" alt="Top Language"/>
  <img src="https://img.shields.io/github/stars/assoares383/node-ia?style=social" alt="GitHub stars"/>
</p>

---

## ✨ Sobre o Projeto

O **node-ia** é uma API minimalista construída em Node.js que utiliza o poder do GPT da OpenAI para gerar sugestões de produtos a partir de mensagens enviadas pelo usuário. Ideal para integrar inteligência artificial em sistemas de recomendação, chatbots e muito mais!

---

## 🚀 Como começar

1. **Clone o repositório**
   ```sh
   git clone https://github.com/assoares383/node-ia.git
   cd node-ia
   ```

2. **Instale as dependências**
   ```sh
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Copie `.env.example` para `.env` e preencha com sua chave da OpenAI.

4. **Inicie o servidor**
   ```sh
   npm run dev
   ```

---

## 📦 Endpoint

- **POST `/generate`**
  - **Body:**
    ```json
    { "message": "sua mensagem aqui" }
    ```
  - **Resposta:**
    ```json
    { "message": "sugestão gerada pela IA" }
    ```

---

## 🛠️ Tecnologias

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=fff&style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=for-the-badge"/>
  <img src="https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=fff&style=for-the-badge"/>
</p>
