import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project path or URL',
    example: 'ipfs/service-worker-gateway',
  })
  @IsNotEmpty()
  @IsString()
  path: string;
}
