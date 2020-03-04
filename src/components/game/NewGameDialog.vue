<template>
    <div>
        <v-dialog v-model="dialog" width="600">
            <template v-slot:activator="{ on }">
                <v-btn :disabled="disabled" v-on="on">+Novo Jogo</v-btn>
            </template>
            <v-card>
                <v-card-title primary-title>Novo Jogo</v-card-title>
                <v-row class="row-style">
                    <v-col v-for="(number, index) in numbers" :key="index">                      
                        <v-text-field
                            min="1"
                            max="60"
                            type="number"
                            v-model.number="numbers[index]"
                            :key="index"
                            :error="!_isUnique(number)"></v-text-field>
                    </v-col>                    
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        @click="addGame()"
                        :disabled="!_numbersOk()">
                        Confirmar
                    </v-btn>
                    <v-btn 
                        @click="_closeDialog"
                        color="warning">
                        Cancelar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>        
    </div>
</template>

<script>
import { randomNumbers } from '../../helpers/random';

export default {
    name: 'new-game-dialog',
    methods: {
        randomNumbers,
        addGame: function() {
            this.$emit('newGameAdded', [...this.numbers]);
            this._closeDialog();
        },   
        _closeDialog: function() {
            this.numbers = this._newNumbers();
            this.dialog = false;
        },  
        _newNumbers: function() {
            return this.randomNumbers(1, 60, 6);
        },
        _numbersOk: function() {
            const numbers = this.numbers;
            let numbersOk = true;

            numbers.forEach(number => {
                if (!this._isUnique(number)) {
                    numbersOk = false;
                }
            });

            return numbersOk;
        },
        _isUnique: function(numberToCheck) {
            return (
                numberToCheck > 0  && 
                numberToCheck < 61 &&
                this.numbers.filter(number => number === numberToCheck).length === 1);
        }
    },
    created() {
        this.numbers = this._newNumbers();
    },
    data() {
        return {
            dialog: false,
            numbers: []
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    }
}
</script>

<style>
.invalid {
  color: red;
}
.row-style {
    padding: 15px;
}
</style>