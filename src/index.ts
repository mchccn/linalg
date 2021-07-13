import { Matrix } from "./Matrix";
import { Vector2 } from "./Vector2";
import { Vector3 } from "./Vector3";

const linalg = Object.freeze({ Matrix, Vector2, Vector3 });

export { Matrix, Vector2, Vector3 };
export default linalg;

module.exports = linalg;
exports.default = linalg;
