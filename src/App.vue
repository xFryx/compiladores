<template>
  <v-app>
    <app-header></app-header>
    <v-container fluid class="">
      <v-row>
        <v-col cols="12" sm="6">
          <label for="textoEntrada">{{ $tc('screen.labels', 0)}}</label>
          <v-text-field
            name="textoEntrada"
            id="textoEntrada"
            flat
            solo-inverted
            :placeholder="$t('screen.placehoder')"
            v-model="textInput"
            :readonly="disabled"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <label for="expresionRegular">{{ $tc('screen.labels', 1)}}</label>
          <v-text-field
            name="expresionRegular"
            id="expresionRegular"
            flat
            solo-inverted
            readonly
            :value="$t('screen.RExp')"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-slider
            tick-size="5"
            ticks="always"
            :tick-labels="tickLabels"
            v-model="velocidad"
            :disabled="disabled"
            min="1"
            max="5"
            :label="$tc('screen.labels', 2)"
          ></v-slider>
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn
            :disabled="disabled"
            block
            color="blue darken-4"
            elevation="0"
            dark
            href="#network"
            @click="validateRoutes()"
          >
            {{$t('screen.botton')}}
          </v-btn>
        </v-col>
      </v-row>
      <app-network
        id="network"
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
      </app-network>
    </v-container>
  </v-app>
</template>

<script>

import Header from "./components/Header.vue";
import { Network } from "vue-visjs";
const Swal = require("sweetalert2");

export default {
  components: {
    "app-header": Header,
    "app-network": Network,
  },
  data: () => ({
    //Frontend
    disabled: false,
    tickLabels: ["x1", "x2", "x3", "x4", "x5"],

    textInput: "",

    //Makes routes
    routesArray: [],

    //Handle Error
    manage_err: {
      not_found_edge: false,
      not_accepted_state: false,
    },

    //Rules for automata and RExp
    rules: {
      stringEmtpy: [(v) => !!v || false],
      expresion: [(v) => /(^((\w)+)$) | (^(\?)$)/.test(v) || false],
      expresionValida: [
        (v) => /(^((aaa)*(aab)*b*)*$)|(^(\?)$)/.test(v) || false,
      ],
      tabulaciones: [(v) => v.includes(" ")],
      vacio: [(v) => /^\?$/.test(v) || false],
    },

    //data network
    focus: 1,
    velocidad: 1,
    networkEvents: "",
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
  created() {
    // this.$vuetify.theme.light = "#ffff";
    Swal.fire(
      this.$i18n.tc('alerts.whatif', 1),
      this.$i18n.tc('alerts.whatif', 0),
      "question"
    );
  },
  computed: {
    speed() {
      let velocidad = 2000 / this.velocidad;
      return velocidad;
    },
    validar_entrada() {
      return (
        this.rules.stringEmtpy[0](this.textInput) &&
        this.rules.expresionValida[0](this.textInput) &&
        !this.rules.tabulaciones[0](this.textInput)
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
      this.routesArray.push(nodo.id);

      var edges = this.network.edges.filter((edge) => {
        return edge.from == nodo.id;
      });

      if (edges.length > 0 && input <= this.textInput.length) {
        //
        for (let edge of edges) {
          if (this.textInput[input] == edge.label) {
            this.routes(this.network.nodes[edge.to], input + 1);
          }
        }
      }
    },
    beggin() {
      Swal.fire({
        title: this.$i18n.tc('alerts.start', 0),
        html: this.$i18n.tc('alerts.start', 1),
        timer: 2700,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(2000);
          this.set_focus(this.focus);
        },
      });
    },
    validateRoutes() {
      if (this.rules.stringEmtpy[0](this.textInput)) {
        if (this.rules.expresionValida[0](this.textInput)) {
          this.beggin();
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
              this.beggin();
            }
          });
        }
      } else {
        Swal.fire("Sin texto no hay recorrido!", "", "warning");
      }
    },
    async set_focus() {
      this.disabled = true;
      this.manage_err.not_found_edge = "";

      await this.routes(this.network.nodes[0], 0);
      let options = {
        scale: 3,
        offset: { x: 10, y: 40 },
        locked: true,
        animation: true,
      };

      let focus = this.routesArray;
      console.log(focus);
      for (let index = 0; index < focus.length; index++) {
        await this.sleep(this.speed);
        this.$refs.network.focus(focus[index], options);
      }

      if (this.rules.expresionValida[0](this.textInput)) {
        Swal.fire("Palabra valida para el automata!", "", "success");
      } else {
        Swal.fire("Palabra invalida para el automata!", "", "warning").then(
          (res) => {
            console.log(res);
            if (res.isConfirmed == true || res.isDismissed == true) {
              if (focus.length - 1 != this.textInput.length) {
                if (this.textInput != "?") {
                  Swal.fire({
                    icon: "error",
                    title: "Atención!!",
                    text:
                      "No se encontro un camino '" +
                      this.textInput[focus.length - 1] +
                      "' para avanzar a otro nodo.",
                  });
                }
              }
            }
          }
        );
      }

      this.disabled = false;
      this.routesArray = [];
    },
  },
};
</script>

<style scoped>
@import url("./assets/styles/styles.css");
</style>
