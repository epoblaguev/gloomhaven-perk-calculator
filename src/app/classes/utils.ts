import equal from 'fast-deep-equal';
import { clone } from 'lodash';

export default class Utils {
  static equals(obj: any, other: any) {
    return equal(obj, other);
  }

  static clone(obj: any): any {
    return clone(obj);
  }
}
