(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _threadRunner = require('../method/thread-runner.js');

var _threadRunner2 = _interopRequireDefault(_threadRunner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.threadRunner = _threadRunner2.default;

},{"../method/thread-runner.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
*  @typedef thread
*  @type {Object}
*
*  @property {number}   fps      - The number of times this threads' tasks run every second
*  @property {boolean}  active   - Whether or not this thread should currently be running its tasks
*  @property {array}    tasks    - An array of functions, or 'tasks', this thread will run every 'tick'
*/

/**
*  Returns a threadRunner object. This is used for running 'simulations', or 'multi-run-functions' a certain number of times per second in a way which setTimeout cannot guarantee.
*  @function
*  @name createThreadRunner
*  @returns {threadRunner} threadRunner
*/

var activeThreads = {};
var idleThreads = {};
var threadRunner = {
  addThread: addThread,
  __activeThreads: activeThreads,
  __idleThreads: idleThreads
};

var uuid = 0;
tick();

exports.default = threadRunner;


function tick() {
  for (var i in activeThreads) {
    activeThreads[i].run();
  }

  requestAnimationFrame(tick);
}

function addThread() {
  var newThreadID = arguments.length <= 0 || arguments[0] === undefined ? ++uuid : arguments[0];
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (activeThreads[newThreadID] || idleThreads[newThreadID]) {
    throw new Error('Thread with ID ' + newThreadID + ' already exists.');
  }
  var thread = new Thread(newThreadID, options);
  activeThreads[newThreadID] = thread;
  return thread;
}

function Thread(id) {
  var _this = this;

  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref$fps = _ref.fps;
  var fps = _ref$fps === undefined ? 60 : _ref$fps;
  var _ref$active = _ref.active;
  var active = _ref$active === undefined ? false : _ref$active;
  var _ref$tasks = _ref.tasks;
  var tasks = _ref$tasks === undefined ? [] : _ref$tasks;
  var _ref$frame = _ref.frame;
  var frame = _ref$frame === undefined ? 0 : _ref$frame;
  var _ref$simulate = _ref.simulate;
  var simulate = _ref$simulate === undefined ? true : _ref$simulate;

  var atTime = +new Date();
  this.id = id;

  this.resetFrame = function () {
    frame = 0;
  };

  this.destroy = function () {
    delete activeThreads[id];
  };

  this.play = function () {
    atTime = +new Date();
    activeThreads[id] = _this;
    delete idleThreads[id];
  };

  this.pause = function () {
    idleThreads[id] = _this;
    delete activeThreads[id];
  };

  this.addTask = function (task) {
    if (tasks.indexOf(task) === -1) {
      tasks.push(task.bind(_this));
    }
  };

  this.removeTask = function (task) {
    var taskIndex = tasks.indexOf(task);
    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
    }
  };

  this.run = function () {
    if (!simulate || atTime < +new Date()) {
      tasks.forEach(function (task) {
        task();
      });

      atTime += 1000 / fps;
      frame += 1;

      if (simulate) {
        _this.run();
      }
    }
  };

  Object.defineProperty(this, 'frame', {
    get: function get() {
      return frame;
    },
    set: function set(value) {
      return frame;
    }
  });
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9qZWN0L3NyYy9lczYvZW50cnkvbWFpbi5qcyIsInByb2plY3Qvc3JjL2VzNi9tZXRob2QvdGhyZWFkLXJ1bm5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBLE9BQU8sWUFBUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDY0EsSUFBTSxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNLGNBQWdCLEVBQXRCO0FBQ0EsSUFBTSxlQUFnQjtBQUNwQixzQkFEb0I7QUFFcEIsbUJBQWlCLGFBRkc7QUFHcEIsaUJBQWlCO0FBSEcsQ0FBdEI7O0FBTUEsSUFBSSxPQUFPLENBQVg7QUFDQTs7a0JBRWUsWTs7O0FBRWYsU0FBUyxJQUFULEdBQWdCO0FBQ2QsT0FBSyxJQUFJLENBQVQsSUFBYyxhQUFkLEVBQTZCO0FBQzNCLGtCQUFjLENBQWQsRUFBaUIsR0FBakI7QUFDRDs7QUFFRCx3QkFBc0IsSUFBdEI7QUFDRDs7QUFFRCxTQUFTLFNBQVQsR0FBMEQ7QUFBQSxNQUFyQyxXQUFxQyx5REFBdkIsRUFBRSxJQUFxQjtBQUFBLE1BQWYsT0FBZSx5REFBTCxFQUFLOztBQUN4RCxNQUFJLGNBQWMsV0FBZCxLQUE4QixZQUFZLFdBQVosQ0FBbEMsRUFBNEQ7QUFDMUQsVUFBTSxJQUFJLEtBQUoscUJBQTRCLFdBQTVCLHNCQUFOO0FBQ0Q7QUFDRCxNQUFNLFNBQVMsSUFBSSxNQUFKLENBQVcsV0FBWCxFQUF3QixPQUF4QixDQUFmO0FBQ0EsZ0JBQWUsV0FBZixJQUErQixNQUEvQjtBQUNBLFNBQU8sTUFBUDtBQUNEOztBQUVELFNBQVMsTUFBVCxDQUFpQixFQUFqQixFQUFnRztBQUFBOztBQUFBLG1FQUFKLEVBQUk7O0FBQUEsc0JBQXpFLEdBQXlFO0FBQUEsTUFBekUsR0FBeUUsNEJBQW5FLEVBQW1FO0FBQUEseUJBQS9ELE1BQStEO0FBQUEsTUFBL0QsTUFBK0QsK0JBQXRELEtBQXNEO0FBQUEsd0JBQS9DLEtBQStDO0FBQUEsTUFBL0MsS0FBK0MsOEJBQXZDLEVBQXVDO0FBQUEsd0JBQW5DLEtBQW1DO0FBQUEsTUFBbkMsS0FBbUMsOEJBQTNCLENBQTJCO0FBQUEsMkJBQXhCLFFBQXdCO0FBQUEsTUFBeEIsUUFBd0IsaUNBQWIsSUFBYTs7QUFDOUYsTUFBSSxTQUFTLENBQUMsSUFBSSxJQUFKLEVBQWQ7QUFDQSxPQUFLLEVBQUwsR0FBYyxFQUFkOztBQUVBLE9BQUssVUFBTCxHQUFrQixZQUFNO0FBQ3RCLFlBQVEsQ0FBUjtBQUNELEdBRkQ7O0FBSUEsT0FBSyxPQUFMLEdBQWUsWUFBTTtBQUNuQixXQUFPLGNBQWUsRUFBZixDQUFQO0FBQ0QsR0FGRDs7QUFJQSxPQUFLLElBQUwsR0FBWSxZQUFNO0FBQ2hCLGFBQVMsQ0FBQyxJQUFJLElBQUosRUFBVjtBQUNBLGtCQUFlLEVBQWY7QUFDQSxXQUFPLFlBQWEsRUFBYixDQUFQO0FBQ0QsR0FKRDs7QUFNQSxPQUFLLEtBQUwsR0FBYSxZQUFNO0FBQ2pCLGdCQUFhLEVBQWI7QUFDQSxXQUFPLGNBQWUsRUFBZixDQUFQO0FBQ0QsR0FIRDs7QUFLQSxPQUFLLE9BQUwsR0FBZSxnQkFBUTtBQUNyQixRQUFJLE1BQU0sT0FBTixDQUFjLElBQWQsTUFBd0IsQ0FBQyxDQUE3QixFQUFpQztBQUMvQixZQUFNLElBQU4sQ0FBWSxLQUFLLElBQUwsT0FBWjtBQUNEO0FBQ0YsR0FKRDs7QUFNQSxPQUFLLFVBQUwsR0FBa0IsZ0JBQVE7QUFDeEIsUUFBTSxZQUFZLE1BQU0sT0FBTixDQUFjLElBQWQsQ0FBbEI7QUFDQSxRQUFJLFlBQVksQ0FBQyxDQUFqQixFQUFxQjtBQUNuQixZQUFNLE1BQU4sQ0FBYSxTQUFiLEVBQXdCLENBQXhCO0FBQ0Q7QUFDRixHQUxEOztBQU9BLE9BQUssR0FBTCxHQUFXLFlBQU07QUFDZixRQUFJLENBQUMsUUFBRCxJQUFhLFNBQVMsQ0FBQyxJQUFJLElBQUosRUFBM0IsRUFBdUM7QUFDckMsWUFBTSxPQUFOLENBQWMsZ0JBQVE7QUFDcEI7QUFDRCxPQUZEOztBQUlBLGdCQUFVLE9BQU8sR0FBakI7QUFDQSxlQUFVLENBQVY7O0FBRUEsVUFBSSxRQUFKLEVBQWM7QUFDWixjQUFLLEdBQUw7QUFDRDtBQUNGO0FBQ0YsR0FiRDs7QUFlQSxTQUFPLGNBQVAsQ0FBc0IsSUFBdEIsRUFBNEIsT0FBNUIsRUFBcUM7QUFDbkMsU0FBSyxlQUFTO0FBQUUsYUFBTyxLQUFQO0FBQWUsS0FESTtBQUVuQyxTQUFLLG9CQUFTO0FBQUUsYUFBTyxLQUFQO0FBQWU7QUFGSSxHQUFyQztBQUlEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB0aHJlYWRSdW5uZXIgZnJvbSAnLi4vbWV0aG9kL3RocmVhZC1ydW5uZXIuanMnO1xuXG53aW5kb3cudGhyZWFkUnVubmVyID0gdGhyZWFkUnVubmVyOyIsIi8qKlxuKiAgQHR5cGVkZWYgdGhyZWFkXG4qICBAdHlwZSB7T2JqZWN0fVxuKlxuKiAgQHByb3BlcnR5IHtudW1iZXJ9ICAgZnBzICAgICAgLSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRoaXMgdGhyZWFkcycgdGFza3MgcnVuIGV2ZXJ5IHNlY29uZFxuKiAgQHByb3BlcnR5IHtib29sZWFufSAgYWN0aXZlICAgLSBXaGV0aGVyIG9yIG5vdCB0aGlzIHRocmVhZCBzaG91bGQgY3VycmVudGx5IGJlIHJ1bm5pbmcgaXRzIHRhc2tzXG4qICBAcHJvcGVydHkge2FycmF5fSAgICB0YXNrcyAgICAtIEFuIGFycmF5IG9mIGZ1bmN0aW9ucywgb3IgJ3Rhc2tzJywgdGhpcyB0aHJlYWQgd2lsbCBydW4gZXZlcnkgJ3RpY2snXG4qL1xuXG4vKipcbiogIFJldHVybnMgYSB0aHJlYWRSdW5uZXIgb2JqZWN0LiBUaGlzIGlzIHVzZWQgZm9yIHJ1bm5pbmcgJ3NpbXVsYXRpb25zJywgb3IgJ211bHRpLXJ1bi1mdW5jdGlvbnMnIGEgY2VydGFpbiBudW1iZXIgb2YgdGltZXMgcGVyIHNlY29uZCBpbiBhIHdheSB3aGljaCBzZXRUaW1lb3V0IGNhbm5vdCBndWFyYW50ZWUuXG4qICBAZnVuY3Rpb25cbiogIEBuYW1lIGNyZWF0ZVRocmVhZFJ1bm5lclxuKiAgQHJldHVybnMge3RocmVhZFJ1bm5lcn0gdGhyZWFkUnVubmVyXG4qL1xuXG5jb25zdCBhY3RpdmVUaHJlYWRzID0ge307XG5jb25zdCBpZGxlVGhyZWFkcyAgID0ge307XG5jb25zdCB0aHJlYWRSdW5uZXIgID0ge1xuICBhZGRUaHJlYWQsXG4gIF9fYWN0aXZlVGhyZWFkczogYWN0aXZlVGhyZWFkcyxcbiAgX19pZGxlVGhyZWFkczogICBpZGxlVGhyZWFkcyxcbn07XG5cbmxldCB1dWlkID0gMDtcbnRpY2soKTtcblxuZXhwb3J0IGRlZmF1bHQgdGhyZWFkUnVubmVyO1xuXG5mdW5jdGlvbiB0aWNrKCkge1xuICBmb3IgKGxldCBpIGluIGFjdGl2ZVRocmVhZHMpIHtcbiAgICBhY3RpdmVUaHJlYWRzW2ldLnJ1bigpXG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG59XG5cbmZ1bmN0aW9uIGFkZFRocmVhZCAoIG5ld1RocmVhZElEID0gKyt1dWlkLCBvcHRpb25zID0ge30gKSB7XG4gIGlmIChhY3RpdmVUaHJlYWRzW25ld1RocmVhZElEXSB8fCBpZGxlVGhyZWFkc1tuZXdUaHJlYWRJRF0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRocmVhZCB3aXRoIElEICR7bmV3VGhyZWFkSUR9IGFscmVhZHkgZXhpc3RzLmApO1xuICB9XG4gIGNvbnN0IHRocmVhZCA9IG5ldyBUaHJlYWQobmV3VGhyZWFkSUQsIG9wdGlvbnMpO1xuICBhY3RpdmVUaHJlYWRzWyBuZXdUaHJlYWRJRCBdID0gdGhyZWFkO1xuICByZXR1cm4gdGhyZWFkO1xufVxuXG5mdW5jdGlvbiBUaHJlYWQgKGlkLCB7IGZwcyA9IDYwLCBhY3RpdmUgPSBmYWxzZSwgdGFza3MgPSBbXSwgZnJhbWUgPSAwLCBzaW11bGF0ZSA9IHRydWUgfSA9IHt9KSB7XG4gIGxldCBhdFRpbWUgPSArbmV3IERhdGUoKTtcbiAgdGhpcy5pZCAgICAgPSBpZDtcblxuICB0aGlzLnJlc2V0RnJhbWUgPSAoKSA9PiB7XG4gICAgZnJhbWUgPSAwO1xuICB9XG5cbiAgdGhpcy5kZXN0cm95ID0gKCkgPT4ge1xuICAgIGRlbGV0ZSBhY3RpdmVUaHJlYWRzWyBpZCBdO1xuICB9XG5cbiAgdGhpcy5wbGF5ID0gKCkgPT4ge1xuICAgIGF0VGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgIGFjdGl2ZVRocmVhZHNbIGlkIF0gPSB0aGlzO1xuICAgIGRlbGV0ZSBpZGxlVGhyZWFkc1sgaWQgXTtcbiAgfVxuXG4gIHRoaXMucGF1c2UgPSAoKSA9PiB7XG4gICAgaWRsZVRocmVhZHNbIGlkIF0gPSB0aGlzO1xuICAgIGRlbGV0ZSBhY3RpdmVUaHJlYWRzWyBpZCBdO1xuICB9XG5cbiAgdGhpcy5hZGRUYXNrID0gdGFzayA9PiB7XG4gICAgaWYgKHRhc2tzLmluZGV4T2YodGFzaykgPT09IC0xICkge1xuICAgICAgdGFza3MucHVzaCggdGFzay5iaW5kKHRoaXMpICk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5yZW1vdmVUYXNrID0gdGFzayA9PiB7XG4gICAgY29uc3QgdGFza0luZGV4ID0gdGFza3MuaW5kZXhPZih0YXNrKTtcbiAgICBpZiAodGFza0luZGV4ID4gLTEgKSB7XG4gICAgICB0YXNrcy5zcGxpY2UodGFza0luZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLnJ1biA9ICgpID0+IHtcbiAgICBpZiAoIXNpbXVsYXRlIHx8IGF0VGltZSA8ICtuZXcgRGF0ZSgpKSB7XG4gICAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICB0YXNrKCk7XG4gICAgICB9KTtcblxuICAgICAgYXRUaW1lICs9IDEwMDAgLyBmcHM7XG4gICAgICBmcmFtZSAgKz0gMTtcblxuICAgICAgaWYgKHNpbXVsYXRlKSB7XG4gICAgICAgIHRoaXMucnVuKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdmcmFtZScsIHtcbiAgICBnZXQ6ICgpICAgID0+IHsgcmV0dXJuIGZyYW1lOyB9LFxuICAgIHNldDogdmFsdWUgPT4geyByZXR1cm4gZnJhbWU7IH0sXG4gIH0pO1xufSJdfQ==
