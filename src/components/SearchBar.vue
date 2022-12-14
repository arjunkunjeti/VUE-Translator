<template>
  <div>
    <v-app-bar
      :color="scrollDown ? '#F9D45D' : 'transparent'"
      flat
      v-scroll.parent="onScroll"
      :fixed="scrollDown"
      :class="{ 'mt-10': !scrollDown }"
      height="80"
    >
      <div
        :class="[
          'search-bar-container d-flex',
          scrollDown && textFocus ? 'search-bar-container-border' : '',
        ]"
      >
        <div
          :class="[
            'd-flex align-center flex-grow-1',
            scrollDown ? '' : 'search-bar-input-wrapper',
            !scrollDown && textFocus ? 'search-bar-input-border' : '',
          ]"
        >
          <v-text-field
            v-model="text"
            hide-details
            placeholder="  Type text to translate"
            solo
            flat
            autofocus
            :class="[
              'search-text-input-scrolled',
              $vuetify.breakpoint.smAndDown
                ? 'text-h6 font-weight-bold'
                : 'font-weight-bold text-h5',
              scrollDown ? 'search-text-input' : 'pl-5',
            ]"
            @focus="textFocus = true"
            @blur="textFocus = false"
            @keyup="startDetectTimer"
            @keydown="clearDetectTimer"
          ></v-text-field>
        </div>

        <div
          :class="[
            'd-flex align-center',
            scrollDown ? '' : 'search-bar-button-wrapper',
            !scrollDown && textFocus ? 'search-bar-button-border' : '',
            scrollDown ? '' : 'px-5',
          ]"
        >
          <v-btn
            dark
            large
            depressed
            :color="isDetecting ? '#399073' : '#E26720'"
            class="rounded-lg text-none"
            :style="{ letterSpacing: 'normal' }"
            :loading="isDetecting"
          >
            {{ detected.language }}
          </v-btn>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
//@import resultText from "@/components/Home.vue"

export default {
  name: "SearchBar",

  data: () => ({
    prevScroll: 0,
    scrollPosition: 0,
    scrollDown: false,
    textFocus: true,
    timerId: null,
    isDetecting: false,
  }),

  watch: {
    // text(val) {
    //   this.translations = this.translations.filter(el => el.text == val)
    // }
  },

  computed: {
    text: {
      get() {
        return this.$store.getters["text"];
      },
      set(val) {
        this.$store.commit("updateText", val);
      },
    },
    detected() {
      return this.$store.getters["detected"];
    },
    translations: {
      get() {
        return this.$store.getters["translations"];
      },
      set(val) {
        this.$store.commit("updateTranslations", val);
      },
    },
  },

  methods: {
    startDetectTimer() {
      if (this.text) {
        clearTimeout(this.timerId);
        this.timerId = setTimeout(this.detectLanguage, 2000);
      }
    },
    clearDetectTimer() {
      clearTimeout(this.timerId);
    },
    async detectLanguage() {
      this.isDetecting = true;
      await this.$store.dispatch("detectLanguage", { q: this.text });
      this.isDetecting = false;
      this.translateSelected();
    },
    async translateSelected() {
      if (this.text) {
        // Fetch text translation from API
        // this.currentLanguage = language.code
        // this.isLoading = true
        await this.$store.dispatch("translateSelected");
        // this.isLoading = false
        // this.currentLanguage = null
      }
    },
  },
};
</script>

<style lang="scss">
@import "~vuetify/src/styles/settings/_variables";

.search-text-input {
  .v-input__slot {
    background-color: #f8eabb !important;
  }
  color: #161036 !important;
}

.search-text-input-scrolled {
  .v-input__slot {
    background-color: #efe0b0 !important;
    padding: 0 !important;
  }
}

.search-bar-container {
  width: 70%;
  height: 100%;
  margin-left: 250px;
  position: absolute;
  left: 0;
}

// Add text input container outline on focus
.search-bar-container-border {
  border: 2px solid #000000 !important;
}
// Add text input outline on focus
.search-bar-input-border {
  box-shadow: 0 0 0 2px #000000;
  clip-path: inset(-2px 0 -2px -2px);
}
.search-bar-button-border {
  box-shadow: 0 0 0 2px #000000;
  clip-path: inset(-2px -2px -2px 0);
}

.search-bar-input-wrapper {
  border-radius: 0.5rem 0 0 0.5rem;
  height: 100%;
  background: #f9d45d;
}
.search-bar-button-wrapper {
  border-radius: 0 0.5rem 0.5rem 0;
  height: 100%;
  background: #f9d45d;
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .search-bar-container {
    padding: 0 1rem 0 1rem;
  }
}
@media #{map-get($display-breakpoints, 'md-only')} {
  .search-bar-container {
    padding: 0 2.5rem 0 2.5rem;
  }
}
@media #{map-get($display-breakpoints, 'lg-and-up')} {
  .search-bar-container {
    padding: 0 4rem 0 4rem;
  }
}
</style>
