import { Config } from '../main';
import { methodRepository } from "../repositories/method"
import { evaluate, derivative, multiply, det } from 'mathjs'
export class apiUseCase {
    private methodRepository: methodRepository;
    constructor(methodRepo: methodRepository) {
        this.methodRepository = methodRepo;

    }

    public listAllMethod = async () => {
        return this.methodRepository.listAllMethod();
    }

    public updateMethodById = async (methodId: string, available: boolean) => {
        return this.methodRepository.updateMethodById({ methodId, available });
    }

    public checkValidMethod = async (latex: string, xl: number, xr: number) => {
        if (latex == undefined || latex == '') {
            throw new Error('Latex is undefined')
        }
        if (evaluate(latex, { x: xl }) * evaluate(latex, { x: xr }) > 0) {
            throw new Error(`Invalid range at xl = ${xl} and xr = ${xr}`)
        }
        return true

    }

    public bisection = async (latex: string, xl: number, xr: number) => {
        const calXm = (xl: number, xr: number) => {
            return (xl + xr) / 2;
        }
        const e = 0.00000001;

        const fx = String.raw`${latex}`;
        try {
            this.checkValidMethod(fx, xl, xr);
        } catch (error) {
            throw error;
        }
        var xm = calXm(xl, xr);
        var x0 = 0
        var i = 0;
        let ans = [{ xm: xm, xl: xl, xr: xr, iteration: 0, error: Math.abs(((xm - x0) / xm) * 100) }];

        while (Math.abs(((xm - x0) / xm) * 100) > e && i < 500) {
            i++;
            x0 = xm;
            if (evaluate(fx, { x: xm }) * evaluate(fx, { x: xr }) < 0) {
                xl = xm;
            }
            else {
                xr = xm;
            }
            xm = calXm(xl, xr)


            ans.push({ xm: xm, xl: xl, xr: xr, iteration: i, error: Math.abs(((xm - x0) / xm) * 100) });

        }
        return { result: xm, ans, approxValue: this.approxFunction(fx) }
    }

    public taylorSeries = async (latex: string, x0: number, n: number, x: number) => {
        const calFactorial = (n: number): number => {
            if (n == 0) return 1;
            return n * calFactorial(n - 1);
        }

        const calDiff = (latex: string, i: number): string => {
            const fx = String.raw`${latex}`;

            if (i == 1) {
                let diff = derivative(fx, 'x').toString()
                return diff
            }
            return calDiff(derivative(latex, 'x').toString(), i - 1);
        }

        const fx = String.raw`${latex}`;

        var sum = 0;
        let ans = []
        let preSum = 0;
        for (let i = 0; i < n; i++) {
            if (i == 0) {
                sum += evaluate(fx, { x: x0 });
                ans.push({ iteration: i, approximate: evaluate(fx, { x: x0 }), error: 0 })
                continue;
            }
            let diffEq = calDiff(fx, i)

            sum += (evaluate(diffEq, { x: x0 }) * (Math.pow(x - x0, i) / calFactorial(i)));
            console.log(evaluate(diffEq, { x: x0 }), x);

            if (i != 0) {
                ans.push({ iteration: i, approximate: sum, error: Math.abs(((sum - preSum) / sum) * 100) })

            }
            preSum = sum
        }

        return { result: sum, ans: ans, approxValue: this.approxFunction(fx) }
    }

    public falsePosition = async (body: { latex: string, xl: number, xr: number }) => {
        const calXm = (xl: number, xr: number) => {
            return (xl * evaluate(fx, { x: xr }) - xr * evaluate(fx, { x: xl })) / (evaluate(fx, { x: xr }) - evaluate(fx, { x: xl }));
        }

        var { latex, xl, xr } = body;
        const e = 0.00000001;

        const fx = String.raw`${latex}`;
        try {
            await this.checkValidMethod(fx, xl, xr);
        } catch (error) {
            throw error;
        }
        var xm = calXm(xl, xr);
        var x0 = 0
        var i = 0;
        let ans = [{ xm: xm, xl: xl, xr: xr, iteration: 0, error: Math.abs(((xm - x0) / xm) * 100) }];

        while (Math.abs(((xm - x0) / xm) * 100) > e && i < 500) {
            i++;
            x0 = xm;
            if (evaluate(fx, { x: xm }) * evaluate(fx, { x: xr }) < 0) {
                xl = xm;
            }
            else {
                xr = xm;
            }
            xm = calXm(xl, xr);


            ans.push({ xm: xm, xl: xl, xr: xr, iteration: i, error: Math.abs(((xm - x0) / xm) * 100) });

        }
        return { result: xm, ans, approxValue: this.approxFunction(fx) }
    }

    public onePoint = async (latex: string, x0: number) => {
        const e = 0.00000001;
        const fx = String.raw`${latex}`;

        var x1 = evaluate(fx, { x: x0 });
        var i = 0;
        let ans = [{ x0: x0, iteration: i, error: Math.abs(((x1 - x0) / x1) * 100) }];

        while (Math.abs(((x1 - x0) / x1) * 100) > e && i < 500) {
            i++;
            x0 = x1;
            x1 = evaluate(fx, { x: x0 });

            ans.push({ x0: x0, iteration: i, error: Math.abs(((x1 - x0) / x1) * 100) });

        }
        return { result: x0, ans, approxValue: this.approxFunction(fx) }
    }

    public newtonRaphson = async (latex: string, x0: number) => {
        const e = 0.00000001;
        const fx = String.raw`${latex}`;
        const diffFx = derivative(fx, 'x').toString();

        var x1 = x0 - evaluate(fx, { x: x0 }) / evaluate(diffFx, { x: x0 });
        var i = 0;
        let ans = [{ x0: x0, iteration: i, error: Math.abs(((x1 - x0) / x1) * 100) }];

        while (Math.abs(((x1 - x0) / x1) * 100) > e && i < 500) {
            i++;
            x0 = x1;
            x1 = x0 - evaluate(fx, { x: x0 }) / evaluate(diffFx, { x: x0 });

            ans.push({ x0: x0, iteration: i, error: Math.abs(((x1 - x0) / x1) * 100) });

        }
        return { result: x0, ans, approxValue: this.approxFunction(fx) }
    }

    public secant = async (latex: string, x0: number, x1: number) => {

        const e = 0.00000001;
        const fx = String.raw`${latex}`;

        var x2 = x1 - evaluate(fx, { x: x1 }) * (x1 - x0) / (evaluate(fx, { x: x1 }) - evaluate(fx, { x: x0 }));
        var i = 0;
        let ans = [{ x0: x0, x1: x1, iteration: i, error: Math.abs(((x2 - x1) / x2) * 100) }];

        while (Math.abs(((x2 - x1) / x2) * 100) > e && i < 500) {
            i++;
            x0 = x1;
            x1 = x2;
            x2 = x1 - evaluate(fx, { x: x1 }) * (x1 - x0) / (evaluate(fx, { x: x1 }) - evaluate(fx, { x: x0 }));

            ans.push({ x0: x0, x1: x1, iteration: i, error: Math.abs(((x2 - x1) / x2) * 100) });

        }
        return { result: x1, ans, approxValue: this.approxFunction(fx) }
    }

    public approxFunction = (fx: string, leftBound: number = -20, rightBound: number = 20) => {
        interface approx {
            iteration: number,
            value: number
        }
        var approxArr: approx[] = []
        for (let i = leftBound; i <= rightBound; i++) {
            let res: approx = {
                iteration: i,
                value: evaluate(fx, { x: i })
            }
            approxArr.push(res)
        }
        return approxArr
    }

    public cramersRule = async (matrix: number[][], vector: number[]) => {

        var detA = det(matrix);
        var ans = [];
        for (let i = 0; i < matrix.length; i++) {
            var tempMatrix = matrix.map((row, index1) => {
                return row.map((col, index2) => {
                    if (index2 == i) {
                        return vector[index1]
                    }
                    return col
                })
            })
            var detAi = det(tempMatrix);

            ans.push(detAi / detA)
        }
        console.log(multiply(matrix, ans));

        return { result: ans }
    }
}