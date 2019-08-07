# timer-manager
manager for timer(js:setinterval)
dependency Es6

# example
  import timer from './timer.js'

  ...

  timer.setIn(fn,delay,inkey[,param])

  //fn for callback:Function

  //delay:Number,unit (s)

  //inKey:String,key for time interval symbol

  //param:Array,fn params

  timer.cleanIn(inkey)

  //cleanInterval for inkey

  //no inkey clean All
