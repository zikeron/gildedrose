const { Shop, Item } = require('../src/gilded_rose');

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

  // This Conjured item does not work properly yet
  new Item("Conjured Mana Cake", 3, 6),
];

const shop = new Shop(items);

/*describe('Gilded Rose', function () {
  it('should has the current behaviour ', function () {
    const smallInn = new Shop(items.slice());
    const current = [];
    for (let i = 0; i < 2; i++) {
      current.push(JSON.parse(JSON.stringify(smallInn.items)))
      smallInn.updateQuality();
    }

    expect(current).toMatchSnapshot()
  });
});*/

describe('Normal item', () => {
  it('should increase its quality 1, decrease the SellIn 1,', function () {
    const smallInn = new Shop([
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Elixir of the Mongoose", 5, 7),
    ]);

    for (let day = 0; day <= 2; day++) {
      smallInn.updateQuality();
    }
    expect(smallInn.items[0].sellIn).toBe(7)
    expect(smallInn.items[0].quality).toBe(17)
    expect(smallInn.items[1].sellIn).toBe(2)
    expect(smallInn.items[1].quality).toBe(4)
  });
});

describe('Aged Brie', () => {
  it('should increase its quality 1, decrease the SellIn 1, ', function () {
    const smallInn = new Shop([new Item("Aged Brie", 2, 0)])
    for (let day = 0; day < 2; day++) {
      smallInn.updateQuality();
    }
    expect(smallInn.items[0].quality).toBe(2);
    expect(smallInn.items[0].sellIn).toBe(0);
  });
});

describe('Backstage', () => {
  it('should increase its quality 1, decrease the SellIn 1 but Quality increases by 2 ' +
    'when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert ', function () {
    const smallInn = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    ]);
    for (let i = 0; i <= 5 ; i++) {
      smallInn.updateQuality();
    }
    expect(smallInn.items[0].sellIn).toBe(9);
    expect(smallInn.items[0].quality).toBe(27);
    expect(smallInn.items[1].sellIn).toBe(4);
    expect(smallInn.items[1].quality).toBe(50);
    expect(smallInn.items[2].sellIn).toBe(-1);
    expect(smallInn.items[2].quality).toBe(0);
  });

  it('should increase its quality 1, decrease the SellIn 1 but Quality increases by 3 ' +
    'when there are 5 days or less but Quality drops to 0 after the concert ', function () {
    const smallInn = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
    ]);
    for (let i = 0; i < 4 ; i++) {
      smallInn.updateQuality();
    }

    expect(smallInn.items[0].sellIn).toBe(1);
    expect(smallInn.items[0].quality).toBe(32);
  })

  it('should increase its quality 1, decrease the SellIn 1 but ' +
    'Quality drops to 0 AFTER the concert', function () {
    const smallInn = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
    ]);
    for (let i = 0; i < 6 ; i++) {
      smallInn.updateQuality();
    }

    expect(smallInn.items[0].sellIn).toBe(-1);
    expect(smallInn.items[0].quality).toBe(0);
  })
});

describe('Sulfuras', () => {
  it('should never has to be sold or decreases in Quality', function () {
    const smallInn = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    ]);

    smallInn.updateQuality()

    expect(smallInn.items[0].quality).toBe(80)
    expect(smallInn.items[1].quality).toBe(80)
  });
});

describe('Conjured', () => {
  it('should degrade in Quality twice as fast as normal items', function () {
    const smallInn = new Shop([
      new Item("Conjured Mana Cake", 3, 6),
    ]);

    for (let day = 0; day <= 2; day++) {
      smallInn.updateQuality();
    }

    expect(smallInn.items[0].sellIn).toBe(0)
    expect(smallInn.items[0].quality).toBe(0)
  });
});


