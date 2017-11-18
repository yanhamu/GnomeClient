<template>
  <div class="container-fluid">
    <h3>transactions</h3>
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-body">
                    <transaction-filter v-on:filter-set="filterSet"></transaction-filter>
                </div>
            </div>
        </div>
    </div>
        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default" v-if="transactions">
                    <div class="panel-body">
                        <transaction-list v-bind:transactions="transactions" v-on:select-transaction="selectTransaction"></transaction-list>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="panel panel-default" v-if="selectedTransaction">
                    <div class="panel-body">
                        <transaction-detail v-bind:transaction="selectedTransaction"></transaction-detail>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TransactionFilter from "./TransactionFilter.vue";
import TransactionList from "./TransactionList.vue";
import TransactionDetail from "./TransactionDetail.vue";

export default {
  props: ["id"],
  data: function() {
    return {
      transactions: null,
      selectedTransaction: null
    };
  },
  methods: {
    filterSet(data) {
      var url = "transactions/query";
      this.$http.post(url, data).then(res => {
        this.transactions = res.body;
      });
    },
    selectTransaction(data) {
      this.selectedTransaction = data;
    }
  },
  components: { TransactionFilter, TransactionList, TransactionDetail }
};
</script>