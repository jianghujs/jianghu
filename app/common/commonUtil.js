'use strict';


module.exports.eval = ({ evalString, ctx, userInfo }) => {
  let result = evalString;
  try {
    result = eval(evalString);
  } catch (error) {
    // 什么都不用做, 返回 result
  }
  return result;
};