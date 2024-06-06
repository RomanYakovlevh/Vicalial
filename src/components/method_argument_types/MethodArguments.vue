<template>
  <v-sheet variant="tonal" class="my-2 ma-sheet">
    <div class="d-flex flex-row">
      <v-card-title>{{ matrixMethod.name() }}</v-card-title>
      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            size="small"
            variant="outlined"
            class="align-self-center ma-3 ml-auto"
          >
            Description ⓘ
          </v-btn>
        </template>
        {{ matrixMethod.desription() }}
      </v-tooltip>
    </div>

    <component
      v-for="(matrixMethodArgument, index) in matrixMethod.arguments()"
      :key="index"
      :is="matrixMethodArgument.getComponentName()"
      :workspace="workspace"
      :argumentType="matrixMethodArgument"
      @getResult="(x) => getResultFromChild(index, x)"
    ></component>

    <v-card-actions>
      <v-btn density="compact" @click="onApplyClick">Apply</v-btn>
    </v-card-actions>
  </v-sheet>
  <v-dialog v-model="exportMatrixDialog" width="auto">
    <ExportMatrix
      @close-dialog="onCloseDialog"
      :matrix="selectFormatted()"
    ></ExportMatrix>
  </v-dialog>
</template>

<script>
import { Workspace } from "@/services/Workspace";
import ExportMatrix from "@/components/ExportMatrix.vue";
import { Matrix } from "@/services/Matrix";
import { getFormattedMatrix } from "@/services/HelperFunctions";
import {
  tempWayToParseArgumentResults,
  MatrixMethod,
} from "@/services/MatrixMethods";
import LimitedSelectionComponent from "./LimitedSelectionComponent.vue";
import InfiniteSelectionComponent from "./InfiniteSelectionComponent.vue";
import ReplaceInParentCheckboxComponent from "./ReplaceInParentCheckboxComponent.vue";
import SetBackgroundColorChoiceComponent
    from "@/components/method_argument_types/SetBackgroundColorChoiceComponent.vue";
import LinearProgrammingTableViewComponent
    from "@/components/method_argument_types/LinearProgrammingTableViewComponent.vue";

export default {
  name: "MethodArguments",
  components: {
    ExportMatrix,
    LimitedSelectionComponent,
    InfiniteSelectionComponent,
    ReplaceInParentCheckboxComponent,
    SetBackgroundColorChoiceComponent,
    LinearProgrammingTableViewComponent
  },
  props: {
    matrixMethod: { required: true, type: MatrixMethod },
    workspace: {
      type: Workspace,
      required: true,
    },
  },
  data() {
    return {
      model: [null, null, null, null],
      exportMatrixDialog: false,
      getResultStorage: new Map(),
    };
  },
  methods: {
    onApplyClick() {
      try {
        if (this.matrixMethod.name() === "Export") {
          this.$data.exportMatrixDialog = true;
        } else {
          const results = Array.from(this.getResultStorage.values()).map((x) => x())
          console.log(" results: ");
          console.log(results);
          tempWayToParseArgumentResults(this.matrixMethod, results).forEach(
            (element) => {
              if (element.type === 'WorkspaceVersionUpdateFlag') {
                this.$emit("statementUpdate")
              } else {
                this.$emit("statementAdded", element);
              }
            }
          );
          this.$emit("clearWorkspace");
        }
      } catch (e) {
        this.$store.commit("setOpenSnackBar", {
          title: "Operation is impossible",
          moreInfo: e.message,
          kind: "Error",
        });
      }
    },
    getResultFromChild(index, getResult) {
      this.getResultStorage.set(index, getResult);
    },
    selectFormatted() {
      const matrix = new Matrix(this.workspace.list[0].asList2D());
      return getFormattedMatrix(this.$store.state.formatStyle, matrix);
    },
    onCloseDialog() {
      this.$data.exportMatrixDialog = false;
      this.$emit("clearWorkspace");
    },
    selectionExplanationMessage() {
      this.$store.commit("setOpenSnackBar", {
        title:
          "To add selection to the argument, press on any matrix cell, round buttons to select row or column, or square button to select whole matrix.",
        moreInfo: "",
        kind: "Explanation",
      });
    },
  },
  emits: ["statementAdded", "clearWorkspace", "statementUpdate"],
};
</script>

<style scoped lang="scss">
.ma-sheet {
  border-radius: 5px;
  background-color: #ddd;
  min-width: 25%;
}

.subtext {
  color: #aaa;
  align-content: start;
}
</style>
