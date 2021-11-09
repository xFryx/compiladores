<template>
  <v-app>
    <v-main>
      <v-row class="mt-10 mx-10" >
        <v-col cols="12" sm="6" >
          <v-card elevation="4">
            <v-toolbar color="indigo" dark>
              <v-toolbar-title>
                Texto
              </v-toolbar-title>
            </v-toolbar>
            <v-textarea v-model="texto" filled dense rows="3" label="Ingresa un texto a evaluar" >
            </v-textarea>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-toolbar :color="respuesta.color" dark>
              <v-toolbar-title>
                Expesion regular {{respuesta.mensaje}}
              </v-toolbar-title>
            </v-toolbar>
            
            <v-textarea v-model="expresion_regular" filled dense rows="3" label="Ingresa la expresion regular" >
            </v-textarea>
            <v-card-actions>
              <v-btn @click="expresion_regular=''" >Limpiar expresion regular </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3 style="text-align:center" v-for="(coincidencia,index) in coincidencias " :key="index" > 
              {{ coincidencia }}
          </h3>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data(){
    return {
     
      texto: "",
      expresion_regular: "",
      coincidencia_texto: "Por ahora nada",
      otro: "123",
      numero: 0,

      respuesta: {
        mensaje: "",
        color: "blue",
      },

      coincidencias: []
    }
  },
  watch: {
    expresion_regular(){
      
      this.evaluar_expresion()
    },
    texto(){
      this.evaluar_expresion()
    }
  },
  methods: {
    evaluar_expresion(){
      console.log('xd')
      try {
        let exp_reg = new RegExp(this.expresion_regular, 'gm')
         this.coincidencias = this.texto.match(exp_reg)
         this.respuesta = {
           mensaje: "Todo bien",
           color: "green"
         }
      } catch (error) {
        console.log(error)

        this.coincidencias = []
        this.respuesta = {
          mensaje: error.message,
          color: "red"
        }

      }
      console.log(this.respuesta)
    }
  },
}
</script>