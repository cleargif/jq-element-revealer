/* global console */
(function ($) {
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
    setup: function () {
      this.elems = $('#qunit-fixture').jqReveal();
    }
  });

  test('chainable', function () {
    console.log(this.elems);
    ok($('p b').jqReveal().addClass('testing'), 'can be chained');
    equal($('p b').hasClass('testing'), true, 'class was added correctly from chaining');
  });

}(jQuery));
