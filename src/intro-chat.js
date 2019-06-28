/* eslint-disable */
/**
 * Intro.js v2.9.3  fork. only highlight element
 * https://github.com/usablica/intro.js
 *
 * Copyright (C) 2017 Afshin Mehrabani (@afshinmeh)
 */

(function(f) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = f();
    // deprecated function
    // @since 2.8.0
    module.exports.introJs = function() {
      console.warn(
        'Deprecated: please use require("intro.js") directly, instead of the introJs method of the function'
      );
      // introJs()
      return f().apply(this, arguments);
    };
  } else if (typeof define === 'function' && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== 'undefined') {
      g = window;
    } else if (typeof global !== 'undefined') {
      g = global;
    } else if (typeof self !== 'undefined') {
      g = self;
    } else {
      g = this;
    }
    g.introJs = f();
  }
})(function() {
  //Default config/variables
  var VERSION = '2.9.3';

  /**
   * IntroJs main class
   *
   * @class IntroJs
   */
  function IntroJs(obj) {
    this._targetElement = obj;
    this._introItems = [];

    this._options = {
      /* CSS class that is added to the helperLayer */
      highlightClass: '',
      /* Close introduction when pressing Escape button? */
      exitOnEsc: true,
      /* Close introduction when clicking on overlay layer? */
      exitOnOverlayClick: true,
      /* Let user use keyboard to navigate the tour? */
      keyboardNavigation: false,

      /* Scroll to highlighted element? */
      scrollToElement: true,
      /*
       * Should we scroll the tooltip or target element?
       *
       * Options are: 'element' or 'tooltip'
       */
      scrollTo: 'element',
      /* Padding to add after scrolling when element is not in the viewport (in pixels) */
      scrollPadding: 30,
      /* Set the overlay opacity */
      overlayOpacity: 0.8,
      /* Precedence of positions, when auto is enabled */
      positionPrecedence: ['bottom', 'top', 'right', 'left'],
      /* Disable an interaction with element? */
      disableInteraction: false,
      /* Set how much padding to be used around helper element */
      helperElementPadding: 0,

      /* additional classes to put on the buttons */
      buttonClass: 'introjs-button'
    };
  }

  /**
   * Initiate a new introduction/guide from an element in the page
   *
   * @api private
   * @method _introForElement
   * @param {Object} targetElm
   * @param {String} group
   * @returns {Boolean} Success or not?
   */
  function _introForElement(targetElm, step) {
    var introItems = [];
    var currentItem = _cloneObject(step);

    //set the step
    currentItem.step = introItems.length + 1;

    //use querySelector function only when developer used CSS selector
    if (typeof currentItem.element === 'string') {
      //grab the element with given selector from the page
      currentItem.element = document.querySelector(currentItem.element);
    }

    //intro without element
    if (
      typeof currentItem.element === 'undefined' ||
      currentItem.element === null
    ) {
      var floatingElementQuery = document.querySelector(
        '.introjsFloatingElement'
      );

      if (floatingElementQuery === null) {
        floatingElementQuery = document.createElement('div');
        floatingElementQuery.className = 'introjsFloatingElement';

        document.body.appendChild(floatingElementQuery);
      }

      currentItem.element = floatingElementQuery;
      currentItem.position = 'floating';
    }

    currentItem.scrollTo = currentItem.scrollTo || this._options.scrollTo;

    if (typeof currentItem.disableInteraction === 'undefined') {
      currentItem.disableInteraction = this._options.disableInteraction;
    }

    if (currentItem.element !== null) {
      introItems = [currentItem];
    }

    //set it to the introJs object
    this._introItems = introItems;

    //add overlay layer to the page
    if (_addOverlayLayer.call(this, targetElm)) {
      //then, start the show
      _nextStep.call(this);

      if (this._options.keyboardNavigation) {
        DOMEvent.on(window, 'keydown', _onKeyDown, this, true);
      }
      //for window resize
      DOMEvent.on(window, 'resize', _onResize, this, true);
    }
    return false;
  }

  function _onResize() {
    this.refresh.call(this);
  }

  /**
   * on keyCode:
   * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
   * This feature has been removed from the Web standards.
   * Though some browsers may still support it, it is in
   * the process of being dropped.
   * Instead, you should use KeyboardEvent.code,
   * if it's implemented.
   *
   * jQuery's approach is to test for
   *   (1) e.which, then
   *   (2) e.charCode, then
   *   (3) e.keyCode
   * https://github.com/jquery/jquery/blob/a6b0705294d336ae2f63f7276de0da1195495363/src/event.js#L638
   *
   * @param type var
   * @return type
   */
  function _onKeyDown(e) {
    var code = e.code === null ? e.which : e.code;

    // if code/e.which is null
    if (code === null) {
      code = e.charCode === null ? e.keyCode : e.charCode;
    }

    if (
      (code === 'Escape' || code === 27) &&
      this._options.exitOnEsc === true
    ) {
      //escape key pressed, exit the intro
      //check if exit callback is defined
      _exitIntro.call(this, this._targetElement);
    }
  }

  /*
   * makes a copy of the object
   * @api private
   * @method _cloneObject
   */
  function _cloneObject(object) {
    if (
      object === null ||
      typeof object !== 'object' ||
      typeof object.nodeType !== 'undefined'
    ) {
      return object;
    }
    var temp = {};
    for (var key in object) {
      if (
        typeof window.jQuery !== 'undefined' &&
        object[key] instanceof window.jQuery
      ) {
        temp[key] = object[key];
      } else {
        temp[key] = _cloneObject(object[key]);
      }
    }
    return temp;
  }
  /**
   * Go to specific step of introduction
   *
   * @api private
   * @method _goToStep
   */
  function _goToStep(step) {
    //because steps starts with zero
    this._currentStep = step - 2;
    if (typeof this._introItems !== 'undefined') {
      _nextStep.call(this);
    }
  }

  /**
   * Go to the specific step of introduction with the explicit [data-step] number
   *
   * @api private
   * @method _goToStepNumber
   */
  function _goToStepNumber(step) {
    this._currentStepNumber = step;
    if (typeof this._introItems !== 'undefined') {
      _nextStep.call(this);
    }
  }

  /**
   * Go to next step on intro
   *
   * @api private
   * @method _nextStep
   */
  function _nextStep() {
    this._direction = 'forward';

    if (typeof this._currentStepNumber !== 'undefined') {
      _forEach(
        this._introItems,
        function(item, i) {
          if (item.step === this._currentStepNumber) {
            this._currentStep = i - 1;
            this._currentStepNumber = undefined;
          }
        }.bind(this)
      );
    }

    if (typeof this._currentStep === 'undefined') {
      this._currentStep = 0;
    } else {
      ++this._currentStep;
    }

    // comment остыль var nextStep = this._introItems[this._currentStep];
    var nextStep = this._introItems[0];
    var continueStep = true;

    if (typeof this._introBeforeChangeCallback !== 'undefined') {
      continueStep = this._introBeforeChangeCallback.call(
        this,
        nextStep.element
      );
    }

    // if `onbeforechange` returned `false`, stop displaying the element
    if (continueStep === false) {
      --this._currentStep;
      return false;
    }

    if (this._introItems.length <= this._currentStep) {
      //end of the intro
      //check if any callback is defined
      if (typeof this._introCompleteCallback === 'function') {
        this._introCompleteCallback.call(this);
      }
      _exitIntro.call(this, this._targetElement);
      return;
    }

    _showElement.call(this, nextStep);
  }
 
  /**
   * Update placement of the intro objects on the screen
   * @api private
   */
  function _refresh() {
    // re-align intros
    _setHelperLayerPosition.call(
      this,
      document.querySelector('.introjs-helperLayer')
    );
    _setHelperLayerPosition.call(
      this,
      document.querySelector('.introjs-tooltipReferenceLayer')
    );
    _setHelperLayerPosition.call(
      this,
      document.querySelector('.introjs-disableInteraction')
    );

    return this;
  }

  /**
   * Exit from intro
   *
   * @api private
   * @method _exitIntro
   * @param {Object} targetElement
   * @param {Boolean} force - Setting to `true` will skip the result of beforeExit callback
   */
  function _exitIntro(targetElement, force) {
    var continueExit = true;

    // calling onbeforeexit callback
    //
    // If this callback return `false`, it would halt the process
    if (this._introBeforeExitCallback !== undefined) {
      continueExit = this._introBeforeExitCallback.call(this);
    }

    // skip this check if `force` parameter is `true`
    // otherwise, if `onbeforeexit` returned `false`, don't exit the intro
    if (!force && continueExit === false) return;

    //remove overlay layers from the page
    var overlayLayers = targetElement.querySelectorAll('.introjs-overlay');

    if (overlayLayers && overlayLayers.length) {
      _forEach(
        overlayLayers,
        function(overlayLayer) {
          overlayLayer.style.opacity = 0;
          window.setTimeout(
            function() {
              if (this.parentNode) {
                this.parentNode.removeChild(this);
              }
            }.bind(overlayLayer),
            500
          );
        }.bind(this)
      );
    }

    //remove all helper layers
    var helperLayer = targetElement.querySelector('.introjs-helperLayer');
    if (helperLayer) {
      helperLayer.parentNode.removeChild(helperLayer);
    }

    var referenceLayer = targetElement.querySelector(
      '.introjs-tooltipReferenceLayer'
    );
    if (referenceLayer) {
      referenceLayer.parentNode.removeChild(referenceLayer);
    }

    //remove disableInteractionLayer
    var disableInteractionLayer = targetElement.querySelector(
      '.introjs-disableInteraction'
    );
    if (disableInteractionLayer) {
      disableInteractionLayer.parentNode.removeChild(disableInteractionLayer);
    }

    //remove intro floating element
    var floatingElement = document.querySelector('.introjsFloatingElement');
    if (floatingElement) {
      floatingElement.parentNode.removeChild(floatingElement);
    }

    _removeShowElement();

    //remove `introjs-fixParent` class from the elements
    var fixParents = document.querySelectorAll('.introjs-fixParent');
    _forEach(fixParents, function(parent) {
      _removeClass(parent, /introjs-fixParent/g);
    });

    //clean listeners
    DOMEvent.off(window, 'keydown', _onKeyDown, this, true);
    DOMEvent.off(window, 'resize', _onResize, this, true);

    //check if any callback is defined
    if (this._introExitCallback !== undefined) {
      this._introExitCallback.call(this);
    }

    //set the step to zero
    this._currentStep = undefined;
  }

  /**
   * Set tooltip left so it doesn't go off the right side of the window
   *
   * @return boolean true, if tooltipLayerStyleLeft is ok.  false, otherwise.
   */
  function _checkRight(
    targetOffset,
    tooltipLayerStyleLeft,
    tooltipOffset,
    windowSize,
    tooltipLayer
  ) {
    if (
      targetOffset.left + tooltipLayerStyleLeft + tooltipOffset.width >
      windowSize.width
    ) {
      // off the right side of the window
      tooltipLayer.style.left =
        windowSize.width - tooltipOffset.width - targetOffset.left + 'px';
      return false;
    }
    tooltipLayer.style.left = tooltipLayerStyleLeft + 'px';
    return true;
  }

  /**
   * Set tooltip right so it doesn't go off the left side of the window
   *
   * @return boolean true, if tooltipLayerStyleRight is ok.  false, otherwise.
   */
  function _checkLeft(
    targetOffset,
    tooltipLayerStyleRight,
    tooltipOffset,
    tooltipLayer
  ) {
    if (
      targetOffset.left +
        targetOffset.width -
        tooltipLayerStyleRight -
        tooltipOffset.width <
      0
    ) {
      // off the left side of the window
      tooltipLayer.style.left = -targetOffset.left + 'px';
      return false;
    }
    tooltipLayer.style.right = tooltipLayerStyleRight + 'px';
    return true;
  }

  /**
   * Determines the position of the tooltip based on the position precedence and availability
   * of screen space.
   *
   * @param {Object}    targetElement
   * @param {Object}    tooltipLayer
   * @param {String}    desiredTooltipPosition
   * @return {String}   calculatedPosition
   */
  function _determineAutoPosition(
    targetElement,
    tooltipLayer,
    desiredTooltipPosition
  ) {
    // Take a clone of position precedence. These will be the available
    var possiblePositions = this._options.positionPrecedence.slice();

    var windowSize = _getWinSize();
    var tooltipHeight = _getOffset(tooltipLayer).height + 10;
    var tooltipWidth = _getOffset(tooltipLayer).width + 20;
    var targetElementRect = targetElement.getBoundingClientRect();

    // If we check all the possible areas, and there are no valid places for the tooltip, the element
    // must take up most of the screen real estate. Show the tooltip floating in the middle of the screen.
    var calculatedPosition = 'floating';

    /*
     * auto determine position
     */

    // Check for space below
    if (
      targetElementRect.bottom + tooltipHeight + tooltipHeight >
      windowSize.height
    ) {
      _removeEntry(possiblePositions, 'bottom');
    }

    // Check for space above
    if (targetElementRect.top - tooltipHeight < 0) {
      _removeEntry(possiblePositions, 'top');
    }

    // Check for space to the right
    if (targetElementRect.right + tooltipWidth > windowSize.width) {
      _removeEntry(possiblePositions, 'right');
    }

    // Check for space to the left
    if (targetElementRect.left - tooltipWidth < 0) {
      _removeEntry(possiblePositions, 'left');
    }

    // @var {String}  ex: 'right-aligned'
    var desiredAlignment = (function(pos) {
      var hyphenIndex = pos.indexOf('-');
      if (hyphenIndex !== -1) {
        // has alignment
        return pos.substr(hyphenIndex);
      }
      return '';
    })(desiredTooltipPosition || '');

    // strip alignment from position
    if (desiredTooltipPosition) {
      // ex: "bottom-right-aligned"
      // should return 'bottom'
      desiredTooltipPosition = desiredTooltipPosition.split('-')[0];
    }

    if (possiblePositions.length) {
      if (
        desiredTooltipPosition !== 'auto' &&
        possiblePositions.indexOf(desiredTooltipPosition) > -1
      ) {
        // If the requested position is in the list, choose that
        calculatedPosition = desiredTooltipPosition;
      } else {
        // Pick the first valid position, in order
        calculatedPosition = possiblePositions[0];
      }
    }

    // only top and bottom positions have optional alignments
    if (['top', 'bottom'].indexOf(calculatedPosition) !== -1) {
      calculatedPosition += _determineAutoAlignment(
        targetElementRect.left,
        tooltipWidth,
        windowSize,
        desiredAlignment
      );
    }

    return calculatedPosition;
  }

  /**
   * auto-determine alignment
   * @param {Integer}  offsetLeft
   * @param {Integer}  tooltipWidth
   * @param {Object}   windowSize
   * @param {String}   desiredAlignment
   * @return {String}  calculatedAlignment
   */
  function _determineAutoAlignment(
    offsetLeft,
    tooltipWidth,
    windowSize,
    desiredAlignment
  ) {
    var halfTooltipWidth = tooltipWidth / 2,
      winWidth = Math.min(windowSize.width, window.screen.width),
      possibleAlignments = [
        '-left-aligned',
        '-middle-aligned',
        '-right-aligned'
      ],
      calculatedAlignment = '';

    // valid left must be at least a tooltipWidth
    // away from right side
    if (winWidth - offsetLeft < tooltipWidth) {
      _removeEntry(possibleAlignments, '-left-aligned');
    }

    // valid middle must be at least half
    // width away from both sides
    if (
      offsetLeft < halfTooltipWidth ||
      winWidth - offsetLeft < halfTooltipWidth
    ) {
      _removeEntry(possibleAlignments, '-middle-aligned');
    }

    // valid right must be at least a tooltipWidth
    // width away from left side
    if (offsetLeft < tooltipWidth) {
      _removeEntry(possibleAlignments, '-right-aligned');
    }

    if (possibleAlignments.length) {
      if (possibleAlignments.indexOf(desiredAlignment) !== -1) {
        // the desired alignment is valid
        calculatedAlignment = desiredAlignment;
      } else {
        // pick the first valid position, in order
        calculatedAlignment = possibleAlignments[0];
      }
    } else {
      // if screen width is too small
      // for ANY alignment, middle is
      // probably the best for visibility
      calculatedAlignment = '-middle-aligned';
    }

    return calculatedAlignment;
  }

  /**
   * Remove an entry from a string array if it's there, does nothing if it isn't there.
   *
   * @param {Array} stringArray
   * @param {String} stringToRemove
   */
  function _removeEntry(stringArray, stringToRemove) {
    if (stringArray.indexOf(stringToRemove) > -1) {
      stringArray.splice(stringArray.indexOf(stringToRemove), 1);
    }
  }

  /**
   * Update the position of the helper layer on the screen
   *
   * @api private
   * @method _setHelperLayerPosition
   * @param {Object} helperLayer
   */
  function _setHelperLayerPosition(helperLayer) {
    if (helperLayer) {
      //prevent error when `this._currentStep` in undefined
      if (!this._introItems[this._currentStep]) return;

      var currentElement = this._introItems[this._currentStep],
        elementPosition = _getOffset(currentElement.element),
        widthHeightPadding = this._options.helperElementPadding;

      // If the target element is fixed, the tooltip should be fixed as well.
      // Otherwise, remove a fixed class that may be left over from the previous
      // step.
      if (_isFixed(currentElement.element)) {
        _addClass(helperLayer, 'introjs-fixedTooltip');
      } else {
        _removeClass(helperLayer, 'introjs-fixedTooltip');
      }

      if (currentElement.position === 'floating') {
        widthHeightPadding = 0;
      }

      //set new position to helper layer
      helperLayer.style.cssText =
        'width: ' +
        (elementPosition.width + widthHeightPadding) +
        'px; ' +
        'height:' +
        (elementPosition.height + widthHeightPadding) +
        'px; ' +
        'top:' +
        (elementPosition.top - widthHeightPadding / 2) +
        'px;' +
        'left: ' +
        (elementPosition.left - widthHeightPadding / 2) +
        'px;';

      window.setTimeout(() => {
        _setClipPathOfHelper.call(this, helperLayer);
      }, 35);
    }
  }

  /**
   * Add disableinteraction layer and adjust the size and position of the layer
   *
   * @api private
   * @method _disableInteraction
   */
  function _disableInteraction() {
    var disableInteractionLayer = document.querySelector(
      '.introjs-disableInteraction'
    );

    if (disableInteractionLayer === null) {
      disableInteractionLayer = document.createElement('div');
      disableInteractionLayer.className = 'introjs-disableInteraction';
      this._targetElement.appendChild(disableInteractionLayer);
    }

    _setHelperLayerPosition.call(this, disableInteractionLayer);
  }

  /**
   * Setting anchors to behave like buttons
   *
   * @api private
   * @method _setAnchorAsButton
   */
  function _setAnchorAsButton(anchor) {
    anchor.setAttribute('role', 'button');
    anchor.tabIndex = 0;
  }

  /**
   * @api private
   * @method _getDimensions
   */
  function _getDimensions(helper) {
    return {
      width: helper.offsetWidth,
      height: helper.offsetHeight,
      left: helper.offsetLeft,
      top: helper.offsetTop
    };
  }

  /**
   * @api private
   * @method _setClipPathOfHelper
   */
  function _setClipPathOfHelper(helperLayer) {
    // костыль const step = this._introItems[this._currentStep];
    const step = this._introItems[0];
    
    const overlay = document.querySelector('.introjs-overlay');
    if (step.fixed) {
      const { width, height, left, top } = _getDimensions.call(
        this,
        helperLayer
      );
      const coords = [
        {
          x: '0%',
          y: '0%'
        },
        {
          x: '0%',
          y: '100%'
        },
        {
          x: left + 'px',
          y: '100%'
        },
        {
          x: left + 'px',
          y: top + 'px'
        },
        {
          x: left + width + 'px',
          y: top + 'px'
        },
        {
          x: left + width + 'px',
          y: top + height + 'px'
        },
        {
          x: left + 'px',
          y: top + height + 'px'
        },
        {
          x: left + 'px',
          y: '100%'
        },
        {
          x: '100%',
          y: '100%'
        },
        {
          x: '100%',
          y: '0%'
        }
      ];

      if (overlay) {
        overlay.style.clipPath = `polygon(${coords
          .map(({ x, y }) => x + ' ' + y)
          .join(', ')})`;
      }

      helperLayer.style.visibility = 'hidden';
    } else {
      overlay.style.clipPath = '';
      helperLayer.style.visibility = 'visible';
    }
  }

  /**
   * Show an element on the page
   *
   * @api private
   * @method _showElement
   * @param {Object} targetElement
   */
  function _showElement(targetElement) {
    if (typeof this._introChangeCallback !== 'undefined') {
      this._introChangeCallback.call(this, targetElement.element);
    }

    var self = this,
      oldHelperLayer = document.querySelector('.introjs-helperLayer'),
      oldReferenceLayer = document.querySelector(
        '.introjs-tooltipReferenceLayer'
      ),
      highlightClass = 'introjs-helperLayer',
      scrollParent;

    //check for a current step highlight class
    if (typeof targetElement.highlightClass === 'string') {
      highlightClass += ' ' + targetElement.highlightClass;
    }
    //check for options highlight class
    if (typeof this._options.highlightClass === 'string') {
      highlightClass += ' ' + this._options.highlightClass;
    }

    if (oldHelperLayer !== null) {
      

      // scroll to element
      scrollParent = _getScrollParent(targetElement.element);

      if (scrollParent !== document.body) {
        // target is within a scrollable element
        _scrollParentToElement(scrollParent, targetElement.element);
      }

      // set new position to helper layer
      _setHelperLayerPosition.call(self, oldHelperLayer);
      _setHelperLayerPosition.call(self, oldReferenceLayer);

      //remove `introjs-fixParent` class from the elements
      var fixParents = document.querySelectorAll('.introjs-fixParent');
      _forEach(fixParents, function(parent) {
        _removeClass(parent, /introjs-fixParent/g);
      });

      //remove old classes if the element still exist
      _removeShowElement();

      //we should wait until the CSS3 transition is competed (it's 0.3 sec) to prevent incorrect `height` and `width` calculation
      if (self._lastShowElementTimer) {
        window.clearTimeout(self._lastShowElementTimer);
      }

      self._lastShowElementTimer = window.setTimeout(function() {
        // change the scroll of the window, if needed
        _scrollTo.call(self, targetElement.scrollTo, targetElement);
      }, 350);

      // end of old element if-else condition
    } else {
      var helperLayer = document.createElement('div'),
        referenceLayer = document.createElement('div');

      helperLayer.className = highlightClass;
      referenceLayer.className = 'introjs-tooltipReferenceLayer';

      // scroll to element
      scrollParent = _getScrollParent(targetElement.element);

      if (scrollParent !== document.body) {
        // target is within a scrollable element
        _scrollParentToElement(scrollParent, targetElement.element);
      }

      //set new position to helper layer
      _setHelperLayerPosition.call(self, helperLayer);
      _setHelperLayerPosition.call(self, referenceLayer);

      //add helper layer to target element
      this._targetElement.appendChild(helperLayer);
      this._targetElement.appendChild(referenceLayer);
 
      // change the scroll of the window, if needed
      _scrollTo.call(this, targetElement.scrollTo, targetElement);

      //end of new element if-else condition
    }

    // removing previous disable interaction layer
    var disableInteractionLayer = self._targetElement.querySelector(
      '.introjs-disableInteraction'
    );
    if (disableInteractionLayer) {
      disableInteractionLayer.parentNode.removeChild(disableInteractionLayer);
    }

    //disable interaction
    if (targetElement.disableInteraction) {
      _disableInteraction.call(self);
    }

    _setShowElement(targetElement);

    if (typeof this._introAfterChangeCallback !== 'undefined') {
      this._introAfterChangeCallback.call(this, targetElement.element);
    }
    
  }

  /**
   * To change the scroll of `window` after highlighting an element
   *
   * @api private
   * @method _scrollTo
   * @param {String} scrollTo
   * @param {Object} targetElement
   */
  function _scrollTo(scrollTo, targetElement) {
    if (scrollTo === 'off') return;
    var rect;

    if (!this._options.scrollToElement) return;

    rect = targetElement.element.getBoundingClientRect();

    if (!_elementInViewport(targetElement.element)) {
      var winHeight = _getWinSize().height;
      var top = rect.bottom - (rect.bottom - rect.top);

      // TODO (afshinm): do we need scroll padding now?
      // I have changed the scroll option and now it scrolls the window to
      // the center of the target element or tooltip.

      if (top < 0 || targetElement.element.clientHeight > winHeight) {
        window.scrollBy(
          0,
          rect.top -
            (winHeight / 2 - rect.height / 2) -
            this._options.scrollPadding
        ); // 30px padding from edge to look nice

        //Scroll down
      } else {
        window.scrollBy(
          0,
          rect.top -
            (winHeight / 2 - rect.height / 2) +
            this._options.scrollPadding
        ); // 30px padding from edge to look nice
      }
    }
  }

  /**
   * To remove all show element(s)
   *
   * @api private
   * @method _removeShowElement
   */
  function _removeShowElement() {
    var elms = document.querySelectorAll('.introjs-showElement');

    _forEach(elms, function(elm) {
      _removeClass(elm, /introjs-[a-zA-Z]+/g);
    });
  }

  /**
   * To set the show element
   * This function set a relative (in most cases) position and changes the z-index
   *
   * @api private
   * @method _setShowElement
   * @param {Object} targetElement
   */
  function _setShowElement(targetElement) {
    var parentElm;
    // we need to add this show element class to the parent of SVG elements
    // because the SVG elements can't have independent z-index
    if (targetElement.element instanceof SVGElement) {
      parentElm = targetElement.element.parentNode;

      while (targetElement.element.parentNode !== null) {
        if (!parentElm.tagName || parentElm.tagName.toLowerCase() === 'body')
          break;

        if (parentElm.tagName.toLowerCase() === 'svg') {
          _addClass(parentElm, 'introjs-showElement introjs-relativePosition');
        }

        parentElm = parentElm.parentNode;
      }
    }

    _addClass(targetElement.element, 'introjs-showElement');

    var currentElementPosition = _getPropValue(
      targetElement.element,
      'position'
    );
    if (
      currentElementPosition !== 'absolute' &&
      currentElementPosition !== 'relative' &&
      currentElementPosition !== 'fixed'
    ) {
      //change to new intro item
      _addClass(targetElement.element, 'introjs-relativePosition');
    }

    parentElm = targetElement.element.parentNode;
    while (parentElm !== null) {
      if (!parentElm.tagName || parentElm.tagName.toLowerCase() === 'body')
        break;

      //fix The Stacking Context problem.
      //More detail: https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context
      var zIndex = _getPropValue(parentElm, 'z-index');
      var opacity = parseFloat(_getPropValue(parentElm, 'opacity'));
      var transform =
        _getPropValue(parentElm, 'transform') ||
        _getPropValue(parentElm, '-webkit-transform') ||
        _getPropValue(parentElm, '-moz-transform') ||
        _getPropValue(parentElm, '-ms-transform') ||
        _getPropValue(parentElm, '-o-transform');
      if (
        /[0-9]+/.test(zIndex) ||
        opacity < 1 ||
        (transform !== 'none' && transform !== undefined)
      ) {
        _addClass(parentElm, 'introjs-fixParent');
      }

      parentElm = parentElm.parentNode;
    }
  }

  /**
   * Iterates arrays
   *
   * @param {Array} arr
   * @param {Function} forEachFnc
   * @param {Function} completeFnc
   * @return {Null}
   */
  function _forEach(arr, forEachFnc, completeFnc) {
    // in case arr is an empty query selector node list
    if (arr) {
      for (var i = 0, len = arr.length; i < len; i++) {
        forEachFnc(arr[i], i);
      }
    }

    if (typeof completeFnc === 'function') {
      completeFnc();
    }
  }

  /**
   * Mark any object with an incrementing number
   * used for keeping track of objects
   *
   * @param Object obj   Any object or DOM Element
   * @param String key
   * @return Object
   */
  var _stamp = (function() {
    var keys = {};
    return function stamp(obj, key) {
      // get group key
      key = key || 'introjs-stamp';

      // each group increments from 0
      keys[key] = keys[key] || 0;

      // stamp only once per object
      if (obj[key] === undefined) {
        // increment key for each new object
        obj[key] = keys[key]++;
      }

      return obj[key];
    };
  })();

  /**
   * DOMEvent Handles all DOM events
   *
   * methods:
   *
   * on - add event handler
   * off - remove event
   */
  var DOMEvent = (function() {
    function DOMEvent() {
      var events_key = 'introjs_event';

      /**
       * Gets a unique ID for an event listener
       *
       * @param Object obj
       * @param String type        event type
       * @param Function listener
       * @param Object context
       * @return String
       */
      this._id = function(obj, type, listener, context) {
        return type + _stamp(listener) + (context ? '_' + _stamp(context) : '');
      };

      /**
       * Adds event listener
       *
       * @param Object obj
       * @param String type        event type
       * @param Function listener
       * @param Object context
       * @param Boolean useCapture
       * @return null
       */
      this.on = function(obj, type, listener, context, useCapture) {
        var id = this._id.apply(this, arguments),
          handler = function(e) {
            return listener.call(context || obj, e || window.event);
          };

        if ('addEventListener' in obj) {
          obj.addEventListener(type, handler, useCapture);
        } else if ('attachEvent' in obj) {
          obj.attachEvent('on' + type, handler);
        }

        obj[events_key] = obj[events_key] || {};
        obj[events_key][id] = handler;
      };

      /**
       * Removes event listener
       *
       * @param Object obj
       * @param String type        event type
       * @param Function listener
       * @param Object context
       * @param Boolean useCapture
       * @return null
       */
      this.off = function(obj, type, listener, context, useCapture) {
        var id = this._id.apply(this, arguments),
          handler = obj[events_key] && obj[events_key][id];

        if (!handler) {
          return;
        }

        if ('removeEventListener' in obj) {
          obj.removeEventListener(type, handler, useCapture);
        } else if ('detachEvent' in obj) {
          obj.detachEvent('on' + type, handler);
        }

        obj[events_key][id] = null;
      };
    }

    return new DOMEvent();
  })();

  /**
   * Append a class to an element
   *
   * @api private
   * @method _addClass
   * @param {Object} element
   * @param {String} className
   * @returns null
   */
  function _addClass(element, className) {
    if (element instanceof SVGElement) {
      // svg
      var pre = element.getAttribute('class') || '';

      element.setAttribute('class', pre + ' ' + className);
    } else {
      if (element.classList !== undefined) {
        // check for modern classList property
        var classes = className.split(' ');
        _forEach(classes, function(cls) {
          element.classList.add(cls);
        });
      } else if (!element.className.match(className)) {
        // check if element doesn't already have className
        element.className += ' ' + className;
      }
    }
  }

  /**
   * Remove a class from an element
   *
   * @api private
   * @method _removeClass
   * @param {Object} element
   * @param {RegExp|String} classNameRegex can be regex or string
   * @returns null
   */
  function _removeClass(element, classNameRegex) {
    if (element instanceof SVGElement) {
      var pre = element.getAttribute('class') || '';

      element.setAttribute(
        'class',
        pre.replace(classNameRegex, '').replace(/^\s+|\s+$/g, '')
      );
    } else {
      element.className = element.className
        .replace(classNameRegex, '')
        .replace(/^\s+|\s+$/g, '');
    }
  }

  /**
   * Get an element CSS property on the page
   * Thanks to JavaScript Kit: http://www.javascriptkit.com/dhtmltutors/dhtmlcascade4.shtml
   *
   * @api private
   * @method _getPropValue
   * @param {Object} element
   * @param {String} propName
   * @returns Element's property value
   */
  function _getPropValue(element, propName) {
    var propValue = '';
    if (element.currentStyle) {
      //IE
      propValue = element.currentStyle[propName];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
      //Others
      propValue = document.defaultView
        .getComputedStyle(element, null)
        .getPropertyValue(propName);
    }

    //Prevent exception in IE
    if (propValue && propValue.toLowerCase) {
      return propValue.toLowerCase();
    } else {
      return propValue;
    }
  }

  /**
   * Checks to see if target element (or parents) position is fixed or not
   *
   * @api private
   * @method _isFixed
   * @param {Object} element
   * @returns Boolean
   */
  function _isFixed(element) {
    var p = element.parentNode;

    if (!p || p.nodeName === 'HTML') {
      return false;
    }

    if (_getPropValue(element, 'position') === 'fixed') {
      return true;
    }

    return _isFixed(p);
  }

  /**
   * Provides a cross-browser way to get the screen dimensions
   * via: http://stackoverflow.com/questions/5864467/internet-explorer-innerheight
   *
   * @api private
   * @method _getWinSize
   * @returns {Object} width and height attributes
   */
  function _getWinSize() {
    if (window.innerWidth !== undefined) {
      return { width: window.innerWidth, height: window.innerHeight };
    } else {
      var D = document.documentElement;
      return { width: D.clientWidth, height: D.clientHeight };
    }
  }

  /**
   * Check to see if the element is in the viewport or not
   * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
   *
   * @api private
   * @method _elementInViewport
   * @param {Object} el
   */
  function _elementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom + 80 <= window.innerHeight && // add 80 to get the text right
      rect.right <= window.innerWidth
    );
  }

  /**
   * Add overlay layer to the page
   *
   * @api private
   * @method _addOverlayLayer
   * @param {Object} targetElm
   */
  function _addOverlayLayer(targetElm) {
    var overlayLayer = document.createElement('div'),
      styleText = '',
      self = this;

    //set css class name
    overlayLayer.className = 'introjs-overlay';

    //check if the target element is body, we should calculate the size of overlay layer in a better way
    if (!targetElm.tagName || targetElm.tagName.toLowerCase() === 'body') {
      styleText += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;';
      overlayLayer.style.cssText = styleText;
    } else {
      //set overlay layer position
      var elementPosition = _getOffset(targetElm);
      if (elementPosition) {
        styleText +=
          'width: ' +
          elementPosition.width +
          'px; height:' +
          elementPosition.height +
          'px; top:' +
          elementPosition.top +
          'px;left: ' +
          elementPosition.left +
          'px;';
        overlayLayer.style.cssText = styleText;
      }
    }

    targetElm.appendChild(overlayLayer);

    overlayLayer.onclick = function() {
      if (self._options.exitOnOverlayClick === true) {
        _exitIntro.call(self, targetElm);
      }
    };

    window.setTimeout(function() {
      styleText += 'opacity: ' + self._options.overlayOpacity.toString() + ';';
      overlayLayer.style.cssText = styleText;
    }, 10);
    return true;
  }

  /**
   * Get an element position on the page
   * Thanks to `meouw`: http://stackoverflow.com/a/442474/375966
   *
   * @api private
   * @method _getOffset
   * @param {Object} element
   * @returns Element's position info
   */
  function _getOffset(element) {
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    var x = element.getBoundingClientRect();
    return {
      top: x.top + scrollTop,
      width: x.width,
      height: x.height,
      left: x.left + scrollLeft
    };
  }

  /**
   * Find the nearest scrollable parent
   * copied from https://stackoverflow.com/questions/35939886/find-first-scrollable-parent
   *
   * @param Element element
   * @return Element
   */
  function _getScrollParent(element) {
    var style = window.getComputedStyle(element);
    var excludeStaticParent = style.position === 'absolute';
    var overflowRegex = /(auto|scroll)/;

    if (style.position === 'fixed') return document.body;

    for (var parent = element; (parent = parent.parentElement); ) {
      style = window.getComputedStyle(parent);
      if (excludeStaticParent && style.position === 'static') {
        continue;
      }
      if (
        overflowRegex.test(style.overflow + style.overflowY + style.overflowX)
      )
        return parent;
    }

    return document.body;
  }

  /**
   * scroll a scrollable element to a child element
   *
   * @param Element parent
   * @param Element element
   * @return Null
   */
  function _scrollParentToElement(parent, element) {
    parent.scrollTop = element.offsetTop - parent.offsetTop;
  }

  /**
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   * via: http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
   *
   * @param obj1
   * @param obj2
   * @returns obj3 a new object based on obj1 and obj2
   */
  function _mergeOptions(obj1, obj2) {
    var obj3 = {},
      attrname;
    for (attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }
    for (attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }
    return obj3;
  }

  var introJs = function(targetElm) {
    var instance;

    if (typeof targetElm === 'object') {
      //Ok, create a new instance
      instance = new IntroJs(targetElm);
    } else if (typeof targetElm === 'string') {
      //select the target element with query selector
      var targetElement = document.querySelector(targetElm);

      if (targetElement) {
        instance = new IntroJs(targetElement);
      } else {
        throw new Error('There is no element with given selector.');
      }
    } else {
      instance = new IntroJs(document.body);
    }
    // add instance to list of _instances
    // passing group to _stamp to increment
    // from 0 onward somewhat reliably
    introJs.instances[_stamp(instance, 'introjs-instance')] = instance;

    return instance;
  };

  /**
   * Current IntroJs version
   *
   * @property version
   * @type String
   */
  introJs.version = VERSION;

  /**
   * key-val object helper for introJs instances
   *
   * @property instances
   * @type Object
   */
  introJs.instances = {};

  //Prototype
  introJs.fn = IntroJs.prototype = {
    clone: function() {
      return new IntroJs(this);
    },
    setOption: function(option, value) {
      this._options[option] = value;
      return this;
    },
    setOptions: function(options) {
      this._options = _mergeOptions(this._options, options);
      return this;
    },
    start: function(selector) {
      _introForElement.call(this, this._targetElement, selector);
      return this;
    },
    goToStep: function(step) {
      _goToStep.call(this, step);
      return this;
    },
    addStep: function(options) {
      if (!this._options.steps) {
        this._options.steps = [];
      }

      this._options.steps.push(options);

      return this;
    }, 
    goToStepNumber: function(step) {
      _goToStepNumber.call(this, step);

      return this;
    },
    nextStep: function() {
      _nextStep.call(this);
      return this;
    },
    exit: function(force) {
      _exitIntro.call(this, this._targetElement, force);
      return this;
    },
    refresh: function() {
      _refresh.call(this);
      return this;
    },
    onbeforechange: function(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introBeforeChangeCallback = providedCallback;
      } else {
        throw new Error(
          'Provided callback for onbeforechange was not a function'
        );
      }
      return this;
    },
    onchange: function(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onchange was not a function.');
      }
      return this;
    },
    onafterchange: function(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introAfterChangeCallback = providedCallback;
      } else {
        throw new Error(
          'Provided callback for onafterchange was not a function'
        );
      }
      return this;
    },
    oncomplete: function(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introCompleteCallback = providedCallback;
      } else {
        throw new Error('Provided callback for oncomplete was not a function.');
      }
      return this;
    },

    onexit: function(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introExitCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onexit was not a function.');
      }
      return this;
    },
    onbeforeexit: function(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introBeforeExitCallback = providedCallback;
      } else {
        throw new Error(
          'Provided callback for onbeforeexit was not a function.'
        );
      }
      return this;
    }
  };

  return introJs;
});
