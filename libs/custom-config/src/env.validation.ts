import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;
}

export type EnvironmentVariableKeys = keyof EnvironmentVariables;

/**
 * Validates a configuration object against the `EnvironmentVariables` schema.
 *
 * Converts the input object to an `EnvironmentVariables` instance with implicit type conversion, then synchronously validates all required properties. Throws an error if validation fails.
 *
 * @param config - The configuration object to validate
 * @returns The validated `EnvironmentVariables` instance
 * @throws Error if validation fails
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfiguration = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfiguration, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfiguration;
}
