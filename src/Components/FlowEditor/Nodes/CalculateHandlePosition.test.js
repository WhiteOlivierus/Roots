import { CalculateHandlePosition } from "./CalculateHandlePosition";

const MapRange = (r, fn) =>
    Array(r)
        .fill(0)
        .map((_, i) => fn(i));

describe("Node handle positions", () => {
    describe("Without padding", () => {
        test("1 handles", () => {
            var values = [];
            MapRange(1, (i) => {
                values.push(CalculateHandlePosition(1, i));
            });

            expect(values).toStrictEqual([50]);
        });

        test("2 handles", () => {
            var values = [];
            MapRange(2, (i) => {
                values.push(CalculateHandlePosition(2, i));
            });

            expect(values).toStrictEqual([0, 100]);
        });

        test("3 handles", () => {
            var values = [];

            MapRange(3, (i) => {
                values.push(CalculateHandlePosition(3, i));
            });

            expect(values).toStrictEqual([0, 50, 100]);
        });
    });

    describe("With padding", () => {
        test("1 handles", () => {
            var values = [];
            MapRange(1, (i) => {
                values.push(CalculateHandlePosition(1, i, 25));
            });

            expect(values).toStrictEqual([50]);
        });

        test("2 handles", () => {
            var values = [];
            MapRange(2, (i) => {
                values.push(CalculateHandlePosition(2, i, 25));
            });

            expect(values).toStrictEqual([25, 75]);
        });

        test("3 handles", () => {
            var values = [];

            MapRange(3, (i) => {
                values.push(CalculateHandlePosition(3, i, 25));
            });

            expect(values).toStrictEqual([25, 50, 75]);
        });
    });
});
