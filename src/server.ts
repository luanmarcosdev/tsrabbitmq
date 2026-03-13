import { app } from './app';
import { AppDataSource } from './database/data-source';
import { connectRedis } from './infra/cache/redis';
import 'dotenv/config';
import "reflect-metadata"

const port = Number(process.env.PORT);
const PORT = Number.isInteger(port) ? port : 3000;

async function bootstrap() {
  await connectRedis();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });

  AppDataSource.initialize()
    .then(() => {
      console.log('Database connected');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
  });
}

bootstrap();