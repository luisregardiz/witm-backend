import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: true, // You can replace this with your frontend URL in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // OpenAPI/Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('WITM Backend API')
    .setDescription('API documentation for WITM Backend')
    .setVersion('1.0')
    .addTag('witm')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Traditional Swagger UI (available at /api)
  SwaggerModule.setup('api', app, document);
  // Scalar API Reference (available at /reference)
  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );

  await app.listen(4000);
}
bootstrap();
