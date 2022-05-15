/**
 * Calculate curve occording to k,
 * where k must be a number which
 * indicates displacement of x
 *
 * curve math to y axis as y = a sin((x-h)/b) + k
 * @see https://www.desmos.com/calculator/litkgx7vkd
 * @param {number} k
 * @returns {number}
 */
export const getCurve = (k = 50): number => {
	return 0.5 * Math.sin(-k / 1) + 0.5;
};

/**
 * Calculate the current velocity.
 *
 * @param {number} v Between 0 and 100
 * @param {number} max Maximum velocity
 * @returns {number}
 */
export const calcVelocity = (v: number, max = 0.2) => {
	return max * (v / 100);
};
