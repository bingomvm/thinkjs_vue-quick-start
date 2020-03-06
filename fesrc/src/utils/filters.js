import dayjs from 'dayjs';
export default {
  // 1.0亿 10.0万
  _numFormat(num) {
    num = num || 0;
    const unit = ['万', '亿', '万亿'];
    let mark = -1;
    num = parseInt(num) || 0;
    if (num < 10000) return num;
    while (num >= 10000) {
      num = (num / 10000).toFixed(1);
      mark++;
    }
    return `${num}${unit[mark]}`;
  },
  _limitLength(str, length) {
    if (str && str.length > length) {
      return str.substr(0, length) + '...';
    }
    return str;
  },
  _timeFormat(val, format) {
    return dayjs(val).format(format || 'YYYY-MM-DD HH:mm:ss');
  },
};
