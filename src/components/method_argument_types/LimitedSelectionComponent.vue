<template>
  <div class="subtext my-1 mx-3" v-if="argumentType.appendagesOn">
    you can write coefficients in white boxes
  </div>
  <span
    v-if="
      argumentType.symbolPosition === methodSymbolPostion().Prefix
    "
    >{{ argumentType.symbol }}</span
  >
  <span class="subtext">&lpar;</span>
  <span v-for="i in argumentType.argumentNumberLimit" :key="i"
    ><button
      size="small"
      variant="tonal"
      class="ma-1"
      @click="selectionExplanationMessage()"
      style="
        background-color: #ccc;
        border-radius: 4px;
        padding: 5px 10px 5px 10px;
      "
    >
      <div v-if="i-1 >= workspace.list.length">Select...</div>
      <div class="text-none text-subtitle-1" v-if="i-1 < workspace.list.length">
        <input
          style="
            width: 40px;
            background-color: white;
            border-radius: 4px;
            padding-left: 4px;
          "
          class="ma-1"
          v-model="appendagesModel[i-1]"
          v-if="argumentType.appendagesOn"
        />{{ workspace.list[i-1].getDescription() }}
      </div>
    </button>
    <span
      v-if="
        argumentType.symbolPosition ===
          methodSymbolPostion().AfterFirstArgument && i === 1
      "
    >
      <span class="subtext">&rpar;</span> {{ argumentType.symbol }}
      <span class="subtext">&lpar;</span></span
    >
  </span>
  <span class="subtext">&rpar;</span>
  <span
    v-if="
      argumentType.symbolPosition === methodSymbolPostion().Suffix
    "
    >{{ argumentType.symbol }}</span
  >
</template>

<script>
import { Workspace } from "@/services/Workspace";
import {
  LimitedSelectionArgument,
  MethodSymbolPosition,
  SelectionArgumentResult,
} from "@/services/MatrixMethods";

export default {
  name: "LimitedSelectionComponent",
  data() {
    return {
      appendagesModel: [],
    };
  },
  components: {},
  props: {
    workspace: {
      type: Workspace,
      required: true,
    },
    argumentType: {
      type: LimitedSelectionArgument,
      required: true,
    },
  },
  methods: {
    selectionExplanationMessage() {
      this.$store.commit("setOpenSnackBar", {
        title:
          "To add selection to the argument, press on any matrix cell, round buttons to select row or column, or square button to select whole matrix.",
        moreInfo: "",
        kind: "Explanation",
      });
    },
    methodSymbolPostion() {
      // vue template does not allow to directly call MethodSymbolPosition in HTML
      return MethodSymbolPosition;
    },
    //This function is supposed to be called from the parent component
    getResult() {
      if (
        this.argumentType.argumentNumberLimit >
        this.workspace.list.length
      ) {
        throw new Error("Not enough selected arguments.");
      } else {
        let res = new SelectionArgumentResult([], this.appendagesModel);
        for (
          let i = 0;
          i < this.argumentType.argumentNumberLimit;
          i++
        ) {
          res.values.push(this.workspace.list[i]);
        }
      }
    },
  },
  computed: {},
  mounted() {
    this.appendagesModel = [].fill(
      null,
      0,
      this.argumentType.argumentNumberLimit
    );
  },
  emits: {},
};
</script>

<style scoped lang="scss"></style>
