<template>
  <div class="container-fluid">
    <h3>query list</h3>
    <div class="row">
        <div class="col-sm-12">
            <table class="table table-hover">
                <tbody>
                    <tr v-for="q in queries" :key="q.id" v-on:click="select(q)">
                        <td>{{ q.name }}</td>
                        <td>                    
                            <button class='btn btn-danger' v-on:click.stop="remove(q)">
                                <span class="glyphicon glyphicon-remove" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selected: null,
      queries: []
    };
  },
  created: function() {
    this.$http.get("queries").then(function(res) {
      this.queries = res.data;
    });
  },
  methods: {
    select: function(query) {
      this.$emit("query-selected", query);
    },
    remove: function(query) {
      console.log(query);
      var index = this.queries.indexOf(query);
      this.queries.splice(index, 1);
      this.$http.delete("queries/" + query.queryId).then();
    }
  }
};
</script>

<style>

</style>
