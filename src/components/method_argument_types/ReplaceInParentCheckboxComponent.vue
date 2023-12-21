<template>
  <v-checkbox v-model="replaceInParent" label="In parent">
    <v-tooltip activator="parent" location="top">
      <span
        >If checked, first argument will be replaced inside of its parent with
        result of this function.
      </span>
    </v-tooltip>
  </v-checkbox>
</template>

<script>
import { Workspace } from "@/services/Workspace";
import { ReplaceInParentCheckbox, ReplaceInParentCheckboxResult } from "@/services/MatrixMethods";

export default {
  name: "ReplaceInParentCheckboxComponent",
  data() {
    return {
      replaceInParent: false,
    };
  },
  components: {},
  props: {
    workspace: {
      type: Workspace,
      required: true,
    },
    argumentType: {
      type: ReplaceInParentCheckbox,
      required: true,
    },
  },
  methods: {
    //This function is supposed to be called from the parent component
    getResult() {
      return new ReplaceInParentCheckboxResult(this.replaceInParent)
    },
  },
  computed: {},
  mounted() {},
  emits: {},
};
</script>

<style scoped lang="scss"></style>
