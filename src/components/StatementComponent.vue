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

        const buttonRow = table.insertRow()
        for (var i = 0; i < this.statement.matrix.columnsAmount; i++) {
            const btn = buttonRow.insertCell()
            const b = document.createElement('button')
            btn.appendChild(b)
            b.textContent = '⏺'
            b.className = 'btn-statement-component'
        }

        this.statement.matrix.asList2D.forEach(function (line) {
            const row = table.insertRow()
            line.forEach(function (item) {
                const cell = row.insertCell()
                const d = document.createElement('div');
                d.textContent = item
                d.className = 'hld'
                cell.appendChild(d)
                cell.className = "cnt-cell"
            })

            const btn = row.insertCell()
            const b = document.createElement('button')
            btn.appendChild(b)
            b.textContent = '⏺'
            b.className = 'btn-statement-component'
        })
    },
    data() {
        return {
            rowButtonsAmount: 0,
            colButtonsAmount: 0
        }
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
    margin: 0% 1% 1% 1%;
    border: 0px solid #999999;
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

.btn-statement-component{
    border: none;
    border-radius: 5px;
    width: 2em;
    height: 2em;
}

.btn-statement-component:hover {
    background-color: #d6d5d2;
}
</style>
