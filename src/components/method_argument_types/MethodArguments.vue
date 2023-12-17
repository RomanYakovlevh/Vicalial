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
      class="d-flex flex-row ml-3"
      v-if="matrixMethod.arguments().replaceInParent"
    >
      <v-checkbox
        v-model="replaceInParent"
        @mouseover="inParentTooltip = true"
        @mouseout="inParentTooltip = false"
        label="In parent"
        v-on="on"
      >
        <v-tooltip activator="parent" location="top">
          <span
            >If checked, first argument will be replaced inside of its parent
            with result of this function.
          </span>
        </v-tooltip>
      </v-checkbox>
    </div>

    <div
      v-for="(matrixMethodArgument, index) in matrixMethod.arguments()"
      :key="index"
    >
      <component
        :is="matrixMethodArgument.getComponentName()"
        ref="`matrixMethodArguments-${index}`"
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
import { MatrixMethod } from "@/services/MatrixMethods";

/*
        <div v-if="matrixMethod.arguments().selections >= 0">
            <v-btn size="small" variant="tonal" v-for="i in matrixMethod.arguments().selections" :key="i" class="ma-1">
                <div v-if="i > workspace.list.length">Select...</div>
                <div class="text-none text-subtitle-1" v-if="i <= workspace.list.length">{{
                    workspace.list[i - 1].getDescription() }}</div>
            </v-btn>
        </div>
        <div v-if="matrixMethod.arguments().selections === -1">
            Selections: {{ workspace.list.length }}
        </div>
        <v-text-field variant="solo" flat="true" class="ma-2" density="compact" style="height: 3em;" v-model="model"
            append-inner-icon="mdi-navigation-variant"><div class="subtext mr-2">M3 = </div> </v-text-field>
*/

export default {
  name: "MethodArguments",
  components: {
    ExportMatrix,
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
      replaceInParent: false,
      exportMatrixDialog: false,
      inParentTooltip: false,
      refsToMatrixMethodArguments: [], // Array to store references to child components
    };
  },
  methods: {
    onApplyClick() {
      try {
        if (this.matrixMethod.name() === "Export") {
          this.$data.exportMatrixDialog = true;
        } else {
          this.matrixMethod
            .execute(
              this.workspace,
              this.$data.replaceInParent,
              this.$data.model
            )
            .forEach((element) => {
              this.$emit("statementAdded", element);
            });
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
    this.refsToMatrixMethodArguments = Array.from({ length: this.matrixMethod.arguments().length }, (_, index) => this.$refs[`matrixMethodArguments-${index}`]);
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
