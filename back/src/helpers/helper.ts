export function toUniqueArray(a: any[]) {
  var newArr = [];
  for (var i = 0; i < a.length; i++) {
      if (newArr.indexOf(a[i]) === -1 && a[i] !== undefined && a[i] !== null) {
          newArr.push(a[i]);
      }
  }
return newArr;
}