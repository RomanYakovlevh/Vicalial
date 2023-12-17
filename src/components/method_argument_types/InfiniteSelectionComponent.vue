<template>
  {{ infiniteSelectionMethod.symbol
  }}<span class="subtext">&lpar;</span>Selected: {{ workspace.list.length
  }}<span class="subtext">&rpar;</span>
</template>

<script>
import { Workspace } from "@/services/Workspace";
import {
  InfiniteSelectionArgument,
  SelectionArgumentResult,
} from "@/services/MatrixMethods";

export default {
  name: "InfiniteSelectionComponent",
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
    infiniteSelectionMethod: {
      type: InfiniteSelectionArgument,
      required: true,
    },
  },
  methods: {
    //This function is supposed to be called from the parent component
    getResult() {
      return new SelectionArgumentResult(this.workspace.list);
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
