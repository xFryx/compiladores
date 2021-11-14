<template>
    <v-toolbar color="blue darken-4" dark  flat rounded="" elevation="1">
      <v-toolbar-title
        ><div class="font-weight-light"> {{ $t('screen.toolbarTitle')}}</div></v-toolbar-title  >
      <v-spacer></v-spacer>
      <v-col>
        <v-select
          v-model="lang"
          :items="items"
          @change="handleLang"
          menu-props="auto"
          solo-inverted
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

export default {
  name: "app-header",
  data: function () {
    const lang = localStorage.getItem("lang") || "es";
    return {
      lang: lang,
      items: ['en', 'es' ,'ar'],
    };
  },
  methods: {
    handleLang(item) {
      localStorage.setItem("lang", item);   
       window.location.reload();
    },
  },
};

</script>