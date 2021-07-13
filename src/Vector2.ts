import { Matrix } from "./Matrix";
import { clone } from "./utils";

export class Vector2 {
    private coords: [x: number, y: number];

    public constructor(x?: number, y?: number) {
        this.coords = [x ?? 0, y ?? 0];
    }

    public *[Symbol.iterator]() {
        yield* this.coords;
    }

    public add(vector: Vector2): this;
    public add(scalar: number): this;
    public add(x: number, y: number): this;
    public add(x: Vector2 | number, y?: number): this {
        if (Vector2.isVector2(x)) {
            this.x += x.x;
            this.y += x.y;
        } else {
            this.x += x;
            this.y += y ?? x;
        }

        return this;
    }

    public subtract(vector: Vector2): this;
    public subtract(scalar: number): this;
    public subtract(x: number, y: number): this;
    public subtract(x: Vector2 | number, y?: number): this {
        if (Vector2.isVector2(x)) {
            this.x -= x.x;
            this.y -= x.y;
        } else {
            this.x -= x;
            this.y -= y ?? x;
        }

        return this;
    }

    public multiply(vector: Vector2): this;
    public multiply(scalar: number): this;
    public multiply(x: number, y: number): this;
    public multiply(x: Vector2 | number, y?: number): this {
        if (Vector2.isVector2(x)) {
            this.x *= x.x;
            this.y *= x.y;
        } else {
            this.x *= x;
            this.y *= y ?? x;
        }

        return this;
    }

    public divide(vector: Vector2): this;
    public divide(scalar: number): this;
    public divide(x: number, y: number): this;
    public divide(x: Vector2 | number, y?: number): this {
        if (Vector2.isVector2(x)) {
            this.x /= x.x;
            this.y /= x.y;
        } else {
            this.x /= x;
            this.y /= y ?? x;
        }

        return this;
    }

    public negate() {
        this.multiply(-1);

        return this;
    }

    public angleTo(vector: Vector2) {
        return Math.acos((this.dot(vector) / this.magnitude) * vector.magnitude);
    }

    public dot(vector: Vector2) {
        return this.x * vector.x + this.y * vector.y;
    }

    public cross(vector: Vector2) {
        return this.determinant(vector);
    }

    public determinant(vector: Vector2) {
        return new Matrix(2, 2, [[...this.coords], [...vector.coords]]).determinant();
    }

    public get min() {
        return Math.min(...this.coords);
    }

    public get max() {
        return Math.max(...this.coords);
    }

    public normalize() {
        this.divide(this.magnitude);

        return this;
    }

    public equals(vector: Vector2) {
        return vector.x === this.x && vector.y === this.y;
    }

    public toString() {
        return `Vector2 (${this.coords.join(", ")})`;
    }

    public clone() {
        return new Vector2(...this.coords);
    }

    public toArray() {
        return clone(this.coords);
    }

    public toPoint() {
        const { x, y } = this;

        return { x, y };
    }

    public get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public get length() {
        return this.magnitude;
    }

    public get x() {
        return this.coords[0];
    }

    public set x(v: number) {
        this.coords[0] = v;
    }

    public get y() {
        return this.coords[1];
    }

    public set y(v: number) {
        this.coords[1] = v;
    }

    public get 0() {
        return this.coords[0];
    }

    public set 0(v: number) {
        this.coords[0] = v;
    }

    public get 1() {
        return this.coords[1];
    }

    public set 1(v: number) {
        this.coords[1] = v;
    }

    public static isVector2(v: any): v is Vector2 {
        return v instanceof Vector2;
    }
}
