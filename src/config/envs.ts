import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;

    NATS_SERVERS: string[];
    PRODUCTS_MICROSERVICE_HOST: string;
    PRODUCTS_MICROSERVICE_PORT: number;
}

const envVarsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
}).unknown(true);

const { error, value } = envVarsSchema.validate(
    {
        ...process.env,
        NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
    }

);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,

    // productMsHost: envVars.PRODUCTS_MICROSERVICE_HOST,
    // productMsPort: envVars.PRODUCTS_MICROSERVICE_PORT,

    natsServers: envVars.NATS_SERVERS,
};