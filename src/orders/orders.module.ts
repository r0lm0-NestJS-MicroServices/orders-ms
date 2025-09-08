import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { envs, PRODUCT_MS_SERVICE } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_MS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productMsHost,
          port: envs.productMsPort,
        },
      },
    ]),
  ],
})

export class OrdersModule { }
