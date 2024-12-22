export class Maybe<T> {
    public data: T;

    public isSuccess: boolean;

    public isException: boolean;

    public exceptionMessage: string;
}