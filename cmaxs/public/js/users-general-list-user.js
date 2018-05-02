var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// jscs:disable maximumLineLength
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
/*!
 * jQuery UI Datepicker 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Datepicker
//>>group: Widgets
//>>description: Displays a calendar from an input or inline for selecting dates.
//>>docs: http://api.jqueryui.com/datepicker/
//>>demos: http://jqueryui.com/datepicker/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/datepicker.css
//>>css.theme: ../../themes/base/theme.css

(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define(["jquery", "../version", "../keycode"], factory);
	} else {

		// Browser globals
		factory(jQuery);
	}
})(function ($) {

	$.extend($.ui, { datepicker: { version: "1.12.1" } });

	var datepicker_instActive;

	function datepicker_getZindex(elem) {
		var position, value;
		while (elem.length && elem[0] !== document) {

			// Ignore z-index if position is set to a value where z-index is ignored by the browser
			// This makes behavior of this function consistent across browsers
			// WebKit always returns auto if the element is positioned
			position = elem.css("position");
			if (position === "absolute" || position === "relative" || position === "fixed") {

				// IE returns 0 when zIndex is not specified
				// other browsers return a string
				// we ignore the case of nested elements with an explicit value of 0
				// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
				value = parseInt(elem.css("zIndex"), 10);
				if (!isNaN(value) && value !== 0) {
					return value;
				}
			}
			elem = elem.parent();
		}

		return 0;
	}
	/* Date picker manager.
    Use the singleton instance of this class, $.datepicker, to interact with the date picker.
    Settings for (groups of) date pickers are maintained in an instance object,
    allowing multiple different settings on the same page. */

	function Datepicker() {
		this._curInst = null; // The current instance in use
		this._keyEvent = false; // If the last event was a key event
		this._disabledInputs = []; // List of date picker inputs that have been disabled
		this._datepickerShowing = false; // True if the popup picker is showing , false if not
		this._inDialog = false; // True if showing within a "dialog", false if not
		this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker division
		this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker class
		this._appendClass = "ui-datepicker-append"; // The name of the append marker class
		this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker class
		this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker class
		this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker class
		this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker class
		this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker class
		this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker class
		this.regional = []; // Available regional settings, indexed by language code
		this.regional[""] = { // Default regional settings
			closeText: "Done", // Display text for close link
			prevText: "Prev", // Display text for previous month link
			nextText: "Next", // Display text for next month link
			currentText: "Today", // Display text for current month link
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], // Names of months for drop-down and formatting
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], // Column headings for days starting at Sunday
			weekHeader: "Wk", // Column header for week of the year
			dateFormat: "mm/dd/yy", // See format options on parseDate
			firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
			isRTL: false, // True if right-to-left language, false if left-to-right
			showMonthAfterYear: false, // True if the year select precedes month, false for month then year
			yearSuffix: "" // Additional text to append to the year in the month headers
		};
		this._defaults = { // Global defaults for all the date picker instances
			showOn: "focus", // "focus" for popup on focus,
			// "button" for trigger button, or "both" for either
			showAnim: "fadeIn", // Name of jQuery animation for popup
			showOptions: {}, // Options for enhanced animations
			defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
			appendText: "", // Display text following the input box, e.g. showing the format
			buttonText: "...", // Text for trigger button
			buttonImage: "", // URL for trigger button image
			buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
			hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
			navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
			gotoCurrent: false, // True if today link goes back to current selection instead
			changeMonth: false, // True if month can be selected directly, false if only prev/next
			changeYear: false, // True if year can be selected directly, false if only prev/next
			yearRange: "c-10:c+10", // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
			showOtherMonths: false, // True to show dates in other months, false to leave blank
			selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
			showWeek: false, // True to show week of the year, false to not show it
			calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
			shortYearCutoff: "+10", // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with "+" for current year + value
			minDate: null, // The earliest selectable date, or null for no limit
			maxDate: null, // The latest selectable date, or null for no limit
			duration: "fast", // Duration of display/closure
			beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
			beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
			onSelect: null, // Define a callback function when a date is selected
			onChangeMonthYear: null, // Define a callback function when the month or year is changed
			onClose: null, // Define a callback function when the datepicker is closed
			numberOfMonths: 1, // Number of months to show at a time
			showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
			stepMonths: 1, // Number of months to step back/forward
			stepBigMonths: 12, // Number of months to step back/forward for the big links
			altField: "", // Selector for an alternate field to store selected dates into
			altFormat: "", // The date format to use for the alternate field
			constrainInput: true, // The input is constrained by the current date format
			showButtonPanel: false, // True to show button panel, false to not show it
			autoSize: false, // True to size the input for the date format, false to leave as is
			disabled: false // The initial disabled state
		};
		$.extend(this._defaults, this.regional[""]);
		this.regional.en = $.extend(true, {}, this.regional[""]);
		this.regional["en-US"] = $.extend(true, {}, this.regional.en);
		this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
	}

	$.extend(Datepicker.prototype, {
		/* Class name added to elements to indicate already configured with a date picker. */
		markerClassName: "hasDatepicker",

		//Keep track of the maximum number of rows displayed (see #7043)
		maxRows: 4,

		// TODO rename to "widget" when switching to widget factory
		_widgetDatepicker: function _widgetDatepicker() {
			return this.dpDiv;
		},

		/* Override the default settings for all instances of the date picker.
   * @param  settings  object - the new settings to use as defaults (anonymous object)
   * @return the manager object
   */
		setDefaults: function setDefaults(settings) {
			datepicker_extendRemove(this._defaults, settings || {});
			return this;
		},

		/* Attach the date picker to a jQuery selection.
   * @param  target	element - the target input field or division or span
   * @param  settings  object - the new settings to use for this date picker instance (anonymous)
   */
		_attachDatepicker: function _attachDatepicker(target, settings) {
			var nodeName, inline, inst;
			nodeName = target.nodeName.toLowerCase();
			inline = nodeName === "div" || nodeName === "span";
			if (!target.id) {
				this.uuid += 1;
				target.id = "dp" + this.uuid;
			}
			inst = this._newInst($(target), inline);
			inst.settings = $.extend({}, settings || {});
			if (nodeName === "input") {
				this._connectDatepicker(target, inst);
			} else if (inline) {
				this._inlineDatepicker(target, inst);
			}
		},

		/* Create a new instance object. */
		_newInst: function _newInst(target, inline) {
			var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta chars
			return { id: id, input: target, // associated target
				selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
				drawMonth: 0, drawYear: 0, // month being drawn
				inline: inline, // is datepicker inline or not
				dpDiv: !inline ? this.dpDiv : // presentation div
				datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) };
		},

		/* Attach the date picker to an input field. */
		_connectDatepicker: function _connectDatepicker(target, inst) {
			var input = $(target);
			inst.append = $([]);
			inst.trigger = $([]);
			if (input.hasClass(this.markerClassName)) {
				return;
			}
			this._attachments(input, inst);
			input.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp);
			this._autoSize(inst);
			$.data(target, "datepicker", inst);

			//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
			if (inst.settings.disabled) {
				this._disableDatepicker(target);
			}
		},

		/* Make attachments based on settings. */
		_attachments: function _attachments(input, inst) {
			var showOn,
			    buttonText,
			    buttonImage,
			    appendText = this._get(inst, "appendText"),
			    isRTL = this._get(inst, "isRTL");

			if (inst.append) {
				inst.append.remove();
			}
			if (appendText) {
				inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
				input[isRTL ? "before" : "after"](inst.append);
			}

			input.off("focus", this._showDatepicker);

			if (inst.trigger) {
				inst.trigger.remove();
			}

			showOn = this._get(inst, "showOn");
			if (showOn === "focus" || showOn === "both") {
				// pop-up date picker when in the marked field
				input.on("focus", this._showDatepicker);
			}
			if (showOn === "button" || showOn === "both") {
				// pop-up date picker when button clicked
				buttonText = this._get(inst, "buttonText");
				buttonImage = this._get(inst, "buttonImage");
				inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({ src: buttonImage, alt: buttonText, title: buttonText }) : $("<button type='button'></button>").addClass(this._triggerClass).html(!buttonImage ? buttonText : $("<img/>").attr({ src: buttonImage, alt: buttonText, title: buttonText })));
				input[isRTL ? "before" : "after"](inst.trigger);
				inst.trigger.on("click", function () {
					if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
						$.datepicker._hideDatepicker();
					} else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
						$.datepicker._hideDatepicker();
						$.datepicker._showDatepicker(input[0]);
					} else {
						$.datepicker._showDatepicker(input[0]);
					}
					return false;
				});
			}
		},

		/* Apply the maximum length for the date format. */
		_autoSize: function _autoSize(inst) {
			if (this._get(inst, "autoSize") && !inst.inline) {
				var findMax,
				    max,
				    maxI,
				    i,
				    date = new Date(2009, 12 - 1, 20),
				    // Ensure double digits
				dateFormat = this._get(inst, "dateFormat");

				if (dateFormat.match(/[DM]/)) {
					findMax = function findMax(names) {
						max = 0;
						maxI = 0;
						for (i = 0; i < names.length; i++) {
							if (names[i].length > max) {
								max = names[i].length;
								maxI = i;
							}
						}
						return maxI;
					};
					date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort")));
					date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay());
				}
				inst.input.attr("size", this._formatDate(inst, date).length);
			}
		},

		/* Attach an inline date picker to a div. */
		_inlineDatepicker: function _inlineDatepicker(target, inst) {
			var divSpan = $(target);
			if (divSpan.hasClass(this.markerClassName)) {
				return;
			}
			divSpan.addClass(this.markerClassName).append(inst.dpDiv);
			$.data(target, "datepicker", inst);
			this._setDate(inst, this._getDefaultDate(inst), true);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);

			//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
			if (inst.settings.disabled) {
				this._disableDatepicker(target);
			}

			// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
			// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
			inst.dpDiv.css("display", "block");
		},

		/* Pop-up the date picker in a "dialog" box.
   * @param  input element - ignored
   * @param  date	string or Date - the initial date to display
   * @param  onSelect  function - the function to call when a date is selected
   * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
   * @param  pos int[2] - coordinates for the dialog's position within the screen or
   *					event - with x/y coordinates or
   *					leave empty for default (screen centre)
   * @return the manager object
   */
		_dialogDatepicker: function _dialogDatepicker(input, date, onSelect, settings, pos) {
			var id,
			    browserWidth,
			    browserHeight,
			    scrollX,
			    scrollY,
			    inst = this._dialogInst; // internal instance

			if (!inst) {
				this.uuid += 1;
				id = "dp" + this.uuid;
				this._dialogInput = $("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>");
				this._dialogInput.on("keydown", this._doKeyDown);
				$("body").append(this._dialogInput);
				inst = this._dialogInst = this._newInst(this._dialogInput, false);
				inst.settings = {};
				$.data(this._dialogInput[0], "datepicker", inst);
			}
			datepicker_extendRemove(inst.settings, settings || {});
			date = date && date.constructor === Date ? this._formatDate(inst, date) : date;
			this._dialogInput.val(date);

			this._pos = pos ? pos.length ? pos : [pos.pageX, pos.pageY] : null;
			if (!this._pos) {
				browserWidth = document.documentElement.clientWidth;
				browserHeight = document.documentElement.clientHeight;
				scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
				scrollY = document.documentElement.scrollTop || document.body.scrollTop;
				this._pos = // should use actual width/height below
				[browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY];
			}

			// Move input on screen for focus, but hidden behind dialog
			this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
			inst.settings.onSelect = onSelect;
			this._inDialog = true;
			this.dpDiv.addClass(this._dialogClass);
			this._showDatepicker(this._dialogInput[0]);
			if ($.blockUI) {
				$.blockUI(this.dpDiv);
			}
			$.data(this._dialogInput[0], "datepicker", inst);
			return this;
		},

		/* Detach a datepicker from its control.
   * @param  target	element - the target input field or division or span
   */
		_destroyDatepicker: function _destroyDatepicker(target) {
			var nodeName,
			    $target = $(target),
			    inst = $.data(target, "datepicker");

			if (!$target.hasClass(this.markerClassName)) {
				return;
			}

			nodeName = target.nodeName.toLowerCase();
			$.removeData(target, "datepicker");
			if (nodeName === "input") {
				inst.append.remove();
				inst.trigger.remove();
				$target.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp);
			} else if (nodeName === "div" || nodeName === "span") {
				$target.removeClass(this.markerClassName).empty();
			}

			if (datepicker_instActive === inst) {
				datepicker_instActive = null;
			}
		},

		/* Enable the date picker to a jQuery selection.
   * @param  target	element - the target input field or division or span
   */
		_enableDatepicker: function _enableDatepicker(target) {
			var nodeName,
			    inline,
			    $target = $(target),
			    inst = $.data(target, "datepicker");

			if (!$target.hasClass(this.markerClassName)) {
				return;
			}

			nodeName = target.nodeName.toLowerCase();
			if (nodeName === "input") {
				target.disabled = false;
				inst.trigger.filter("button").each(function () {
					this.disabled = false;
				}).end().filter("img").css({ opacity: "1.0", cursor: "" });
			} else if (nodeName === "div" || nodeName === "span") {
				inline = $target.children("." + this._inlineClass);
				inline.children().removeClass("ui-state-disabled");
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false);
			}
			this._disabledInputs = $.map(this._disabledInputs, function (value) {
				return value === target ? null : value;
			}); // delete entry
		},

		/* Disable the date picker to a jQuery selection.
   * @param  target	element - the target input field or division or span
   */
		_disableDatepicker: function _disableDatepicker(target) {
			var nodeName,
			    inline,
			    $target = $(target),
			    inst = $.data(target, "datepicker");

			if (!$target.hasClass(this.markerClassName)) {
				return;
			}

			nodeName = target.nodeName.toLowerCase();
			if (nodeName === "input") {
				target.disabled = true;
				inst.trigger.filter("button").each(function () {
					this.disabled = true;
				}).end().filter("img").css({ opacity: "0.5", cursor: "default" });
			} else if (nodeName === "div" || nodeName === "span") {
				inline = $target.children("." + this._inlineClass);
				inline.children().addClass("ui-state-disabled");
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true);
			}
			this._disabledInputs = $.map(this._disabledInputs, function (value) {
				return value === target ? null : value;
			}); // delete entry
			this._disabledInputs[this._disabledInputs.length] = target;
		},

		/* Is the first field in a jQuery collection disabled as a datepicker?
   * @param  target	element - the target input field or division or span
   * @return boolean - true if disabled, false if enabled
   */
		_isDisabledDatepicker: function _isDisabledDatepicker(target) {
			if (!target) {
				return false;
			}
			for (var i = 0; i < this._disabledInputs.length; i++) {
				if (this._disabledInputs[i] === target) {
					return true;
				}
			}
			return false;
		},

		/* Retrieve the instance data for the target control.
   * @param  target  element - the target input field or division or span
   * @return  object - the associated instance data
   * @throws  error if a jQuery problem getting data
   */
		_getInst: function _getInst(target) {
			try {
				return $.data(target, "datepicker");
			} catch (err) {
				throw "Missing instance data for this datepicker";
			}
		},

		/* Update or retrieve the settings for a date picker attached to an input field or division.
   * @param  target  element - the target input field or division or span
   * @param  name	object - the new settings to update or
   *				string - the name of the setting to change or retrieve,
   *				when retrieving also "all" for all instance settings or
   *				"defaults" for all global defaults
   * @param  value   any - the new value for the setting
   *				(omit if above is an object or to retrieve a value)
   */
		_optionDatepicker: function _optionDatepicker(target, name, value) {
			var settings,
			    date,
			    minDate,
			    maxDate,
			    inst = this._getInst(target);

			if (arguments.length === 2 && typeof name === "string") {
				return name === "defaults" ? $.extend({}, $.datepicker._defaults) : inst ? name === "all" ? $.extend({}, inst.settings) : this._get(inst, name) : null;
			}

			settings = name || {};
			if (typeof name === "string") {
				settings = {};
				settings[name] = value;
			}

			if (inst) {
				if (this._curInst === inst) {
					this._hideDatepicker();
				}

				date = this._getDateDatepicker(target, true);
				minDate = this._getMinMaxDate(inst, "min");
				maxDate = this._getMinMaxDate(inst, "max");
				datepicker_extendRemove(inst.settings, settings);

				// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
				if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
					inst.settings.minDate = this._formatDate(inst, minDate);
				}
				if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
					inst.settings.maxDate = this._formatDate(inst, maxDate);
				}
				if ("disabled" in settings) {
					if (settings.disabled) {
						this._disableDatepicker(target);
					} else {
						this._enableDatepicker(target);
					}
				}
				this._attachments($(target), inst);
				this._autoSize(inst);
				this._setDate(inst, date);
				this._updateAlternate(inst);
				this._updateDatepicker(inst);
			}
		},

		// Change method deprecated
		_changeDatepicker: function _changeDatepicker(target, name, value) {
			this._optionDatepicker(target, name, value);
		},

		/* Redraw the date picker attached to an input field or division.
   * @param  target  element - the target input field or division or span
   */
		_refreshDatepicker: function _refreshDatepicker(target) {
			var inst = this._getInst(target);
			if (inst) {
				this._updateDatepicker(inst);
			}
		},

		/* Set the dates for a jQuery selection.
   * @param  target element - the target input field or division or span
   * @param  date	Date - the new date
   */
		_setDateDatepicker: function _setDateDatepicker(target, date) {
			var inst = this._getInst(target);
			if (inst) {
				this._setDate(inst, date);
				this._updateDatepicker(inst);
				this._updateAlternate(inst);
			}
		},

		/* Get the date(s) for the first entry in a jQuery selection.
   * @param  target element - the target input field or division or span
   * @param  noDefault boolean - true if no default date is to be used
   * @return Date - the current date
   */
		_getDateDatepicker: function _getDateDatepicker(target, noDefault) {
			var inst = this._getInst(target);
			if (inst && !inst.inline) {
				this._setDateFromField(inst, noDefault);
			}
			return inst ? this._getDate(inst) : null;
		},

		/* Handle keystrokes. */
		_doKeyDown: function _doKeyDown(event) {
			var onSelect,
			    dateStr,
			    sel,
			    inst = $.datepicker._getInst(event.target),
			    handled = true,
			    isRTL = inst.dpDiv.is(".ui-datepicker-rtl");

			inst._keyEvent = true;
			if ($.datepicker._datepickerShowing) {
				switch (event.keyCode) {
					case 9:
						$.datepicker._hideDatepicker();
						handled = false;
						break; // hide on tab out
					case 13:
						sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
						if (sel[0]) {
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						}

						onSelect = $.datepicker._get(inst, "onSelect");
						if (onSelect) {
							dateStr = $.datepicker._formatDate(inst);

							// Trigger custom callback
							onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]);
						} else {
							$.datepicker._hideDatepicker();
						}

						return false; // don't submit the form
					case 27:
						$.datepicker._hideDatepicker();
						break; // hide on escape
					case 33:
						$.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
						break; // previous month/year on page up/+ ctrl
					case 34:
						$.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
						break; // next month/year on page down/+ ctrl
					case 35:
						if (event.ctrlKey || event.metaKey) {
							$.datepicker._clearDate(event.target);
						}
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
					case 36:
						if (event.ctrlKey || event.metaKey) {
							$.datepicker._gotoToday(event.target);
						}
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
					case 37:
						if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, isRTL ? +1 : -1, "D");
						}
						handled = event.ctrlKey || event.metaKey;

						// -1 day on ctrl or command +left
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
						}

						// next month/year on alt +left on Mac
						break;
					case 38:
						if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, -7, "D");
						}
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
					case 39:
						if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, isRTL ? -1 : +1, "D");
						}
						handled = event.ctrlKey || event.metaKey;

						// +1 day on ctrl or command +right
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
						}

						// next month/year on alt +right
						break;
					case 40:
						if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, +7, "D");
						}
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
					default:
						handled = false;
				}
			} else if (event.keyCode === 36 && event.ctrlKey) {
				// display the date picker on ctrl+home
				$.datepicker._showDatepicker(this);
			} else {
				handled = false;
			}

			if (handled) {
				event.preventDefault();
				event.stopPropagation();
			}
		},

		/* Filter entered characters - based on date format. */
		_doKeyPress: function _doKeyPress(event) {
			var chars,
			    chr,
			    inst = $.datepicker._getInst(event.target);

			if ($.datepicker._get(inst, "constrainInput")) {
				chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
				chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
				return event.ctrlKey || event.metaKey || chr < " " || !chars || chars.indexOf(chr) > -1;
			}
		},

		/* Synchronise manual entry and field/alternate field. */
		_doKeyUp: function _doKeyUp(event) {
			var date,
			    inst = $.datepicker._getInst(event.target);

			if (inst.input.val() !== inst.lastVal) {
				try {
					date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst));

					if (date) {
						// only if valid
						$.datepicker._setDateFromField(inst);
						$.datepicker._updateAlternate(inst);
						$.datepicker._updateDatepicker(inst);
					}
				} catch (err) {}
			}
			return true;
		},

		/* Pop-up the date picker for a given input field.
   * If false returned from beforeShow event handler do not show.
   * @param  input  element - the input field attached to the date picker or
   *					event - if triggered by focus
   */
		_showDatepicker: function _showDatepicker(input) {
			input = input.target || input;
			if (input.nodeName.toLowerCase() !== "input") {
				// find from button/image trigger
				input = $("input", input.parentNode)[0];
			}

			if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) {
				// already here
				return;
			}

			var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;

			inst = $.datepicker._getInst(input);
			if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
				$.datepicker._curInst.dpDiv.stop(true, true);
				if (inst && $.datepicker._datepickerShowing) {
					$.datepicker._hideDatepicker($.datepicker._curInst.input[0]);
				}
			}

			beforeShow = $.datepicker._get(inst, "beforeShow");
			beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
			if (beforeShowSettings === false) {
				return;
			}
			datepicker_extendRemove(inst.settings, beforeShowSettings);

			inst.lastVal = null;
			$.datepicker._lastInput = input;
			$.datepicker._setDateFromField(inst);

			if ($.datepicker._inDialog) {
				// hide cursor
				input.value = "";
			}
			if (!$.datepicker._pos) {
				// position below input
				$.datepicker._pos = $.datepicker._findPos(input);
				$.datepicker._pos[1] += input.offsetHeight; // add the height
			}

			isFixed = false;
			$(input).parents().each(function () {
				isFixed |= $(this).css("position") === "fixed";
				return !isFixed;
			});

			offset = { left: $.datepicker._pos[0], top: $.datepicker._pos[1] };
			$.datepicker._pos = null;

			//to avoid flashes on Firefox
			inst.dpDiv.empty();

			// determine sizing offscreen
			inst.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" });
			$.datepicker._updateDatepicker(inst);

			// fix width for dynamic number of date pickers
			// and adjust position before showing
			offset = $.datepicker._checkOffset(inst, offset, isFixed);
			inst.dpDiv.css({ position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute", display: "none",
				left: offset.left + "px", top: offset.top + "px" });

			if (!inst.inline) {
				showAnim = $.datepicker._get(inst, "showAnim");
				duration = $.datepicker._get(inst, "duration");
				inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1);
				$.datepicker._datepickerShowing = true;

				if ($.effects && $.effects.effect[showAnim]) {
					inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
				} else {
					inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
				}

				if ($.datepicker._shouldFocusInput(inst)) {
					inst.input.trigger("focus");
				}

				$.datepicker._curInst = inst;
			}
		},

		/* Generate the date picker content. */
		_updateDatepicker: function _updateDatepicker(inst) {
			this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
			datepicker_instActive = inst; // for delegate hover events
			inst.dpDiv.empty().append(this._generateHTML(inst));
			this._attachHandlers(inst);

			var origyearshtml,
			    numMonths = this._getNumberOfMonths(inst),
			    cols = numMonths[1],
			    width = 17,
			    activeCell = inst.dpDiv.find("." + this._dayOverClass + " a");

			if (activeCell.length > 0) {
				datepicker_handleMouseover.apply(activeCell.get(0));
			}

			inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
			if (cols > 1) {
				inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em");
			}
			inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
			inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");

			if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst)) {
				inst.input.trigger("focus");
			}

			// Deffered render of the years select (to avoid flashes on Firefox)
			if (inst.yearshtml) {
				origyearshtml = inst.yearshtml;
				setTimeout(function () {

					//assure that inst.yearshtml didn't change.
					if (origyearshtml === inst.yearshtml && inst.yearshtml) {
						inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);
					}
					origyearshtml = inst.yearshtml = null;
				}, 0);
			}
		},

		// #6694 - don't focus the input if it's already focused
		// this breaks the change event in IE
		// Support: IE and jQuery <1.9
		_shouldFocusInput: function _shouldFocusInput(inst) {
			return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus");
		},

		/* Check positioning to remain on screen. */
		_checkOffset: function _checkOffset(inst, offset, isFixed) {
			var dpWidth = inst.dpDiv.outerWidth(),
			    dpHeight = inst.dpDiv.outerHeight(),
			    inputWidth = inst.input ? inst.input.outerWidth() : 0,
			    inputHeight = inst.input ? inst.input.outerHeight() : 0,
			    viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
			    viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());

			offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0;
			offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0;
			offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0;

			// Now check if datepicker is showing outside window viewport - move to a better place if so.
			offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
			offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0);

			return offset;
		},

		/* Find an object's position on the screen. */
		_findPos: function _findPos(obj) {
			var position,
			    inst = this._getInst(obj),
			    isRTL = this._get(inst, "isRTL");

			while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
				obj = obj[isRTL ? "previousSibling" : "nextSibling"];
			}

			position = $(obj).offset();
			return [position.left, position.top];
		},

		/* Hide the date picker from view.
   * @param  input  element - the input field attached to the date picker
   */
		_hideDatepicker: function _hideDatepicker(input) {
			var showAnim,
			    duration,
			    postProcess,
			    onClose,
			    inst = this._curInst;

			if (!inst || input && inst !== $.data(input, "datepicker")) {
				return;
			}

			if (this._datepickerShowing) {
				showAnim = this._get(inst, "showAnim");
				duration = this._get(inst, "duration");
				postProcess = function postProcess() {
					$.datepicker._tidyDialog(inst);
				};

				// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
				if ($.effects && ($.effects.effect[showAnim] || $.effects[showAnim])) {
					inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
				} else {
					inst.dpDiv[showAnim === "slideDown" ? "slideUp" : showAnim === "fadeIn" ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess);
				}

				if (!showAnim) {
					postProcess();
				}
				this._datepickerShowing = false;

				onClose = this._get(inst, "onClose");
				if (onClose) {
					onClose.apply(inst.input ? inst.input[0] : null, [inst.input ? inst.input.val() : "", inst]);
				}

				this._lastInput = null;
				if (this._inDialog) {
					this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" });
					if ($.blockUI) {
						$.unblockUI();
						$("body").append(this.dpDiv);
					}
				}
				this._inDialog = false;
			}
		},

		/* Tidy up after a dialog display. */
		_tidyDialog: function _tidyDialog(inst) {
			inst.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
		},

		/* Close date picker if clicked elsewhere. */
		_checkExternalClick: function _checkExternalClick(event) {
			if (!$.datepicker._curInst) {
				return;
			}

			var $target = $(event.target),
			    inst = $.datepicker._getInst($target[0]);

			if ($target[0].id !== $.datepicker._mainDivId && $target.parents("#" + $.datepicker._mainDivId).length === 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) || $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst) {
				$.datepicker._hideDatepicker();
			}
		},

		/* Adjust one of the date sub-fields. */
		_adjustDate: function _adjustDate(id, offset, period) {
			var target = $(id),
			    inst = this._getInst(target[0]);

			if (this._isDisabledDatepicker(target[0])) {
				return;
			}
			this._adjustInstDate(inst, offset + (period === "M" ? this._get(inst, "showCurrentAtPos") : 0), // undo positioning
			period);
			this._updateDatepicker(inst);
		},

		/* Action for current link. */
		_gotoToday: function _gotoToday(id) {
			var date,
			    target = $(id),
			    inst = this._getInst(target[0]);

			if (this._get(inst, "gotoCurrent") && inst.currentDay) {
				inst.selectedDay = inst.currentDay;
				inst.drawMonth = inst.selectedMonth = inst.currentMonth;
				inst.drawYear = inst.selectedYear = inst.currentYear;
			} else {
				date = new Date();
				inst.selectedDay = date.getDate();
				inst.drawMonth = inst.selectedMonth = date.getMonth();
				inst.drawYear = inst.selectedYear = date.getFullYear();
			}
			this._notifyChange(inst);
			this._adjustDate(target);
		},

		/* Action for selecting a new month/year. */
		_selectMonthYear: function _selectMonthYear(id, select, period) {
			var target = $(id),
			    inst = this._getInst(target[0]);

			inst["selected" + (period === "M" ? "Month" : "Year")] = inst["draw" + (period === "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);

			this._notifyChange(inst);
			this._adjustDate(target);
		},

		/* Action for selecting a day. */
		_selectDay: function _selectDay(id, month, year, td) {
			var inst,
			    target = $(id);

			if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
				return;
			}

			inst = this._getInst(target[0]);
			inst.selectedDay = inst.currentDay = $("a", td).html();
			inst.selectedMonth = inst.currentMonth = month;
			inst.selectedYear = inst.currentYear = year;
			this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
		},

		/* Erase the input field and hide the date picker. */
		_clearDate: function _clearDate(id) {
			var target = $(id);
			this._selectDate(target, "");
		},

		/* Update the input field with the selected date. */
		_selectDate: function _selectDate(id, dateStr) {
			var onSelect,
			    target = $(id),
			    inst = this._getInst(target[0]);

			dateStr = dateStr != null ? dateStr : this._formatDate(inst);
			if (inst.input) {
				inst.input.val(dateStr);
			}
			this._updateAlternate(inst);

			onSelect = this._get(inst, "onSelect");
			if (onSelect) {
				onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]); // trigger custom callback
			} else if (inst.input) {
				inst.input.trigger("change"); // fire the change event
			}

			if (inst.inline) {
				this._updateDatepicker(inst);
			} else {
				this._hideDatepicker();
				this._lastInput = inst.input[0];
				if (_typeof(inst.input[0]) !== "object") {
					inst.input.trigger("focus"); // restore focus
				}
				this._lastInput = null;
			}
		},

		/* Update any alternate field to synchronise with the main field. */
		_updateAlternate: function _updateAlternate(inst) {
			var altFormat,
			    date,
			    dateStr,
			    altField = this._get(inst, "altField");

			if (altField) {
				// update alternate field too
				altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
				date = this._getDate(inst);
				dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
				$(altField).val(dateStr);
			}
		},

		/* Set as beforeShowDay function to prevent selection of weekends.
   * @param  date  Date - the date to customise
   * @return [boolean, string] - is this date selectable?, what is its CSS class?
   */
		noWeekends: function noWeekends(date) {
			var day = date.getDay();
			return [day > 0 && day < 6, ""];
		},

		/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
   * @param  date  Date - the date to get the week for
   * @return  number - the number of the week within the year that contains this date
   */
		iso8601Week: function iso8601Week(date) {
			var time,
			    checkDate = new Date(date.getTime());

			// Find Thursday of this week starting on Monday
			checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

			time = checkDate.getTime();
			checkDate.setMonth(0); // Compare with Jan 1
			checkDate.setDate(1);
			return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
		},

		/* Parse a string value into a date object.
   * See formatDate below for the possible formats.
   *
   * @param  format string - the expected format of the date
   * @param  value string - the date in the above format
   * @param  settings Object - attributes include:
   *					shortYearCutoff  number - the cutoff year for determining the century (optional)
   *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
   *					dayNames		string[7] - names of the days from Sunday (optional)
   *					monthNamesShort string[12] - abbreviated names of the months (optional)
   *					monthNames		string[12] - names of the months (optional)
   * @return  Date - the extracted date value or null if value is blank
   */
		parseDate: function parseDate(format, value, settings) {
			if (format == null || value == null) {
				throw "Invalid arguments";
			}

			value = (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" ? value.toString() : value + "";
			if (value === "") {
				return null;
			}

			var iFormat,
			    dim,
			    extra,
			    iValue = 0,
			    shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
			    shortYearCutoff = typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp : new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10),
			    dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			    dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			    monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			    monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
			    year = -1,
			    month = -1,
			    day = -1,
			    doy = -1,
			    literal = false,
			    date,


			// Check whether a format character is doubled
			lookAhead = function lookAhead(match) {
				var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
				if (matches) {
					iFormat++;
				}
				return matches;
			},


			// Extract a number from the string value
			getNumber = function getNumber(match) {
				var isDoubled = lookAhead(match),
				    size = match === "@" ? 14 : match === "!" ? 20 : match === "y" && isDoubled ? 4 : match === "o" ? 3 : 2,
				    minSize = match === "y" ? size : 1,
				    digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
				    num = value.substring(iValue).match(digits);
				if (!num) {
					throw "Missing number at position " + iValue;
				}
				iValue += num[0].length;
				return parseInt(num[0], 10);
			},


			// Extract a name from the string value and convert to an index
			getName = function getName(match, shortNames, longNames) {
				var index = -1,
				    names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
					return [[k, v]];
				}).sort(function (a, b) {
					return -(a[1].length - b[1].length);
				});

				$.each(names, function (i, pair) {
					var name = pair[1];
					if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
						index = pair[0];
						iValue += name.length;
						return false;
					}
				});
				if (index !== -1) {
					return index + 1;
				} else {
					throw "Unknown name at position " + iValue;
				}
			},


			// Confirm that a literal character matches the string value
			checkLiteral = function checkLiteral() {
				if (value.charAt(iValue) !== format.charAt(iFormat)) {
					throw "Unexpected literal at position " + iValue;
				}
				iValue++;
			};

			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						checkLiteral();
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d":
							day = getNumber("d");
							break;
						case "D":
							getName("D", dayNamesShort, dayNames);
							break;
						case "o":
							doy = getNumber("o");
							break;
						case "m":
							month = getNumber("m");
							break;
						case "M":
							month = getName("M", monthNamesShort, monthNames);
							break;
						case "y":
							year = getNumber("y");
							break;
						case "@":
							date = new Date(getNumber("@"));
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case "!":
							date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case "'":
							if (lookAhead("'")) {
								checkLiteral();
							} else {
								literal = true;
							}
							break;
						default:
							checkLiteral();
					}
				}
			}

			if (iValue < value.length) {
				extra = value.substr(iValue);
				if (!/^\s+/.test(extra)) {
					throw "Extra/unparsed characters found in date: " + extra;
				}
			}

			if (year === -1) {
				year = new Date().getFullYear();
			} else if (year < 100) {
				year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
			}

			if (doy > -1) {
				month = 1;
				day = doy;
				do {
					dim = this._getDaysInMonth(year, month - 1);
					if (day <= dim) {
						break;
					}
					month++;
					day -= dim;
				} while (true);
			}

			date = this._daylightSavingAdjust(new Date(year, month - 1, day));
			if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
				throw "Invalid date"; // E.g. 31/02/00
			}
			return date;
		},

		/* Standard date formats. */
		ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y", // RFC 822
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd", // ISO 8601

		_ticksTo1970: ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000,

		/* Format a date object into a string value.
   * The format can be combinations of the following:
   * d  - day of month (no leading zero)
   * dd - day of month (two digit)
   * o  - day of year (no leading zeros)
   * oo - day of year (three digit)
   * D  - day name short
   * DD - day name long
   * m  - month of year (no leading zero)
   * mm - month of year (two digit)
   * M  - month name short
   * MM - month name long
   * y  - year (two digit)
   * yy - year (four digit)
   * @ - Unix timestamp (ms since 01/01/1970)
   * ! - Windows ticks (100ns since 01/01/0001)
   * "..." - literal text
   * '' - single quote
   *
   * @param  format string - the desired format of the date
   * @param  date Date - the date value to format
   * @param  settings Object - attributes include:
   *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
   *					dayNames		string[7] - names of the days from Sunday (optional)
   *					monthNamesShort string[12] - abbreviated names of the months (optional)
   *					monthNames		string[12] - names of the months (optional)
   * @return  string - the date in the above format
   */
		formatDate: function formatDate(format, date, settings) {
			if (!date) {
				return "";
			}

			var iFormat,
			    dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			    dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			    monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			    monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,


			// Check whether a format character is doubled
			lookAhead = function lookAhead(match) {
				var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
				if (matches) {
					iFormat++;
				}
				return matches;
			},


			// Format a number, with leading zero if necessary
			formatNumber = function formatNumber(match, value, len) {
				var num = "" + value;
				if (lookAhead(match)) {
					while (num.length < len) {
						num = "0" + num;
					}
				}
				return num;
			},


			// Format a name, short or long as requested
			formatName = function formatName(match, value, shortNames, longNames) {
				return lookAhead(match) ? longNames[value] : shortNames[value];
			},
			    output = "",
			    literal = false;

			if (date) {
				for (iFormat = 0; iFormat < format.length; iFormat++) {
					if (literal) {
						if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
							literal = false;
						} else {
							output += format.charAt(iFormat);
						}
					} else {
						switch (format.charAt(iFormat)) {
							case "d":
								output += formatNumber("d", date.getDate(), 2);
								break;
							case "D":
								output += formatName("D", date.getDay(), dayNamesShort, dayNames);
								break;
							case "o":
								output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
								break;
							case "m":
								output += formatNumber("m", date.getMonth() + 1, 2);
								break;
							case "M":
								output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
								break;
							case "y":
								output += lookAhead("y") ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100;
								break;
							case "@":
								output += date.getTime();
								break;
							case "!":
								output += date.getTime() * 10000 + this._ticksTo1970;
								break;
							case "'":
								if (lookAhead("'")) {
									output += "'";
								} else {
									literal = true;
								}
								break;
							default:
								output += format.charAt(iFormat);
						}
					}
				}
			}
			return output;
		},

		/* Extract all possible characters from the date format. */
		_possibleChars: function _possibleChars(format) {
			var iFormat,
			    chars = "",
			    literal = false,


			// Check whether a format character is doubled
			lookAhead = function lookAhead(match) {
				var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
				if (matches) {
					iFormat++;
				}
				return matches;
			};

			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						chars += format.charAt(iFormat);
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d":case "m":case "y":case "@":
							chars += "0123456789";
							break;
						case "D":case "M":
							return null; // Accept anything
						case "'":
							if (lookAhead("'")) {
								chars += "'";
							} else {
								literal = true;
							}
							break;
						default:
							chars += format.charAt(iFormat);
					}
				}
			}
			return chars;
		},

		/* Get a setting value, defaulting if necessary. */
		_get: function _get(inst, name) {
			return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
		},

		/* Parse existing date and initialise date picker. */
		_setDateFromField: function _setDateFromField(inst, noDefault) {
			if (inst.input.val() === inst.lastVal) {
				return;
			}

			var dateFormat = this._get(inst, "dateFormat"),
			    dates = inst.lastVal = inst.input ? inst.input.val() : null,
			    defaultDate = this._getDefaultDate(inst),
			    date = defaultDate,
			    settings = this._getFormatConfig(inst);

			try {
				date = this.parseDate(dateFormat, dates, settings) || defaultDate;
			} catch (event) {
				dates = noDefault ? "" : dates;
			}
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			inst.currentDay = dates ? date.getDate() : 0;
			inst.currentMonth = dates ? date.getMonth() : 0;
			inst.currentYear = dates ? date.getFullYear() : 0;
			this._adjustInstDate(inst);
		},

		/* Retrieve the default date shown on opening. */
		_getDefaultDate: function _getDefaultDate(inst) {
			return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
		},

		/* A date may be specified as an exact value or a relative one. */
		_determineDate: function _determineDate(inst, date, defaultDate) {
			var offsetNumeric = function offsetNumeric(offset) {
				var date = new Date();
				date.setDate(date.getDate() + offset);
				return date;
			},
			    offsetString = function offsetString(offset) {
				try {
					return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst));
				} catch (e) {

					// Ignore
				}

				var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date(),
				    year = date.getFullYear(),
				    month = date.getMonth(),
				    day = date.getDate(),
				    pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
				    matches = pattern.exec(offset);

				while (matches) {
					switch (matches[2] || "d") {
						case "d":case "D":
							day += parseInt(matches[1], 10);break;
						case "w":case "W":
							day += parseInt(matches[1], 10) * 7;break;
						case "m":case "M":
							month += parseInt(matches[1], 10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
						case "y":case "Y":
							year += parseInt(matches[1], 10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day);
			},
			    newDate = date == null || date === "" ? defaultDate : typeof date === "string" ? offsetString(date) : typeof date === "number" ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());

			newDate = newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate;
			if (newDate) {
				newDate.setHours(0);
				newDate.setMinutes(0);
				newDate.setSeconds(0);
				newDate.setMilliseconds(0);
			}
			return this._daylightSavingAdjust(newDate);
		},

		/* Handle switch to/from daylight saving.
   * Hours may be non-zero on daylight saving cut-over:
   * > 12 when midnight changeover, but then cannot generate
   * midnight datetime, so jump to 1AM, otherwise reset.
   * @param  date  (Date) the date to check
   * @return  (Date) the corrected date
   */
		_daylightSavingAdjust: function _daylightSavingAdjust(date) {
			if (!date) {
				return null;
			}
			date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
			return date;
		},

		/* Set the date(s) directly. */
		_setDate: function _setDate(inst, date, noChange) {
			var clear = !date,
			    origMonth = inst.selectedMonth,
			    origYear = inst.selectedYear,
			    newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));

			inst.selectedDay = inst.currentDay = newDate.getDate();
			inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
			inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
			if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
				this._notifyChange(inst);
			}
			this._adjustInstDate(inst);
			if (inst.input) {
				inst.input.val(clear ? "" : this._formatDate(inst));
			}
		},

		/* Retrieve the date(s) directly. */
		_getDate: function _getDate(inst) {
			var startDate = !inst.currentYear || inst.input && inst.input.val() === "" ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
			return startDate;
		},

		/* Attach the onxxx handlers.  These are declared statically so
   * they work with static code transformers like Caja.
   */
		_attachHandlers: function _attachHandlers(inst) {
			var stepMonths = this._get(inst, "stepMonths"),
			    id = "#" + inst.id.replace(/\\\\/g, "\\");
			inst.dpDiv.find("[data-handler]").map(function () {
				var handler = {
					prev: function prev() {
						$.datepicker._adjustDate(id, -stepMonths, "M");
					},
					next: function next() {
						$.datepicker._adjustDate(id, +stepMonths, "M");
					},
					hide: function hide() {
						$.datepicker._hideDatepicker();
					},
					today: function today() {
						$.datepicker._gotoToday(id);
					},
					selectDay: function selectDay() {
						$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
						return false;
					},
					selectMonth: function selectMonth() {
						$.datepicker._selectMonthYear(id, this, "M");
						return false;
					},
					selectYear: function selectYear() {
						$.datepicker._selectMonthYear(id, this, "Y");
						return false;
					}
				};
				$(this).on(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
			});
		},

		/* Generate the HTML for the current state of the date picker. */
		_generateHTML: function _generateHTML(inst) {
			var maxDraw,
			    prevText,
			    prev,
			    nextText,
			    next,
			    currentText,
			    gotoDate,
			    controls,
			    buttonPanel,
			    firstDay,
			    showWeek,
			    dayNames,
			    dayNamesMin,
			    monthNames,
			    monthNamesShort,
			    beforeShowDay,
			    showOtherMonths,
			    selectOtherMonths,
			    defaultDate,
			    html,
			    dow,
			    row,
			    group,
			    col,
			    selectedDate,
			    cornerClass,
			    calender,
			    thead,
			    day,
			    daysInMonth,
			    leadDays,
			    curRows,
			    numRows,
			    printDate,
			    dRow,
			    tbody,
			    daySettings,
			    otherMonth,
			    unselectable,
			    tempDate = new Date(),
			    today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())),
			    // clear time
			isRTL = this._get(inst, "isRTL"),
			    showButtonPanel = this._get(inst, "showButtonPanel"),
			    hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
			    navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
			    numMonths = this._getNumberOfMonths(inst),
			    showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
			    stepMonths = this._get(inst, "stepMonths"),
			    isMultiMonth = numMonths[0] !== 1 || numMonths[1] !== 1,
			    currentDate = this._daylightSavingAdjust(!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)),
			    minDate = this._getMinMaxDate(inst, "min"),
			    maxDate = this._getMinMaxDate(inst, "max"),
			    drawMonth = inst.drawMonth - showCurrentAtPos,
			    drawYear = inst.drawYear;

			if (drawMonth < 0) {
				drawMonth += 12;
				drawYear--;
			}
			if (maxDate) {
				maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate()));
				maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw;
				while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
					drawMonth--;
					if (drawMonth < 0) {
						drawMonth = 11;
						drawYear--;
					}
				}
			}
			inst.drawMonth = drawMonth;
			inst.drawYear = drawYear;

			prevText = this._get(inst, "prevText");
			prevText = !navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst));

			prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" + " title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>";

			nextText = this._get(inst, "nextText");
			nextText = !navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst));

			next = this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" + " title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>";

			currentText = this._get(inst, "currentText");
			gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today;
			currentText = !navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst));

			controls = !inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>" : "";

			buttonPanel = showButtonPanel ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" + ">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";

			firstDay = parseInt(this._get(inst, "firstDay"), 10);
			firstDay = isNaN(firstDay) ? 0 : firstDay;

			showWeek = this._get(inst, "showWeek");
			dayNames = this._get(inst, "dayNames");
			dayNamesMin = this._get(inst, "dayNamesMin");
			monthNames = this._get(inst, "monthNames");
			monthNamesShort = this._get(inst, "monthNamesShort");
			beforeShowDay = this._get(inst, "beforeShowDay");
			showOtherMonths = this._get(inst, "showOtherMonths");
			selectOtherMonths = this._get(inst, "selectOtherMonths");
			defaultDate = this._getDefaultDate(inst);
			html = "";

			for (row = 0; row < numMonths[0]; row++) {
				group = "";
				this.maxRows = 4;
				for (col = 0; col < numMonths[1]; col++) {
					selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
					cornerClass = " ui-corner-all";
					calender = "";
					if (isMultiMonth) {
						calender += "<div class='ui-datepicker-group";
						if (numMonths[1] > 1) {
							switch (col) {
								case 0:
									calender += " ui-datepicker-group-first";
									cornerClass = " ui-corner-" + (isRTL ? "right" : "left");break;
								case numMonths[1] - 1:
									calender += " ui-datepicker-group-last";
									cornerClass = " ui-corner-" + (isRTL ? "left" : "right");break;
								default:
									calender += " ui-datepicker-group-middle";cornerClass = "";break;
							}
						}
						calender += "'>";
					}
					calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && row === 0 ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && row === 0 ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					"</div><table class='ui-datepicker-calendar'><thead>" + "<tr>";
					thead = showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "";
					for (dow = 0; dow < 7; dow++) {
						// days of the week
						day = (dow + firstDay) % 7;
						thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
					}
					calender += thead + "</tr></thead><tbody>";
					daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
					if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
						inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
					}
					leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
					curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
					numRows = isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows; //If multiple months, use the higher number of rows (see #7043)
					this.maxRows = numRows;
					printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
					for (dRow = 0; dRow < numRows; dRow++) {
						// create date picker rows
						calender += "<tr>";
						tbody = !showWeek ? "" : "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>";
						for (dow = 0; dow < 7; dow++) {
							// create date picker days
							daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [printDate]) : [true, ""];
							otherMonth = printDate.getMonth() !== drawMonth;
							unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && printDate > maxDate;
							tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + ( // highlight weekends
							otherMonth ? " ui-datepicker-other-month" : "") + ( // highlight days from other months
							printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || // user pressed key
							defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ?

							// or defaultDate is current printedDate and defaultDate is selectedDate
							" " + this._dayOverClass : "") + ( // highlight selected day
							unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + ( // highlight unselectable days
							otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + ( // highlight custom dates
							printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + ( // highlight selected day
							printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + ( // highlight today (if different)
							(!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + ( // cell title
							unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + ( // actions
							otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
							unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + ( // highlight selected day
							otherMonth ? " ui-priority-secondary" : "") + // distinguish dates from other months
							"' href='#'>" + printDate.getDate() + "</a>") + "</td>"; // display selectable date
							printDate.setDate(printDate.getDate() + 1);
							printDate = this._daylightSavingAdjust(printDate);
						}
						calender += tbody + "</tr>";
					}
					drawMonth++;
					if (drawMonth > 11) {
						drawMonth = 0;
						drawYear++;
					}
					calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col === numMonths[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
					group += calender;
				}
				html += group;
			}
			html += buttonPanel;
			inst._keyEvent = false;
			return html;
		},

		/* Generate the month and year header. */
		_generateMonthYearHeader: function _generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {

			var inMinYear,
			    inMaxYear,
			    month,
			    years,
			    thisYear,
			    determineYear,
			    year,
			    endYear,
			    changeMonth = this._get(inst, "changeMonth"),
			    changeYear = this._get(inst, "changeYear"),
			    showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
			    html = "<div class='ui-datepicker-title'>",
			    monthHtml = "";

			// Month selection
			if (secondary || !changeMonth) {
				monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
			} else {
				inMinYear = minDate && minDate.getFullYear() === drawYear;
				inMaxYear = maxDate && maxDate.getFullYear() === drawYear;
				monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
				for (month = 0; month < 12; month++) {
					if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
						monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'" : "") + ">" + monthNamesShort[month] + "</option>";
					}
				}
				monthHtml += "</select>";
			}

			if (!showMonthAfterYear) {
				html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
			}

			// Year selection
			if (!inst.yearshtml) {
				inst.yearshtml = "";
				if (secondary || !changeYear) {
					html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
				} else {

					// determine range of years to display
					years = this._get(inst, "yearRange").split(":");
					thisYear = new Date().getFullYear();
					determineYear = function determineYear(value) {
						var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
						return isNaN(year) ? thisYear : year;
					};
					year = determineYear(years[0]);
					endYear = Math.max(year, determineYear(years[1] || ""));
					year = minDate ? Math.max(year, minDate.getFullYear()) : year;
					endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear;
					inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
					for (; year <= endYear; year++) {
						inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'" : "") + ">" + year + "</option>";
					}
					inst.yearshtml += "</select>";

					html += inst.yearshtml;
					inst.yearshtml = null;
				}
			}

			html += this._get(inst, "yearSuffix");
			if (showMonthAfterYear) {
				html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
			}
			html += "</div>"; // Close datepicker_header
			return html;
		},

		/* Adjust one of the date sub-fields. */
		_adjustInstDate: function _adjustInstDate(inst, offset, period) {
			var year = inst.selectedYear + (period === "Y" ? offset : 0),
			    month = inst.selectedMonth + (period === "M" ? offset : 0),
			    day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset : 0),
			    date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));

			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			if (period === "M" || period === "Y") {
				this._notifyChange(inst);
			}
		},

		/* Ensure a date is within any min/max bounds. */
		_restrictMinMax: function _restrictMinMax(inst, date) {
			var minDate = this._getMinMaxDate(inst, "min"),
			    maxDate = this._getMinMaxDate(inst, "max"),
			    newDate = minDate && date < minDate ? minDate : date;
			return maxDate && newDate > maxDate ? maxDate : newDate;
		},

		/* Notify change of month/year. */
		_notifyChange: function _notifyChange(inst) {
			var onChange = this._get(inst, "onChangeMonthYear");
			if (onChange) {
				onChange.apply(inst.input ? inst.input[0] : null, [inst.selectedYear, inst.selectedMonth + 1, inst]);
			}
		},

		/* Determine the number of months to show. */
		_getNumberOfMonths: function _getNumberOfMonths(inst) {
			var numMonths = this._get(inst, "numberOfMonths");
			return numMonths == null ? [1, 1] : typeof numMonths === "number" ? [1, numMonths] : numMonths;
		},

		/* Determine the current maximum date - ensure no time components are set. */
		_getMinMaxDate: function _getMinMaxDate(inst, minMax) {
			return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
		},

		/* Find the number of days in a given month. */
		_getDaysInMonth: function _getDaysInMonth(year, month) {
			return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
		},

		/* Find the day of the week of the first of a month. */
		_getFirstDayOfMonth: function _getFirstDayOfMonth(year, month) {
			return new Date(year, month, 1).getDay();
		},

		/* Determines if we should allow a "next/prev" month display change. */
		_canAdjustMonth: function _canAdjustMonth(inst, offset, curYear, curMonth) {
			var numMonths = this._getNumberOfMonths(inst),
			    date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));

			if (offset < 0) {
				date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
			}
			return this._isInRange(inst, date);
		},

		/* Is the given date in the accepted range? */
		_isInRange: function _isInRange(inst, date) {
			var yearSplit,
			    currentYear,
			    minDate = this._getMinMaxDate(inst, "min"),
			    maxDate = this._getMinMaxDate(inst, "max"),
			    minYear = null,
			    maxYear = null,
			    years = this._get(inst, "yearRange");
			if (years) {
				yearSplit = years.split(":");
				currentYear = new Date().getFullYear();
				minYear = parseInt(yearSplit[0], 10);
				maxYear = parseInt(yearSplit[1], 10);
				if (yearSplit[0].match(/[+\-].*/)) {
					minYear += currentYear;
				}
				if (yearSplit[1].match(/[+\-].*/)) {
					maxYear += currentYear;
				}
			}

			return (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear);
		},

		/* Provide the configuration settings for formatting/parsing. */
		_getFormatConfig: function _getFormatConfig(inst) {
			var shortYearCutoff = this._get(inst, "shortYearCutoff");
			shortYearCutoff = typeof shortYearCutoff !== "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10);
			return { shortYearCutoff: shortYearCutoff,
				dayNamesShort: this._get(inst, "dayNamesShort"), dayNames: this._get(inst, "dayNames"),
				monthNamesShort: this._get(inst, "monthNamesShort"), monthNames: this._get(inst, "monthNames") };
		},

		/* Format the given date for display. */
		_formatDate: function _formatDate(inst, day, month, year) {
			if (!day) {
				inst.currentDay = inst.selectedDay;
				inst.currentMonth = inst.selectedMonth;
				inst.currentYear = inst.selectedYear;
			}
			var date = day ? (typeof day === "undefined" ? "undefined" : _typeof(day)) === "object" ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
			return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
		}
	});

	/*
  * Bind hover events for datepicker elements.
  * Done via delegate so the binding only occurs once in the lifetime of the parent div.
  * Global datepicker_instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
  */
	function datepicker_bindHover(dpDiv) {
		var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return dpDiv.on("mouseout", selector, function () {
			$(this).removeClass("ui-state-hover");
			if (this.className.indexOf("ui-datepicker-prev") !== -1) {
				$(this).removeClass("ui-datepicker-prev-hover");
			}
			if (this.className.indexOf("ui-datepicker-next") !== -1) {
				$(this).removeClass("ui-datepicker-next-hover");
			}
		}).on("mouseover", selector, datepicker_handleMouseover);
	}

	function datepicker_handleMouseover() {
		if (!$.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
			$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
			$(this).addClass("ui-state-hover");
			if (this.className.indexOf("ui-datepicker-prev") !== -1) {
				$(this).addClass("ui-datepicker-prev-hover");
			}
			if (this.className.indexOf("ui-datepicker-next") !== -1) {
				$(this).addClass("ui-datepicker-next-hover");
			}
		}
	}

	/* jQuery extend now ignores nulls! */
	function datepicker_extendRemove(target, props) {
		$.extend(target, props);
		for (var name in props) {
			if (props[name] == null) {
				target[name] = props[name];
			}
		}
		return target;
	}

	/* Invoke the datepicker functionality.
    @param  options  string - a command, optionally followed by additional parameters or
 					Object - settings for attaching new datepicker functionality
    @return  jQuery object */
	$.fn.datepicker = function (options) {

		/* Verify an empty collection wasn't passed - Fixes #6976 */
		if (!this.length) {
			return this;
		}

		/* Initialise the date picker. */
		if (!$.datepicker.initialized) {
			$(document).on("mousedown", $.datepicker._checkExternalClick);
			$.datepicker.initialized = true;
		}

		/* Append datepicker main container to body if not exist. */
		if ($("#" + $.datepicker._mainDivId).length === 0) {
			$("body").append($.datepicker.dpDiv);
		}

		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {
			return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs));
		}
		if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
			return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs));
		}
		return this.each(function () {
			typeof options === "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
		});
	};

	$.datepicker = new Datepicker(); // singleton instance
	$.datepicker.initialized = false;
	$.datepicker.uuid = new Date().getTime();
	$.datepicker.version = "1.12.1";

	return $.datepicker;
});

/* Japanese initialisation for the jQuery UI date picker plugin. */
/* Written by Kentaro SATO (kentaro@ranvis.com). */
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define(["../widgets/datepicker"], factory);
	} else {

		// Browser globals
		factory(jQuery.datepicker);
	}
})(function (datepicker) {

	datepicker.regional.ja = {
		closeText: "閉じる",
		prevText: "&#x3C;前",
		nextText: "次&#x3E;",
		currentText: "今日",
		monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		dayNames: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
		dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
		dayNamesMin: ["日", "月", "火", "水", "木", "金", "土"],
		weekHeader: "週",
		dateFormat: "yy/mm/dd",
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: "年" };
	datepicker.setDefaults(datepicker.regional.ja);

	return datepicker.regional.ja;
});

/*!
 * Copyright 2012, Chris Wanstrath
 * Released under the MIT License
 * https://github.com/defunkt/jquery-pjax
 */

(function ($) {

	// When called on a container with a selector, fetches the href with
	// ajax into the container or with the data-pjax attribute on the link
	// itself.
	//
	// Tries to make sure the back button and ctrl+click work the way
	// you'd expect.
	//
	// Exported as $.fn.pjax
	//
	// Accepts a jQuery ajax options object that may include these
	// pjax specific options:
	//
	//
	// container - String selector for the element where to place the response body.
	//      push - Whether to pushState the URL. Defaults to true (of course).
	//   replace - Want to use replaceState instead? That's cool.
	//
	// For convenience the second parameter can be either the container or
	// the options object.
	//
	// Returns the jQuery object
	function fnPjax(selector, container, options) {
		options = optionsFor(container, options);
		return this.on('click.pjax', selector, function (event) {
			var opts = options;
			if (!opts.container) {
				opts = $.extend({}, options);
				opts.container = $(this).attr('data-pjax');
			}
			handleClick(event, opts);
		});
	}

	// Public: pjax on click handler
	//
	// Exported as $.pjax.click.
	//
	// event   - "click" jQuery.Event
	// options - pjax options
	//
	// Examples
	//
	//   $(document).on('click', 'a', $.pjax.click)
	//   // is the same as
	//   $(document).pjax('a')
	//
	// Returns nothing.
	function handleClick(event, container, options) {
		options = optionsFor(container, options);

		var link = event.currentTarget;
		var $link = $(link);

		if (link.tagName.toUpperCase() !== 'A') throw "$.fn.pjax or $.pjax.click requires an anchor element";

		// Middle click, cmd click, and ctrl click should open
		// links in a new tab as normal.
		if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

		// Ignore cross origin links
		if (location.protocol !== link.protocol || location.hostname !== link.hostname) return;

		// Ignore case when a hash is being tacked on the current URL
		if (link.href.indexOf('#') > -1 && stripHash(link) == stripHash(location)) return;

		// Ignore event with default prevented
		if (event.isDefaultPrevented()) return;

		var defaults = {
			url: link.href,
			container: $link.attr('data-pjax'),
			target: link
		};

		var opts = $.extend({}, defaults, options);
		var clickEvent = $.Event('pjax:click');
		$link.trigger(clickEvent, [opts]);

		if (!clickEvent.isDefaultPrevented()) {
			pjax(opts);
			event.preventDefault();
			$link.trigger('pjax:clicked', [opts]);
		}
	}

	// Public: pjax on form submit handler
	//
	// Exported as $.pjax.submit
	//
	// event   - "click" jQuery.Event
	// options - pjax options
	//
	// Examples
	//
	//  $(document).on('submit', 'form', function(event) {
	//    $.pjax.submit(event, '[data-pjax-container]')
	//  })
	//
	// Returns nothing.
	function handleSubmit(event, container, options) {
		options = optionsFor(container, options);

		var form = event.currentTarget;
		var $form = $(form);

		if (form.tagName.toUpperCase() !== 'FORM') throw "$.pjax.submit requires a form element";

		var defaults = {
			type: ($form.attr('method') || 'GET').toUpperCase(),
			url: $form.attr('action'),
			container: $form.attr('data-pjax'),
			target: form
		};

		if (defaults.type !== 'GET' && window.FormData !== undefined) {
			defaults.data = new FormData(form);
			defaults.processData = false;
			defaults.contentType = false;
		} else {
			// Can't handle file uploads, exit
			if ($form.find(':file').length) {
				return;
			}

			// Fallback to manually serializing the fields
			defaults.data = $form.serializeArray();
		}

		pjax($.extend({}, defaults, options));

		event.preventDefault();
	}

	// Loads a URL with ajax, puts the response body inside a container,
	// then pushState()'s the loaded URL.
	//
	// Works just like $.ajax in that it accepts a jQuery ajax
	// settings object (with keys like url, type, data, etc).
	//
	// Accepts these extra keys:
	//
	// container - String selector for where to stick the response body.
	//      push - Whether to pushState the URL. Defaults to true (of course).
	//   replace - Want to use replaceState instead? That's cool.
	//
	// Use it just like $.ajax:
	//
	//   var xhr = $.pjax({ url: this.href, container: '#main' })
	//   console.log( xhr.readyState )
	//
	// Returns whatever $.ajax returns.
	function pjax(options) {
		options = $.extend(true, {}, $.ajaxSettings, pjax.defaults, options);

		if ($.isFunction(options.url)) {
			options.url = options.url();
		}

		var hash = parseURL(options.url).hash;

		var containerType = $.type(options.container);
		if (containerType !== 'string') {
			throw "expected string value for 'container' option; got " + containerType;
		}
		var context = options.context = $(options.container);
		if (!context.length) {
			throw "the container selector '" + options.container + "' did not match anything";
		}

		// We want the browser to maintain two separate internal caches: one
		// for pjax'd partial page loads and one for normal page loads.
		// Without adding this secret parameter, some browsers will often
		// confuse the two.
		if (!options.data) options.data = {};
		if ($.isArray(options.data)) {
			options.data.push({ name: '_pjax', value: options.container });
		} else {
			options.data._pjax = options.container;
		}

		function fire(type, args, props) {
			if (!props) props = {};
			props.relatedTarget = options.target;
			var event = $.Event(type, props);
			context.trigger(event, args);
			return !event.isDefaultPrevented();
		}

		var timeoutTimer;

		options.beforeSend = function (xhr, settings) {
			// No timeout for non-GET requests
			// Its not safe to request the resource again with a fallback method.
			if (settings.type !== 'GET') {
				settings.timeout = 0;
			}

			xhr.setRequestHeader('X-PJAX', 'true');
			xhr.setRequestHeader('X-PJAX-Container', options.container);

			if (!fire('pjax:beforeSend', [xhr, settings])) return false;

			if (settings.timeout > 0) {
				timeoutTimer = setTimeout(function () {
					if (fire('pjax:timeout', [xhr, options])) xhr.abort('timeout');
				}, settings.timeout);

				// Clear timeout setting so jquerys internal timeout isn't invoked
				settings.timeout = 0;
			}

			var url = parseURL(settings.url);
			if (hash) url.hash = hash;
			options.requestUrl = stripInternalParams(url);
		};

		options.complete = function (xhr, textStatus) {
			if (timeoutTimer) clearTimeout(timeoutTimer);

			fire('pjax:complete', [xhr, textStatus, options]);

			fire('pjax:end', [xhr, options]);
		};

		options.error = function (xhr, textStatus, errorThrown) {
			var container = extractContainer("", xhr, options);

			var allowed = fire('pjax:error', [xhr, textStatus, errorThrown, options]);
			if (options.type == 'GET' && textStatus !== 'abort' && allowed) {
				locationReplace(container.url);
			}
		};

		options.success = function (data, status, xhr) {
			var previousState = pjax.state;

			// If $.pjax.defaults.version is a function, invoke it first.
			// Otherwise it can be a static string.
			var currentVersion = typeof $.pjax.defaults.version === 'function' ? $.pjax.defaults.version() : $.pjax.defaults.version;

			var latestVersion = xhr.getResponseHeader('X-PJAX-Version');

			var container = extractContainer(data, xhr, options);

			var url = parseURL(container.url);
			if (hash) {
				url.hash = hash;
				container.url = url.href;
			}

			// If there is a layout version mismatch, hard load the new url
			if (currentVersion && latestVersion && currentVersion !== latestVersion) {
				locationReplace(container.url);
				return;
			}

			// If the new response is missing a body, hard load the page
			if (!container.contents) {
				locationReplace(container.url);
				return;
			}

			pjax.state = {
				id: options.id || uniqueId(),
				url: container.url,
				title: container.title,
				container: options.container,
				fragment: options.fragment,
				timeout: options.timeout
			};

			if (options.push || options.replace) {
				window.history.replaceState(pjax.state, container.title, container.url);
			}

			// Only blur the focus if the focused element is within the container.
			var blurFocus = $.contains(context, document.activeElement);

			// Clear out any focused controls before inserting new page contents.
			if (blurFocus) {
				try {
					document.activeElement.blur();
				} catch (e) {/* ignore */}
			}

			if (container.title) document.title = container.title;

			fire('pjax:beforeReplace', [container.contents, options], {
				state: pjax.state,
				previousState: previousState
			});
			context.html(container.contents);

			// FF bug: Won't autofocus fields that are inserted via JS.
			// This behavior is incorrect. So if theres no current focus, autofocus
			// the last field.
			//
			// http://www.w3.org/html/wg/drafts/html/master/forms.html
			var autofocusEl = context.find('input[autofocus], textarea[autofocus]').last()[0];
			if (autofocusEl && document.activeElement !== autofocusEl) {
				autofocusEl.focus();
			}

			executeScriptTags(container.scripts);

			var scrollTo = options.scrollTo;

			// Ensure browser scrolls to the element referenced by the URL anchor
			if (hash) {
				var name = decodeURIComponent(hash.slice(1));
				var target = document.getElementById(name) || document.getElementsByName(name)[0];
				if (target) scrollTo = $(target).offset().top;
			}

			if (typeof scrollTo == 'number') $(window).scrollTop(scrollTo);

			fire('pjax:success', [data, status, xhr, options]);
		};

		// Initialize pjax.state for the initial page load. Assume we're
		// using the container and options of the link we're loading for the
		// back button to the initial page. This ensures good back button
		// behavior.
		if (!pjax.state) {
			pjax.state = {
				id: uniqueId(),
				url: window.location.href,
				title: document.title,
				container: options.container,
				fragment: options.fragment,
				timeout: options.timeout
			};
			window.history.replaceState(pjax.state, document.title);
		}

		// Cancel the current request if we're already pjaxing
		abortXHR(pjax.xhr);

		pjax.options = options;
		var xhr = pjax.xhr = $.ajax(options);

		if (xhr.readyState > 0) {
			if (options.push && !options.replace) {
				// Cache current container element before replacing it
				cachePush(pjax.state.id, [options.container, cloneContents(context)]);

				window.history.pushState(null, "", options.requestUrl);
			}

			fire('pjax:start', [xhr, options]);
			fire('pjax:send', [xhr, options]);
		}

		return pjax.xhr;
	}

	// Public: Reload current page with pjax.
	//
	// Returns whatever $.pjax returns.
	function pjaxReload(container, options) {
		var defaults = {
			url: window.location.href,
			push: false,
			replace: true,
			scrollTo: false
		};

		return pjax($.extend(defaults, optionsFor(container, options)));
	}

	// Internal: Hard replace current state with url.
	//
	// Work for around WebKit
	//   https://bugs.webkit.org/show_bug.cgi?id=93506
	//
	// Returns nothing.
	function locationReplace(url) {
		window.history.replaceState(null, "", pjax.state.url);
		window.location.replace(url);
	}

	var initialPop = true;
	var initialURL = window.location.href;
	var initialState = window.history.state;

	// Initialize $.pjax.state if possible
	// Happens when reloading a page and coming forward from a different
	// session history.
	if (initialState && initialState.container) {
		pjax.state = initialState;
	}

	// Non-webkit browsers don't fire an initial popstate event
	if ('state' in window.history) {
		initialPop = false;
	}

	// popstate handler takes care of the back and forward buttons
	//
	// You probably shouldn't use pjax on pages with other pushState
	// stuff yet.
	function onPjaxPopstate(event) {

		// Hitting back or forward should override any pending PJAX request.
		if (!initialPop) {
			abortXHR(pjax.xhr);
		}

		var previousState = pjax.state;
		var state = event.state;
		var direction;

		if (state && state.container) {
			// When coming forward from a separate history session, will get an
			// initial pop with a state we are already at. Skip reloading the current
			// page.
			if (initialPop && initialURL == state.url) return;

			if (previousState) {
				// If popping back to the same state, just skip.
				// Could be clicking back from hashchange rather than a pushState.
				if (previousState.id === state.id) return;

				// Since state IDs always increase, we can deduce the navigation direction
				direction = previousState.id < state.id ? 'forward' : 'back';
			}

			var cache = cacheMapping[state.id] || [];
			var containerSelector = cache[0] || state.container;
			var container = $(containerSelector),
			    contents = cache[1];

			if (container.length) {
				if (previousState) {
					// Cache current container before replacement and inform the
					// cache which direction the history shifted.
					cachePop(direction, previousState.id, [containerSelector, cloneContents(container)]);
				}

				var popstateEvent = $.Event('pjax:popstate', {
					state: state,
					direction: direction
				});
				container.trigger(popstateEvent);

				var options = {
					id: state.id,
					url: state.url,
					container: containerSelector,
					push: false,
					fragment: state.fragment,
					timeout: state.timeout,
					scrollTo: false
				};

				if (contents) {
					container.trigger('pjax:start', [null, options]);

					pjax.state = state;
					if (state.title) document.title = state.title;
					var beforeReplaceEvent = $.Event('pjax:beforeReplace', {
						state: state,
						previousState: previousState
					});
					container.trigger(beforeReplaceEvent, [contents, options]);
					container.html(contents);

					container.trigger('pjax:end', [null, options]);
				} else {
					pjax(options);
				}

				// Force reflow/relayout before the browser tries to restore the
				// scroll position.
				container[0].offsetHeight; // eslint-disable-line no-unused-expressions
			} else {
				locationReplace(location.href);
			}
		}
		initialPop = false;
	}

	// Fallback version of main pjax function for browsers that don't
	// support pushState.
	//
	// Returns nothing since it retriggers a hard form submission.
	function fallbackPjax(options) {
		var url = $.isFunction(options.url) ? options.url() : options.url,
		    method = options.type ? options.type.toUpperCase() : 'GET';

		var form = $('<form>', {
			method: method === 'GET' ? 'GET' : 'POST',
			action: url,
			style: 'display:none'
		});

		if (method !== 'GET' && method !== 'POST') {
			form.append($('<input>', {
				type: 'hidden',
				name: '_method',
				value: method.toLowerCase()
			}));
		}

		var data = options.data;
		if (typeof data === 'string') {
			$.each(data.split('&'), function (index, value) {
				var pair = value.split('=');
				form.append($('<input>', { type: 'hidden', name: pair[0], value: pair[1] }));
			});
		} else if ($.isArray(data)) {
			$.each(data, function (index, value) {
				form.append($('<input>', { type: 'hidden', name: value.name, value: value.value }));
			});
		} else if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === 'object') {
			var key;
			for (key in data) {
				form.append($('<input>', { type: 'hidden', name: key, value: data[key] }));
			}
		}

		$(document.body).append(form);
		form.submit();
	}

	// Internal: Abort an XmlHttpRequest if it hasn't been completed,
	// also removing its event handlers.
	function abortXHR(xhr) {
		if (xhr && xhr.readyState < 4) {
			xhr.onreadystatechange = $.noop;
			xhr.abort();
		}
	}

	// Internal: Generate unique id for state object.
	//
	// Use a timestamp instead of a counter since ids should still be
	// unique across page loads.
	//
	// Returns Number.
	function uniqueId() {
		return new Date().getTime();
	}

	function cloneContents(container) {
		var cloned = container.clone();
		// Unmark script tags as already being eval'd so they can get executed again
		// when restored from cache. HAXX: Uses jQuery internal method.
		cloned.find('script').each(function () {
			if (!this.src) $._data(this, 'globalEval', false);
		});
		return cloned.contents();
	}

	// Internal: Strip internal query params from parsed URL.
	//
	// Returns sanitized url.href String.
	function stripInternalParams(url) {
		url.search = url.search.replace(/([?&])(_pjax|_)=[^&]*/g, '').replace(/^&/, '');
		return url.href.replace(/\?($|#)/, '$1');
	}

	// Internal: Parse URL components and returns a Locationish object.
	//
	// url - String URL
	//
	// Returns HTMLAnchorElement that acts like Location.
	function parseURL(url) {
		var a = document.createElement('a');
		a.href = url;
		return a;
	}

	// Internal: Return the `href` component of given URL object with the hash
	// portion removed.
	//
	// location - Location or HTMLAnchorElement
	//
	// Returns String
	function stripHash(location) {
		return location.href.replace(/#.*/, '');
	}

	// Internal: Build options Object for arguments.
	//
	// For convenience the first parameter can be either the container or
	// the options object.
	//
	// Examples
	//
	//   optionsFor('#container')
	//   // => {container: '#container'}
	//
	//   optionsFor('#container', {push: true})
	//   // => {container: '#container', push: true}
	//
	//   optionsFor({container: '#container', push: true})
	//   // => {container: '#container', push: true}
	//
	// Returns options Object.
	function optionsFor(container, options) {
		if (container && options) {
			options = $.extend({}, options);
			options.container = container;
			return options;
		} else if ($.isPlainObject(container)) {
			return container;
		} else {
			return { container: container };
		}
	}

	// Internal: Filter and find all elements matching the selector.
	//
	// Where $.fn.find only matches descendants, findAll will test all the
	// top level elements in the jQuery object as well.
	//
	// elems    - jQuery object of Elements
	// selector - String selector to match
	//
	// Returns a jQuery object.
	function findAll(elems, selector) {
		return elems.filter(selector).add(elems.find(selector));
	}

	function parseHTML(html) {
		return $.parseHTML(html, document, true);
	}

	// Internal: Extracts container and metadata from response.
	//
	// 1. Extracts X-PJAX-URL header if set
	// 2. Extracts inline <title> tags
	// 3. Builds response Element and extracts fragment if set
	//
	// data    - String response data
	// xhr     - XHR response
	// options - pjax options Object
	//
	// Returns an Object with url, title, and contents keys.
	function extractContainer(data, xhr, options) {
		var obj = {},
		    fullDocument = /<html/i.test(data);

		// Prefer X-PJAX-URL header if it was set, otherwise fallback to
		// using the original requested url.
		var serverUrl = xhr.getResponseHeader('X-PJAX-URL');
		obj.url = serverUrl ? stripInternalParams(parseURL(serverUrl)) : options.requestUrl;

		var $head, $body;
		// Attempt to parse response html into elements
		if (fullDocument) {
			$body = $(parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
			var head = data.match(/<head[^>]*>([\s\S.]*)<\/head>/i);
			$head = head != null ? $(parseHTML(head[0])) : $body;
		} else {
			$head = $body = $(parseHTML(data));
		}

		// If response data is empty, return fast
		if ($body.length === 0) return obj;

		// If there's a <title> tag in the header, use it as
		// the page's title.
		obj.title = findAll($head, 'title').last().text();

		if (options.fragment) {
			var $fragment = $body;
			// If they specified a fragment, look for it in the response
			// and pull it out.
			if (options.fragment !== 'body') {
				$fragment = findAll($fragment, options.fragment).first();
			}

			if ($fragment.length) {
				obj.contents = options.fragment === 'body' ? $fragment : $fragment.contents();

				// If there's no title, look for data-title and title attributes
				// on the fragment
				if (!obj.title) obj.title = $fragment.attr('title') || $fragment.data('title');
			}
		} else if (!fullDocument) {
			obj.contents = $body;
		}

		// Clean up any <title> tags
		if (obj.contents) {
			// Remove any parent title elements
			obj.contents = obj.contents.not(function () {
				return $(this).is('title');
			});

			// Then scrub any titles from their descendants
			obj.contents.find('title').remove();

			// Gather all script[src] elements
			obj.scripts = findAll(obj.contents, 'script[src]').remove();
			obj.contents = obj.contents.not(obj.scripts);
		}

		// Trim any whitespace off the title
		if (obj.title) obj.title = $.trim(obj.title);

		return obj;
	}

	// Load an execute scripts using standard script request.
	//
	// Avoids jQuery's traditional $.getScript which does a XHR request and
	// globalEval.
	//
	// scripts - jQuery object of script Elements
	//
	// Returns nothing.
	function executeScriptTags(scripts) {
		if (!scripts) return;

		var existingScripts = $('script[src]');

		scripts.each(function () {
			var src = this.src;
			var matchedScripts = existingScripts.filter(function () {
				return this.src === src;
			});
			if (matchedScripts.length) return;

			var script = document.createElement('script');
			var type = $(this).attr('type');
			if (type) script.type = type;
			script.src = $(this).attr('src');
			document.head.appendChild(script);
		});
	}

	// Internal: History DOM caching class.
	var cacheMapping = {};
	var cacheForwardStack = [];
	var cacheBackStack = [];

	// Push previous state id and container contents into the history
	// cache. Should be called in conjunction with `pushState` to save the
	// previous container contents.
	//
	// id    - State ID Number
	// value - DOM Element to cache
	//
	// Returns nothing.
	function cachePush(id, value) {
		cacheMapping[id] = value;
		cacheBackStack.push(id);

		// Remove all entries in forward history stack after pushing a new page.
		trimCacheStack(cacheForwardStack, 0);

		// Trim back history stack to max cache length.
		trimCacheStack(cacheBackStack, pjax.defaults.maxCacheLength);
	}

	// Shifts cache from directional history cache. Should be
	// called on `popstate` with the previous state id and container
	// contents.
	//
	// direction - "forward" or "back" String
	// id        - State ID Number
	// value     - DOM Element to cache
	//
	// Returns nothing.
	function cachePop(direction, id, value) {
		var pushStack, popStack;
		cacheMapping[id] = value;

		if (direction === 'forward') {
			pushStack = cacheBackStack;
			popStack = cacheForwardStack;
		} else {
			pushStack = cacheForwardStack;
			popStack = cacheBackStack;
		}

		pushStack.push(id);
		id = popStack.pop();
		if (id) delete cacheMapping[id];

		// Trim whichever stack we just pushed to to max cache length.
		trimCacheStack(pushStack, pjax.defaults.maxCacheLength);
	}

	// Trim a cache stack (either cacheBackStack or cacheForwardStack) to be no
	// longer than the specified length, deleting cached DOM elements as necessary.
	//
	// stack  - Array of state IDs
	// length - Maximum length to trim to
	//
	// Returns nothing.
	function trimCacheStack(stack, length) {
		while (stack.length > length) {
			delete cacheMapping[stack.shift()];
		}
	}

	// Public: Find version identifier for the initial page load.
	//
	// Returns String version or undefined.
	function findVersion() {
		return $('meta').filter(function () {
			var name = $(this).attr('http-equiv');
			return name && name.toUpperCase() === 'X-PJAX-VERSION';
		}).attr('content');
	}

	// Install pjax functions on $.pjax to enable pushState behavior.
	//
	// Does nothing if already enabled.
	//
	// Examples
	//
	//     $.pjax.enable()
	//
	// Returns nothing.
	function enable() {
		$.fn.pjax = fnPjax;
		$.pjax = pjax;
		$.pjax.enable = $.noop;
		$.pjax.disable = disable;
		$.pjax.click = handleClick;
		$.pjax.submit = handleSubmit;
		$.pjax.reload = pjaxReload;
		$.pjax.defaults = {
			timeout: 650,
			push: true,
			replace: false,
			type: 'GET',
			dataType: 'html',
			scrollTo: 0,
			maxCacheLength: 20,
			version: findVersion
		};
		$(window).on('popstate.pjax', onPjaxPopstate);
	}

	// Disable pushState behavior.
	//
	// This is the case when a browser doesn't support pushState. It is
	// sometimes useful to disable pushState for debugging on a modern
	// browser.
	//
	// Examples
	//
	//     $.pjax.disable()
	//
	// Returns nothing.
	function disable() {
		$.fn.pjax = function () {
			return this;
		};
		$.pjax = fallbackPjax;
		$.pjax.enable = enable;
		$.pjax.disable = $.noop;
		$.pjax.click = $.noop;
		$.pjax.submit = $.noop;
		$.pjax.reload = function () {
			window.location.reload();
		};

		$(window).off('popstate.pjax', onPjaxPopstate);
	}

	// Add the state property to jQuery's event object so we can use it in
	// $(window).bind('popstate')
	if ($.event.props && $.inArray('state', $.event.props) < 0) {
		$.event.props.push('state');
	} else if (!('state' in $.Event.prototype)) {
		$.event.addProp('state');
	}

	// Is pjax supported by this browser?
	$.support.pjax = window.history && window.history.pushState && window.history.replaceState &&
	// pushState isn't reliable on iOS until 5.
	!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/);

	if ($.support.pjax) {
		enable();
	} else {
		disable();
	}
})(jQuery);

$(document).ready(function () {
	$(".us-year").datepicker({
		format: "yyyy",
		viewMode: "years",
		minViewMode: "years",
		todayHighlight: true,
		autoclose: true
	});
	$(".us-month").datepicker({
		format: "m",
		viewMode: "months",
		minViewMode: "months",
		todayHighlight: true,
		autoclose: true
	});
	$(".us-day").datepicker({
		format: "d",
		viewMode: "days",
		minViewMode: "days",
		todayHighlight: true,
		autoclose: true
	});
	$(".us-datetime").datepicker({
		format: "yyyy/mm/dd",
		todayHighlight: true,
		autoclose: true
	});

	$('.custom-datepicker').datepicker({
		dateFormat: "yy.mm.dd"
	});

	if ($.fn.numeric) {
		$('input.number').numeric({
			maxDigits: $(this).attr('maxlength'),
			allowPlus: false,

			// Allow the - sign
			allowMinus: false,

			// Allow the thousands separator, default is the comma eg 12,000
			allowThouSep: false,

			// Allow the decimal separator, default is the fullstop eg 3.141
			allowDecSep: false,
			allowLeadingSpaces: false
		});
	}

	$(document).on('keydown', 'input.number', function (e) {
		if (e.keyCode == 229) {

			// Check if preventDefault not working on browser
			// - isDefaultPrevented() return true if preventDefault worked, otherwise
			// - if not working, remove next characters
			var texts = $(this).val();
			if (!isBlank($(this).attr('maxlength')) && texts.length >= $(this).attr('maxlength')) {
				$(this).val(texts.substring(0, $(this).attr('maxlength'))).trigger('change');
				return false;
			} else {
				return true;
			}
		}
		return isBlank($(this).attr('maxlength')) || $(this).val().length <= $(this).attr('maxlength');
	}).on('blur', function (e) {
		var texts = $(this).val();

		if (!isBlank($(this).attr('maxlength')) && texts.length >= $(this).attr('maxlength')) {
			$(this).val(texts.substring(0, $(this).attr('maxlength'))).trigger('change');
			return false;
		} else {
			return true;
		}
	});

	$('.birthday-block').each(function () {
		doChangeYmd('', $(this).attr('data-name'), $(this).attr('data-min'), $(this).attr('data-max'));
	});
});

/**
 * Function validate year, month, day when change combobox year, month, day
 * 
 * @param valName String
 * @param valSince String
 * @param valUntil String
 * 
 * @returns void
*/
function doChangeYmd(thisVal, valName, valSince, valUntil) {
	if (typeof valUntil == 'undefined') {
		return;
	}
	var intDay = calculDay(valName);
	var valMonth = $('#name_month' + valName).val();
	var valDay = $('#name_day' + valName).val();
	$year = $('#name_year' + valName).val();

	if (thisVal.value == "" || valMonth == "" && valDay == "" && $year == "") {
		if ($year == "" || valMonth == "") {

			if (valMonth == "" && $year == "" || $year == "") {
				doAddDefaultMonthDay(valName, true, true);
			}
			if (valMonth == "") {
				doAddDefaultMonthDay(valName, true, false);
			}
			$('#name_day' + valName).val(valDay);
			$('#name_month' + valName).val(valMonth);
		}

		$('#hidden_name_' + valName).val("");
		return;
	}

	// Update Ymd since :
	if ($year != "" && $year == valSince.toString().substring(0, 4)) {
		if ($year == valUntil.toString().substring(0, 4)) {
			updateMonth(parseInt(valSince.toString().substring(4, 6)), parseInt(valUntil.toString().substring(4, 6)), valName);
			$month = $('#name_month' + valName).val();
			if ($month == parseInt(valUntil.toString().substring(4, 6))) {
				if ($month == parseInt(valSince.toString().substring(4, 6))) {
					updateDay(parseInt(valSince.toString().substring(6, 8)), parseInt(valUntil.toString().substring(6, 8)), valName);
				} else {
					updateDay(1, parseInt(valUntil.toString().substring(6, 8)), valName);
				}
			} else {
				updateDay(1, intDay, valName);
			}
		} else {
			updateMonth(parseInt(valSince.toString().substring(4, 6)), 12, valName);
			$month = $('#name_month' + valName).val();
			if ($month == parseInt(valSince.toString().substring(4, 6))) {
				updateDay(parseInt(valSince.toString().substring(6, 8)), intDay, valName);
			} else {
				updateDay(1, intDay, valName);
			}
		}
	}

	// Update Ymd until :
	else if ($year != "" && $year == valUntil.toString().substring(0, 4)) {
			updateMonth(1, parseInt(valUntil.toString().substring(4, 6)), valName);
			$month = $('#name_month' + valName).val();
			if ($month == parseInt(valUntil.toString().substring(4, 6))) {
				updateDay(1, parseInt(valUntil.toString().substring(6, 8)), valName);
			} else {
				updateDay(1, intDay, valName);
			}
		} else {
			updateMonth(1, 12, valName);
			updateDay(1, intDay, valName);
		}
	$("#name_month" + valName + " option[value='']").remove();
	$("#name_day" + valName + " option[value='']").remove();

	// sort select box month, day
	softSelect(valName, "name_day");
	softSelect(valName, "name_month");

	// update value selected for select box day
	$("#name_day" + valName).prepend("<option value=''></option>");
	if ($("#name_day" + valName + " option[value='" + valDay + "']").length > 0) {
		$('#name_day' + valName).val(valDay);
	} else {
		$('#name_day' + valName).val($('#name_day' + valName).find('option').first().val());
		doChangeYmd(valName, valSince, valUntil);
	}

	// update value selected for select box month
	$("#name_month" + valName).prepend("<option value=''></option>");
	if ($("#name_month" + valName + " option[value='" + valMonth + "']").length > 0) {
		$('#name_month' + valName).val(valMonth);
	} else {
		$('#name_month' + valName).val($('#name_month' + valName).find('option').first().val());
		doChangeYmd(valName, valSince, valUntil);
	}

	if ($('#name_month' + valName).val() == "" || $('#name_day' + valName).val() == "" || $('#name_year' + valName).val() == "") {
		$('#hidden_name_' + valName).val("");
		return;
	}

	// Update value for hidden tag
	$('#hidden_name_' + valName).val($('#name_year' + valName).val() + '/' + $('#name_month' + valName).val() + '/' + $('#name_day' + valName).val());
}

/**
 * Function sort select box
 * 
 * @param valName String
 * @param valDayMonth String
 * 
 * @returns void
*/
function softSelect(valName, valDayMonth) {
	var selectOptions = $("#" + valDayMonth + valName + " option");
	selectOptions.sort(function (a, b) {
		if (parseInt(a.text) > parseInt(b.text)) {
			return 1;
		} else if (parseInt(a.text) < parseInt(b.text)) {
			return -1;
		} else {
			return 0;
		}
	});
	$("#" + valDayMonth + valName).empty().append(selectOptions);
}

/**
 * Function update select box month
 * 
 * @param monthFrom int
 * @param monthTo int
 * @param valName String
 * 
 * @returns void
*/
function updateMonth(monthFrom, monthTo, valName) {
	for ($count = 1; $count <= 12; $count++) {
		if (monthFrom <= $count && $count <= monthTo) {
			if (!$("#name_month" + valName + " option[value='" + $count + "']").length > 0) {
				$("#name_month" + valName).append("<option value='" + $count + "'>" + $count + "</option>");
			}
		} else {
			if ($("#name_month" + valName + " option[value='" + $count + "']").length > 0) {
				$("#name_month" + valName + " option[value='" + $count + "']").remove();
			}
		}
	}
	$("#hidden_month_" + valName).val(monthFrom + "-" + monthTo);
}

/**
 * Function update select box day
 * 
 * @param dayFrom int
 * @param dayTo int
 * @param valName String
 * 
 * @returns void
*/
function updateDay(dayFrom, dayTo, valName) {
	for ($count = 1; $count <= 31; $count++) {
		if (dayFrom <= $count && $count <= dayTo) {
			if (!$("#name_day" + valName + " option[value='" + $count + "']").length > 0) {
				$("#name_day" + valName).append("<option value='" + $count + "'>" + $count + "</option>");
			}
		} else {
			if ($("#name_day" + valName + " option[value='" + $count + "']").length > 0) {
				$("#name_day" + valName + " option[value='" + $count + "']").remove();
			}
		}
	}
	$("#hidden_day_" + valName).val(dayFrom + "-" + dayTo);
}

/**
 * Function calcul day of month
 * 
 * @param valName String
 * 
 * @returns int : day in month
*/
function calculDay(valName) {
	$year = $('#name_year' + valName).val();
	$month = $('#name_month' + valName).val();
	$day = $('#name_day' + valName).val();
	switch ($month) {
		case "1":case "3":case "5":case "7":case "8":case "10":case "12":case "":
			return 31;
		case "4":case "6":case "9":case "11":
			return 30;
		case "2":
			if ($year == "" || $year % 4 == 0 && $year % 100 != 0 || $year % 400 == 0) {
				return 29;
			}
			return 28;
	}
}

/**
 * Function update month, day default
 * 
 * @param valName String
 * @param isUpdateDay Boolean
 * @param isUpdateMonth Boolean
 * 
 * @returns update month, day default
*/
function doAddDefaultMonthDay(valName, isUpdateDay, isUpdateMonth) {
	if (isUpdateDay) {
		$("#name_day" + valName).find('option').remove();
		$("#name_day" + valName).prepend("<option value=''></option>");
		for ($count = 1; $count <= 31; $count++) {
			$("#name_day" + valName).append("<option value='" + $count + "'>" + $count + "</option>");
		}
	}
	if (isUpdateMonth) {
		$("#name_month" + valName).find('option').remove();
		$("#name_month" + valName).prepend("<option value=''></option>");
		for ($count = 1; $count <= 12; $count++) {
			$("#name_month" + valName).append("<option value='" + $count + "'>" + $count + "</option>");
		}
	}
}

function doChangeDateTime(thisVal, hiddenName) {
	if (!isBlank($(thisVal).val())) {
		$('input[name="' + hiddenName + '"]').val($(thisVal).val().replace(/(\.0)|(\.)/g, '/'));
	} else {
		$('input[name="' + hiddenName + '"]').val('');
	}
}

/**
 * Check string is blank
 * @param str
 * @returns boolean
 */
function isBlank(str) {
	return !str || /^\s*$/.test(str);
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {
	// pjax
	$(document).pjax('ul.pagination li a', '.load-content-list-user');
});

$(document).ready(function () {
	if ($.support.pjax) {
		$.pjax.defaults.timeout = 60000; // time in milliseconds
		$.pjax.defaults.scrollTo = false;
	}

	////    $('select[name="group[]"]').each(function() {
	////        if ($(this).val() == '') {
	////            $(this).next().find(".select2-selection__rendered").css("color", "#abafbb ");
	////        } else {
	////            $(this).next().find(".select2-selection__rendered").css("color", "#2b3c62 ");
	////        }
	////    });
	//
	////    $(document).ready(function () {
	////        $(document).on('change', 'select[name="group[]"]', function () {
	////            if ($(this).val() == '') {
	////                $(this).next().find(".select2-selection__rendered").css("color", "#abafbb ");
	////            } else {
	////                $(this).next().find(".select2-selection__rendered").css("color", "#2b3c62 ");
	////            }
	////        });
	////    });
	$('a.link-disabled').on('click', function (e) {
		return false;
		e.preventDefault();
	});

	// Handle ajax for sort item
	$(document).on('change', '.list-common-user #sort_item', function () {
		var targetUrl = decodeURIComponent(window.location.href);
		var sortValue = $(this).val();
		if (targetUrl.indexOf('sort_item=') >= 0) {
			targetUrl = targetUrl.replace(/sort_item=[0-9]:[0-9]/, 'sort_item=' + sortValue);
		} else {
			targetUrl = targetUrl + '&sort_item=' + sortValue;
		}

		$.pjax({
			url: targetUrl,
			container: '.load-content-list-user'
		});
	});

	$(document).on('pjax:end', function () {
		// extension:
		$.fn.scrollEnd = function (callback, timeout) {
			$(this).scroll(function () {
				var $this = $(this);
				if ($this.data('scrollTimeout')) {
					clearTimeout($this.data('scrollTimeout'));
				}

				$this.data('scrollTimeout', setTimeout(callback, timeout));
			});
		};

		// Custom Select2
		$(".custom-select select").select2({
			theme: "bootstrap",
			width: '100%',
			minimumResultsForSearch: Infinity,
			allowClear: true
		});

		var ps;
		$(".custom-select select, .custom-select-table:not(.multiple-select) .table-select").on("select2:open", function (e) {
			if (ps) ps.destroy();
			var ps;
			setTimeout(function () {
				ps = new PerfectScrollbar('.select2-container .select2-results > .select2-results__options', {
					wheelSpeed: 0.5,
					minScrollbarLength: 90
				});
			}, 5);
		}).on("select2:close", function (e) {
			if (ps) ps.destroy();
			ps = null;
		});
	});

	$('input[id^="hidden_month_"]').prop('disabled', true);
	$('input[id^="hidden_day_"]').prop('disabled', true);

	$(document).on('pjax:popstate', function (event) {
		$.pjax.reload('.load-content-list-user');
	});
});

/**
 * Handle error of ajax request
 * @param e
 * @returns view
 */
function handleError(e) {
	try {
		// If Login Error
		if (e.status === 401) {
			if (e.responseJSON.type === 'login_other_browser') {
				location.reload();
				return;
			} else if (e.responseJSON.type === 'logout') {
				location.reload();
				return;
			}
		}
		if (typeof e.responseText != 'undefined' && e.responseText != '') {
			var error = JSON.parse(e.responseText);
			var params = '';
			if (!isBlank(error.message)) {
				params = error.code + "/" + decodeURIComponent(error.message);
			}
			window.location.href = window.location.href.split('users/general')[0] + 'error/' + params;
		}
	} catch (ex) {
		console.log(ex);
		window.location.href = window.location.href.split('users/general')[0] + 'error';
	}
}