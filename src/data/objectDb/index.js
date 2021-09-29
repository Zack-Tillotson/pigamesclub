/*
 */

import objectList from './objectList'
import complexObject from './complexObject'
import Ref from './ref'

import pubSub from './pubSub'

function initialize(db) {
  objectList.initialize(db, pubSub)
  complexObject.initialize(objectList)
}

const NOOP = () => {}

function watch(refParam, onData = NOOP, onLoading = NOOP) {

  let ref = refParam
  if(!(ref instanceof Ref)) {
    ref = new Ref(refParam)
  }

  const unsub = pubSub.subscribe(ref, (callbackRef, object) => {
    try {
      const fullObject = complexObject.get(ref)
      onData(fullObject, ref)
    } catch(e) {
      if(e.refs) {
        e.refs.forEach(ref => objectList.watch(ref))
        onLoading(e.promise)
      } else {
        throw e
      }
    }
  })

  objectList.watch(ref)

  return unsub
}

function update(object) {
  console.log('objectdb update', object) // TODO
}

export default {
  initialize,
  watch,
  update,
}