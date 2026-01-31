import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("F2Fit Wellness Tracker API")
    .setDescription(
      "API RESTful para el registro y monitoreo de bienestar integral (Físico + Emocional). \n\n" +
        "Permite a las usuarias registrar su estado diario, hábitos y visualizar tendencias.",
    )
    .setVersion("1.0")
    .addTag("Wellness", "Operaciones de registro y consulta de estadísticas")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📄 Swagger Docs running on http://localhost:${port}/api`);
}
bootstrap();
