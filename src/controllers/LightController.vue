<template>
	<div class="light-controller" data-controller="light">
		<div class="controller">
			<label>Color</label>
			<div
				:class="`color-picker ${color}`"
				@click="() => toggleSelector()">
				<div v-if="isColorControllerVisible" class="color-selector">
					<button
						v-for="(color, idx) of colors"
						:key="idx"
						:class="color"
						@click="() => onUpdateColor(color)">
						{{ color }}
					</button>
				</div>
			</div>
		</div>
		<div class="controller">
			<label>Size</label>
			<span class="size-input">{{ size }}</span>
			<div class="size-buttons">
				<div class="minus" @click="decreaseSize">
					<svg
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg">
						<title />
						<g id="Fill">
							<rect height="2" width="26" x="3" y="15" />
						</g>
					</svg>
				</div>
				<div class="plus" @click="increaseSize">
					<svg
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg">
						<title />
						<g id="Fill">
							<polygon
								points="29 15 17 15 17 3 15 3 15 15 3 15 3 17 15 17 15 28 17 28 17 17 29 17 29 15" />
						</g>
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import store, { availableColors, TLightColor } from '@/store';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
	name: 'LightController',

	data() {
		return {
			colors: Object.keys(availableColors),
		};
	},

	props: {
		index: {
			type: Number,
			required: true,
		},
	},

	computed: {
		color: {
			get(): TLightColor {
				return store.getters.GET_LIGHTS[this.index].color;
			},

			set(color: TLightColor) {
				store.commit.UPDATE_LIGHT({
					idx: this.index,
					light: { color },
				});
			},
		},

		size: {
			get(): number {
				return store.getters.GET_LIGHTS[this.index].size;
			},

			set(size: number) {
				store.commit.UPDATE_LIGHT({
					idx: this.index,
					light: { size },
				});
			},
		},

		isColorControllerVisible(): boolean {
			return store.getters.GET_LIGHTS[this.index].controlling.color;
		},
	},

	methods: {
		increaseSize() {
			if (this.size >= 48) return;
			this.size = this.size + 1;
		},

		decreaseSize() {
			if (this.size <= 0) return;
			this.size = this.size - 1;
		},

		toggleSelector() {
			store.commit.TOGGLE_COLOR_CONTROLLER_TO_LIGHT(this.index);
		},

		onUpdateColor(color: string) {
			this.color = color as TLightColor;
		},
	},
});
</script>