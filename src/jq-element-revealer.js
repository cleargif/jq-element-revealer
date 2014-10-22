/*
 * jq element revealer
 * 
 *
 * Copyright (c) 2014 @ClearGif
 * Licensed under the http://cleargifltd.mit-license.org/ license.
 */

(function ($) {

  // Collection method.
  $.fn.jqElementRevealer = function () {
    return this.each(function (i) {
      // Do something to each selected element.
      $(this).html('jqElementRevealer' + i);
    });
  };

  // Static method.
  $.jqElementRevealer = function (options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.jqElementRevealer.options, options);
    // Return the name of your plugin plus a punctuation character.
    return 'jqElementRevealer' + options.punctuation;
  };

  // Static method default options.
  $.jqElementRevealer.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].jqElementRevealer = function (elem) {
    // Does this element contain the name of your plugin?
    return $(elem).text().indexOf('jqElementRevealer') !== -1;
  };

}(jQuery));
