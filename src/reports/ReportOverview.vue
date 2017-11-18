<template>
  <div class="container-fluid">
    <h3>reports</h3>
    <div class="row">
        <div class="col-md-12">
            <report-list 
                v-bind:reports="reports" 
                v-on:select-report="viewReport" 
                v-bind:allowRemove="false"
                v-bind:allowEdit="false"
                v-bind:allowReport="true"/>
        </div>
    </div>
  </div>
</template>

<script>
import ReportList from "./ReportList.vue";

export default {
  data: function() {
    return {
      reports: [],
      report: null
    };
  },
  created: function() {
    this.$http.get("reports").then(res => (this.reports = res.body));
  },
  methods: {
    viewReport: function(r) {
      router.push({ name: "report-view", params: { id: r.id } });
    }
  },
  components: { ReportList }
};
</script>