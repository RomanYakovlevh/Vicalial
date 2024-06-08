<template>
  <v-divider class="mx-4 my-2" />
  <div>objective function</div>
  <div>
    <span  class="d-flex justify-center">
      <table class="matrix">
        <td
          class="column"
          v-for="(item, itemIndex) in workspace.list[0].asList2D()[0]"
          :key="itemIndex"
        >
          <div class="hld">
            {{ item }}<span v-if="itemIndex === 0"> = </span>
          </div>
        </td>
      </table>
    </span>
    <span class="d-flex justify-center">➔ min</span>
  </div>

  <div>constraints</div>
  <div class="justify-center d-flex">
    <table class="matrix">
      <tr
        v-for="(row, rowIndex) in workspace.list[0]
          .asList2D()
          .slice(1, workspace.list[0].asList2D().length)"
        :key="rowIndex"
      >
        <td class="column" v-for="(item, itemIndex) in row" :key="itemIndex">
          <div class="hld">
            {{ item }}<span v-if="itemIndex === 0"> ≤ </span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { Workspace } from "@/services/Workspace";
import {
  LinearProgrammingTableViewDescription,
  LinearProgrammingTableViewResult,
} from "@/services/MatrixMethods";

export default {
  name: "LinearProgrammingTableViewComponent",
  data() {
    return {};
  },
  components: {},
  props: {
    workspace: {
      type: Workspace,
      required: true,
    },
    argumentType: {
      type: LinearProgrammingTableViewDescription,
      required: true,
    },
  },
  methods: {
    //This function is supposed to be called from the parent component
    getResult() {
      return new LinearProgrammingTableViewResult();
    },
  },
  computed: {},
  mounted() {
    this.$emit("getResult", () => this.getResult());
  },
  emits: ["getResult"],
};
</script>

<style scoped lang="scss">
.matrix {
  margin: 0% 1% 1% 1%;
  border: 1px solid black;
  font-family: "Roboto Mono", monospace;
  height: fit-content;
  align-self: center;
}

.hld {
  margin: 3px 8px 3px 8px;
}

.column {
  border-left: 1px solid #999999;
  border-right: 1px solid #999999;
}
</style>
