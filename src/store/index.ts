import { createDirectStore } from 'direct-vuex';

export type TAnimationData = {
	velocity: number;
	frame: number;
	curve: number;
	id: number | null;
	playing: boolean;
};

export type TLuminanceData = {
	max: number;
};

export interface IRootState {
	anim: TAnimationData;
	lum: TLuminanceData;
	dropdown: Element | null;
}

const defaultState: IRootState = {
	anim: {
		velocity: 100,
		frame: 0,
		curve: 0,
		id: null as null | number,
		playing: false,
	},
	lum: {
		max: 60,
	},
	dropdown: null,
};

const { store, rootActionContext, rootGetterContext } =
	createDirectStore({
		state: defaultState,
		getters: {
			MAX_LUMINANCE: (state: IRootState): number => state.lum.max,
			ANIMATION: (state: IRootState): TAnimationData => state.anim,
			DROPDOWN: (state: IRootState): Element | null => state.dropdown,
		},
		mutations: {
			CHANGE_MAX_LUMINANCE: (
				state: IRootState,
				max: number
			): void => {
				state.lum.max = max;
			},
			UPDATE_ANIMATION: (
				state: IRootState,
				anim: Partial<TAnimationData>
			): void => {
				state.anim = { ...state.anim, ...anim };
			},
			UPDATE_DROPDOWN: (
				state: IRootState,
				dropdown: Element | null
			): void => {
				state.dropdown = dropdown;
			},
		},
	});

export default store;
export { rootActionContext, rootGetterContext };
