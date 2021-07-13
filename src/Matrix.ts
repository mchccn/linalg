import { CreateArray, CreateMatrix, GenericMatrix } from "./types";
import { YouSuckAtMathError } from "./utils";
import { Vector2 } from "./Vector2";

export class Matrix<Width extends number, Height extends number> extends Array<CreateArray<Width>> {
    public constructor(public readonly width: Width, public readonly height: Height, contents?: CreateMatrix<Width, Height>) {
        super();

        if (width < 0 || height < 0) throw new YouSuckAtMathError("matrices cannot have a negative width or height.");

        for (let y = 0; y < height; y++) {
            this[y] = new Array<number>(width).fill(0) as CreateArray<Width>;
        }

        if (contents) this.forEach((row, y) => row.forEach((_, x) => (this[y][x] = contents[y][x])));
    }

    public determinant(): number {
        const { width, height } = this as { width: number; height: number };

        if (width !== height) return NaN;

        if (width === 1) return this[0][0];

        if (width === 2) return this[0][0] * this[1][1]! - this[0][1]! * this[1][0];

        return this[0].reduce((r, e, i) => {
            const m = this.slice(1).map((c) => c.filter((_, j) => i != j));

            return r + (-1) ** (i + 2) * e * new Matrix(m.length, m[0].length, m as GenericMatrix).determinant();
        }, 0);
    }

    public static fromVector2(a: Vector2, b: Vector2) {
        return new Matrix(2, 2, [[...a.toArray()], [...b.toArray()]]);
    }
}
