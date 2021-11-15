<template>
    <v-toolbar color="blue darken-4" dark  flat rounded="" elevation="1">

      <v-btn color="" icon @click="showInfoAboutEmpty">
          <v-icon
            color="white"
            dark
          >
            mdi-information-outline
          </v-icon>
      </v-btn>

      <v-toolbar-title
        ><div class="font-weight-light"> {{ $t('screen.toolbarTitle')}}</div></v-toolbar-title  >
      <v-spacer></v-spacer>
      <v-col cols="4" sm="2">
        <v-select
          v-model="lang"
          :items="items"
          @change="handleLang"
          menu-props="auto"
          solo-inverted
          append-icon="mdi-google-translate"
          dense
          flat
          hide-details
          :value="lang"
          single-line
        ></v-select>
        
      </v-col>
     
    </v-toolbar>
   
</template>

<script>
const Swal = require("sweetalert2");
export default {
  name: "app-header",
  data: function () {
    const lang = localStorage.getItem('lang') || "es";
    return {
      lang: lang,
      items: ['en', 'es' ,'fr'],
    };
  },
  methods: {
    handleLang(item) {
      localStorage.setItem("lang", item);
      this.$i18n.locale = item;   
      this.item = item;      
    },
    showInfoAboutEmpty(){
       Swal.fire(
      this.$i18n.tc("alerts.whatif", 1),
      this.$i18n.tc("alerts.whatif", 0),
      "info"
    );
    },
  },
};

</script>