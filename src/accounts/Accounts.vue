<template>
<div class = "container-fluid">
    <h3>accounts</h3>

    <table class="table table-hover">
      <thead>
        <tr>
          <td>account name</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in accounts" :key="account.id">
          <td>
            <router-link :to = "'/accounts/' + account.id + '/transactions/'">{{ account.name }}</router-link>
          </td>
          <td>
            <router-link class="btn btn-primary" :to = "'/accounts/' + account.id">
              <span class="glyphicon glyphicon-pencil" />
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <input class='btn btn-primary' value='create new' v-on:click="create"/>
</div>
</template>

<script>
export default {
  name: "accounts",
  created: function() {
    this.$http.get("accounts").then(res => {
      this.accounts = res.body;
    });
  },
  methods: {
    create: function() {
      var data = { name: "new account", token: "" };
      this.$http.post("accounts", data).then(res => {
        var location = "/accounts/" + res.body.id;
        this.$router.push(location);
      });
    }
  },
  data: function() {
    return {
      accounts: []
    };
  },
  components: {}
};
</script>