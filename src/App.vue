<template>
  <div class="wrapper">
    <h2>Velocidad en segundos: {{velocidad}} </h2>
    <v-btn color="indigo darken 4" dark @click="set_focus(focus)">Iniciar recorrido </v-btn>
   <v-slider
      v-model="velocidad"
      color="red darken-4"
      min="1"
      max="15"
      label="Indica la velocidad"
    ></v-slider>
  
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
    <button @click="addNode">Add node</button>
    <button @click="addEdge">Add edge</button>
    <button @click="resetNetwork">Reset Network</button>
    <button @click="removeNode">Remove Node</button>
    <button @click="removeEdge">Remove Edge</button>
    <div class="events">
      <p>
        Network events: <br />
        {{ networkEvents }}
      </p>
    </div>
  </div>
</template>

<script>
import { Network } from 'vue-visjs';

export default {
  data: () => ({
    networkEvents: '',
    focus: 1,
    velocidad: 1,
    network: {
      nodes: [
        { id: 0, label: 'q0', color: "green" },
        { id: 1, label: 'q1', color: 'red' },
        { id: 2, label: 'q2' },
        { id: 3, label: 'q3' },
        { id: 4, label: 'q4', color:"red" },
        { id: 5, label: 'q5', color:"red" },
      ],
      edges: [
         { id: 0, from: 0, to: 1, label: 'λ', title: "λ", arrows: {to:true} },
         { id: 1, from: 1, to: 4, label: 'b', title: "b", arrows: {to:true} },
         { id: 2, from: 1, to: 2, label: 'a', title: "a", arrows: {to:true}},
         { id: 3, from: 2, to: 3, label: 'a', title: "a", arrows: {to:true}},
         { id: 4, from: 3, to: 4, label: 'b', title: "b", arrows: {to:true}},
         { id: 5, from: 3, to: 5, label: 'a', title: "a", arrows: {to:true}},
         { id: 6, from: 4, to: 2, label: 'a', title: "a", arrows: {to:true}},
         { id: 7, from: 4, to: 4, label: 'b', title: "b", arrows: {to:true}},
         { id: 8, from: 5, to: 2, label: 'a', title: "a", arrows: {to:true}},
         { id: 9, from: 5, to: 4, label: 'b', title: "b", arrows: {to:true}},
         
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
  created(){
    this.rec(this.network.nodes[0])
  },
  methods: {
    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = '';
      this.networkEvents += `${eventName}, `;
    },
    addNode() {
      const id = new Date().getTime();
      this.network.nodes.push({ id, label: 'New node' });
      // this.$refs.network.network.body.emitter.emit("_dataChanged");
    },
    addEdge() {
      const n1 = Math.floor(Math.random() * this.network.nodes.length);
      const n2 = Math.floor(Math.random() * this.network.nodes.length);
      this.network.edges.push({
        id: `${this.network.nodes[n1].id}-${this.network.nodes[n2].id}`,
        from: this.network.nodes[n1].id,
        to: this.network.nodes[n2].id,
      });
    },
    resetNetwork() {
      this.network = {
      nodes: [
        { id: 0, label: 'q0', color: "green" },
        { id: 1, label: 'q1', color: 'red' },
        { id: 2, label: 'q2' },
        { id: 3, label: 'q3' },
        { id: 4, label: 'q4', color:"red" },
        { id: 5, label: 'q5', color:"red" },
      ],
      edges: [
         { id: 1, from: 0, to: 1, label: 'λ', title: "λ", arrows: {to:true} },
         { id: 2, from: 1, to: 4, label: 'b', title: "b", arrows: {to:true} },
         { id: 3, from: 1, to: 2, label: 'a', title: "a", arrows: {to:true}},
         { id: 4, from: 2, to: 3, label: 'a', title: "a", arrows: {to:true}},
         { id: 5, from: 3, to: 4, label: 'b', title: "b", arrows: {to:true}},
         { id: 6, from: 3, to: 5, label: 'a', title: "a", arrows: {to:true}},
         { id: 7, from: 4, to: 2, label: 'a', title: "a", arrows: {to:true}},
         { id: 8, from: 4, to: 4, label: 'b', title: "b", arrows: {to:true}},
         { id: 9, from: 5, to: 2, label: 'a', title: "a", arrows: {to:true}},
         { id: 10,from: 5, to: 4, label: 'b', title: "b", arrows: {to:true}},
         
      ],
      options: {
        nodes: {
          shape: 'circle',
        },
      },
    };
    },
    removeNode() {
      this.network.nodes.splice(0, 1);
    },
    removeEdge() {
      this.network.edges.splice(0, 1);
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    rec(nodo){
    
 
      // tiene aristas o caminos el nodo ingresado?
      var edges = this.network.edges.filter((edge) => {
          return edge.from ==  nodo.id;
      });
      console.log(edges)

      if(edges.length > 0){

        console.log(nodo.label);


        for (let edge of edges) {
          setTimeout(() => {
                this.rec(this.network.nodes[edge.to])
              }, 50000);
        }
      
        //  edges.forEach(edge => {
            
        //     try {
        //       // setTimeout(() => {
        //       //   this.rec(this.network.nodes[edge.to])
        //       // }, 3000);
        //        //
        //     } catch (error) {
        //       console.log(error)
        //     }
        //   /*
        //     var nodoto = network.nodes.filter((nodo) =>{
        //         return nodo.id == edge.to;
        //     })

        //     if(nodoto.length > 0){
        //         r(network.nodes[nodoto[0]])
        //     }
        //     else{
        //       console.log('algo');
        //     }
        //    */
        // });
      }
    
    },
    // recorrer_nodos(){
    //   let recorridos = []
    //     for (let index = 0; index < this.network.nodes.length; index++) {
    //       recorridos.push({
    //        nodo: this.network.nodes[index].id,
    //        caminos: []
    //       })
    //       for (let index2 = 0; index2 < this.network.edges.length; index2++) {

    //           if(this.network.nodes[index].id==this.network.edges[index2].from){
    //             recorridos[recorridos.length-1].caminos.push(this.network.edges[index].to)
    //           }
    //       }
          
    //     }
    //     console.log(recorridos)
    // },
    async set_focus(){
      //console.log(this.$refs.network.getOptionsFromConfigurator())
      //this.$refs.network.focus(1)
      let options = {
        scale: 2,
        offset: {x:100, y:70},
        locked: true,
        animation: true
      }
    

      let focus = [5,2,4,2,1,3]
      for (let index = 0; index < focus.length; index++) {
           await this.sleep(this.speed)
           this.$refs.network.focus(focus[index],options)
      }
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