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

    <div
      v-for="(matrixMethodArgument, index) in matrixMethod.arguments()"
      :key="index"
    >
      <component
        :is="matrixMethodArgument.getComponentName()"
        ref="`matrixMethodArguments-${index}`"
        :workspace="workspace"
        :argumentType="matrixMethodArgument"
      ></component>
    </div>

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

export default {
  name: "MethodArguments",
  components: {
    ExportMatrix,
    LimitedSelectionComponent,
    InfiniteSelectionComponent,
    ReplaceInParentCheckboxComponent,
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
      refsToMatrixMethodArguments: [], // Array to store references to child components
    };
  },
  methods: {
    onApplyClick() {
      try {
        if (this.matrixMethod.name() === "Export") {
          this.$data.exportMatrixDialog = true;
        } else {
          const results = this.refsToMatrixMethodArguments.map((x) =>
            x.getResult()
          );
          tempWayToParseArgumentResults(this.matrixMethod, results).forEach(
            (element) => {
              this.$emit("statementAdded", element);
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
  mounted() {
    this.refsToMatrixMethodArguments = Array.from(
      { length: this.matrixMethod.arguments().length },
      (_, index) => this.$refs[`matrixMethodArguments-${index}`]
    );
    console.log(this.refsToMatrixMethodArguments)
  },
  emits: ["statementAdded", "clearWorkspace"],
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
