/**
 * Author: Alejandro Cortez
 * EmailID: acortez.dev@gmail.com
 * Date: 08/24/2021 01:41:00 hrs
 */

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {

    /**
     * All items have a SellIn value which denotes the number of days we have to sell the item
     * All items have a Quality value which denotes how valuable the item is
     * @type {*[]}
     */
    this.items = items;
    /**
     * The Quality of an item is never more than 50
     * @type {number}
     */
    this.MAX_QUALITY = 50;
  }

  /**
   * @param item
   * @returns {boolean}
   */
  isAged(item) {
    return item.name === 'Aged Brie';
  }

  /**
   * @param item
   * @returns {boolean}
   */
  isBackstage(item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  /**
   * @param item
   * @returns {boolean}
   */
  isSulfura(item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  /**
   * @param item
   * @returns {boolean}
   */
  isConjured(item) {
    return item.name === 'Conjured Mana Cake';
  }

  /**
   * Increases Quality prop of an item
   * @param item
   */
  increaseQuality(item) {
    if (item.quality < this.MAX_QUALITY) {
      item.quality += 1;
    }
  }

  /**
   * Decreases Quality prop of an item
   * @param item
   */
  decreaseQuality(item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }

  /**
   * Decreases SellIn prop of an item
   * @param item
   */
  decreaseSellIn(item) {
    item.sellIn -= 1;
  }

  /**
   * Validates if the date has passed
   * @param item
   * @returns {boolean}
   */
  hasDatePassed(item) {
    return item.sellIn < 0;
  }

  /**
   * "Conjured" items degrade in Quality twice as fast as normal items
   * @param item
   * @returns {*}
   */
  handleConjured(item) {
    this.decreaseSellIn(item);
    this.decreaseQuality(item);
    this.decreaseQuality(item);
    if (this.hasDatePassed(item)) {
      this.decreaseQuality(item);
      this.decreaseQuality(item);
    }
    return item;
  }

  /**
   * Increase its quality 1, decrease the SellIn 1
   * @param item
   * @returns {*}
   */
  handleSimpleItem(item) {
    this.decreaseSellIn(item);
    this.decreaseQuality(item);
    if (this.hasDatePassed(item)) {
      this.decreaseQuality(item);
    }
    return item;
  }

  /**
   * "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches
   * Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
   * Quality drops to 0 after the concert
   * @param item
   * @returns {*}
   */
  handleBackstage(item) {
    this.decreaseSellIn(item);
    this.increaseQuality(item);
    if (item.sellIn < 10) {
      this.increaseQuality(item);
    }
    if (item.sellIn < 5) {
      this.increaseQuality(item);
    }
    if (this.hasDatePassed(item)) {
      item.quality = 0;
    }
    return item;
  }

  /**
   * "Aged Brie" actually increases in Quality the older it gets
   * @param item
   * @returns {*}
   */
  handleAged(item) {
    this.decreaseSellIn(item);
    this.increaseQuality(item);

    if (this.hasDatePassed(item)) {
      this.increaseQuality(item);
    }
    return item;
  }

  /**
   * Decides which handler is the correct for an item
   * @param item
   * @returns {*}
   */
  validateItem(item) {
    if (this.isSulfura(item)) return item;

    if (this.isAged(item)) return this.handleAged(item);

    if (this.isBackstage(item)) return this.handleBackstage(item);

    if (this.isConjured(item)) return this.handleConjured(item);

    return this.handleSimpleItem(item);
  }

  /**
   * Call to action to validate the items
   * @returns {*[]}
   */
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] = this.validateItem(this.items[i])
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
