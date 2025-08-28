import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Controller('stocks') // GET localhost:3000/stocks/
export class StocksController { // controller - один(единственный) кассир. service (класс) - это ЦЕЛАЯ кухня.
  // Если кассир (controller) хочет что-то от кухни (от целого класса), то он хочет повара (объект класса service) - он ему позвонит
  constructor(private readonly stocksService: StocksService) {}

  @Post() // POST localhost:3000/stocks/
  create(@Body() createStockDto: CreateStockDto) { // за создание нового объекта stock  BODY
    return this.stocksService.create(createStockDto);
  }

  @Get() // GET localhost:3000/stocks/ AND localhost:3000/stocks?title=Акция
  findAll(@Query('title') title?: string) { // title = "Акция"
    return this.stocksService.findAll(title); // undefined
  }

  @Get(':id') // GET localhost:3000/stocks/123
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id') // PATCH localhost:3000/stocks/322 BODY: {}
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete(':id') // DELETE localhost:3000/stocks/322
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }

  @Patch(':id/description') // PATCH localhost:3000/stocks/1/description BODY
  addDescription(@Param('id') id: string, @Body('newDescription') newDescription: string){
    return this.stocksService.addDescription(+id, newDescription);
  }
  /*
    {
      "title": "акция 5",
      "text": "fvvc"
    } @Body()
    
    {
      "newText": "some text"
    }
  */

  @Patch(':id/description/:index') // PATCH localhost:3000/1/description/2 BODY
  updateDescription(@Param('id') id: string, @Param('index') index: string, @Body('newDescription') newDescription: string) {
    return this.stocksService.updateDescription(+id, +index, newDescription);
  }

  @Delete(':id/description/:index') // DELETE localhost:3000/1/description/2
  deleteDescription(@Param('id') id: string, @Param('index') index: string) {
    return this.stocksService.deleteDescription(+id, +index);
  }
}
