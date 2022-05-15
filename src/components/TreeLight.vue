<template>
	<div :id="uuid" :class="['light', { 'is-off': !on }]">
		<div
			:class="`circle ${getColor}`"
			:style="getStyles"
			@click="e => toggleController()"></div>
		<light-controller v-if="isControllerVisible" :index="index" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core';
import { v4 as uuidv4 } from 'uuid';
import store, { availableColors, TLightColor } from '@/store';

import LightController from '@/controllers/LightController.vue';

export default defineComponent({
	name: 'TreeLight',

	components: {
		LightController,
	},

	setup() {
		const controller = ref<HTMLDivElement | null>(null);

		return {
			controller,
		};
	},

	data() {
		return {
			controlling: false,
			uuid: uuidv4(),
		};
	},

	props: {
		index: {
			type: Number,
			required: true,
		},

		on: {
			type: Boolean,
			default: true,
		},
	},

	computed: {
		getStyles() {
			const styles: Record<string, string> = {};
			const intensity =
				this.getIntensity * this.getDirection +
				(this.getDirection > 0 ? 0 : 1);

			styles.backgroundColor = `hsla(${
				availableColors[this.getColor].h
			}, ${availableColors[this.getColor].s}%, ${
				this.getLuminance * intensity
			}%, ${intensity * (this.getLuminance / 100)})`;

			styles.width = `${this.getSize / 2}px`;
			styles.height = `${this.getSize}px`;

			styles.boxShadow = `0px 0px ${20 * intensity}px ${
				styles.backgroundColor
			}`;

			return styles;
		},

		getIntensity(): number {
			return store.getters.ANIMATION.curve;
		},

		getLuminance(): number {
			return store.getters.MAX_LUMINANCE;
		},

		getDirection(): number {
			return store.getters.GET_LIGHTS[this.index].direction;
		},

		getColor(): TLightColor {
			return store.getters.GET_LIGHTS[this.index].color;
		},

		getSize(): number {
			return store.getters.GET_LIGHTS[this.index].size;
		},

		isControllerVisible(): boolean {
			return store.getters.GET_LIGHTS[this.index].controlling.main;
		},
	},

	methods: {
		toggleController() {
			store.commit.TOGGLE_CONTROLLER_TO_LIGHT({
				idx: this.index,
				controller: this.uuid,
			});
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/tree-light.scss';
</style>