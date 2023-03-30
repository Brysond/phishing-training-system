export default class StoreData {
  static clearData() {
    localStorage.clear();
  }

  static storeData(newData) {
    if (localStorage.getItem("key") == null) {
      this.storeKeyValue("key", 0);
    }
    const currentKey = Number(localStorage.getItem("key")) + 1;
    localStorage.setItem(currentKey, JSON.stringify(newData));
    localStorage.setItem("key", currentKey);
  }

  static storeKeyValue(key, value) {
    localStorage.setItem(key, value);
  }

  static getValue(key) {
    return localStorage.getItem(key);
  }

  static exportData() {
    let key = Number(this.getValue("key"));
    var arr = [];
    for (var i=1; i <= key; i++) {
      arr.push(this.getValue(i) + ",");
    }

    const element = document.createElement('a');
    const file = new Blob(arr, {type:"text/plain; charset=utf-8"});
    element.href = URL.createObjectURL(file);
    element.download = "Results.txt";
    document.body.appendChild(element);
    element.click();
  }

}
