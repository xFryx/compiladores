<template>
  <div class="wrapper app">
    <v-row>
      <v-col xs="12" md="6" style="">
        <v-text-field
          style=""
          ref="caja"
          filled
          label="Texto de Entrada"
          placeholder="Ingresar texto"
          v-model="input"
        >
        </v-text-field>
      </v-col>
      <v-col xs="12" md="6">
        <v-select
          :items="velocidades"
          label="Velocidad de animación"
          :value="velocidades[3]"
          filled
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn block dark @click="validateRoutes()">
          Iniciar recorrido
        </v-btn>
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
      @stabilization-iterations-done="
        networkEvent('stabilizationIterationsDone')
      "
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
      @edges-remove="networkEvent('edges-remove')"
    >
    </network>
  </div>
</template>

<script>
import { Network } from "vue-visjs";
const Swal = require("sweetalert2");
export default {
  data: () => ({
    networkEvents: "",
    velocidades: ["x0.25", "x0.5", "x0.75", "x1", "x2", "x3"],
    input: "",
    array_recorrido: [],
    manage_err: {
      not_found_edge: false,
      not_accepted_state: false,
    },
    focus: 1,
    velocidad: 1,
    rules: {
      stringEmtpy: [(v) => !!v || false],
      expresion: [(v) => /(^((\w)+)$) | (^(\?)$)/.test(v) || false],
      expresionValida: [
        (v) => /(^((aaa)*(aab)*b*)*$)|(^(\?)$)/.test(v) || false,
      ],
      tabulaciones: [(v) => v.includes(" ")],
      vacio: [(v) => /^\?$/.test(v) || false],
    },
    network: {
      nodes: [
        { id: 0, label: "q0", color: "green" },
        { id: 1, label: "q1" },
        { id: 2, label: "q2" },
        { id: 3, label: "q3", color: "red" },
        { id: 4, label: "q4", color: "red" },
      ],
      edges: [
        { id: 0, from: 0, to: 3, label: "b", title: "b", arrows: { to: true } },
        { id: 1, from: 0, to: 1, label: "a", title: "a", arrows: { to: true } },
        { id: 2, from: 1, to: 2, label: "a", title: "a", arrows: { to: true } },
        { id: 3, from: 2, to: 3, label: "b", title: "b", arrows: { to: true } },
        { id: 4, from: 2, to: 4, label: "a", title: "a", arrows: { to: true } },
        { id: 5, from: 3, to: 1, label: "a", title: "a", arrows: { to: true } },
        { id: 6, from: 3, to: 3, label: "b", title: "b", arrows: { to: true } },
        { id: 7, from: 4, to: 1, label: "a", title: "a", arrows: { to: true } },
        { id: 8, from: 4, to: 3, label: "b", title: "b", arrows: { to: true } },
      ],
      options: {
        nodes: {
          shape: "circle",
        },
      },
    },
  }),
  components: {
    Network,
  },
  watch: {
    // input() {
    //   console.log(this.rules.vacio[0](this.input));
    // },
  },
  created() {
    Swal.fire(
      "¿Que pasa si..?",
      "¿Quieres representar vacio 'λ' (Lambda)? .. Puedes escribir '?' para hacerlo. Recuerda que esto pueda ser un palabra valida para el automata.",
      "question"
    );
  },
  computed: {
    speed() {
      let velocidad = 1000 * 1;
      switch (this.velocidades) {
        case "x0.25":
          velocidad = 1000 * 0.25;
          break;
        case "x0.5":
          velocidad = 1000 * 0.5;
          break;
        case "x0.75":
          velocidad = 1000 * 0.75;
          break;
        case "x1":
          velocidad = 1000;
          break;
        case "x2":
          velocidad = 1000 * 2;
          break;
        case "x3":
          velocidad = 1000 * 3;
          break;
      }
      return velocidad;
    },
    validar_entrada() {
      return (
        this.rules.stringEmtpy[0](this.input) &&
        this.rules.expresionValida[0](this.input) &&
        !this.rules.tabulaciones[0](this.input)
      );
    },
  },
  methods: {
    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = "";
      this.networkEvents += `${eventName}, `;
    },

    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    routes(nodo, input) {
      this.array_recorrido.push(nodo.id);

      var edges = this.network.edges.filter((edge) => {
        return edge.from == nodo.id;
      });

      if (edges.length > 0 && input <= this.input.length) {
        //
        for (let edge of edges) {
          if (this.input[input] == edge.label) {
            this.routes(this.network.nodes[edge.to], input + 1);
          }
        }
      }
    },
    validateRoutes() {
      if (this.rules.stringEmtpy[0](this.input)) {
        if (this.rules.expresionValida[0](this.input)) {
          this.set_focus(this.focus);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Atención!!",
            text:
              "La palabra ingresada no cumple con la expresión regular. Puede que el recorrido no llegue a un estado de aceptación o ni siquiera encuentre un camino hacía él.",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Iniciar recorrido",
            cancelButtonText: "Cambiar Texto",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          }).then((res) => {
            if (res.isConfirmed) {
              this.set_focus(this.focus);
            }
          });
        }
      } else {
        Swal.fire("Sin texto no hay recorrido!", "", "warning");
      }
    },
    async set_focus() {
      this.manage_err.not_found_edge = "";

      await this.routes(this.network.nodes[0], 0);
      let options = {
        scale: 3,
        offset: { x: 10, y: 40 },
        locked: true,
        animation: true,
      };

      let focus = this.array_recorrido;
      console.log(focus);
      for (let index = 0; index < focus.length; index++) {
        await this.sleep(this.speed);
        this.$refs.network.focus(focus[index], options);
      }

      if (this.rules.expresionValida[0](this.input)) {
        Swal.fire("Palabra valida para el automata!", "", "success");
      } else {
        Swal.fire("Palabra invalida para el automata!", "", "warning").then(
          (res) => {
            console.log(res);
            if (res.isConfirmed == true || res.isDismissed == true) {
              if (focus.length - 1 != this.input.length) {
                if (this.input != "?") {
                  console.log(this.input);
                  console.log(focus.length);
                  Swal.fire({
                    icon: "error",
                    title: "Atención!!",
                    text:
                      "No se encontro un camino '" +
                      this.input[focus.length - 1] +
                      "' para avanzar a otro nodo.",
                    
                    
                  });
                }
              }
            }
          }
        );
      }

      // switch (this.network.nodes[focus[focus.length - 1]].color) {
      //   case "red":
      //   case "green":

      //     break;
      //   default:
      //     Swal.fire(
      //       "Palabra invalida para el automata!",
      //       "",
      //       "warning"
      //     );
      //     break;
      // }

      this.array_recorrido = [];
    },
  },
};
</script>

<style scoped>
@import url("./assets/styles/styles.css");
</style>
