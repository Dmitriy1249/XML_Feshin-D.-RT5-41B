import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { FileService } from '../file.service';
import { Stock } from './entities/stock.entity';

@Injectable() // DI - Dependency Injection
export class StocksService {

  constructor(private fileService: FileService<Stock[]>) {}

  create(createStockDto: CreateStockDto) : Object {
    const stocks = this.fileService.read();
    const stock = { ...createStockDto, id: stocks.length + 1 };
    this.fileService.add(stock);
    return { result: "okay" };
  }
  /*
  BODY: {
    src: "img",
    title: "акция 10",
    text: "хорошая акция"
  } = createStockDto

  length = 4

  stock = {
    id: 5,
    src: "img",
    title: "акция 10",
    text: "хорошая акция"
  }
  */


  findAll(title?: string): Stock[] { // можно и title (нормальный) принять, и ничего не принять (title=indefined)
    const stocks = this.fileService.read(); // тут вся инфа по карточкам
    return title ? stocks.filter((stock) => stock.title.toLowerCase().includes(title.toLowerCase())) : stocks;
  } // title это не undefined и не null и не "" и не []
 // .startsWith
  // if (title) {
  // то что первое
  //} else {
  // то что второе
  //} 

  // for (let stock of stocks) {

  // }

  /*
  stocks = [{id: 1, title: "классное очень предложение"}, {id: 2, title: "очень хорошая акция"}, {id: 3, title: "берите быстрее"}]
  пользователь хочет по title="очень"
  */

  findOne(id: number): Stock | null  {
    const stocks = this.fileService.read(); 
    // return stocks.filter(stock => id === stock.id)[0];  [{id: 2, title: "очень хорошая акция"}]
    return stocks.find((stock) => id === stock.id) ?? null;
  }

  update(id: number, updateStockDto: UpdateStockDto) : Object {
    const stocks = this.fileService.read(); // Stock[]
    // const stock = stocks.find((stock) => id === stock.id);
    // const updatedStock = {...stock, ...updateStockDto};

    const updatedStocks = stocks.map((stock) => { 
      if (stock.id === id) { 
      const description = Array.isArray(updateStockDto.description) 
        ? updateStockDto.description 
        : [updateStockDto.description || ""];
        return { ...stock, ...updateStockDto, description };
      }
      else {
        return stock;
      };
    })
    this.fileService.write(updatedStocks);
    return { result: "okay" };
  }

  remove(id: number) : Object {
    const stocks = this.fileService.read().filter((stock) => id !== stock.id);
    this.fileService.write(stocks);
    return { result: "okay" };
  }

  addDescription(id: number, newDescription : string) : Object | void {
    const stocks = this.fileService.read();
    const stock = stocks.find((stock) => stock.id === id) ?? null; // та что будем править
    if (!stock) return;

    const curDescriptionArray = Array.isArray(stock.description) ? [...stock.description] : []; // здесь лежит ее description
    curDescriptionArray.push(newDescription);

    const updatedStocks = stocks.map((stock) => stock.id === id ? { ...stock, description: curDescriptionArray} : stock);
    this.fileService.write(updatedStocks);
    return { result: "okay" };
  } 

  updateDescription(id : number, index : number, newDescription : string) : Object | void {
    const stocks = this.fileService.read();
    const stock = stocks.find((stock) => stock.id === id) ?? null; // та что будем править
    if (!stock) return;

    const curDescriptionArray = Array.isArray(stock.description) ? [...stock.description] : []; // здесь лежит ее text
    if (index >= 0 && index < curDescriptionArray.length) { // проверка на корректность индекса
      curDescriptionArray[index] = newDescription; // смена text[index]
    }

    const updatedStocks = stocks.map((stock) => stock.id === id ? { ...stock, description: curDescriptionArray} : stock);
    this.fileService.write(updatedStocks);
    return { result: "okay" };
  }

  deleteDescription(id : number, index : number) : Object | void {
    const stocks = this.fileService.read();
    const stock = stocks.find((stock) => stock.id === id) ?? null; // та что будем править
    if (!stock) return;

    const curDescriptionArray = Array.isArray(stock.description) ? [...stock.description] : []; // здесь лежит ее description
    if (index >= 0 && index < curDescriptionArray.length) { // проверка на корректность индекса
      curDescriptionArray.splice(index, 1);
    }

    const updatedStocks = stocks.map((stock) => stock.id === id ? { ...stock, description: curDescriptionArray} : stock);
    this.fileService.write(updatedStocks);
    return { result: "okay" };
  }
}
