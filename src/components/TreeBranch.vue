<template>
	<div class="tree">
		<tree-light
			v-for="(node, idx) of nodes"
			:key="idx"
			:color="node.color"
			:direction="node.direction"
			:intensity="curve"
			:size="node.size"
			:on="!off">
			<light-controller
				:index="idx"
				:color="node.color"
				:size="node.size"
				@update-size="onUpdateSize"
				@update-color="onUpdateColor" />
		</tree-light>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import TreeLight, {
	availableColors,
	TTreeLightColor,
} from './TreeLight.vue';

import LightController from '@/controllers/LightController.vue';

export default defineComponent({
	name: 'TreeBranch',

	components: {
		LightController,
		TreeLight,
	},

	created() {
		const colors = Object.keys(availableColors) as TTreeLightColor[];
		let colorFlag = 0;

		for (let i = 0; i < this.lights; i++) {
			this.nodes.push({
				color: colors[colorFlag],
				size: 24,
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
				size: number;
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

	methods: {
		onUpdateSize(i: number, s: number) {
			this.nodes[i].size = s;
		},

		onUpdateColor(i: number, c: TTreeLightColor) {
			this.nodes[i].color = c;
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/tree.scss';
@import '@/styles/controllers/light-controller.scss';
</style>
