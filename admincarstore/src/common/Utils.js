export const generatorCode = length => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const enCode = str => {
  if(!str) {
    return 0;
  }
  let res = '';
  for (var i = 0; i < str.length; i++) {
    res += String.fromCharCode(str[i].charCodeAt() + i*10) + String.fromCharCode(str[0].charCodeAt() + (i + 1)*10);
  }
  return res
}

export const deCode = str => {
  if(!str) {
    return 0;
  }
  let res = '';
  for (var i = 0; i < str.length; i += 2) {
    res += String.fromCharCode(str[i].charCodeAt() - (i/2)*10);
  }
  return res;
}