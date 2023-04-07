import { Connection } from 'mongoose';
import { methodRepository, MethodRepository, I_MethodDocument } from '../repositories/method';
import { apiUseCase } from './apiUseCase';
describe('methodRepository', () => {
    let mockClient: Connection;
    let repository: methodRepository;
    let useCase: apiUseCase;
    beforeEach(() => {
        mockClient = jest.genMockFromModule<Connection>('mongoose');
        // Mock the `model` method of the `Connection` class to return a mock `Model` object
        mockClient.model = jest.fn().mockReturnValue({
            find: jest.fn().mockResolvedValue([{ methodName: 'method1', available: true, processTime: 100 }]),
            findOneAndUpdate: jest.fn().mockResolvedValue({ _id: '123', methodName: 'method1', available: true, processTime: 100 })
        });
        repository = new methodRepository(mockClient);
        useCase = new apiUseCase(repository);
    });

    it('should return a list of all methods', async () => {
        const methods = await repository.listAllMethod();


        expect(methods.length).toBe(1);
        expect(methods[0].methodName).toBe('method1');
    });

    it('bisection', async () => {
        let value = await useCase.bisection("x^2-4",
            0,
            1000);
        expect(value.result).toBe(2.000000000066393);
    });

    it('falsePosition', async () => {
        let value = await useCase.falsePosition(
            {
                latex: "x^2-4",
                xl: 0,
                xr: 10
            }
        );
        expect(value.result).toBe(1.9999999996328377);
    });

    it('onePointIteration', async () => {
        let value = await useCase.onePoint(
            "2(1-x^2)/3",
            0
        );
        expect(value.result).toBe(0.5000000000241461);
    });

    it('newtonRaphson', async () => {
        let value = await useCase.newtonRaphson(
            "x^2-7",
            2
        );
        expect(value.result).toBe(2.6457513110646933);
    });

    it('secant', async () => {
        let value = await useCase.secant(
            "x^2-7",
            2,
            3
        );
        expect(value.result).toBe(2.6457513110645245);
    });
});