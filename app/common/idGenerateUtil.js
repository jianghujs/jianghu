'use strict';

const { nanoid } = require("nanoid");
const _ = require("lodash");

/**
 * Tip:
 *   - 前端使用: const nanoid=(t=21)=>{let e="",r=crypto.getRandomValues(new Uint8Array(t));for(;t--;){let n=63&r[t];e+=n<36?n.toString(36):n<62?(n-26).toString(36).toUpperCase():n<63?"_":"-"}return e};
 * @param {*} n
 * @returns
 */
module.exports.uuid = (n = 21) => {
  return nanoid(n);
};

module.exports.timestamp_6number = () => {
  return `${Date.now()}_${_.random(100000, 999999)}`;
};

module.exports.randomString = length => {
  const charList = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const charListLength = charList.length;
  let string = '';
  for (let i = 0; i < length; i++) string += charList.charAt(Math.floor(Math.random() * charListLength));
  return string;
};

module.exports.idPlus = async ({ knex, tableName, columnName, startValue=10000, plusValue=1 }) => {
  if (!knex || !tableName || !columnName) {
    throw new Error("idPlus, 数据异常");
  }
  const maxBizIdResult = await knex(tableName)
    .max(columnName, {
      as: "maxBizId",
    })
    .first();

  if (!maxBizIdResult.maxBizId) {
    return startValue;
  } else {
    return parseInt(maxBizIdResult.maxBizId) + plusValue;
  }
};
