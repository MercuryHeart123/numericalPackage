import { Connection } from 'mongoose';
import mongoose from 'mongoose';

export interface MethodRepository {
    listAllMethod(): Promise<I_MethodDocument[]>;
    updateMethodById(body: { methodId: string, available: boolean }): Promise<I_MethodDocument>;

}

export interface I_MethodDocument extends mongoose.Document {
    methodName: string;
    available: boolean;
    processTime: number;
}

export class methodRepository implements MethodRepository {
    private MethodModel: mongoose.Model<I_MethodDocument>;
    private client: Connection
    constructor(client: Connection) {
        this.client = client;
        const MethodSchema: mongoose.Schema<I_MethodDocument> = new mongoose.Schema({
            methodName: { type: String, index: true, unique: true },
            available: { type: Boolean, default: true },
            processTime: { type: Number, default: 0 }
        });

        this.MethodModel = this.client.model<I_MethodDocument>('Method', MethodSchema);
    }

    async listAllMethod(): Promise<I_MethodDocument[]> {
        return this.MethodModel.find();
    }

    async updateMethodById(body: { methodId: string, available: boolean }): Promise<I_MethodDocument> {
        let update = { available: body.available };
        let updated = await this.MethodModel.findOneAndUpdate({
            _id: body.methodId
        },
            update,
            { new: true }
        );
        if (!updated) {
            throw new Error('Method not found');
        }
        return updated;
    }

}