<template>
    <h1>Typography</h1>
    <div style="font-family: Avenir, Helvetica, Arial, sans-serif;">font-family: Avenir, Helvetica, Arial, sans-serif; - for
        most purposes</div>
    <div class="robot-mono">font-family: 'Roboto Mono', monospace; - for numerical/scientific data</div>
    <h1>Iconography</h1>
    Temporarily using unicode-emojis.
    Already used symbols: ✖ ⏺ ◼
    <h1>Color palette</h1>
    <div style="align-content: center;">
        <div class="colors-ffe8a3"></div>
        <div class="colors-ffcd29"></div>
        <div class="colors-e0ac00"></div>
        <div class="colors-f0f0f0"></div>
        <div class="colors-d6d5d2"></div>
    </div>
    <h1>Component examples</h1>
    <h2>Toolbar</h2>
    <div class="bottom-bar">
        <button class="btn" >Button</button>
        <button class="btn" >Second Button</button>
        <button class="btn">Third Button</button>
    </div>
    <h2>Tabs</h2>
    <img alt="Tabs screenshot" :src="imageSrc" />
</template>
<script>
import tabsImage from '@/assets/tabs.png';

export default {
  data() {
    return {
      imageSrc: tabsImage
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

.roboto-mono {
    font-family: 'Roboto Mono', monospace;
}

.colors-ffe8a3 {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: #ffe8a3;
    margin: auto;
}
.colors-ffcd29 {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: #ffcd29;
    margin: auto;
}
.colors-e0ac00 {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: #e0ac00;
    margin: auto;
}
.colors-f0f0f0 {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: #f0f0f0;
    margin: auto;
}
.colors-d6d5d2{
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: #d6d5d2;
    margin: auto;
}

.bottom-bar {
    left: 0;
    width:60%;
    background-color: #ffe8a3;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 30px;
    margin: auto;

    .btn {
      background-color: #ffcd29;
      color: black;
      border: none;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 18px;
      cursor: pointer;
      margin-right: 0.5%;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;

      &:hover {
        background-color: #e0ac00;
      }
    }

    .frmt-as-cbc-text {
      font-size: 18px;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      margin: 0.5%;
      color: black;
    }
  }
</style>