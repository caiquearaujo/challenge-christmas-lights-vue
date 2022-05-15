<template>
	<div class="light-controller" data-controller="light">
		<div class="controller">
			<label>Color</label>
			<div
				:class="`color-picker ${color}`"
				@click="() => toggleSelector()">
				<div v-if="colorSelector" class="color-selector">
					<button class="blue" @click="() => changeColor('blue')">
						blue
					</button>
					<button class="green" @click="() => changeColor('green')">
						green
					</button>
					<button class="red" @click="() => changeColor('red')">
						red
					</button>
					<button
						class="yellow"
						@click="() => changeColor('yellow')">
						yellow
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
import {
	availableColors,
	TTreeLightColor,
} from '@/components/TreeLight.vue';
import { defineComponent, PropType } from '@vue/runtime-core';

export default defineComponent({
	name: 'LightController',

	emits: ['updateColor', 'updateSize'],

	data() {
		return {
			colorSelector: false,
		};
	},

	props: {
		index: {
			type: Number,
			required: true,
		},

		color: {
			type: String as PropType<TTreeLightColor>,
			default: 'red',
			validator: (i: TTreeLightColor) =>
				Object.keys(availableColors).includes(i),
		},

		size: {
			type: Number,
			default: 24,
			validator: (i: number) => i >= 0 && i <= 48,
		},
	},

	methods: {
		increaseSize() {
			if (this.size >= 48) return;
			this.$emit('updateSize', this.index, this.size + 1);
		},

		decreaseSize() {
			if (this.size <= 0) return;
			this.$emit('updateSize', this.index, this.size - 1);
		},

		changeColor(color: TTreeLightColor) {
			this.$emit('updateColor', this.index, color);
		},

		toggleSelector() {
			this.colorSelector = !this.colorSelector;
		},
	},
});
</script>