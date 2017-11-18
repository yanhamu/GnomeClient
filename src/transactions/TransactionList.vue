<template>
<div class="container-fluid">
        <h4>transaction list</h4>
        <table class="table table-striped table-hover table-responsive table-condensed">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Categories</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="t in transactions.rows" :key="t.id" v-on:click="selectTransaction(t)">
                    <td>{{t.row.date | formatDate}}</td>
                    <td>{{t.row.amount}}</td>
                    <td> <span class="label" v-for="c in t.categories" :key="c.id" v-bind:style="{ backgroundColor : c.color}">{{ c.name }}</span> </td>
                </tr>
            </tbody>
        </table>
    </div>    
</template>

<script>
export default {
  props: ["transactions"],
  methods: {
    selectTransaction(data) {
      this.$emit("select-transaction", data);
    }
  }
};
</script>