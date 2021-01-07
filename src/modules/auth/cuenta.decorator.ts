import { createParamDecorator } from '@nestjs/common';
import { CuentaDto } from '../cuentas/dto/cuenta.dto';

export const GetCuenta = createParamDecorator(
    (data, req): CuentaDto => {
        return req.cuenta;
    },
);