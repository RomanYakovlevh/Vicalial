<template>
    <div class="holder">
        <div class="stt">{{ statement.name }} =</div>
        <table ref="matrix" class="matrix"></table>
    </div>
</template>

<script>
export default {
    name: 'StatementComponent',
    mounted() {
        console.log(this.statement)
        const table = this.$refs.matrix
        this.statement.value.forEach(function (line) {
            const row = table.insertRow()
            line.forEach(function (item) {
                const cell = row.insertCell()
                const d = document.createElement('div');
                d.textContent = item
                d.className = 'hld'
                cell.appendChild(d)
                cell.className = "cnt-cell"
            })
        })
    },
    data() {
        return {}
    },
    props: {
        statement: {
            required: true
        }
    }


}
</script>

<style>
.holder {
    background-color: #f0f0f0;
    margin: 1px;
    border-radius: 5px;
    color: #000000;
    align-content: flex-end;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.matrix {
    margin: 1%;
    border: 1px solid #999999;
}

.stt {
    text-align: center;
    margin: 1%;
}

.cnt-cell {
    background-color: white;
}

.hld {
    margin: 3px 8px 3px 8px;
}
</style>
