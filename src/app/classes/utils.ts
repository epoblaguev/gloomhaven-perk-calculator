import equal from 'fast-deep-equal';
import cloneDeep from 'lodash-es/cloneDeep';

export default class Utils {
  static equals(obj: any, other: any) {
    return equal(obj, other);
  }

  static clone(obj: any): any {
    return cloneDeep(obj);
  }
}
