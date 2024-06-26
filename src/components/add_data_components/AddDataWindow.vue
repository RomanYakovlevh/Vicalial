<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="Manual input">Manual input</v-tab>
      <v-tab value="From file">From file</v-tab>
      <v-tab value="Generator">Generator</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="Manual input">
          <AddMatrix
            @close-dialog="closeDialog"
            @new-statement-added="newStatementAdded"
          />
        </v-window-item>

        <v-window-item value="From file">
          <AddFromFile
            @close-dialog="closeDialog"
            @new-statement-added="newStatementAdded"
          />
        </v-window-item>

        <v-window-item value="Generator">
          <v-card>
            <v-card-subtitle
              >Choose one of the generators, and sepcify dimensions of the
              result.
            </v-card-subtitle>
            <div class="d-flex flex-row">
              <v-text-field
                v-model="dim1"
                class="ma-2"
                label="Height"
                :rules="[isNumber]"
              ></v-text-field>
              <v-text-field
                v-model="dim2"
                class="ma-2"
                label="Width"
                :rules="[isNumber]"
              ></v-text-field>
            </div>

            <v-tabs v-model="text">
              <v-tab value="Ones">Ones</v-tab>
              <v-tab value="Zeros">Zeros</v-tab>
              <v-tab value="Eye">Eye</v-tab>
              <v-tab value="Range">Range</v-tab>
            </v-tabs>
            <v-card-text>
              <v-window v-model="text">
                <v-window-item value="Ones">
                  <MatrixPreview
                    class="ma-3"
                    :matrix="ones(dim1, dim2)"
                  ></MatrixPreview>
                </v-window-item>
                <v-window-item value="Zeros">
                  <MatrixPreview
                    class="ma-3"
                    :matrix="zeros(dim1, dim2)"
                  ></MatrixPreview>
                </v-window-item>
                <v-window-item value="Eye">
                  <MatrixPreview
                    class="ma-3"
                    :matrix="eye(dim1, dim2)"
                  ></MatrixPreview>
                </v-window-item>
                <v-window-item value="Range">
                  <MatrixPreview
                    class="ma-3"
                    :matrix="range(dim1, dim2)"
                  ></MatrixPreview>
                </v-window-item>
              </v-window>
            </v-card-text>

            <v-card-actions class="buttons">
              <v-btn class="btn confirm" @click="addNewMatrixAndCloserWindow"
                >Generate
              </v-btn>
              <v-btn class="btn cancel" @click="closeDialog">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
import { Matrix } from "@/services/Matrix";
import AddFromFile from "@/components/add_data_components/AddFromFile.vue";
import MatrixPreview from "@/components/MatrixPreview.vue";
import AddMatrix from "@/components/add_data_components/AddMatrix.vue";

export default {
  name: "AddDataWindow",
  components: {
    AddFromFile,
    MatrixPreview,
    AddMatrix,
  },
  data: () => ({
    tab: null,
    dim1: "3",
    dim2: "3",
    text: null,
  }),
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    newStatementAdded(statement) {
      this.$emit("newStatementAdded", statement);
    },
    addNewMatrixAndCloserWindow() {
      let statement;
      if (this.text === "Ones") {
        statement = new Matrix(this.ones(this.dim1, this.dim2));
      } else if (this.text === "Zeros") {
        statement = new Matrix(this.zeros(this.dim1, this.dim2));
      } else if (this.text === "Eye") {
        statement = new Matrix(this.eye(this.dim1, this.dim2));
      } else if (this.text === "Range") {
        statement = new Matrix(this.range(this.dim1, this.dim2));
      } else {
        statement = new Matrix(this.ones(this.dim1, this.dim2));
      }

      statement.giveNextName();

      this.$emit("newStatementAdded", statement);
      this.$emit("closeDialog");
    },
    allOfThemAtOnce(h, w) {
      return {
        ones: this.ones(h, w),
        zeros: this.zeros(h, w),
        eye: this.eye(h, w),
        range: this.range(h, w),
      };
    },
    isNumber(v) {
      const t = !isNaN(Number(v));
      if (t) {
        return true;
      } else {
        return "Only numericals are allowed.";
      }
    },
  },
  computed: {
    ones() {
      return (h, w) => {
        return new Array(Number(h)).fill("1").map(() => {
          return new Array(Number(w)).fill("1");
        });
      };
    },
    zeros() {
      return (h, w) => {
        return Array(Number(h))
          .fill("1")
          .map(() => {
            return new Array(Number(w)).fill("0");
          });
      };
    },
    eye() {
      return (h, w) => {
        return new Array(Number(h)).fill("1").map((x, i) => {
          x;
          return new Array(Number(w)).fill("1").map((y, j) => {
            y;
            if (i === j) {
              return "1";
            } else {
              return "0";
            }
          });
        });
      };
    },
    range() {
      return (h, w) => {
        return new Array(Number(h)).fill("1").map(() => {
          return new Array(Number(w)).fill("1").map((y, j) => {
            y;
            return j.toString();
          });
        });
      };
    },
  },
  emits: ["closeDialog", "newStatementAdded"],
};
</script>

<style scoped lang="scss"></style>
