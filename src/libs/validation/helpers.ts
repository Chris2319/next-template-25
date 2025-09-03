import {SchemaResponse} from "../validation/types.ts";

export const betweenMinMax = ({
                                  value,
                                  min,
                                  max,
                                  incl = '()',
                                  minMessage = `Must be greater than ${min}`,
                                  maxMessage = `Must be less than ${max}`,
                              }: {
    value: number;
    min?: number;
    max?: number;
    incl?: '[]' | '()' | '(]' | '[)';
    minMessage?: string;
    maxMessage?: string;
}): SchemaResponse => {
    switch (incl) {
        case '[]':
            if (min !== undefined && value < min) return {valid: false, message: minMessage};
            if (max !== undefined && value > max) return {valid: false, message: maxMessage};
            break;
        case '()':
            if (min !== undefined && value <= min) return {valid: false, message: minMessage};
            if (max !== undefined && value >= max) return {valid: false, message: maxMessage};
            break;
        case '(]':
            if (min !== undefined && value <= min) return {valid: false, message: minMessage};
            if (max !== undefined && value > max) return {valid: false, message: maxMessage};
            break;
        case '[)':
            if (min !== undefined && value < min) return {valid: false, message: minMessage};
            if (max !== undefined && value >= max) return {valid: false, message: maxMessage};
            break;
        default:
            throw new Error(`Invalid incl value: ${incl}`);
    }

    return {valid: true, message: ''};
};

export const required = <T>({
                                value,
                                message = 'This field is required',
                            }: {
    value: T;
    message?: string;
}): SchemaResponse => {
    const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '');

    return {
        valid: !isEmpty,
        message,
    };
};

export const validators = <T>(
    ..._validators: Array<(obj: T) => SchemaResponse>
): ((obj: T) => SchemaResponse) => {
    return (obj) => {
        for (const validate of _validators) {
            const result = validate(obj);
            if (!result.valid) return result;
        }
        return {valid: true, message: ''};
    };
};