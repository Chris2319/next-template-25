// Schema validation types

export type Schema<T> = {
    [K in keyof T]: (obj: T) => SchemaResponse;
}

export type SchemaResponse = {
    valid: boolean;
    message: string;
}

export type ValidationResult<T> = {
    valid: boolean;
    results: {
        [K in keyof T]?: {
            valid: boolean;
            message: string;
        }
    };
}

