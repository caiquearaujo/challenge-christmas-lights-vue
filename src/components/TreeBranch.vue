<template>
	<div class="tree">
		<tree-light
			v-for="(node, idx) of nodes"
			:key="idx"
			:color="node.color"
			:direction="node.direction"
			:intensity="curve"
			:on="!off" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import TreeLight, {
	availableColors,
	TTreeLightColor,
} from './TreeLight.vue';

export default defineComponent({
	name: 'TreeBranch',

	components: {
		TreeLight,
	},

	created() {
		const colors = Object.keys(availableColors) as TTreeLightColor[];
		let colorFlag = 0;

		for (let i = 0; i < this.lights; i++) {
			this.nodes.push({
				color: colors[colorFlag],
				direction: (i + 1) % 2 === 0 ? -1 : 1,
			});

			colorFlag++;
			if (colorFlag >= colors.length) colorFlag = 0;
		}
	},

	data() {
		return {
			nodes: [] as Array<{
				color: TTreeLightColor;
				direction: number;
			}>,
		};
	},

	props: {
		lights: {
			type: Number,
			default: 7,
		},

		curve: {
			type: Number,
			required: true,
		},

		off: {
			type: Boolean,
			default: false,
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/tree.scss';
</style>
