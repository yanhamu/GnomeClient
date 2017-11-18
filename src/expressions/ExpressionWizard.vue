<template>
    <div class="container-fluid">
    <h3>expression builder</h3>
    <div class="row">
        <div class="col-sm-6">
            <expression-list v-on:select-expression="expressionSelected" v-bind:expressions="expressions" />
        </div>
        <div class="col-sm-6">
            <expression-detail v-if="expression" v-bind:expression="expression"/>
        </div>
    </div>
  </div>
</template>

<script>
import ExpressionList from "./ExpressionList.vue";
import ExpressionDetail from "./ExpressionDetail.vue";

export default {
  data: function() {
    return {
      account: [],
      expression: null,
      expressions: []
    };
  },
  created: function() {
    this.$http.get("expressions").then(res=>{
      this.expressions = res.body;
    });
  },
  methods: {
    expressionSelected: function(expression) {
      this.expression = expression;
    }
  },
  components: { ExpressionList, ExpressionDetail }
};
</script>