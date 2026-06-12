import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {},
  },
  env: {
    FIREBASE_API_KEY: "VITE_FIREBASE_API_KEY",
    API_URL: "http://localhost:8080",
    // Credenciales de prueba — sobreescribir en cypress.env.json (gitignored)
    TEST_USER_EMAIL: "jrodriguez@farmacov.com",
    TEST_USER_PASSWORD: "12345678",
    TEST_ADMIN_EMAIL: "mariocast@farmacov.com",
    TEST_ADMIN_PASSWORD: "12345678",
  },
});
