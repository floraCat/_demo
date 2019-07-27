class ServiceClass {
  constructor () {
    this.test = 'aaa';
  }
  getTest () {
    return this.test;
  }
  setTest (val) {
    this.test = val;
  }
}

export default new ServiceClass();
