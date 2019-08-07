let PRIVSTATE;//key for setInterval
class Timer  {
  /*
   * key construct
   * {
   *   key:String
   *   call:fn,
   *   delay:Num,
   *   params:[]
   * }
   */
  static keys = [];
  //初始化状态interval-key
  // static PRIVSTATE = null;
  static init() {
      if (!PRIVSTATE && this.keys.length) {
        PRIVSTATE = window.setInterval(() => {
          this.keys.map(item => {
            if (item) {
              let {
                call,
                delay,
                params
              } = item;
              delay = delay ? parseInt(delay) : 1;
              if(!item.delay_count){
                item.delay_count = delay;
              }
              item.delay_count--;
              if (item.delay_count <= 0) {
                item.delay_count = delay;
                  if (params && params.length) {
                    call && call(...params);
                  } else {
                    call && call();
                  }
              }
            }
          })
        }, 1000);
      }
    };
    static setIn(...rest) {
      let callObj = {};
      for(var o of rest){
        switch (Object.prototype.toString.call(o)) {
          case "[object Array]":
            callObj.params = o;
            break;
          case "[object String]":
            callObj.key = o;
            break;
          case "[object Number]":
            callObj.delay = o;
            break;
          case "[object Function]":
            callObj.call = o;
            break;
          default:
            console.log('noValide param')
            break;
        }
      }
      if(callObj.call){
        if(!callObj.key){
          console.log(callObj.call.name);
          callObj.key = callObj.call.name;
        }
        let itemIn = this.keys.findIndex(item => item.key && item.key === callObj.key);
        if (itemIn >= 0) {
          this.keys[itemIn] = callObj;
        } else {
          this.keys.push(callObj);
        }
        this.init();
      }

    };
    static cleanIn(key) {//String
      if (key) {
        let itemIn = this.keys.findIndex(item => item.key && item.key === key);
        if (itemIn >= 0) {
          this.keys.splice(itemIn, 1);
        } else {
          console.error('no Key');
        }
      }else{
        //TODO clean All
        this.keys = [];
      }
      if (!this.keys.length && PRIVSTATE) {
        window.clearInterval(PRIVSTATE);
        PRIVSTATE = null;
      }
    }
};
export default Timer;
