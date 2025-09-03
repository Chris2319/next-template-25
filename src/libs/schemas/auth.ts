import {AuthCredentials} from "@/libs/hooks/auth/_types.ts";
import {Schema, SchemaResponse} from "@/libs/validation/types.ts";
import {validators, required} from "@/libs/validation/helpers.ts";

export const AuthSchema: Schema<AuthCredentials> = {
    email: (obj: AuthCredentials): SchemaResponse => {
        return {
            valid: !!obj.email,
            message: 'Email is required',
        }
    },
    password: validators<AuthCredentials>(
        (obj) => required({value: obj.email, message: 'Email is required'}),
        // (obj) => betweenMinMax({value: obj.password, min: 5, max: 10})
    ),
}