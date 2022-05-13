<template>
	<div class="slider">
		<div class="container">
			<label>
				Velocity
				<span>{{ modelValue }}</span>
			</label>
			<input
				type="range"
				:value="modelValue"
				:min="min"
				:max="max"
				@input="onChange" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
	name: 'RangeSliderInput',

	emits: [
		// when input value is updated
		'update:modelValue',
	],

	props: {
		// Input value
		modelValue: {
			type: Number,
			default: 0,
		},

		min: {
			type: Number,
			default: 0,
		},

		max: {
			type: Number,
			default: 100,
		},
	},

	methods: {
		onChange(e: any): void {
			this.$emit('update:modelValue', parseInt(e.target.value));
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/controllers/range-slider-input.scss';
</style>