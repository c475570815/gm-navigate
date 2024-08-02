<template>
  <el-form ref="form" :model="settingData" label-width="80px">
    <el-form-item label="链接类型">
      <el-select v-model="settingData.linkType" @change="linkTypeChange" filterable placeholder="请选择">
        <el-option
            v-for="item in linkTypeOptions"
            :key="item.type"
            :label="item.type"
            :value="item.type">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script setup>
import linkTypeOptions from "@/global/linkConfig";
</script>
<script scoped>

export default {
  props: {
    currentLinkType: {type: String, default: 'default', require: false}
  },
  components: {},
  computed: {},
  data() {
    return {
      settingData: {
        linkType: this.currentLinkType
      }
    }
  },
  methods: {
    linkTypeChange() {
      localStorage.setItem('gm-navigate-type', this.settingData.linkType)
      this.$emit("reloadLink")
    }
  },
  mounted() {

  },
  created() {
  }
}
</script>

<style scoped>

</style>
