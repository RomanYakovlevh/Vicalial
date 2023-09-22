<template>
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
  <div></div>
  <table ref="matrix" class="matrix" style="border: 1px solid black">
    <tr v-for="i in Number(dim1)" :key="i">
      <td v-for="j in Number(dim2)" :key="j">
        <div class="hld">
          <v-text-field></v-text-field>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "AddMatrix",
  methods: {
  },
  data() {
    return {
      dim1: 3,
      dim2: 3,
      rules: {
        isNumber: v => {
          const t = isNaN(Number(v))
          console.log(t)
          if (t) {
            return 'Only numericals are allowed.'
          } else {
            return true
          }
        },
      },
    };
  },
  emits: [],
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap");
</style>