(function ($, window, document, undefined) {
  'use strict';

  var pluginName = 'jqReveal',
    defaults = {
      debug: true,
      arraySeperator: '|',

      // Publisher default selectors and attributes
      dpPublishDelegateSelector: '.pd-delegate-hook',
      dpPublisherSelector: '.pd-publisher',
      dpPublisherEvents: 'data-pd-publish-events',
      dpPublisherEventValue: 'data-pd-publish-value',

      // Subscriber default selectors and attributes
      dpSubscriberSelector: '.pd-subscriber',
      dpSubscriberEvents: 'data-pd-subscribe-events',
      dpSubscriberEventValues: 'data-pd-subscribe-values'
    };

  // Plugin constructor
  function Plugin(element, options) {
    this.element = element;
    this.$element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
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
      var $this = $(this.settings.dpSubscriberSelector);

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
      var $this = $(this.settings.dpPublishDelegateSelector),
        _this = this;

      /**
       * [description]
       * @param  {[type]} e [description]
       * @return {[type]}   [description]
       */
      $this.on('click pseudo-click', _this.settings.dpPublisherSelector, {}, function (e) {
        var $el = $(this),
          $elEventsArray = _this.extractEventNamesList($el, this);
        if ($el.prop('tagName') === 'A' || $el.prop('tagName') === 'BUTTON') {
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
      var eventValue = $el.getAttribute('value') || $el.getAttribute(this.settings.dpPublisherEventValue);
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
      var $this = $(this.settings.dpSubscriberSelector),
        _this = this;

      $this.is(function (idx, el) {
        $.subscribe(el.getAttribute(_this.settings.dpSubscriberEvents), function (event, obj) {
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
      var isInArray = !!~$.inArray(obj.eventValue, el.getAttribute(this.settings.dpSubscriberEventValues).split(this.settings.arraySeperator));
      var $el = $(el);
      if (isInArray) {
        $el.show();
        return;
      }

      $el.hide();
      return;

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
      dataArray = el.getAttribute(this.settings.dpPublisherEvents).split(this.settings.arraySeperator);
      return dataArray;
    }

  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });

    // chain jQuery functions
    return this;
  };

})(jQuery, window, document);