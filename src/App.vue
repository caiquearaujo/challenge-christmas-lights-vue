<template>
	<tree-branch />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TreeBranch from '@/components/TreeBranch.vue';

export default defineComponent({
	name: 'App',

	components: { TreeBranch },

	data() {
		return {
			animation: {
				maxVelocity: 0.01,
				minVelocity: 0.005,
			},
		};
	},
});
</script>