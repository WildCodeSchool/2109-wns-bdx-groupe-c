class ObjectHelpers {

  static isObject(obj: any): boolean {
    return !!obj && typeof obj === 'object';
  }

  static isEmpty(obj: any): boolean {
    if (obj === null || obj === undefined || typeof obj !== 'object') return true;
    return Object.keys(obj).length === 0;
  }

  static deepClone(obj: any): any {
    if (obj instanceof Date) return new Date(obj);
    if (!ObjectHelpers.isObject(obj)) return obj;
    if (Array.isArray(obj) && obj.length === 0) return [];
    if (ObjectHelpers.isEmpty(obj)) return {};

    let returnObject: any;

    if (Array.isArray(obj)) {
      returnObject = [];
      obj.forEach((objKey) => {
        returnObject.push(ObjectHelpers.deepClone(objKey));
      });
    } else if (obj instanceof Object) {
      returnObject = {};
      Object.keys(obj).forEach((key) => {
        returnObject[key] = ObjectHelpers.deepClone(obj[key]);
      });
    } else {
      returnObject = obj;
    }

    return returnObject;
  }
}

export default ObjectHelpers;