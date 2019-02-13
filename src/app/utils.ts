export default class Utils {
    static equals(obj, other) {
    	return JSON.stringify(obj) === JSON.stringify(other);
    }

    static clone(obj) {
	    let copy;

	    // Handle the 3 simple types, and null or undefined
	    if (null == obj || "object" != typeof obj) return obj;

	    // Handle Date
	    if (obj instanceof Date) {
	        copy = new Date();
	        copy.setTime(obj.getTime());
	        return copy;
	    }

	    // Handle Array
	    if (obj instanceof Array) {
	        copy = [];
	        for (var i = 0, len = obj.length; i < len; i++) {
	            copy[i] = Utils.clone(obj[i]);
	        }
	        return copy;
	    }

	    // Handle Object
	    if (obj instanceof Object) {
	        copy = {};
	        for (let attr in obj) {
	            if (obj.hasOwnProperty(attr)) copy[attr] = Utils.clone(obj[attr]);
	        }
	        return copy;
	    }

	    throw new Error("Unable to copy obj! Its type isn't supported.");
	}
}