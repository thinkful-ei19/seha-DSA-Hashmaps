'use strict';

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0; 
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      return false;
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    if(!this._slots[index] ){
      this._slots[index] = {
        key,
        value
      };
      this.length++;
    } else{
      this._slots[index]={
        key,
        value
      };
    }
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key ===key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}


HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

function main() {
  const lor =new HashMap;
  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragon');
  lor.set('Elf', 'Legolas');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('RingBearer', 'Gollum');
  lor.set('LadyOfLight', 'Galadriel');
  lor.set('HalfElven', 'Arwen');
  lor.set('Ent', 'Treebeard');
  //console.log(lor);
  //console.log((lor.get('Maiar')));
  return lor;
}

main();



function permPalindrome(str) {
  const pal = new HashMap();
  let oddnum = 0;
  str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  for (let i = 0; i < str.length; i++) {
    try {
      let value = pal.get(str[i]);
      pal.set(str[i], value + 1);
    } catch (error) {
      pal.set(str[i], 1);
    }
  }

  for (let i = 0; i < str.length; i++) {
    let value = pal.get(str[i]);
    if (value % 2 !== 0) oddnum++;
    if (oddnum > 1) return false;
    //console.log(pal);
  }
  //console.log(pal);
  return true;
}

//console.log(permPalindrome('panama'));
//console.log(permPalindrome('racecar'));


function groupingAnagram(array) {
  console.log(array);
  const ang = new HashMap();
  let keys = [];

  let sorted = array.map(item => item.split('').sort().join(''));
  sorted.forEach((angKey, index) => {
    const item = array[index];
    const angArray = ang.get(angKey);
    if (!angArray) {
      ang.set(angKey, [item]);
      keys.push(angKey);
    } else {
      ang.set(angKey, angArray.concat([item]));
    }
  });
  return keys.map(key => ang.get(key));
}


console.log(groupingAnagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));