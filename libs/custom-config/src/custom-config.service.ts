import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariableKeys } from '@lib/custom-config/env.validation';

@Injectable()
export class CustomConfigService {
  constructor(private configService: ConfigService) {}

  private getEnvVariable(key: EnvironmentVariableKeys) {
    return this.configService.getOrThrow(key);
  }
  get DATABASE_URL(): string {
    return this.getEnvVariable('DATABASE_URL');
  }
}
