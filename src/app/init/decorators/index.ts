import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function InitResoposeSwagger() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: '',
      schema: {
        example: {
          status: HttpStatus.OK,
          message: '',
        },
      },
    }),
  );
}
