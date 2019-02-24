export default class Utils {
    static equals(obj, other) {
        return JSON.stringify(obj) === JSON.stringify(other);
    }

    static clone(obj): any {
        // Handle the 3 simple types, and null or undefined
        if (null == obj || 'object' !== typeof obj) { return obj; }

        // Handle Date
        if (obj instanceof Date) {
            const copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            const copy = [];
            for (const item of obj) {
                copy.push(Utils.clone(item));
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            const copy = {};
            for (const attr in obj) {
                if (obj.hasOwnProperty(attr)) { copy[attr] = Utils.clone(obj[attr]); }
            }
            return copy;
        }

        throw new Error('Unable to copy obj! Its type isn\'t supported.');
    }
}
