<template>
    {{
        argumentType.symbol
    }}<span class="subtext">&lpar;</span>Selected: {{ workspace.list.length
  }}<span class="subtext">&rpar;</span>
</template>

<script>
import { Workspace } from "@/services/Workspace";
import {
  InfiniteSelectionArgumentDescription,
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
    argumentType: {
      type: InfiniteSelectionArgumentDescription,
      required: true,
    },
  },
  methods: {
    //This function is supposed to be called from the parent component
    getResult() {
      return new SelectionArgumentResult(this.workspace.list, []);
    },
  },
  computed: {},
  mounted() {
    this.$emit('getResult', () => this.getResult())
  },
  emits: ["getResult"],
};
</script>

<style scoped lang="scss"></style>
