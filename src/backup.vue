<template>
  <v-app>
    <v-main class="mx-5 mt-15" >
     <v-row>
       <v-col>
         <v-card>
           <v-toolbar dark color="indigo darken-4">
             <v-toolbar-title>
               Texto
             </v-toolbar-title>
           </v-toolbar>
           <v-card-text>
             <v-row>
               <v-col>
                 <v-textarea v-model="texto" filled label="Ingresa el texto a ser evaluado" rows="3">
                   {{texto}}
                 </v-textarea>
               </v-col>
               <v-col>
                 <v-row class="mt-2" v-for="(expresion,index) in texto_evaluado" :key="index">
                    <v-divider></v-divider>
                    <h3> 
                      {{expresion}}  
                    </h3>
                    <v-divider></v-divider>
                 </v-row>
               </v-col>
             </v-row>
           </v-card-text>
         </v-card>
       </v-col>
       <v-col>  
         <v-card>
           <v-toolbar dark color="indigo darken-4">
             <v-toolbar-title>
               Expreson regular
             </v-toolbar-title>
           </v-toolbar>
           <v-card-text>
             <v-textarea :hint="resultado.mensaje" :color="resultado.color" filled label="Ingresa la expresion regular" v-model="expresion_regular" rows="2">
             </v-textarea>
           </v-card-text>
         </v-card>
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
      texto_evaluado: [],
      expresion_regular: "",
      resultado: {
        color: "blue",
        mensaje: "",
      }
    }
  },
  created(){

  },
  watch: {
    expresion_regular(val){
        this.validacion(val)
    },
    texto(){
      this.validacion(this.expresion_regular)
    }
  },
  methods: {
    validacion(val){
      //"val" es la expresion regular que está ectualmente en el input
      console.log(val)

       this.texto_evaluado = []
        try {
            //La primera linea de código dentro del trycatch indicará si la expresion
            //Regular está bie estructurada. En caso de no estarlo entrará al catch y colocará
            //El mensaje de error en el :hint del input textarea
            let regular = new RegExp(val,'gm')

            //Si la expresion regular está bien estructurada procedemos a operar el texto
            //Para separarlo por saltos de linea y espacios 

           
            let saltos = this.texto.split("\n") //Separamos el texto por saltos de lineas
            let palabras = []
            for (let index = 0; index < saltos.length; index++) {
              
              palabras = [...palabras,...saltos[index].split(" ")] //Separamos el texto por espacios
              
            }
            console.log(palabras)

           
            console.log(regular)
            //En el array de palabras en cada indice irá una palabra y posteriormente
            //Procedemos a evaluarla con nuestra expresion regular.
            //Search es un metodo que nos retornará el indice donde se encontró la coincidencia
            //Y sino lo encuentra retorna -1
            
            for (let index = 0; index < palabras.length; index++) {
              let resultado = palabras[index].search(regular) // Se hace la busqueda de la expresion regular en la palabra
              console.log(resultado)

              if(resultado>-1){ //En caso de encontrar una coincidencia (valor mayor a -1) lo agregamos en el array de texto_evaluado que mostrará
                this.texto_evaluado.push(palabras[index]) 
              }
             
              
            }
           
            //Indicamos que todo salio bien evaluando dicha expresion

            this.resultado = {
              color: "green",
              mensaje: 'Expresion correcta'
            }
      } catch (error) {
        this.resultado = {
          color: "red",
          mensaje: error.message
        }
      }
    }
  }
}
</script>