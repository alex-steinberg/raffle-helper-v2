// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/ionic", "@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  ionic: {
    config: {
      mode: "ios",
    },
    css: {
      utilities: true,
    },
  },
});
