<template>
  <div class="subtext my-1 mx-3" v-if="limitedSelectionMethod.appendagesOn">
    you can write coefficients in white boxes
  </div>
  <span
    v-if="
      limitedSelectionMethod.symbolPosition === methodSymbolPostion().Prefix
    "
    >{{ limitedSelectionMethod.symbol }}</span
  >
  <span class="subtext">&lpar;</span>
  <span v-for="i in limitedSelectionMethod.argumentNumberLimit" :key="i"
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
      <div v-if="i >= workspace.list.length">Select...</div>
      <div class="text-none text-subtitle-1" v-if="i < workspace.list.length">
        <input
          style="
            width: 40px;
            background-color: white;
            border-radius: 4px;
            padding-left: 4px;
          "
          class="ma-1"
          v-model="appendagesModel[i]"
          v-if="limitedSelectionMethod.appendagesOn"
        />{{ workspace.list[i].getDescription() }}
      </div>
    </button>
    <span
      v-if="
        limitedSelectionMethod.symbolPosition ===
          methodSymbolPostion().AfterFirstArgument && i === 1
      "
    >
      <span class="subtext">&rpar;</span> {{ limitedSelectionMethod.symbol }}
      <span class="subtext">&lpar;</span></span
    >
  </span>
  <span class="subtext">&rpar;</span>
  <span
    v-if="
      limitedSelectionMethod.symbolPosition === methodSymbolPostion().Suffix
    "
    >{{ limitedSelectionMethod.symbol }}</span
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
    limitedSelectionMethod: {
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
        this.limitedSelectionMethod.argumentNumberLimit >
        this.workspace.list.length
      ) {
        throw new Error("Not enough selected arguments.");
      } else {
        let res = new SelectionArgumentResult([]);
        for (
          let i = 0;
          i < this.limitedSelectionMethod.argumentNumberLimit;
          i++
        ) {
          res.values.push(this.workspace.list[i]);
        }
      }
    },
  },
  computed: {},
  created() {
    this.appendagesModel = [].fill(
      null,
      0,
      this.limitedSelectionMethod.argumentNumberLimit
    );
  },
  emits: {},
};
</script>

<style scoped lang="scss"></style>
