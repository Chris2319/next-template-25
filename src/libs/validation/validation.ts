import {ValidationResult} from "./types.ts";

export const Validation = <
    T extends object,
    C extends object,
    K extends Record<keyof T, (obj: T, context?: C) => { valid: boolean; message: string }>
>({
      objectToValidate,
      schema,
      context
  }: {
    objectToValidate: T;
    schema: K;
    context?: C;
}): ValidationResult<T> => {
    const results: Partial<Record<keyof T, { valid: boolean; message: string }>> = {};
    let valid = true;

    for (const key in schema) {
        if (schema[key]) {
            const result = schema[key](objectToValidate, context);
            results[key as unknown as keyof T] = result;
            if (!result.valid) valid = false;
        }
    }

    return { valid, results };
};
