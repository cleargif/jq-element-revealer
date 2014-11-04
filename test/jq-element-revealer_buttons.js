(function($) {
'use strict';
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#jqReveal', {
    // This will run before each test in this module.
    setup: function() {
      this.jqReveal = $({}).jqReveal({debug:false});
    }
  });

  test('is chainable', function() {
    expect(1);

    // Not a bad test to run on collection methods.
    strictEqual(this.elems.jqReveal(), this.elems, 'should be chainable');
  });

  test('is ok', function () {
    expect(1);

    ok('BUTTONS', 'I am ok');

  });

}(jQuery));
