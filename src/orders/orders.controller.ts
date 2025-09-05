import { Controller, NotImplementedException, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';


@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @MessagePattern({ cmd: 'create_order' })
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern({ cmd: 'find_all_orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern({ cmd: 'find_order_by_id' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(+id);
  }

  @MessagePattern({ cmd: 'change_order_status' })
  changeOrderStatus() {
    throw new NotImplementedException('Not implemented');
  }
}
