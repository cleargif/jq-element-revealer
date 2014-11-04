/*! jq-element-revealer - v0.1.0 - 2014-11-04
* https://github.com/cleargif/jq-element-revealer
* Copyright (c) 2014 @ClearGif; Licensed http://cleargifltd.mit-license.org/ */
(function ($, window, document, undefined) {
  'use strict';

  var pluginName = 'jqReveal',
    defaults = {
      debug: false,
      arraySeparator: '|',

      // Publisher default selectors and attributes
      publishDelegateSelector: '.pd-delegate-hook',
      publisherSelector: '.pd-publisher',
      publisherEvents: 'data-pd-publish-events',
      publisherEventValue: 'data-pd-publish-value',

      // Subscriber default selectors and attributes
      subscriberSelector: '.pd-subscriber',
      subscriberEvents: 'data-pd-subscribe-events',
      subscriberEventValues: 'data-pd-subscribe-values'
    },
    activated = false;

  // Plugin constructor
  function Plugin(options) {
    this.settings = $.extend({}, defaults, options);
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function () {
      this.bindPublishers();
      this.bindSubscribers();

      if (this.settings.debug) {
        this.debug();
      }
    },

    debug: function () {
      var $this = $(this.settings.subscriberSelector);

      $this.css({
        border: '1px solid gray'
      });

      $this.is(function (idx, el) {
        $(el).prepend('<b>' + $(el).attr('data-pd-subscribe-events') + '::' + $(el).attr('data-pd-subscribe-values') + '</b>');
      });
    },

    /**
     * [bindPublishers description]
     * @return {[type]} [description]
     */
    bindPublishers: function () {
      var $this = $(this.settings.publishDelegateSelector),
        _this = this;

      /**
       * [description]
       * @param  {[type]} e [description]
       * @return {[type]}   [description]
       */
      $this.on('click pseudo-click', _this.settings.publisherSelector, {}, function (e) {
        var $el = $(this),
          $elEventsArray = _this.extractEventNamesList($el, this),
          tag = $el.prop('tagName');

        if (tag === 'A' || tag === 'BUTTON') {
          e.preventDefault();
        }

        $.each($elEventsArray, function (idx, eventName) {
          _this.pdPublish(eventName, e);
        });
      });

    },

    /**
     * [pdPublish description]
     * @param  {[type]} data [description]
     * @param  {[type]} e    [description]
     * @return {[type]}      [description]
     */
    pdPublish: function (data, e) {
      var $el = $(e.target)[0];
      var eventValue = $el.getAttribute('value') || $el.getAttribute(this.settings.publisherEventValue);

      $.publish(data, {
        e: e,
        eventValue: eventValue
      });

    },

    /**
     * [bindSubscribers description]
     * @return {[type]} [description]
     */
    bindSubscribers: function () {
      var $this = $(this.settings.subscriberSelector),
        _this = this;

      $this.is(function (idx, el) {
        $.subscribe(el.getAttribute(_this.settings.subscriberEvents), function (event, obj) {
          _this.subscriberStateManager(el, event, obj);
        });

      });
    },

    /**
     * [subscriberStateManager description]
     * @param  {[type]} el    [description]
     * @param  {[type]} event [description]
     * @param  {[type]} obj   [description]
     * @return {[type]}       [description]
     */
    subscriberStateManager: function (el, event, obj) {
      var eventValues = el.getAttribute(this.settings.subscriberEventValues);
      var isInArray;
      var $el = $(el);

      if(!eventValues){
        $el.toggle();
        return;
      }

      isInArray = !!~$.inArray(obj.eventValue, eventValues.split(this.settings.arraySeparator));

      if (isInArray) {
        $el.show();
        return;
      }

      $el.hide();
    },

    /**
     * [extractEventNamesList description]
     * @param  {[type]} $el   [description]
     * @param  {[type]} _this [description]
     * @return {[type]}       [description]
     */
    extractEventNamesList: function ($el, _this) {
      var dataArray = ['DEFAULT'],
        tagName = $el.prop('tagName'),
        el = ((tagName === 'SELECT') ? $('option:selected', _this)[0] : $el[0]);

      dataArray = el.getAttribute(this.settings.publisherEvents).split(this.settings.arraySeparator);

      return dataArray;
    }

  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $[pluginName] = function (options) {
    if(!activated){
      new Plugin(options);
    }

    // chain jQuery functions
    return this;
  };

})(jQuery, window, document);
