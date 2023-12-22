<template>
  <div>
    <v-btn>
    <span v-if="color===''">Press to select color...</span>
    <span v-else>Selected color: <v-chip :style="getColorBoxStyle(color)" class="mr-1 ml-1"></v-chip> {{color}}</span>
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="(item, index) in getColors()"
            :key="index"
            :value="index"
          >
            <span class="d-flex flex-row" @click="setColor(item)">
              <v-chip :style="getColorBoxStyle(item)" class="mr-4"></v-chip>
              <v-list-item-title>{{ item }}</v-list-item-title>
            </span>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </div>
</template>

<script>
import { Workspace } from "@/services/Workspace";
import {
  SetBackgroundColorChoice,
  SetBackgroundColorChoiceResult,
} from "@/services/MatrixMethods";

export default {
  name: "SetBackgroundColorChoiceComponent",
  data() {
    return {
      color: "",
    };
  },
  components: {},
  props: {
    workspace: {
      type: Workspace,
      required: true,
    },
    argumentType: {
      type: SetBackgroundColorChoice,
      required: true,
    },
  },
  methods: {
    //This function is supposed to be called from the parent component
    getResult() {
      if (this.color === "") {
        return new SetBackgroundColorChoiceResult("white");
      }
      return new SetBackgroundColorChoiceResult(this.color);
    },
    getColors() {
      return [
        "white",
        "black",
        "grey",
        "yellow",
        "blue",
        "green",
        "red",
        "pink",
        "orange",
        "cyan",
      ];
    },
    getColorBoxStyle(color) {
      return {
        "background-color": color,
      };
    },
    setColor(color) {
      this.color = color;
    },
  },
  computed: {},
  mounted() {
    this.$emit("getResult", () => this.getResult());
  },
  emits: ["getResult"],
};
</script>

<style scoped lang="scss"></style>
