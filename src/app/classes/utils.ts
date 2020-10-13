import equal from 'fast-deep-equal';
import cloneDeep from 'lodash-es/cloneDeep';


export const equals = (a: any, b: any) => equal(a, b);

export const clone = (value: any) => cloneDeep(value);
