<template>
	<div class="slider">
		<div class="container" @mousedown="onMouseDown" ref="container">
			<label>
				Velocity
				<span>{{ modelValue }}</span>
			</label>
			<div class="bar">
				<div class="icon" ref="icon">
					<span v-if="dragging">{{ modelValue }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core';

export default defineComponent({
	name: 'RangeSliderInput',

	setup() {
		const container = ref<HTMLDivElement | null>(null);
		const icon = ref<HTMLDivElement | null>(null);

		return {
			container,
			icon,
		};
	},

	mounted() {
		this.range.x = this.container?.offsetLeft || 0;
		this.range.width = this.container?.offsetWidth || 0;
		this.range.size = this.icon?.offsetWidth || 0;

		if (this.icon)
			this.icon.style.left = `${
				this.range.width * (this.modelValue / 100) - this.range.size
			}px`;

		document.addEventListener('mouseup', this.onMouseUp.bind(this));
		document.addEventListener('mousemove', this.render.bind(this));
		document.addEventListener('touchend', this.onMouseUp.bind(this), {
			passive: false,
		});
		document.addEventListener('touchmove', this.render.bind(this), {
			passive: false,
		});

		if (this.container)
			this.container.addEventListener(
				'touchstart',
				this.onMouseDown.bind(this),
				{ passive: false }
			);
	},

	data() {
		return {
			range: {
				x: 0,
				width: 0,
				size: 0,
			},
			dragging: false,
		};
	},

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

		onMouseDown(e: any): void {
			e.preventDefault();
			this.dragging = true;
			this.render(e);
		},

		onMouseUp(e: any): void {
			e.preventDefault();
			this.dragging = false;
		},

		render(e: any): void {
			const x = this.getX(e);

			if (
				this.dragging &&
				this.icon &&
				x >= this.range.x &&
				x <= this.range.x + this.range.width
			) {
				e.preventDefault();
				e.stopPropagation();

				this.icon.style.left = `${
					x - this.range.x - this.range.size
				}px`;

				this.$emit(
					'update:modelValue',
					Math.round(((x - this.range.x) / this.range.width) * 100)
				);
			}
		},

		getX(e: any): number {
			if (e.pageX) return e.pageX;
			if (e.changedTouched && e.changedTouched[0])
				return e.changedTouched[0].pageX;
			if (e.targetTouches && e.targetTouches[0])
				return e.targetTouches[0].pageX;
			return 0;
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/controllers/range-slider-input.scss';
</style>