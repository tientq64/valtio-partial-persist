'use strict';

var utils = require('valtio/utils');
var vanilla = require('valtio/vanilla');

// src/index.ts

// src/utils/isObject.ts
function isObject(val) {
  return val !== null && typeof val === "object";
}

// src/index.ts
function persist(proxyObject, storageKey, keys, { storage = localStorage, onStored, onInvalid } = {}) {
  let data;
  try {
    const json = storage.getItem(storageKey);
    if (json === null) throw 0;
    data = JSON.parse(json);
    if (!isObject(data) || !isObject(data.state)) {
      onInvalid == null ? void 0 : onInvalid();
      throw 0;
    }
  } catch {
    data = {
      state: {}
    };
  }
  for (const key of keys) {
    if (key in data.state) {
      proxyObject[key] = data.state[key];
    }
  }
  for (const key of keys) {
    utils.subscribeKey(proxyObject, key, (value) => {
      data.state[key] = value;
      const json = JSON.stringify(data);
      storage.setItem(storageKey, json);
      onStored == null ? void 0 : onStored(vanilla.snapshot(data.state));
    });
  }
}

exports.persist = persist;
