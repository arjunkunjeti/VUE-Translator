<template>
  <v-app>
    <div>
      <AppHeader />
      <Home />
      <SearchBar />

      <v-main>
        <router-view />
      </v-main>

      <AppFooter />
    </div>
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import SearchBar from "@/components/SearchBar";
import AppFooter from "@/components/AppFooter";
import Home from "@/components/Home";

export default {
  name: "App",

  components: {
    AppHeader,
    SearchBar,
    AppFooter,
    Home,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans&family=Rubik:wght@500&display=swap");

#app {
  font-family: "Rubik", sans-serif;
  background: #f2eed3;
  color: #161036 !important;
}
</style>
