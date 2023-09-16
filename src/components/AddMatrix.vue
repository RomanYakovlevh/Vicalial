<template>
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
  <div ></div>
  <table ref="matrix" class="matrix" style="border: 1px solid black">
    <tr v-for="i in Number(dim1)" :key="i">
      <td v-for="j in Number(dim2)" :key="j">
        <div class="hld">|{{ i }},{{ j }}|</div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "AddMatrix",
  methods: {
    isNumber(v) {
      const t = !isNaN(Number(v));
      if (t) {
        return true;
      } else {
        return "Only numericals are allowed.";
      }
    },
  },
  data() {
    return {
      dim1: 3,
      dim2: 3,
    };
  },
  emits: [],
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap");
</style>
