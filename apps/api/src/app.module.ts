import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PolygonModule } from './polygon/polygon.module'
import { PrismaModule } from './common/prisma/prisma.module'
import { MeilisearchModule } from './meilisearch/meilisearch.module'

@Module({
  imports: [PolygonModule, PrismaModule, MeilisearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
