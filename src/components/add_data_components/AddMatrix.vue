<template>
  <v-card>
    <v-card-text>
      <div class="d-flex flex-row">
        <v-text-field
          :rules="[rules.isNumber]"
          v-model="dim1"
          class="ma-2"
          label="Height"
        ></v-text-field>
        <v-text-field
          :rules="[rules.isNumber]"
          v-model="dim2"
          class="ma-2"
          label="Width"
        ></v-text-field>
      </div>
      <div style="justify-content: center; display: flex">
        <table ref="matrix" class="matrix">
          <tr v-for="i in Number(dim1Verified)" :key="i">
            <td v-for="j in Number(dim2Verified)" :key="j">
              <div class="hld">
                <input
                  v-model="this.dataMatrix[i - 1][j - 1]"
                  class="dataMatrixCellInput"
                  placeholder="0"
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </v-card-text>
    <v-card-actions class="buttons">
      <v-btn class="btn confirm" @click="addNewMatrixAndCloserWindow"
        >Confirm
      </v-btn>
      <v-btn class="btn cancel" @click="closeDialog">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Matrix } from "@/services/Matrix";
import { evaluateMathWithPython } from "@/services/HelperFunctions";

export default {
  name: "AddMatrix",
  methods: {
    addNewMatrixAndCloserWindow: function () {
      try {
        const list2D = this.dataMatrix.slice(0, this.dim1Verified).map((row) =>
          row.slice(0, this.dim2Verified).map((x) => {
            if (x === "") {
              return 0;
            } else {
              return evaluateMathWithPython(x.replace(/\^/g, "**"));
            }
          })
        );

        const matrix = (new Matrix(list2D)).giveNextName();

        this.$emit("newStatementAdded", matrix);
        this.$emit("closeDialog");
      } catch (e) {
        console.log(e.message);
      }
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
  watch: {
    dim1(newValue) {
      if (!isNaN(Number(newValue))) {
        if (this.dataMatrix.length < newValue) {
          this.dataMatrix.push(
            ...Array.from({ length: newValue - this.dataMatrix.length }, () =>
              Array.from({ length: this.dim2Verified }, () => "")
            )
          );
        }
        this.dim1Verified = newValue;
      }
    },
    dim2(newValue) {
      if (!isNaN(Number(newValue))) {
        const oldWidth = this.dataMatrix[0].length;
        if (oldWidth < newValue) {
          this.dataMatrix.map((value) =>
            value.push(...Array.from({ length: newValue - oldWidth }, () => ""))
          );
        }
        this.dim2Verified = newValue;
      }
    },
  },
  data() {
    return {
      dim1: 3,
      dim2: 3,
      dim1Verified: 3,
      dim2Verified: 3,
      dataMatrix: Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => "")
      ),
      rules: {
        isNumber: (v) => {
          const t = isNaN(Number(v));
          if (t) {
            return "Only numericals are allowed.";
          } else {
            return true;
          }
        },
      },
    };
  },
  emits: ["closeDialog", "newStatementAdded"],
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap");

.matrix {
  margin: 0% 1% 1% 1%;
  background-color: #ddd;
  font-family: "Roboto Mono", monospace;
  height: fit-content;
  align-self: center;
  border-radius: 5px;
}

.hld {
  margin: 1px 1px 1px 1px;
}

.dataMatrixCellInput {
  width: 5em;
  border-radius: 5px;
  text-align: center;
  background-color: white;
}
</style>
