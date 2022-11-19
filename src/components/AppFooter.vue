<template>
  <v-footer padless color="#E6DABD" class="justify-center mt-10">
    <v-card flat tile color="transparent">
      <v-card-text>
        <strong>Vue translator</strong> - {{ new Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",

  data: () => ({
    icons: [],
  }),
};
</script>
