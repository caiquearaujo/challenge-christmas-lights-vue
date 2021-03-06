import { createDirectStore } from 'direct-vuex';

export const availableColors = {
	blue: { h: 178, s: 100, l: 60 },
	green: { h: 122, s: 100, l: 60 },
	red: { h: 0, s: 100, l: 60 },
	yellow: { h: 49, s: 100, l: 60 },
};

export type TLightColor = keyof typeof availableColors;

export type TAnimationData = {
	velocity: number;
	frame: number;
	curve: number;
	id: number | null;
	playing: boolean;
};

export type TLightNode = {
	color: TLightColor;
	size: number;
	direction: number;
	controlling: {
		main: boolean;
		color: boolean;
	};
};

export type TLuminanceData = {
	max: number;
};

export interface IRootState {
	anim: TAnimationData;
	lum: TLuminanceData;
	dropdown: string | null;
	lights: Array<TLightNode>;
}

export const defaultState: IRootState = {
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
	lights: [],
};

export const getters = {
	MAX_LUMINANCE: (state: IRootState): number => state.lum.max,
	ANIMATION: (state: IRootState): TAnimationData => state.anim,
	DROPDOWN: (state: IRootState): string | null => state.dropdown,
	GET_LIGHTS: (state: IRootState): Array<TLightNode> => state.lights,
	GET_LIGHT: (
		state: IRootState,
		payload: { idx: number }
	): TLightNode | null => state.lights[payload.idx] ?? null,
};

export const mutations = {
	CHANGE_MAX_LUMINANCE: (state: IRootState, max: number): void => {
		state.lum.max = max;
	},
	UPDATE_ANIMATION: (
		state: IRootState,
		anim: Partial<TAnimationData>
	): void => {
		state.anim = { ...state.anim, ...anim };
	},
	PUSH_LIGHT: (state: IRootState, light: Partial<TLightNode>): void => {
		state.lights.push({
			color: 'blue',
			size: 24,
			direction: 1,
			controlling: {
				main: false,
				color: false,
			},
			...light,
		});
	},
	UPDATE_LIGHT: (
		state: IRootState,
		payload: { idx: number; light: Partial<TLightNode> }
	): void => {
		if (!state.lights[payload.idx]) return;

		state.lights[payload.idx] = {
			...state.lights[payload.idx],
			...payload.light,
		};
	},
	POP_LIGHT: (state: IRootState): void => {
		state.lights.pop();
	},
	CLOSE_ALL_LIGHT_CONTROLLERS: (state: IRootState): void => {
		if (state.lights.length === 0) return;

		state.dropdown = null;

		state.lights = state.lights.map(light => ({
			...light,
			controlling: { main: false, color: false },
		}));
	},
	TOGGLE_CONTROLLER_TO_LIGHT: (
		state: IRootState,
		payload: { idx: number; controller: string }
	): void => {
		if (state.lights.length === 0 || !state.lights[payload.idx])
			return;

		const cnState = state.lights[payload.idx].controlling.main;
		mutations.CLOSE_ALL_LIGHT_CONTROLLERS(state);

		state.lights[payload.idx].controlling.main = !cnState;
		if (!cnState) state.dropdown = payload.controller;
	},
	TOGGLE_COLOR_CONTROLLER_TO_LIGHT: (
		state: IRootState,
		idx: number
	): void => {
		if (state.lights.length === 0 || !state.lights[idx]) return;

		const cnState = state.lights[idx].controlling.color;

		state.lights = state.lights.map(light => ({
			...light,
			controlling: { ...light.controlling, color: false },
		}));

		state.lights[idx].controlling.color = !cnState;
	},
};

const { store, rootActionContext, rootGetterContext } =
	createDirectStore({
		state: defaultState,
		getters,
		mutations,
	});

export default store;
export { rootActionContext, rootGetterContext };
