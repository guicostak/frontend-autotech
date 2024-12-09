import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // ajuste para HTTP se necessário
    chromeWebSecurity: false, // desabilita a verificação de segurança no navegador
  },
  },
);
