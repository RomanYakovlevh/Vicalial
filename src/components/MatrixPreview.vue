<template>
    <table ref="matrix" class="matrix">
        <tr v-for="(row, rowIndex) in matrix" :key="rowIndex">
            <td v-for="(item, colIndex) in row"
                :key="rowIndex * matrix.columnsAmount + colIndex">
                <div class="hld">{{ item }}</div>
            </td>
        </tr>
    </table>
</template>

<script>

export default {
    name: 'MatrixPreview',
    props: {
        matrix: { required: true }
    }
}
</script>

<style scoped lang="scss">
.matrix {
    margin: 0% 1% 1% 1%;
    border: 0px solid #999999;
    font-family: 'Roboto Mono', monospace;
    height: fit-content;
    align-self: center;
}

.row-col-selector-btn {
    border: none;
    border-radius: 5px;
    width: 2em;
    height: 2em;
}

.row-col-selector-btn:hover {
    background-color: #d6d5d2;
}

.hld {
    margin: 3px 8px 3px 8px;
}
</style>