import { Injectable } from '@nestjs/common';

const kazanWarehouse = {
  id: 117986,
  name: 'Казань WB',
};

const products = [
  138593051, 94340317, 94340606, 138590435, 138607462, 94339119, 94339244,
];

@Injectable()
export class RemainderKazanService {
  async getProductRemainderKazan(productId) {
    const response = await fetch(
      `https://card.wb.ru/cards/detail?dest=31&nm=${productId}`,
    );
    const parsedResponse = await response.json();
    const data = parsedResponse.data.products[0].sizes.map((item) => {
      const stock = item.stocks.find((item) => {
        return item.wh === kazanWarehouse.id;
      });
      return { size: item.name, stock: stock?.qty };
    });
    return data.filter((item) => {
      return item.stock !== undefined;
    });
  }

  async getAllProductRemaindersKazan() {
    return Promise.all([
      fetch(`https://card.wb.ru/cards/detail?dest=31&nm=${products[0]}`),
      fetch(`https://card.wb.ru/cards/detail?dest=31&nm=${products[1]}`),
      fetch(`https://card.wb.ru/cards/detail?dest=31&nm=${products[2]}`),
      fetch(`https://card.wb.ru/cards/detail?dest=31&nm=${products[3]}`),
      fetch(`https://card.wb.ru/cards/detail?dest=31&nm=${products[4]}`),
      fetch(`https://card.wb.ru/cards/detail?dest=31&nm=${products[5]}`),
      fetch(`https://card.wb.ru/cards/detail?dest=31&nm=${products[6]}`),
    ]).then(async (allResponses) => {
      const data = [];
      for (const response of allResponses) {
        const parsedResponse = await response.json();
        const sizes = parsedResponse.data.products[0].sizes;
        const sizesQty = {};

        for (let i = 0; i < sizes.length; i++) {
          const stock = sizes[i].stocks.find((item) => {
            return item.wh === kazanWarehouse.id;
          });

          if (!stock) {
            continue;
          }
          sizesQty[sizes[i].name] = stock.qty;
        }

        data.push({
          art: parsedResponse.data.products[0].id,
          ...sizesQty,
        });
      }

      return data;
    });
  }
}
