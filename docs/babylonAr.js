!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).BabylonAR=e()}}(function(){return function o(i,s,c){function _(t,e){if(!s[t]){if(!i[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(d)return d(t,!0);var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}var n=s[t]={exports:{}};i[t][0].call(n.exports,function(e){return _(i[t][1][e]||e)},n,n.exports,o,i,s,c)}return s[t].exports}for(var d="function"==typeof require&&require,e=0;e<c.length;e++)_(c[e]);return _}({1:[function(e,t,r){"use strict";function a(e){for(var t in e)r.hasOwnProperty(t)||(r[t]=e[t])}Object.defineProperty(r,"__esModule",{value:!0}),a(e("./exampleWorker/exampleWorker")),a(e("./exampleObjectTracker/exampleObjectTracker"))},{"./exampleObjectTracker/exampleObjectTracker":3,"./exampleWorker/exampleWorker":4}],2:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("../shared/dedicatedWorker"),a=e("../shared/constants"),o=(i.onInitialized=function(){Module._reset(),postMessage({initialized:!0})},i.onMessage=function(e){var t=e.data;if(t.reset)Module._reset(),postMessage({reset:!0});else if(t.calibrate)Module._set_calibration_from_frame_size(t.width,t.height),postMessage({calibrated:!0});else if(t.track){var r=Module._malloc(t.imageData.length*t.imageData.BYTES_PER_ELEMENT);Module.HEAP8.set(t.imageData,r);var a=Module._process_image(t.width,t.height,r,1);Module._free(r);for(var n=[],o=0,i=0,s=0,c=0,_=0,d=0,l=0,u=0,h=0;h<a;h++){var f=Module._get_tracked_marker(h);o=0,i=Module.getValue(f+o,"i32"),o+=12,s=Module.getValue(f+o,"double"),o+=8,c=Module.getValue(f+o,"double"),o+=8,_=Module.getValue(f+o,"double"),o+=8,d=Module.getValue(f+o,"double"),o+=8,l=Module.getValue(f+o,"double"),o+=8,u=Module.getValue(f+o,"double"),n.push({id:i,tx:s,ty:c,tz:_,rx:d,ry:l,rz:u})}postMessage({markers:n})}},i.createAsync=function(){return new Promise(function(t){var r=new i;r._worker=n.DedicatedWorker.createFromLocation(a.EXAMPLE_MODULE_URL,i.onInitialized,i.onMessage),r._worker.onmessage=function(e){r._worker.onmessage=n.DedicatedWorker.unexpectedMessageHandler,t(r)}})},i.prototype.setCalibrationAsync=function(e,t){var a=this,r=new Promise(function(t,r){a._worker.onmessage=function(e){a._worker.onmessage=n.DedicatedWorker.unexpectedMessageHandler,e.data.calibrated?t():r(e.data)}});return this._worker.postMessage({calibrate:!0,width:e,height:t}),r},i.prototype.findMarkersInImageAsync=function(e){var a=this,t=new Promise(function(t,r){a._worker.onmessage=function(e){a._worker.onmessage=n.DedicatedWorker.unexpectedMessageHandler,e.data.markers?t(e.data.markers):r(e.data)}});return this._worker.postMessage({track:!0,width:e.getSize().width,height:e.getSize().height,imageData:e.readPixels()}),t},i);function i(){}r.ExampleMarkerTracker=o},{"../shared/constants":5,"../shared/dedicatedWorker":6}],3:[function(s,e,c){(function(e){"use strict";Object.defineProperty(c,"__esModule",{value:!0});var o="undefined"!=typeof window?window.BABYLON:void 0!==e?e.BABYLON:null,a=s("./exampleMarkerTracker"),r=s("../shared/filteredVector3"),i=s("../shared/trackedNode"),t=(n.prototype.addTrackableObject=function(e,t,r,a){var n=[e,t,r,a].toString();return this._trackableObjects.add(n,new i.TrackedNode(n.toString(),this._scene)),this._trackableObjects.get(n)},n.prototype.processResults=function(a){var n=this;this._trackableObjects.forEach(function(e,t){var r=e.split(",");n.__ulId=parseInt(r[0]),n.__urId=parseInt(r[1]),n.__llId=parseInt(r[2]),n.__lrId=parseInt(r[3]),n.__posEstimate.set(0,0,0),n.__posEstimateCount=0,n.__rightEstimate.set(0,0,0),n.__rightEstimateCount=0,n.__forwardEstimate.set(0,0,0),n.__forwardEstimateCount=0,a[n.__llId]&&(a[n.__urId]&&(n.__scratchVec.set(0,0,0),n.__scratchVec.addInPlace(a[n.__llId].position),n.__scratchVec.addInPlace(a[n.__urId].position),n.__scratchVec.scaleInPlace(.5),n.__posEstimate.addInPlace(n.__scratchVec),n.__posEstimateCount+=1),a[n.__lrId]&&(n.__scratchVec.set(0,0,0),n.__scratchVec.addInPlace(a[n.__lrId].position),n.__scratchVec.subtractInPlace(a[n.__llId].position),n.__scratchVec.normalize(),n.__rightEstimate.addInPlace(n.__scratchVec),n.__rightEstimateCount+=1),a[n.__ulId]&&(n.__scratchVec.set(0,0,0),n.__scratchVec.addInPlace(a[n.__ulId].position),n.__scratchVec.subtractInPlace(a[n.__llId].position),n.__scratchVec.normalize(),n.__forwardEstimate.addInPlace(n.__scratchVec),n.__forwardEstimateCount+=1)),a[n.__urId]&&(a[n.__lrId]&&(n.__scratchVec.set(0,0,0),n.__scratchVec.addInPlace(a[n.__urId].position),n.__scratchVec.subtractInPlace(a[n.__lrId].position),n.__scratchVec.normalize(),n.__forwardEstimate.addInPlace(n.__scratchVec),n.__forwardEstimateCount+=1),a[n.__ulId]&&(n.__scratchVec.set(0,0,0),n.__scratchVec.addInPlace(a[n.__urId].position),n.__scratchVec.subtractInPlace(a[n.__ulId].position),n.__scratchVec.normalize(),n.__rightEstimate.addInPlace(n.__scratchVec),n.__rightEstimateCount+=1)),a[n.__lrId]&&a[n.__ulId]&&(n.__scratchVec.set(0,0,0),n.__scratchVec.addInPlace(a[n.__lrId].position),n.__scratchVec.addInPlace(a[n.__ulId].position),n.__scratchVec.scaleInPlace(.5),n.__posEstimate.addInPlace(n.__scratchVec),n.__posEstimateCount+=1),0<n.__posEstimateCount*n.__rightEstimateCount*n.__forwardEstimateCount?(n.__posEstimate.scaleInPlace(1/n.__posEstimateCount),n.__rightEstimate.scaleInPlace(1/n.__rightEstimateCount),n.__forwardEstimate.scaleInPlace(1/n.__forwardEstimateCount),n.__filteredPos.addSample(n.__posEstimate),n.__filteredRight.addSample(n.__rightEstimate),n.__filteredForward.addSample(n.__forwardEstimate),n.__targetPosition.copyFrom(n.__filteredPos),o.Quaternion.RotationQuaternionFromAxisToRef(n.__filteredRight,o.Vector3.Cross(n.__filteredForward,n.__filteredRight),n.__filteredForward,n.__targetRotation),t.setTracking(n.__targetPosition,n.__targetRotation,!0)):t.setTracking(n.__targetPosition,n.__targetRotation,!1)})},n.prototype.setCalibrationAsync=function(e){return void 0===e&&(e=1),this._tracker.setCalibrationAsync(Math.round(e*this._videoTexture.getSize().width),Math.round(e*this._videoTexture.getSize().height))},n.getQuaternionFromRodrigues=function(e,t,r){var a=new o.Vector3(-e,t,-r),n=a.length();return a.scaleInPlace(1/n),0!==n?o.Quaternion.RotationAxis(a,n):null},n.prototype.startTracking=function(){var r=this,a=!1;this._runTrackingObserver=this._scene.onAfterRenderObservable.add(function(){a||(a=!0,r._tracker.findMarkersInImageAsync(r._videoTexture).then(function(e){if(e){var t={};e.forEach(function(e){t[e.id]={position:new o.Vector3(e.tx,-e.ty,e.tz),rotation:n.getQuaternionFromRodrigues(e.rx,e.ry,e.rz)}}),r.processResults(t)}a=!1}))})},n.prototype.stopTracking=function(){this._scene.onAfterRenderObservable.remove(this._runTrackingObserver),this._runTrackingObserver=null},n.createAsync=function(e,t){var r=new n(e,t);return a.ExampleMarkerTracker.createAsync().then(function(e){return r._tracker=e,r.setCalibrationAsync()}).then(function(){return r})},n);function n(e,t){this._runTrackingObserver=null,this._trackableObjects=new o.StringDictionary,this.__posEstimate=o.Vector3.Zero(),this.__posEstimateCount=0,this.__rightEstimate=o.Vector3.Zero(),this.__rightEstimateCount=0,this.__forwardEstimate=o.Vector3.Zero(),this.__forwardEstimateCount=0,this.__scratchVec=o.Vector3.Zero(),this.__filteredPos=new r.FilteredVector3(0,0,0),this.__filteredRight=new r.FilteredVector3(0,0,0),this.__filteredForward=new r.FilteredVector3(0,0,0),this.__targetPosition=o.Vector3.Zero(),this.__targetRotation=o.Quaternion.Identity(),this.__ulId=-1,this.__urId=-1,this.__llId=-1,this.__lrId=-1,this._scene=t,this._videoTexture=e}c.ExampleObjectTracker=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../shared/filteredVector3":7,"../shared/trackedNode":8,"./exampleMarkerTracker":2}],4:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("../shared/dedicatedWorker"),n=e("../shared/constants"),o=(i.onInitialized=function(){postMessage({message:"Got a module!"})},i.onMessage=function(e){var t=e.data;t.wentToWorker=!0,postMessage(t)},i.createAsync=function(){return new Promise(function(t){var r=new i;r._worker=a.DedicatedWorker.createFromLocation(n.EXAMPLE_MODULE_URL,i.onInitialized,i.onMessage),r._worker.onmessage=function(e){r._worker.onmessage=a.DedicatedWorker.unexpectedMessageHandler,t(r)}})},i.prototype.sendMessageAsync=function(e){var r=this,t=new Promise(function(t){r._worker.onmessage=function(e){t(e.data),r._worker.onmessage=a.DedicatedWorker.unexpectedMessageHandler}});return this._worker.postMessage(e),t},i);function i(){}r.ExampleWorker=o},{"../shared/constants":5,"../shared/dedicatedWorker":6}],5:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});r.EXAMPLE_MODULE_URL="https://babylonjs.github.io/BabylonAR/wasm/webpiled-aruco-ar.js"},{}],6:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=(n.createFromSources=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var r="",a=0;a<e.length-1;a++)r+=e[a].toString();return r+="("+e[e.length-1].toString()+")();",new Worker(window.URL.createObjectURL(new Blob([r])))},n.createFromLocation=function(e,t,r){var a='Module = {\n            locateFile: function (path) {\n                return "'+e.replace(/.js$/,".wasm")+'";\n            },\n            onRuntimeInitialized: function () {\n                ('+t.toString()+")();\n            }\n        };",n="this.onmessage = "+r.toString()+";",o='function importJavascript() { importScripts("'+e+'"); }';return this.createFromSources(a,n,o)},n.unexpectedMessageHandler=function(e){throw Error("Unexpected message from WebWorker: "+e)},n);function n(){}r.DedicatedWorker=a},{}],7:[function(e,t,o){(function(e){"use strict";var a,t=this&&this.__extends||(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(o,"__esModule",{value:!0});var i,s="undefined"!=typeof window?window.BABYLON:void 0!==e?e.BABYLON:null,r=(i=s.Vector3,t(n,i),n.prototype.addSample=function(e){this._sampleAverage.scaleInPlace(this._samples.length),this._sampleAverage.subtractInPlace(this._samples[this._idx]),this._samples[this._idx].copyFrom(e),this._sampleAverage.addInPlace(this._samples[this._idx]),this._sampleAverage.scaleInPlace(1/this._samples.length),this._idx=(this._idx+1)%this._samples.length;for(var t=0,r=0;r<this._samples.length;++r)this._sampleSquaredDistances[r]=s.Vector3.DistanceSquared(this._sampleAverage,this._samples[r]),t+=this._sampleSquaredDistances[r];t/=this._samples.length;var a=0;for(this.set(0,0,0),r=0;r<=this._samples.length;++r)this._sampleSquaredDistances[r]<=t&&(this.addInPlace(this._samples[r]),a+=1);this.scaleInPlace(1/a)},n);function n(e,t,r,a){void 0===a&&(a=1);var n=i.call(this,e,t,r)||this;n._idx=0,n._samples=[],n._sampleSquaredDistances=[];for(var o=0;o<a;++o)n._samples.push(new s.Vector3(e,t,r)),n._sampleSquaredDistances.push(0);return n._sampleAverage=new s.Vector3(e,t,r),n}o.FilteredVector3=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,t,s){(function(e){"use strict";var a,t=this&&this.__extends||(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(s,"__esModule",{value:!0});var n,o="undefined"!=typeof window?window.BABYLON:void 0!==e?e.BABYLON:null,r=(n=o.TransformNode,t(i,n),i.prototype.isTracking=function(){return this._isTracking},i.prototype.setTracking=function(e,t,r){this.position.copyFrom(e),this.rotationQuaternion?this.rotationQuaternion.copyFrom(t):this.rotationQuaternion=t.clone(),r?this._notTrackedFramesCount=0:(this._notTrackedFramesCount+=1,this._notTrackedFramesCount<5&&(r=!0)),!this._isTracking&&r?this.onTrackingAcquiredObservable.notifyObservers(this):this._isTracking&&!r&&this.onTrackingLostObservable.notifyObservers(this),this._isTracking=r,this.setEnabled(!this.disableWhenNotTracked||this._isTracking)},i);function i(e,t,r){void 0===r&&(r=!0);var a=n.call(this,e,t,!0)||this;return a._isTracking=!1,a.disableWhenNotTracked=r,a.disableWhenNotTracked&&a.setEnabled(!1),a._notTrackedFramesCount=10,a.onTrackingAcquiredObservable=new o.Observable(function(e){a._isTracking&&a.onTrackingAcquiredObservable.notifyObserver(e,a)}),a.onTrackingLostObservable=new o.Observable,a.rotationQuaternion=o.Quaternion.Identity(),a}s.TrackedNode=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});