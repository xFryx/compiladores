<template>
  <div class="wrapper">
    <v-row>
       <v-col cols="10">
          <v-slider
          v-model="velocidad"
          color="red darken-4"
          min="1"
          max="15"
          label="Indica la velocidad"
        ></v-slider>
        <div class="text-h1">Velocidad de animación: {{velocidad}} </div>
       </v-col>  
    </v-row>
    <v-row>
      <v-col xs="12"  md="6">
          <v-text-field 
            solo 
            label="Main input"
            :rules="rules"
            v-model="input">
          </v-text-field>
      </v-col>
      <v-col xs="12" md="6">
         <v-btn block dark style="margin-top: 8px" @click="set_focus(focus)"> Iniciar recorrido </v-btn>
      </v-col>
    </v-row>
    <network
      class="network"
      ref="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
      @click="networkEvent('click')"
      @double-click="networkEvent('doubleClick')"
      @oncontext="networkEvent('oncontext')"
      @hold="networkEvent('hold')"
      @release="networkEvent('release')"
      @select="networkEvent('select')"
      @select-node="networkEvent('selectNode')"
      @select-edge="networkEvent('selectEdge')"
      @deselect-node="networkEvent('deselectNode')"
      @deselect-edge="networkEvent('deselectEdge')"
      @drag-start="networkEvent('dragStart')"
      @dragging="networkEvent('dragging')"
      @drag-end="networkEvent('dragEnd')"
      @hover-node="networkEvent('hoverNode')"
      @blur-node="networkEvent('blurNode')"
      @hover-edge="networkEvent('hoverEdge')"
      @blur-edge="networkEvent('blurEdge')"
      @zoom="networkEvent('zoom')"
      @show-popup="networkEvent('showPopup')"
      @hide-popup="networkEvent('hidePopup')"
      @start-stabilizing="networkEvent('startStabilizing')"
      @stabilization-progress="networkEvent('stabilizationProgress')"
      @stabilization-iterations-done="networkEvent('stabilizationIterationsDone')"
      @stabilized="networkEvent('stabilized')"
      @resize="networkEvent('resize')"
      @init-redraw="networkEvent('initRedraw')"
      @before-drawing="networkEvent('beforeDrawing')"
      @after-drawing="networkEvent('afterDrawing')"
      @animation-finished="networkEvent('animationFinished')"
      @config-change="networkEvent('configChange')"
      @nodes-mounted="networkEvent('nodes-mounted')"
      @nodes-add="networkEvent('nodes-add')"
      @nodes-update="networkEvent('nodes-update')"
      @nodes-remove="networkEvent('nodes-remove')"
      @edges-mounted="networkEvent('edges-mounted')"
      @edges-add="networkEvent('edges-add')"
      @edges-update="networkEvent('edges-update')"
      @edges-remove="networkEvent('edges-remove')">
    </network>
  </div>
</template>
<script>
import { Network } from 'vue-visjs';

export default {
  data: () => ({
    networkEvents: '',
    input: 'a',
    array_recorrido: [],
    focus: 1,
    velocidad: 1,
    rules: [
        value => !!value || 'Required.',
    ],
    network: {
      nodes: [
        { id: 0, label: 'q0', color: 'green' },
        { id: 1, label: 'q1' },
        { id: 2, label: 'q2' },
        { id: 3, label: 'q3', color:"red" },
        { id: 4, label: 'q4', color:"red" },
      ],
      edges: [
         { id: 0, from: 0, to: 3, label: 'b', title: "b", arrows: {to:true}},
         { id: 1, from: 0, to: 1, label: 'a', title: "a", arrows: {to:true}},
         { id: 2, from: 1, to: 2, label: 'a', title: "a", arrows: {to:true}},
         { id: 3, from: 2, to: 3, label: 'b', title: "b", arrows: {to:true}},
         { id: 4, from: 2, to: 4, label: 'a', title: "a", arrows: {to:true}},
         { id: 5, from: 3, to: 1, label: 'a', title: "a", arrows: {to:true}},
         { id: 6, from: 3, to: 3, label: 'b', title: "b", arrows: {to:true}},
         { id: 7, from: 4, to: 1, label: 'a', title: "a", arrows: {to:true}},
         { id: 8, from: 4, to: 3, label: 'b', title: "b", arrows: {to:true}},
         
      ],
      options: {
        nodes: {
          shape: 'circle',
        },
      },
    },
  }),
  components: {
    Network,
  },
  computed: {
    speed(){
     let velocidad = this.velocidad * 1000
      return velocidad
    }
  },
  methods: {
    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = '';
      this.networkEvents += `${eventName}, `;
    },
    
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    rec(nodo, input){
       console.log(nodo.label);
       this.array_recorrido.push(nodo.id)
 
      var edges = this.network.edges.filter((edge) => {
          return edge.from ==  nodo.id;
      });
     
      if(edges.length > 0 && input <= this.input.length){
        
        
          for (let edge of edges) {
            
            if(this.input[input] == edge.label){
              
             
                this.rec(this.network.nodes[edge.to], input+1);
             
            }
            
           
          }      
      }
      else{
        console.log("Finally")
      }
  
     
    },
    
    async set_focus(){
      await this.rec(this.network.nodes[0], 0);
      let options = {
        scale: 3,
        offset: {x:10, y:40},
        locked: true,
        animation: true
      }
    
      let focus = this.array_recorrido;
      for (let index = 0; index < focus.length; index++) {
           await this.sleep(this.speed)
           this.$refs.network.focus(focus[index],options)
      }
      this.array_recorrido = []
    },

  },
};
</script>

<style>
/* @import "~vue-visjs/dist/vue-visjs.css"; */
* {
  font-family: sans-serif;
}

.wrapper {
  padding: 20px 50px;
  text-align: center;
}
.events {
  text-align: left;
  height: 70px;
}

.network {
  height: 400px;
  border: 1px solid #ccc;
  margin: 5px 0;
}
</style>