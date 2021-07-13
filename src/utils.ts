export function clone<A extends any[]>(array: A): A {
    return [...array] as A;
}

export class YouSuckAtMathError extends Error {
    public readonly name = "You suck at math";

    public constructor(public readonly message: string = "") {
        super(message);
    }
}
