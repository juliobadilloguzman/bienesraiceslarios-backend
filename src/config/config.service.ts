import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        
        const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

        if (isDevelopmentEnv) {

            // console.log('is dev');

            const envFilePath = __dirname + '/../../../.env';
            const existsPath = fs.existsSync(envFilePath);

            // console.log(envFilePath);
            // console.log(existsPath);
            // console.log(fs.existsSync('/Users/julioguzman/Desktop/bienesraiceslarios-backend/.env'))

            if (!existsPath) {
                console.log('.env file does not exist');
                process.exit(0);
            }

            this.envConfig = parse(fs.readFileSync(envFilePath));
        } else {
            console.log('prod');
            this.envConfig = {
                PORT: process.env.PORT,
            };
        }
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}