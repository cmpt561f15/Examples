export function square(x) {
    return x * x;
}

export function diag(x, y) {
    return Math.sqrt(square(x) + square(y));
}