function rexolveObject(object) {
  // Place object contents on arrays to parse in parrallel
  let keys = Object.keys(object);
  let values = Object.values(object).map(rexolve);
  
  return Promise.all(values).then(resolved => {
    let result = {};
    for (let i in keys) {
      result[keys[i]] = resolved[i];
    }
    return result;
  });
}

function rexolve(valuePromise) {
  return Promise.resolve(valuePromise).then(value => {
    if (value.constructor == Object) {
      return rexolveObject(value);
    } else if (value.constructor == Array) {
      return Promise.all(value.map(rexolve));
    } else {
      return value;
    }
  });
}

module.exports = rexolve;
