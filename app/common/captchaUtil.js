'use strict';

// 阿拉伯数字到中文数字的映射
const numberToChinese = {
  '0': '零',
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '7': '七',
  '8': '八',
  '9': '九'
};

const operatorToChinese = {
  '+': '加',
  '-': '减'
};

// 生成随机数学表达式
module.exports.generateRandomMathExpression = function() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operators = ['+', '-'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  
  const expression = `${num1}${operator}${num2}`;
  const result = eval(expression);
  
  // 转换为中文表达式
  const chineseNum1 = numberToChinese[num1];
  const chineseNum2 = numberToChinese[num2];
  const chineseOperator = operatorToChinese[operator];
  const chineseExpression = `${chineseNum1}${chineseOperator}${chineseNum2}`;
  
  return {
    expression: chineseExpression,
    num1: chineseNum1,
    num2: chineseNum2,
    operator: chineseOperator,
    result: result.toString()
  };
}

// 生成SVG
module.exports.generateSVG = function(text) {
  const width = 150;
  const height = 50;
  
  // 生成随机干扰线的点
  const getRandomPoints = () => {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = Math.random() * width;
    const y2 = Math.random() * height;
    return `${x1},${y1} ${x2},${y2}`;
  };

  // 生成随机颜色
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // 对文字进行编码
  const encodeChar = (char) => {
    return Buffer.from(char).toString('base64');
  };

  // 构建SVG
  let svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <defs>
        <filter id="noise" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"/>
        </filter>
      </defs>
  `;

  // 添加干扰线
  for (let i = 0; i < 3; i++) {
    svg += `<polyline points="${getRandomPoints()}" stroke="${getRandomColor()}" fill="none"/>`;
  }

  // 添加文本
  const chars = Array.from(text);
  let currentX = 30;
  
  chars.forEach(char => {
    const randomY = Math.random() * 10 - 5;
    const rotation = Math.random() * 30 - 15;
    const encodedChar = encodeChar(char);
    
    // 使用data URI来隐藏实际文本
    svg += `
      <text 
        x="${currentX}" 
        y="35"
        font-size="24" 
        font-family="Arial, sans-serif"
        fill="${getRandomColor()}"
        transform="translate(0,${randomY}) rotate(${rotation} ${currentX} 35)"
        filter="url(#noise)"
      >&#${char.charCodeAt(0)};</text>
    `;

    currentX += 30;
  });

  svg += '</svg>';
  
  // 将整个SVG转换为base64
  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
}

