<template>
    <v-sheet variant="tonal" class="my-2 ma-sheet">
        <div class="d-flex flex-row">
            <v-card-title>{{ matrixMethod.name() }}</v-card-title>
            <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" size="small" variant="outlined" class="align-self-center ma-3 ml-auto">Description
                        ⓘ</v-btn>
                </template>
                {{ matrixMethod.desription() }}
            </v-tooltip>
        </div>
        <div class="d-flex flex-row ml-3">
            <v-checkbox v-if="matrixMethod.arguments().replaceInParent" v-model="replaceInParent" label="In parent"
                hide-details></v-checkbox>
            <v-checkbox v-if="matrixMethod.arguments().mutateSelf" v-model="mutateSelf" label="Mutate self"
                hide-details></v-checkbox>
        </div>

        <div v-if="matrixMethod.arguments().selections === -1">
            <div class="mr-2">
                Selections: {{ workspace.list.length }}
            </div>
        </div>

        <div v-if="matrixMethod.arguments().selections >= 0">
            <span v-if="matrixMethod.arguments().selections === 2 && matrixMethod.symbol().type === 1">
                <span class="subtext">&lpar;</span>
                <button size="small" variant="tonal" class="ma-1"
                    style="background-color: #ccc; border-radius: 4px; padding: 5px 10px 5px 10px">
                    <div v-if="0 >= workspace.list.length">
                        Select...
                    </div>
                    <div class="text-none text-subtitle-1" v-if="0 < workspace.list.length">
                        <input style="width: 40px; background-color: white; border-radius: 4px; padding-left: 4px;"
                            class="ma-1" />{{ workspace.list[0].getDescription() }}
                    </div>
                </button>
                <span class="subtext">&rpar;</span> {{ matrixMethod.symbol().value }} <span class="subtext">&lpar;</span>
                <button size="small" variant="tonal" class="ma-1"
                    style="background-color: #ccc; border-radius: 4px; padding: 5px 10px 5px 10px">
                    <div v-if="1 >= workspace.list.length">
                        Select...
                    </div>
                    <div class="text-none text-subtitle-1" v-if="1 < workspace.list.length">
                        <input style="width: 40px; background-color: white; border-radius: 4px; padding-left: 4px;"
                            class="ma-1" />{{ workspace.list[1].getDescription() }}
                    </div>
                </button>
                <span class="subtext">&rpar;</span>
            </span>
            <span v-if="matrixMethod.symbol().type !== 1">
                <span v-if="matrixMethod.symbol().type === 0">
                    {{ matrixMethod.symbol().value }}
                </span>
                <span class="subtext">&lpar;</span>
                <span v-for="i in matrixMethod.arguments().selections" :key="i">
                    <button size="small" variant="tonal" class="ma-1"
                        style="background-color: #ccc; border-radius: 4px; padding: 5px 10px 5px 10px">
                        <div v-if="i > workspace.list.length">
                            Select...
                        </div>
                        <div class="text-none text-subtitle-1" v-if="i <= workspace.list.length">
                            <input style="width: 40px; background-color: white; border-radius: 4px; padding-left: 4px;"
                                class="ma-1" />{{ workspace.list[i - 1].getDescription() }}
                        </div>
                    </button>
                    <span v-if="i < matrixMethod.arguments().selections">, </span>
                </span>
                <span class="subtext">&rpar;</span>
                <span v-if="matrixMethod.symbol().type === 2">
                    {{ matrixMethod.symbol().value }}
                </span>
            </span>
        </div>

        <v-card-actions>
            <v-btn density="compact" @click="onApplyClick">Apply</v-btn>
        </v-card-actions>
    </v-sheet>
</template>

<script>
import { Workspace } from '@/services/Workspace';

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
    name: 'MethodArguments',
    props: {
        matrixMethod: { required: true },
        workspace: {
            type: Workspace,
            required: true,
        }
    },
    data() {
        return {
            model: "sds",
            replaceInParent: false,
            mutateSelf: false
        }
    },
    methods: {
        onApplyClick() {
            this.matrixMethod.execute(this.workspace).forEach(element => {
                this.$emit('statementAdded', element)
            });
            this.$emit('clearWorkspace')
        }
    },
    emits: ['statementAdded', 'clearWorkspace']
}
</script>

<style scoped lang="scss">
.ma-sheet {
    border-radius: 5px;
    background-color: #ddd;
    min-width: 25%;
}

.subtext {
    color: #bbb;
    align-content: start;
}
</style>