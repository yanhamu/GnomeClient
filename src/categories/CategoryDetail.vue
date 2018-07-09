<template>
  <div class="panel panel-default">
    <div class="panel-body">
        <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
                <input type="text" v-model="category.name" class="form-control" />
            </div>
        </div>
        <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">Parent</label>
            <div class="col-sm-10">
                <select class="form-control" v-model="category.parentId">
                    <option v-for="n in allCategories" :key="n.id" v-bind:value="n.id">{{n.name}}</option>
                </select>
            </div>
        </div>
        <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">Color</label>
            <div class="col-sm-10">
                <input class="form-control" type="text" v-model="category.color" >
                <compact v-model="colors" />
            </div>
{{colors.hex}}
{{hexColor}}
        </div>
        <div class="row">
            <div class="col-sm-offset-9 col-sm-3">
                <input value="update" class="btn btn-primary btn-block" v-on:click="update" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { Compact } from "vue-color";
export default {
  created() {
      this.colors.hex = null;
  },
  data() {
    return {
      colors: {}
    };
  },
  computed: {
    hexColor() {
      this.category.color = this.colors.hex;
      return this.colors.hex;
    }
  },
  props: ["category", "allCategories"],
  methods: {
    update: function() {
      console.log(this.color);
      this.$http.put("categories/" + this.category.id, this.category).then();
    }
  },
  components: { Compact }
};
</script>