function set(label, value) {
  ls.set(label, value);
};

function get(label, defaultValue) {
  var value = ls.get(label);
  return !!value ?
    value :
    !!defaultValue ?
      defaultValue :
      0;
};

function remove(label) {
  ls.remove(label);
};

function clearAll() {
  ls.clear();
};