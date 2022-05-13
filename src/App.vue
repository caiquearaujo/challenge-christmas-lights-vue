<template>
	<div class="tree">
		<tree-light color="red" />
		<tree-light color="green" />
		<tree-light color="blue" />
		<tree-light color="yellow" />
		<tree-light color="red" />
		<tree-light color="green" />
		<tree-light color="blue" />
		<tree-light color="yellow" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TreeLight from '@/components/TreeLight.vue';

export default defineComponent({
	name: 'App',

	components: { TreeLight },
});
</script>

<style lang="scss">
@import '@/styles/components/tree.scss';
</style>
