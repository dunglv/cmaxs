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
    $('.custom-datepicker').datepicker({
        dateFormat: "yy.mm.dd"
    });
});

(function defineMustache(global, factory) {
    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && exports && typeof exports.nodeName !== "string") {
        factory(exports);
    } else if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else {
        global.Mustache = {};factory(global.Mustache);
    }
})(this, function mustacheFactory(mustache) {
    var objectToString = Object.prototype.toString;var isArray = Array.isArray || function isArrayPolyfill(object) {
        return objectToString.call(object) === "[object Array]";
    };function isFunction(object) {
        return typeof object === "function";
    }function typeStr(obj) {
        return isArray(obj) ? "array" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
    }function escapeRegExp(string) {
        return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }function hasProperty(obj, propName) {
        return obj != null && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && propName in obj;
    }var regExpTest = RegExp.prototype.test;function testRegExp(re, string) {
        return regExpTest.call(re, string);
    }var nonSpaceRe = /\S/;function isWhitespace(string) {
        return !testRegExp(nonSpaceRe, string);
    }var entityMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;", "`": "&#x60;", "=": "&#x3D;" };function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
            return entityMap[s];
        });
    }var whiteRe = /\s*/;var spaceRe = /\s+/;var equalsRe = /\s*=/;var curlyRe = /\s*\}/;var tagRe = /#|\^|\/|>|\{|&|=|!/;function parseTemplate(template, tags) {
        if (!template) return [];var sections = [];var tokens = [];var spaces = [];var hasTag = false;var nonSpace = false;function stripSpace() {
            if (hasTag && !nonSpace) {
                while (spaces.length) {
                    delete tokens[spaces.pop()];
                }
            } else {
                spaces = [];
            }hasTag = false;nonSpace = false;
        }var openingTagRe, closingTagRe, closingCurlyRe;function compileTags(tagsToCompile) {
            if (typeof tagsToCompile === "string") tagsToCompile = tagsToCompile.split(spaceRe, 2);if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error("Invalid tags: " + tagsToCompile);openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + "\\s*");closingTagRe = new RegExp("\\s*" + escapeRegExp(tagsToCompile[1]));closingCurlyRe = new RegExp("\\s*" + escapeRegExp("}" + tagsToCompile[1]));
        }compileTags(tags || mustache.tags);var scanner = new Scanner(template);var start, type, value, chr, token, openSection;while (!scanner.eos()) {
            start = scanner.pos;value = scanner.scanUntil(openingTagRe);if (value) {
                for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
                    chr = value.charAt(i);if (isWhitespace(chr)) {
                        spaces.push(tokens.length);
                    } else {
                        nonSpace = true;
                    }tokens.push(["text", chr, start, start + 1]);start += 1;if (chr === "\n") stripSpace();
                }
            }if (!scanner.scan(openingTagRe)) break;hasTag = true;type = scanner.scan(tagRe) || "name";scanner.scan(whiteRe);if (type === "=") {
                value = scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe);
            } else if (type === "{") {
                value = scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type = "&";
            } else {
                value = scanner.scanUntil(closingTagRe);
            }if (!scanner.scan(closingTagRe)) throw new Error("Unclosed tag at " + scanner.pos);token = [type, value, start, scanner.pos];tokens.push(token);if (type === "#" || type === "^") {
                sections.push(token);
            } else if (type === "/") {
                openSection = sections.pop();if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start);if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
            } else if (type === "name" || type === "{" || type === "&") {
                nonSpace = true;
            } else if (type === "=") {
                compileTags(value);
            }
        }openSection = sections.pop();if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);return nestTokens(squashTokens(tokens));
    }function squashTokens(tokens) {
        var squashedTokens = [];var token, lastToken;for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            token = tokens[i];if (token) {
                if (token[0] === "text" && lastToken && lastToken[0] === "text") {
                    lastToken[1] += token[1];lastToken[3] = token[3];
                } else {
                    squashedTokens.push(token);lastToken = token;
                }
            }
        }return squashedTokens;
    }function nestTokens(tokens) {
        var nestedTokens = [];var collector = nestedTokens;var sections = [];var token, section;for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            token = tokens[i];switch (token[0]) {case "#":case "^":
                    collector.push(token);sections.push(token);collector = token[4] = [];break;case "/":
                    section = sections.pop();section[5] = token[2];collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;break;default:
                    collector.push(token);}
        }return nestedTokens;
    }function Scanner(string) {
        this.string = string;this.tail = string;this.pos = 0;
    }Scanner.prototype.eos = function eos() {
        return this.tail === "";
    };Scanner.prototype.scan = function scan(re) {
        var match = this.tail.match(re);if (!match || match.index !== 0) return "";var string = match[0];this.tail = this.tail.substring(string.length);this.pos += string.length;return string;
    };Scanner.prototype.scanUntil = function scanUntil(re) {
        var index = this.tail.search(re),
            match;switch (index) {case -1:
                match = this.tail;this.tail = "";break;case 0:
                match = "";break;default:
                match = this.tail.substring(0, index);this.tail = this.tail.substring(index);}this.pos += match.length;return match;
    };function Context(view, parentContext) {
        this.view = view;this.cache = { ".": this.view };this.parent = parentContext;
    }Context.prototype.push = function push(view) {
        return new Context(view, this);
    };Context.prototype.lookup = function lookup(name) {
        var cache = this.cache;var value;if (cache.hasOwnProperty(name)) {
            value = cache[name];
        } else {
            var context = this,
                names,
                index,
                lookupHit = false;while (context) {
                if (name.indexOf(".") > 0) {
                    value = context.view;names = name.split(".");index = 0;while (value != null && index < names.length) {
                        if (index === names.length - 1) lookupHit = hasProperty(value, names[index]);value = value[names[index++]];
                    }
                } else {
                    value = context.view[name];lookupHit = hasProperty(context.view, name);
                }if (lookupHit) break;context = context.parent;
            }cache[name] = value;
        }if (isFunction(value)) value = value.call(this.view);return value;
    };function Writer() {
        this.cache = {};
    }Writer.prototype.clearCache = function clearCache() {
        this.cache = {};
    };Writer.prototype.parse = function parse(template, tags) {
        var cache = this.cache;var tokens = cache[template];if (tokens == null) tokens = cache[template] = parseTemplate(template, tags);return tokens;
    };Writer.prototype.render = function render(template, view, partials) {
        var tokens = this.parse(template);var context = view instanceof Context ? view : new Context(view);return this.renderTokens(tokens, context, partials, template);
    };Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate) {
        var buffer = "";var token, symbol, value;for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            value = undefined;token = tokens[i];symbol = token[0];if (symbol === "#") value = this.renderSection(token, context, partials, originalTemplate);else if (symbol === "^") value = this.renderInverted(token, context, partials, originalTemplate);else if (symbol === ">") value = this.renderPartial(token, context, partials, originalTemplate);else if (symbol === "&") value = this.unescapedValue(token, context);else if (symbol === "name") value = this.escapedValue(token, context);else if (symbol === "text") value = this.rawValue(token);if (value !== undefined) buffer += value;
        }return buffer;
    };Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate) {
        var self = this;var buffer = "";var value = context.lookup(token[1]);function subRender(template) {
            return self.render(template, context, partials);
        }if (!value) return;if (isArray(value)) {
            for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
                buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
            }
        } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" || typeof value === "string" || typeof value === "number") {
            buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
            if (typeof originalTemplate !== "string") throw new Error("Cannot use higher-order sections without the original template");value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);if (value != null) buffer += value;
        } else {
            buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }return buffer;
    };Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate) {
        var value = context.lookup(token[1]);if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate);
    };Writer.prototype.renderPartial = function renderPartial(token, context, partials) {
        if (!partials) return;var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];if (value != null) return this.renderTokens(this.parse(value), context, partials, value);
    };Writer.prototype.unescapedValue = function unescapedValue(token, context) {
        var value = context.lookup(token[1]);if (value != null) return value;
    };Writer.prototype.escapedValue = function escapedValue(token, context) {
        var value = context.lookup(token[1]);if (value != null) return mustache.escape(value);
    };Writer.prototype.rawValue = function rawValue(token) {
        return token[1];
    };mustache.name = "mustache.js";mustache.version = "2.3.0";mustache.tags = ["{{", "}}"];var defaultWriter = new Writer();mustache.clearCache = function clearCache() {
        return defaultWriter.clearCache();
    };mustache.parse = function parse(template, tags) {
        return defaultWriter.parse(template, tags);
    };mustache.render = function render(template, view, partials) {
        if (typeof template !== "string") {
            throw new TypeError('Invalid template! Template should be a "string" ' + 'but "' + typeStr(template) + '" was given as the first ' + "argument for mustache#render(template, view, partials)");
        }return defaultWriter.render(template, view, partials);
    };mustache.to_html = function to_html(template, view, partials, send) {
        var result = mustache.render(template, view, partials);if (isFunction(send)) {
            send(result);
        } else {
            return result;
        }
    };mustache.escape = escapeHtml;mustache.Scanner = Scanner;mustache.Context = Context;mustache.Writer = Writer;return mustache;
});

/********************************************************************
* Limit the characters that may be entered in a text field
* Common options: alphanumeric, alphabetic or numeric
* Kevin Sheedy, 2012
* http://github.com/KevinSheedy/jquery.alphanum
*********************************************************************/
(function ($) {

    // API ///////////////////////////////////////////////////////////////////
    $.fn.alphanum = function (settings) {

        var combinedSettings = getCombinedSettingsAlphaNum(settings);

        var $collection = this;

        setupEventHandlers($collection, trimAlphaNum, combinedSettings);

        return this;
    };

    $.fn.alpha = function (settings) {

        var defaultAlphaSettings = getCombinedSettingsAlphaNum("alpha");
        var combinedSettings = getCombinedSettingsAlphaNum(settings, defaultAlphaSettings);

        var $collection = this;

        setupEventHandlers($collection, trimAlphaNum, combinedSettings);

        return this;
    };

    $.fn.numeric = function (settings) {

        var combinedSettings = getCombinedSettingsNum(settings);
        var $collection = this;

        setupEventHandlers($collection, trimNum, combinedSettings);

        $collection.blur(function () {
            numericField_Blur(this, combinedSettings);
        });

        return this;
    };

    // End of API /////////////////////////////////////////////////////////////


    // Start Settings ////////////////////////////////////////////////////////

    var DEFAULT_SETTINGS_ALPHANUM = {
        allow: '', // Allow extra characters
        disallow: '', // Disallow extra characters
        allowSpace: true, // Allow the space character
        allowNewline: true, // Allow the newline character \n ascii 10
        allowNumeric: true, // Allow digits 0-9
        allowUpper: true, // Allow upper case characters
        allowLower: true, // Allow lower case characters
        allowCaseless: true, // Allow characters that don't have both upper & lower variants - eg Arabic or Chinese
        allowLatin: true, // a-z A-Z
        allowOtherCharSets: true, // eg é, Á, Arabic, Chinese etc
        forceUpper: false, // Convert lower case characters to upper case
        forceLower: false, // Convert upper case characters to lower case
        maxLength: NaN // eg Max Length
    };

    var DEFAULT_SETTINGS_NUM = {
        allowPlus: false, // Allow the + sign
        allowMinus: true, // Allow the - sign
        allowThouSep: true, // Allow the thousands separator, default is the comma eg 12,000
        allowDecSep: true, // Allow the decimal separator, default is the fullstop eg 3.141
        allowLeadingSpaces: false,
        maxDigits: NaN, // The max number of digits
        maxDecimalPlaces: NaN, // The max number of decimal places
        maxPreDecimalPlaces: NaN, // The max number digits before the decimal point
        max: NaN, // The max numeric value allowed
        min: NaN // The min numeric value allowed


        // Some pre-defined groups of settings for convenience
    };var CONVENIENCE_SETTINGS_ALPHANUM = {
        "alpha": {
            allowNumeric: false
        },
        "upper": {
            allowNumeric: false,
            allowUpper: true,
            allowLower: false,
            allowCaseless: true
        },
        "lower": {
            allowNumeric: false,
            allowUpper: false,
            allowLower: true,
            allowCaseless: true
        }
    };

    // Some pre-defined groups of settings for convenience
    var CONVENIENCE_SETTINGS_NUMERIC = {
        "integer": {
            allowPlus: false,
            allowMinus: true,
            allowThouSep: false,
            allowDecSep: false
        },
        "positiveInteger": {
            allowPlus: false,
            allowMinus: false,
            allowThouSep: false,
            allowDecSep: false
        }
    };

    var BLACKLIST = getBlacklistAscii() + getBlacklistNonAscii();
    var THOU_SEP = ",";
    var DEC_SEP = ".";
    var DIGITS = getDigitsMap();
    var LATIN_CHARS = getLatinCharsSet();

    // Return the blacklisted special chars that are encodable using 7-bit ascii
    function getBlacklistAscii() {
        var blacklist = '!@#$%^&*()+=[]\\\';,/{}|":<>?~`.-_';
        blacklist += " "; // 'Space' is on the blacklist but can be enabled using the 'allowSpace' config entry
        return blacklist;
    }

    // Return the blacklisted special chars that are NOT encodable using 7-bit ascii
    // We want this .js file to be encoded using 7-bit ascii so it can reach the widest possible audience
    // Higher order chars must be escaped eg "\xAC"
    // Not too worried about comments containing higher order characters for now (let's wait and see if it becomes a problem)
    function getBlacklistNonAscii() {
        var blacklist = "\xAC" // ¬
        + "\u20AC" // €
        + "\xA3" // £
        + "\xA6" // ¦
        ;
        return blacklist;
    }

    // End Settings ////////////////////////////////////////////////////////


    // Implementation details go here ////////////////////////////////////////////////////////

    function setupEventHandlers($textboxes, trimFunction, settings) {

        $textboxes.each(function () {

            var $textbox = $(this);

            $textbox
            // Unbind existing alphanum event handlers
            .off(".alphanum").on("keyup.alphanum change.alphanum paste.alphanum", function (e) {

                var pastedText = "";

                if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) pastedText = e.originalEvent.clipboardData.getData("text/plain");

                // setTimeout is necessary for handling the 'paste' event
                setTimeout(function () {
                    trimTextbox($textbox, trimFunction, settings, pastedText);
                }, 0);
            }).on("keypress.alphanum", function (e) {

                // Determine which key is pressed.
                // If it's a control key, then allow the event's default action to occur eg backspace, tab
                var charCode = !e.charCode ? e.which : e.charCode;
                if (isControlKey(charCode) || e.ctrlKey || e.metaKey) // cmd on MacOS
                    return;

                var newChar = String.fromCharCode(charCode);

                // Determine if some text was selected / highlighted when the key was pressed
                var selectionObject = $textbox.selection();
                var start = selectionObject.start;
                var end = selectionObject.end;

                var textBeforeKeypress = $textbox.val();

                // The new char may be inserted:
                //  1) At the start
                //  2) In the middle
                //  3) At the end
                //  4) User highlights some text and then presses a key which would replace the highlighted text
                //
                // Here we build the string that would result after the keypress.
                // If the resulting string is invalid, we cancel the event.
                // Unfortunately, it isn't enough to just check if the new char is valid because some chars
                // are position sensitive eg the decimal point '.'' or the minus sign '-'' are only valid in certain positions.
                var potentialTextAfterKeypress = textBeforeKeypress.substring(0, start) + newChar + textBeforeKeypress.substring(end);
                var validatedText = trimFunction(potentialTextAfterKeypress, settings);

                // If the keypress would cause the textbox to contain invalid characters, then cancel the keypress event
                if (validatedText != potentialTextAfterKeypress) e.preventDefault();
            });
        });
    }

    // Ensure the text is a valid number when focus leaves the textbox
    // This catches the case where a user enters '-' or '.' without entering any digits
    function numericField_Blur(inputBox, settings) {
        var fieldValueNumeric = parseFloat($(inputBox).val());
        var $inputBox = $(inputBox);

        if (isNaN(fieldValueNumeric)) {
            $inputBox.val("");
            return;
        }

        if (isNumeric(settings.min) && fieldValueNumeric < settings.min) $inputBox.val("");

        if (isNumeric(settings.max) && fieldValueNumeric > settings.max) $inputBox.val("");
    }

    function isNumeric(value) {
        return !isNaN(value);
    }

    function isControlKey(charCode) {

        if (charCode >= 32) return false;
        if (charCode == 10) return false;
        if (charCode == 13) return false;

        return true;
    }

    // One way to prevent a character being entered is to cancel the keypress event.
    // However, this gets messy when you have to deal with things like copy paste which isn't a keypress.
    // Which event gets fired first, keypress or keyup? What about IE6 etc etc?
    // Instead, it's easier to allow the 'bad' character to be entered and then to delete it immediately after.

    function trimTextbox($textBox, trimFunction, settings, pastedText) {

        var inputString = $textBox.val();

        if (inputString == "" && pastedText.length > 0) inputString = pastedText;

        var outputString = trimFunction(inputString, settings);

        if (inputString == outputString) return;

        var caretPos = $textBox.alphanum_caret();

        $textBox.val(outputString);

        //Reset the caret position
        if (inputString.length == outputString.length + 1) $textBox.alphanum_caret(caretPos - 1);else $textBox.alphanum_caret(caretPos);
    }

    function getCombinedSettingsAlphaNum(settings, defaultSettings) {
        if (typeof defaultSettings == "undefined") defaultSettings = DEFAULT_SETTINGS_ALPHANUM;
        var userSettings,
            combinedSettings = {};
        if (typeof settings === "string") userSettings = CONVENIENCE_SETTINGS_ALPHANUM[settings];else if (typeof settings == "undefined") userSettings = {};else userSettings = settings;

        $.extend(combinedSettings, defaultSettings, userSettings);

        if (typeof combinedSettings.blacklist == 'undefined') combinedSettings.blacklistSet = getBlacklistSet(combinedSettings.allow, combinedSettings.disallow);

        return combinedSettings;
    }

    function getCombinedSettingsNum(settings) {
        var userSettings,
            combinedSettings = {};
        if (typeof settings === "string") userSettings = CONVENIENCE_SETTINGS_NUMERIC[settings];else if (typeof settings == "undefined") userSettings = {};else userSettings = settings;

        $.extend(combinedSettings, DEFAULT_SETTINGS_NUM, userSettings);

        return combinedSettings;
    }

    // This is the heart of the algorithm
    function alphanum_allowChar(validatedStringFragment, Char, settings) {

        if (settings.maxLength && validatedStringFragment.length >= settings.maxLength) return false;

        if (settings.allow.indexOf(Char) >= 0) return true;

        if (settings.allowSpace && Char == " ") return true;

        if (!settings.allowNewline && (Char == '\n' || Char == '\r')) return false;

        if (settings.blacklistSet.contains(Char)) return false;

        if (!settings.allowNumeric && DIGITS[Char]) return false;

        if (!settings.allowUpper && isUpper(Char)) return false;

        if (!settings.allowLower && isLower(Char)) return false;

        if (!settings.allowCaseless && isCaseless(Char)) return false;

        if (!settings.allowLatin && LATIN_CHARS.contains(Char)) return false;

        if (!settings.allowOtherCharSets) {
            if (DIGITS[Char] || LATIN_CHARS.contains(Char)) return true;else return false;
        }

        return true;
    }

    function numeric_allowChar(validatedStringFragment, Char, settings) {

        if (DIGITS[Char]) {

            if (isMaxDigitsReached(validatedStringFragment, settings)) return false;

            if (isMaxPreDecimalsReached(validatedStringFragment, settings)) return false;

            if (isMaxDecimalsReached(validatedStringFragment, settings)) return false;

            if (isGreaterThanMax(validatedStringFragment + Char, settings)) return false;

            if (isLessThanMin(validatedStringFragment + Char, settings)) return false;

            return true;
        }

        if (settings.allowPlus && Char == '+' && validatedStringFragment == '') return true;

        if (settings.allowMinus && Char == '-' && validatedStringFragment == '') return true;

        if (Char == THOU_SEP && settings.allowThouSep && allowThouSep(validatedStringFragment)) return true;

        if (Char == DEC_SEP) {
            // Only one decimal separator allowed
            if (validatedStringFragment.indexOf(DEC_SEP) >= 0) return false;
            // Don't allow decimal separator when maxDecimalPlaces is set to 0
            if (settings.allowDecSep && settings.maxDecimalPlaces === 0) return false;
            if (settings.allowDecSep) return true;
        }

        return false;
    }

    function countDigits(string) {

        // Error handling, nulls etc
        string = string + "";

        // Count the digits
        return string.replace(/[^0-9]/g, "").length;
    }

    function isMaxDigitsReached(string, settings) {

        var maxDigits = settings.maxDigits;

        if (maxDigits === "" || isNaN(maxDigits)) return false; // In this case, there is no maximum

        var numDigits = countDigits(string);

        if (numDigits >= maxDigits) return true;

        return false;
    }

    function isMaxDecimalsReached(string, settings) {

        var maxDecimalPlaces = settings.maxDecimalPlaces;

        if (maxDecimalPlaces === "" || isNaN(maxDecimalPlaces)) return false; // In this case, there is no maximum

        var indexOfDecimalPoint = string.indexOf(DEC_SEP);

        if (indexOfDecimalPoint == -1) return false;

        var decimalSubstring = string.substring(indexOfDecimalPoint);
        var numDecimals = countDigits(decimalSubstring);

        if (numDecimals >= maxDecimalPlaces) return true;

        return false;
    }

    function isMaxPreDecimalsReached(string, settings) {

        var maxPreDecimalPlaces = settings.maxPreDecimalPlaces;

        if (maxPreDecimalPlaces === "" || isNaN(maxPreDecimalPlaces)) return false; // In this case, there is no maximum

        var indexOfDecimalPoint = string.indexOf(DEC_SEP);

        if (indexOfDecimalPoint >= 0) return false;

        var numPreDecimalDigits = countDigits(string);

        if (numPreDecimalDigits >= maxPreDecimalPlaces) return true;

        return false;
    }

    function isGreaterThanMax(numericString, settings) {

        if (!settings.max || settings.max < 0) return false;

        var outputNumber = parseFloat(numericString);
        if (outputNumber > settings.max) return true;

        return false;
    }

    function isLessThanMin(numericString, settings) {

        if (!settings.min || settings.min > 0) return false;

        var outputNumber = parseFloat(numericString);
        if (outputNumber < settings.min) return true;

        return false;
    }

    /********************************
     * Trims a string according to the settings provided
     ********************************/
    function trimAlphaNum(inputString, settings) {

        if (typeof inputString != "string") return inputString;

        var inChars = inputString.split("");
        var outChars = [];
        var i = 0;
        var Char;

        for (i = 0; i < inChars.length; i++) {
            Char = inChars[i];
            var validatedStringFragment = outChars.join("");
            if (alphanum_allowChar(validatedStringFragment, Char, settings)) outChars.push(Char);
        }

        var outputString = outChars.join("");

        if (settings.forceLower) outputString = outputString.toLowerCase();else if (settings.forceUpper) outputString = outputString.toUpperCase();

        return outputString;
    }

    function trimNum(inputString, settings) {
        if (typeof inputString != "string") return inputString;

        var inChars = inputString.split("");
        var outChars = [];
        var i = 0;
        var Char;

        for (i = 0; i < inChars.length; i++) {
            Char = inChars[i];
            var validatedStringFragment = outChars.join("");
            if (numeric_allowChar(validatedStringFragment, Char, settings)) outChars.push(Char);
        }

        return outChars.join("");
    }

    function isUpper(Char) {
        var upper = Char.toUpperCase();
        var lower = Char.toLowerCase();

        if (Char == upper && upper != lower) return true;else return false;
    }

    function isLower(Char) {
        var upper = Char.toUpperCase();
        var lower = Char.toLowerCase();

        if (Char == lower && upper != lower) return true;else return false;
    }

    function isCaseless(Char) {
        if (Char.toUpperCase() == Char.toLowerCase()) return true;else return false;
    }

    function getBlacklistSet(allow, disallow) {

        var setOfBadChars = new Set(BLACKLIST + disallow);
        var setOfGoodChars = new Set(allow);

        var blacklistSet = setOfBadChars.subtract(setOfGoodChars);

        return blacklistSet;
    }

    function getDigitsMap() {
        var array = "0123456789".split("");
        var map = {};
        var i = 0;
        var digit;

        for (i = 0; i < array.length; i++) {
            digit = array[i];
            map[digit] = true;
        }

        return map;
    }

    function getLatinCharsSet() {
        var lower = "abcdefghijklmnopqrstuvwxyz";
        var upper = lower.toUpperCase();
        var azAZ = new Set(lower + upper);

        return azAZ;
    }

    function allowThouSep(currentString) {

        // Can't start with a THOU_SEP
        if (currentString.length == 0) return false;

        // Can't have a THOU_SEP anywhere after a DEC_SEP
        var posOfDecSep = currentString.indexOf(DEC_SEP);
        if (posOfDecSep >= 0) return false;

        var posOfFirstThouSep = currentString.indexOf(THOU_SEP);

        // Check if this is the first occurrence of a THOU_SEP
        if (posOfFirstThouSep < 0) return true;

        var posOfLastThouSep = currentString.lastIndexOf(THOU_SEP);
        var charsSinceLastThouSep = currentString.length - posOfLastThouSep - 1;

        // Check if there has been 3 digits since the last THOU_SEP
        if (charsSinceLastThouSep < 3) return false;

        var digitsSinceFirstThouSep = countDigits(currentString.substring(posOfFirstThouSep));

        // Check if there has been a multiple of 3 digits since the first THOU_SEP
        if (digitsSinceFirstThouSep % 3 > 0) return false;

        return true;
    }

    ////////////////////////////////////////////////////////////////////////////////////
    // Implementation of a Set
    ////////////////////////////////////////////////////////////////////////////////////
    function Set(elems) {
        if (typeof elems == "string") this.map = stringToMap(elems);else this.map = {};
    }

    Set.prototype.add = function (set) {

        var newSet = this.clone();

        for (var key in set.map) {
            newSet.map[key] = true;
        }return newSet;
    };

    Set.prototype.subtract = function (set) {

        var newSet = this.clone();

        for (var key in set.map) {
            delete newSet.map[key];
        }return newSet;
    };

    Set.prototype.contains = function (key) {
        if (this.map[key]) return true;else return false;
    };

    Set.prototype.clone = function () {
        var newSet = new Set();

        for (var key in this.map) {
            newSet.map[key] = true;
        }return newSet;
    };
    ////////////////////////////////////////////////////////////////////////////////////

    function stringToMap(string) {
        var map = {};
        var array = string.split("");
        var i = 0;
        var Char;

        for (i = 0; i < array.length; i++) {
            Char = array[i];
            map[Char] = true;
        }

        return map;
    }

    // Backdoor for testing
    $.fn.alphanum.backdoorAlphaNum = function (inputString, settings) {
        var combinedSettings = getCombinedSettingsAlphaNum(settings);

        return trimAlphaNum(inputString, combinedSettings);
    };

    $.fn.alphanum.backdoorNumeric = function (inputString, settings) {
        var combinedSettings = getCombinedSettingsNum(settings);

        return trimNum(inputString, combinedSettings);
    };

    $.fn.alphanum.setNumericSeparators = function (settings) {

        if (settings.thousandsSeparator.length != 1) return;

        if (settings.decimalSeparator.length != 1) return;

        THOU_SEP = settings.thousandsSeparator;
        DEC_SEP = settings.decimalSeparator;
    };
})(jQuery);

/*eslint-disable */
//Include the 3rd party lib: jquery.caret.js


// Set caret position easily in jQuery
// Written by and Copyright of Luke Morton, 2011
// Licensed under MIT
(function ($) {
    // Behind the scenes method deals with browser
    // idiosyncrasies and such
    function caretTo(el, index) {
        if (el.createTextRange) {
            var range = el.createTextRange();
            range.move("character", index);
            range.select();
        } else if (el.selectionStart != null) {
            el.focus();
            el.setSelectionRange(index, index);
        }
    };

    // Another behind the scenes that collects the
    // current caret position for an element

    // TODO: Get working with Opera
    function caretPos(el) {
        if ("selection" in document) {
            var range = el.createTextRange();
            try {
                range.setEndPoint("EndToStart", document.selection.createRange());
            } catch (e) {
                // Catch IE failure here, return 0 like
                // other browsers
                return 0;
            }
            return range.text.length;
        } else if (el.selectionStart != null) {
            return el.selectionStart;
        }
    };

    // The following methods are queued under fx for more
    // flexibility when combining with $.fn.delay() and
    // jQuery effects.

    // Set caret to a particular index
    $.fn.alphanum_caret = function (index, offset) {
        if (typeof index === "undefined") {
            return caretPos(this.get(0));
        }

        return this.queue(function (next) {
            if (isNaN(index)) {
                var i = $(this).val().indexOf(index);

                if (offset === true) {
                    i += index.length;
                } else if (typeof offset !== "undefined") {
                    i += offset;
                }

                caretTo(this, i);
            } else {
                caretTo(this, index);
            }

            next();
        });
    };
})(jQuery);

/**********************************************************
* Selection Library
* Used to determine what text is highlighted in the textbox before a key is pressed.
* http://donejs.com/docs.html#!jQuery.fn.selection
* https://github.com/jupiterjs/jquerymx/blob/master/dom/selection/selection.js
***********************************************************/
(function (e) {
    var t = function t(e) {
        return e.replace(/([a-z])([a-z]+)/gi, function (e, t, n) {
            return t + n.toLowerCase();
        }).replace(/_/g, "");
    },
        n = function n(e) {
        return e.replace(/^([a-z]+)_TO_([a-z]+)/i, function (e, t, n) {
            return n + "_TO_" + t;
        });
    },
        r = function r(e) {
        return e ? e.ownerDocument.defaultView || e.ownerDocument.parentWindow : window;
    },
        i = function i(t, n) {
        var r = e.Range.current(t).clone(),
            i = e.Range(t).select(t);if (!r.overlaps(i)) {
            return null;
        }if (r.compare("START_TO_START", i) < 1) {
            startPos = 0;r.move("START_TO_START", i);
        } else {
            fromElementToCurrent = i.clone();fromElementToCurrent.move("END_TO_START", r);startPos = fromElementToCurrent.toString().length;
        }if (r.compare("END_TO_END", i) >= 0) {
            endPos = i.toString().length;
        } else {
            endPos = startPos + r.toString().length;
        }return { start: startPos, end: endPos };
    },
        s = function s(t) {
        var n = r(t);if (t.selectionStart !== undefined) {
            if (document.activeElement && document.activeElement != t && t.selectionStart == t.selectionEnd && t.selectionStart == 0) {
                return { start: t.value.length, end: t.value.length };
            }return { start: t.selectionStart, end: t.selectionEnd };
        } else if (n.getSelection) {
            return i(t, n);
        } else {
            try {
                if (t.nodeName.toLowerCase() == "input") {
                    var s = r(t).document.selection.createRange(),
                        o = t.createTextRange();o.setEndPoint("EndToStart", s);var u = o.text.length;return { start: u, end: u + s.text.length };
                } else {
                    var a = i(t, n);if (!a) {
                        return a;
                    }var f = e.Range.current().clone(),
                        l = f.clone().collapse().range,
                        c = f.clone().collapse(false).range;l.moveStart("character", -1);c.moveStart("character", -1);if (a.startPos != 0 && l.text == "") {
                        a.startPos += 2;
                    }if (a.endPos != 0 && c.text == "") {
                        a.endPos += 2;
                    }return a;
                }
            } catch (h) {
                return { start: t.value.length, end: t.value.length };
            }
        }
    },
        o = function o(e, t, n) {
        var i = r(e);if (e.setSelectionRange) {
            if (n === undefined) {
                e.focus();e.setSelectionRange(t, t);
            } else {
                e.select();e.selectionStart = t;e.selectionEnd = n;
            }
        } else if (e.createTextRange) {
            var s = e.createTextRange();s.moveStart("character", t);n = n || t;s.moveEnd("character", n - e.value.length);s.select();
        } else if (i.getSelection) {
            var o = i.document,
                u = i.getSelection(),
                f = o.createRange(),
                l = [t, n !== undefined ? n : t];a([e], l);f.setStart(l[0].el, l[0].count);f.setEnd(l[1].el, l[1].count);u.removeAllRanges();u.addRange(f);
        } else if (i.document.body.createTextRange) {
            var f = document.body.createTextRange();f.moveToElementText(e);f.collapse();f.moveStart("character", t);f.moveEnd("character", n !== undefined ? n : t);f.select();
        }
    },
        u = function u(e, t, n, r) {
        if (typeof n[0] === "number" && n[0] < t) {
            n[0] = { el: r, count: n[0] - e };
        }if (typeof n[1] === "number" && n[1] <= t) {
            n[1] = { el: r, count: n[1] - e };
        }
    },
        a = function a(e, t, n) {
        var r, i;n = n || 0;for (var s = 0; e[s]; s++) {
            r = e[s];if (r.nodeType === 3 || r.nodeType === 4) {
                i = n;n += r.nodeValue.length;u(i, n, t, r);
            } else if (r.nodeType !== 8) {
                n = a(r.childNodes, t, n);
            }
        }return n;
    };jQuery.fn.selection = function (e, t) {
        if (e !== undefined) {
            return this.each(function () {
                o(this, e, t);
            });
        } else {
            return s(this[0]);
        }
    };e.fn.selection.getCharElement = a;
})(jQuery);
/*eslint-enable */

//! moment.js
//! version : 2.19.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.moment = factory();
})(this, function () {
    'use strict';

    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function some(fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);

            if (m._strict) {
                isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            } else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        } else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (_typeof(arguments[i]) === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function keys(obj) {
            var i,
                res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years'
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({ unit: u, priority: priorities[u] });
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function func() {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1 = /\d/; //       0 - 9
    var match2 = /\d\d/; //      00 - 99
    var match3 = /\d{3}/; //     000 - 999
    var match4 = /\d{4}/; //    0000 - 9999
    var match6 = /[+-]?\d{6}/; // -999999 - 999999
    var match1to2 = /\d\d?/; //       0 - 99
    var match3to4 = /\d\d\d\d?/; //     999 - 9999
    var match5to6 = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3 = /\d{1,3}/; //       0 - 999
    var match1to4 = /\d{1,4}/; //       0 - 9999
    var match1to6 = /[+-]?\d{1,6}/; // -999999 - 999999

    var matchUnsigned = /\d+/; //       0 - inf
    var matchSigned = /[+-]?\d+/; //    -inf - inf

    var matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

    var regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return isStrict && strictRegex ? strictRegex : regex;
        };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i,
            func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function func(input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year())) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            } else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }

    function stringSet(units, value) {
        if ((typeof units === "undefined" ? "undefined" : _typeof(units)) === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return (n % x + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function indexOf(o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months) ? this._months : this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date = new Date(y, m, d, h, M, s, ms);

        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,

        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6 // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays(m, format) {
        if (!m) {
            return isArray(this._weekdays) ? this._weekdays : this._weekdays['standalone'];
        }
        return isArray(this._weekdays) ? this._weekdays[m.day()] : this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort(m) {
        return m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin(m) {
        return m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }

    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // months
    // week
    // weekdays
    // meridiem
    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && typeof module !== 'undefined' && module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            } else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    if (!localeFamilies[config.parentLocale]) {
                        localeFamilies[config.parentLocale] = [];
                    }
                    localeFamilies[config.parentLocale].push({
                        name: name,
                        config: config
                    });
                    return null;
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale,
                parentConfig = baseConfig;
            // MERGE
            if (locales[name] != null) {
                parentConfig = locales[name]._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow(m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== config._d.getDay()) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/]];

    // iso time formats and regexes
    var isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100,
                h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged and will be removed in an upcoming major release. Please refer to ' + 'http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    });

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                } else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || format === undefined && input === '') {
            return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    });

    var prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    });

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function now() {
        return Date.now ? Date.now() : +new Date();
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds + seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk = matches[matches.length - 1] || [];
        var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            } else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,

        // matching against regexp is expensive, do it on demand
        match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : match[1] === '+' ? 1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign)
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if ((typeof duration === "undefined" ? "undefined" : _typeof(duration)) === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = { milliseconds: 0, months: 0 };

        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val;val = period;period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1(time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) && (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that, zoneDelta, delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year':
                output = monthDiff(this, that) / 12;break;
            case 'month':
                output = monthDiff(this, that);break;
            case 'quarter':
                output = monthDiff(this, that) / 3;break;
            case 'second':
                output = (this - that) / 1e3;break; // 1000
            case 'minute':
                output = (this - that) / 6e4;break; // 1000 * 60
            case 'hour':
                output = (this - that) / 36e5;break; // 1000 * 60 * 60
            case 'day':
                output = (this - that - zoneDelta) / 864e5;break; // 1000 * 60 * 60 * 24, negate dst
            case 'week':
                output = (this - that - zoneDelta) / 6048e5;break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),

        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString() {
        if (!this.isValid()) {
            return null;
        }
        var m = this.clone().utc();
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            return this.toDate().toISOString();
        }
        return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    });

    function localeData() {
        return this._locale;
    }

    function startOf(units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
            case 'year':
                this.month(0);
            /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
            /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
            case 'date':
                this.hours(0);
            /* falls through */
            case 'hour':
                this.minutes(0);
            /* falls through */
            case 'minute':
                this.seconds(0);
            /* falls through */
            case 'second':
                this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf(units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, units === 'isoWeek' ? 'week' : units).subtract(1, 'ms');
    }

    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIOROITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;

    // Year
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;

    // Week Year
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    proto.quarter = proto.quarters = getSetQuarter;

    // Month
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;

    // Week
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;

    // Hour
    proto.hour = proto.hours = getSetHour;

    // Minute
    proto.minute = proto.minutes = getSetMinute;

    // Second
    proto.second = proto.seconds = getSetSecond;

    // Millisecond
    proto.millisecond = proto.milliseconds = getSetMillisecond;

    // Offset
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;

    // Timezone
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;

    // Deprecations
    proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;

    // Month
    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;

    // Week
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    // Hours
    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function ordinal(number) {
            var b = number % 10,
                output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds;
        var days = this._days;
        var months = this._months;
        var data = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds = makeAs('s');
    var asMinutes = makeAs('m');
    var asHours = makeAs('h');
    var asDays = makeAs('d');
    var asWeeks = makeAs('w');
    var asMonths = makeAs('M');
    var asYears = makeAs('y');

    function clone$1() {
        return createDuration(this);
    }

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds = makeGetter('seconds');
    var minutes = makeGetter('minutes');
    var hours = makeGetter('hours');
    var days = makeGetter('days');
    var months = makeGetter('months');
    var years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44, // a few seconds to seconds
        s: 45, // seconds to minute
        m: 45, // minutes to hour
        h: 22, // hours to day
        d: 26, // days to month
        M: 11 // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds = round(duration.as('s'));
        var minutes = round(duration.as('m'));
        var hours = round(duration.as('h'));
        var days = round(duration.as('d'));
        var months = round(duration.as('M'));
        var years = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days] || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return (x > 0) - (x < 0) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days = abs$1(this._days);
        var months = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' + (Y ? ymSign + Y + 'Y' : '') + (M ? ymSign + M + 'M' : '') + (D ? daysSign + D + 'D' : '') + (h || m || s ? 'T' : '') + (h ? hmsSign + h + 'H' : '') + (m ? hmsSign + m + 'M' : '') + (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    // Deprecations
    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.19.1';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    return hooks;
});
//! moment.js locale configuration
//! locale : Japanese [ja]
//! author : LI Long : https://github.com/baryon

;(function (global, factory) {
    (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' && typeof require === 'function' ? factory(require('../moment')) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var ja = moment.defineLocale('ja', {
        months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
        weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
        weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY/MM/DD',
            LL: 'YYYY年M月D日',
            LLL: 'YYYY年M月D日 HH:mm',
            LLLL: 'YYYY年M月D日 HH:mm dddd',
            l: 'YYYY/MM/DD',
            ll: 'YYYY年M月D日',
            lll: 'YYYY年M月D日 HH:mm',
            llll: 'YYYY年M月D日 HH:mm dddd'
        },
        meridiemParse: /午前|午後/i,
        isPM: function isPM(input) {
            return input === '午後';
        },
        meridiem: function meridiem(hour, minute, isLower) {
            if (hour < 12) {
                return '午前';
            } else {
                return '午後';
            }
        },
        calendar: {
            sameDay: '[今日] LT',
            nextDay: '[明日] LT',
            nextWeek: '[来週]dddd LT',
            lastDay: '[昨日] LT',
            lastWeek: '[前週]dddd LT',
            sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}日/,
        ordinal: function ordinal(number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s後',
            past: '%s前',
            s: '数秒',
            m: '1分',
            mm: '%d分',
            h: '1時間',
            hh: '%d時間',
            d: '1日',
            dd: '%d日',
            M: '1ヶ月',
            MM: '%dヶ月',
            y: '1年',
            yy: '%d年'
        }
    });

    return ja;
});

/** Trumbowyg v2.10.0 - A lightweight WYSIWYG editor - alex-d.github.io/Trumbowyg - License MIT - Author : Alexandre Demode (Alex-D) / alex-d.fr */
jQuery.trumbowyg = { langs: { en: { viewHTML: "View HTML", undo: "Undo", redo: "Redo", formatting: "Formatting", p: "Paragraph", blockquote: "Quote", code: "Code", header: "Header", bold: "Bold", italic: "Italic", strikethrough: "Stroke", underline: "Underline", strong: "Strong", em: "Emphasis", del: "Deleted", superscript: "Superscript", subscript: "Subscript", unorderedList: "Unordered list", orderedList: "Ordered list", insertImage: "Insert Image", link: "Link", createLink: "Insert link", unlink: "Remove link", justifyLeft: "Align Left", justifyCenter: "Align Center", justifyRight: "Align Right", justifyFull: "Align Justify", horizontalRule: "Insert horizontal rule", removeformat: "Remove format", fullscreen: "Fullscreen", close: "Close", submit: "Confirm", reset: "Cancel", required: "Required", description: "Description", title: "Title", text: "Text", target: "Target", width: "Width" } }, plugins: {}, svgPath: null, hideButtonTexts: null }, Object.defineProperty(jQuery.trumbowyg, "defaultOptions", { value: { lang: "en", fixedBtnPane: !1, fixedFullWidth: !1, autogrow: !1, autogrowOnEnter: !1, imageWidthModalEdit: !1, prefix: "trumbowyg-", semantic: !0, resetCss: !1, removeformatPasted: !1, tagsToRemove: [], btns: [["viewHTML"], ["undo", "redo"], ["formatting"], ["strong", "em", "del"], ["superscript", "subscript"], ["link"], ["insertImage"], ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"], ["unorderedList", "orderedList"], ["horizontalRule"], ["removeformat"], ["fullscreen"]], btnsDef: {}, inlineElementsSelector: "a,abbr,acronym,b,caption,cite,code,col,dfn,dir,dt,dd,em,font,hr,i,kbd,li,q,span,strikeout,strong,sub,sup,u", pasteHandlers: [], plugins: {}, urlProtocol: !1, minimalLinks: !1 }, writable: !1, enumerable: !0, configurable: !1 }), function (e, t, n, a) {
    "use strict";
    var o = "tbwconfirm",
        r = "tbwcancel";a.fn.trumbowyg = function (e, t) {
        var n = "trumbowyg";if (e === Object(e) || !e) return this.each(function () {
            a(this).data(n) || a(this).data(n, new i(this, e));
        });if (1 === this.length) try {
            var o = a(this).data(n);switch (e) {case "execCmd":
                    return o.execCmd(t.cmd, t.param, t.forceCss);case "openModal":
                    return o.openModal(t.title, t.content);case "closeModal":
                    return o.closeModal();case "openModalInsert":
                    return o.openModalInsert(t.title, t.fields, t.callback);case "saveRange":
                    return o.saveRange();case "getRange":
                    return o.range;case "getRangeText":
                    return o.getRangeText();case "restoreRange":
                    return o.restoreRange();case "enable":
                    return o.setDisabled(!1);case "disable":
                    return o.setDisabled(!0);case "toggle":
                    return o.toggle();case "destroy":
                    return o.destroy();case "empty":
                    return o.empty();case "html":
                    return o.html(t);}
        } catch (r) {}return !1;
    };var i = function i(o, r) {
        var i = this,
            s = "trumbowyg-icons",
            l = a.trumbowyg;i.doc = o.ownerDocument || n, i.$ta = a(o), i.$c = a(o), r = r || {}, null != r.lang || null != l.langs[r.lang] ? i.lang = a.extend(!0, {}, l.langs.en, l.langs[r.lang]) : i.lang = l.langs.en, i.hideButtonTexts = null != l.hideButtonTexts ? l.hideButtonTexts : r.hideButtonTexts;var d = null != l.svgPath ? l.svgPath : r.svgPath;if (i.hasSvg = d !== !1, i.svgPath = i.doc.querySelector("base") ? t.location.href.split("#")[0] : "", 0 === a("#" + s, i.doc).length && d !== !1) {
            if (null == d) {
                for (var c = n.getElementsByTagName("script"), u = 0; u < c.length; u += 1) {
                    var g = c[u].src,
                        f = g.match("trumbowyg(.min)?.js");null != f && (d = g.substring(0, g.indexOf(f[0])) + "ui/icons.svg");
                }null == d && console.warn("You must define svgPath: https://goo.gl/CfTY9U");
            }var h = i.doc.createElement("div");h.id = s, i.doc.body.insertBefore(h, i.doc.body.childNodes[0]), a.ajax({ async: !0, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", dataType: "xml", crossDomain: !0, url: d, data: null, beforeSend: null, complete: null, success: function success(e) {
                    h.innerHTML = new XMLSerializer().serializeToString(e.documentElement);
                } });
        }var p = i.lang.header,
            m = function m() {
            return (t.chrome || t.Intl && Intl.v8BreakIterator) && "CSS" in t;
        };i.btnsDef = { viewHTML: { fn: "toggle" }, undo: { isSupported: m, key: "Z" }, redo: { isSupported: m, key: "Y" }, p: { fn: "formatBlock" }, blockquote: { fn: "formatBlock" }, h1: { fn: "formatBlock", title: p + " 1" }, h2: { fn: "formatBlock", title: p + " 2" }, h3: { fn: "formatBlock", title: p + " 3" }, h4: { fn: "formatBlock", title: p + " 4" }, subscript: { tag: "sub" }, superscript: { tag: "sup" }, bold: { key: "B", tag: "b" }, italic: { key: "I", tag: "i" }, underline: { tag: "u" }, strikethrough: { tag: "strike" }, strong: { fn: "bold", key: "B" }, em: { fn: "italic", key: "I" }, del: { fn: "strikethrough" }, createLink: { key: "K", tag: "a" }, unlink: {}, insertImage: {}, justifyLeft: { tag: "left", forceCss: !0 }, justifyCenter: { tag: "center", forceCss: !0 }, justifyRight: { tag: "right", forceCss: !0 }, justifyFull: { tag: "justify", forceCss: !0 }, unorderedList: { fn: "insertUnorderedList", tag: "ul" }, orderedList: { fn: "insertOrderedList", tag: "ol" }, horizontalRule: { fn: "insertHorizontalRule" }, removeformat: {}, fullscreen: { "class": "trumbowyg-not-disable" }, close: { fn: "destroy", "class": "trumbowyg-not-disable" }, formatting: { dropdown: ["p", "blockquote", "h1", "h2", "h3", "h4"], ico: "p" }, link: { dropdown: ["createLink", "unlink"] } }, i.o = a.extend(!0, {}, l.defaultOptions, r), i.o.hasOwnProperty("imgDblClickHandler") || (i.o.imgDblClickHandler = i.getDefaultImgDblClickHandler()), i.urlPrefix = i.setupUrlPrefix(), i.disabled = i.o.disabled || "TEXTAREA" === o.nodeName && o.disabled, r.btns ? i.o.btns = r.btns : i.o.semantic || (i.o.btns[3] = ["bold", "italic", "underline", "strikethrough"]), a.each(i.o.btnsDef, function (e, t) {
            i.addBtnDef(e, t);
        }), i.eventNamespace = "trumbowyg-event", i.keys = [], i.tagToButton = {}, i.tagHandlers = [], i.pasteHandlers = [].concat(i.o.pasteHandlers), i.isIE = e.userAgent.indexOf("MSIE") !== -1 || e.appVersion.indexOf("Trident/") !== -1, i.init();
    };i.prototype = { DEFAULT_SEMANTIC_MAP: { b: "strong", i: "em", s: "del", strike: "del", div: "p" }, init: function init() {
            var e = this;e.height = e.$ta.height(), e.initPlugins();try {
                e.doc.execCommand("enableObjectResizing", !1, !1), e.doc.execCommand("defaultParagraphSeparator", !1, "p");
            } catch (t) {}e.buildEditor(), e.buildBtnPane(), e.fixedBtnPaneEvents(), e.buildOverlay(), setTimeout(function () {
                e.disabled && e.setDisabled(!0), e.$c.trigger("tbwinit");
            });
        }, addBtnDef: function addBtnDef(e, t) {
            this.btnsDef[e] = t;
        }, setupUrlPrefix: function setupUrlPrefix() {
            var e = this.o.urlProtocol;if (e) return "string" != typeof e ? "https://" : /:\/\/$/.test(e) ? e : e + "://";
        }, buildEditor: function buildEditor() {
            var e = this,
                n = e.o.prefix,
                o = "";e.$box = a("<div/>", { "class": n + "box " + n + "editor-visible " + n + e.o.lang + " trumbowyg" }), e.isTextarea = e.$ta.is("textarea"), e.isTextarea ? (o = e.$ta.val(), e.$ed = a("<div/>"), e.$box.insertAfter(e.$ta).append(e.$ed, e.$ta)) : (e.$ed = e.$ta, o = e.$ed.html(), e.$ta = a("<textarea/>", { name: e.$ta.attr("id"), height: e.height }).val(o), e.$box.insertAfter(e.$ed).append(e.$ta, e.$ed), e.syncCode()), e.$ta.addClass(n + "textarea").attr("tabindex", -1), e.$ed.addClass(n + "editor").attr({ contenteditable: !0, dir: e.lang._dir || "ltr" }).html(o), e.o.tabindex && e.$ed.attr("tabindex", e.o.tabindex), e.$c.is("[placeholder]") && e.$ed.attr("placeholder", e.$c.attr("placeholder")), e.$c.is("[spellcheck]") && e.$ed.attr("spellcheck", e.$c.attr("spellcheck")), e.o.resetCss && e.$ed.addClass(n + "reset-css"), e.o.autogrow || e.$ta.add(e.$ed).css({ height: e.height }), e.semanticCode(), e.o.autogrowOnEnter && e.$ed.addClass(n + "autogrow-on-enter");var r,
                i = !1,
                s = !1,
                l = "keyup";e.$ed.on("dblclick", "img", e.o.imgDblClickHandler).on("keydown", function (t) {
                if ((t.ctrlKey || t.metaKey) && !t.altKey) {
                    i = !0;var n = e.keys[String.fromCharCode(t.which).toUpperCase()];try {
                        return e.execCmd(n.fn, n.param), !1;
                    } catch (a) {}
                }
            }).on("compositionstart compositionupdate", function () {
                s = !0;
            }).on(l + " compositionend", function (t) {
                if ("compositionend" === t.type) s = !1;else if (s) return;var n = t.which;if (!(n >= 37 && n <= 40)) {
                    if (!t.ctrlKey && !t.metaKey || 89 !== n && 90 !== n) {
                        if (i || 17 === n) "undefined" == typeof t.which && e.semanticCode(!1, !1, !0);else {
                            var a = !e.isIE || "compositionend" === t.type;e.semanticCode(!1, a && 13 === n), e.$c.trigger("tbwchange");
                        }
                    } else e.$c.trigger("tbwchange");setTimeout(function () {
                        i = !1;
                    }, 50);
                }
            }).on("mouseup keydown keyup", function (t) {
                (!t.ctrlKey && !t.metaKey || t.altKey) && setTimeout(function () {
                    i = !1;
                }, 50), clearTimeout(r), r = setTimeout(function () {
                    e.updateButtonPaneStatus();
                }, 50);
            }).on("focus blur", function (t) {
                if (e.$c.trigger("tbw" + t.type), "blur" === t.type && a("." + n + "active-button", e.$btnPane).removeClass(n + "active-button " + n + "active"), e.o.autogrowOnEnter) {
                    if (e.autogrowOnEnterDontClose) return;"focus" === t.type ? (e.autogrowOnEnterWasFocused = !0, e.autogrowEditorOnEnter()) : e.o.autogrow || (e.$ed.css({ height: e.$ed.css("min-height") }), e.$c.trigger("tbwresize"));
                }
            }).on("cut", function () {
                setTimeout(function () {
                    e.semanticCode(!1, !0), e.$c.trigger("tbwchange");
                }, 0);
            }).on("paste", function (n) {
                if (e.o.removeformatPasted) {
                    n.preventDefault(), t.getSelection && t.getSelection().deleteFromDocument && t.getSelection().deleteFromDocument();try {
                        var o = t.clipboardData.getData("Text");try {
                            e.doc.selection.createRange().pasteHTML(o);
                        } catch (r) {
                            e.doc.getSelection().getRangeAt(0).insertNode(e.doc.createTextNode(o));
                        }e.$c.trigger("tbwchange", n);
                    } catch (i) {
                        e.execCmd("insertText", (n.originalEvent || n).clipboardData.getData("text/plain"));
                    }
                }a.each(e.pasteHandlers, function (e, t) {
                    t(n);
                }), setTimeout(function () {
                    e.semanticCode(!1, !0), e.$c.trigger("tbwpaste", n);
                }, 0);
            }), e.$ta.on("keyup", function () {
                e.$c.trigger("tbwchange");
            }).on("paste", function () {
                setTimeout(function () {
                    e.$c.trigger("tbwchange");
                }, 0);
            }), e.$box.on("keydown", function (t) {
                if (27 === t.which && 1 === a("." + n + "modal-box", e.$box).length) return e.closeModal(), !1;
            });
        }, autogrowEditorOnEnter: function autogrowEditorOnEnter() {
            var e = this;e.$ed.removeClass("autogrow-on-enter");var t = e.$ed[0].clientHeight;e.$ed.height("auto");var n = e.$ed[0].scrollHeight;e.$ed.addClass("autogrow-on-enter"), t !== n && (e.$ed.height(t), setTimeout(function () {
                e.$ed.css({ height: n }), e.$c.trigger("tbwresize");
            }, 0));
        }, buildBtnPane: function buildBtnPane() {
            var e = this,
                t = e.o.prefix,
                n = e.$btnPane = a("<div/>", { "class": t + "button-pane" });a.each(e.o.btns, function (o, r) {
                a.isArray(r) || (r = [r]);var i = a("<div/>", { "class": t + "button-group " + (r.indexOf("fullscreen") >= 0 ? t + "right" : "") });a.each(r, function (t, n) {
                    try {
                        e.isSupportedBtn(n) && i.append(e.buildBtn(n));
                    } catch (a) {}
                }), i.html().trim().length > 0 && n.append(i);
            }), e.$box.prepend(n);
        }, buildBtn: function buildBtn(e) {
            var t = this,
                n = t.o.prefix,
                o = t.btnsDef[e],
                r = o.dropdown,
                i = null == o.hasIcon || o.hasIcon,
                s = t.lang[e] || e,
                l = a("<button/>", { type: "button", "class": n + e + "-button " + (o["class"] || "") + (i ? "" : " " + n + "textual-button"), html: t.hasSvg && i ? '<svg><use xlink:href="' + t.svgPath + "#" + n + (o.ico || e).replace(/([A-Z]+)/g, "-$1").toLowerCase() + '"/></svg>' : t.hideButtonTexts ? "" : o.text || o.title || t.lang[e] || e, title: (o.title || o.text || s) + (o.key ? " (Ctrl + " + o.key + ")" : ""), tabindex: -1, mousedown: function mousedown() {
                    return r && !a("." + e + "-" + n + "dropdown", t.$box).is(":hidden") || a("body", t.doc).trigger("mousedown"), !((t.$btnPane.hasClass(n + "disable") || t.$box.hasClass(n + "disabled")) && !a(this).hasClass(n + "active") && !a(this).hasClass(n + "not-disable")) && (t.execCmd(!!r && "dropdown" || o.fn || e, o.param || e, o.forceCss), !1);
                } });if (r) {
                l.addClass(n + "open-dropdown");var d = n + "dropdown",
                    c = { "class": d + "-" + e + " " + d + " " + n + "fixed-top" };c["data-" + d] = e;var u = a("<div/>", c);a.each(r, function (e, n) {
                    t.btnsDef[n] && t.isSupportedBtn(n) && u.append(t.buildSubBtn(n));
                }), t.$box.append(u.hide());
            } else o.key && (t.keys[o.key] = { fn: o.fn || e, param: o.param || e });return r || (t.tagToButton[(o.tag || e).toLowerCase()] = e), l;
        }, buildSubBtn: function buildSubBtn(e) {
            var t = this,
                n = t.o.prefix,
                o = t.btnsDef[e],
                r = null == o.hasIcon || o.hasIcon;return o.key && (t.keys[o.key] = { fn: o.fn || e, param: o.param || e }), t.tagToButton[(o.tag || e).toLowerCase()] = e, a("<button/>", { type: "button", "class": n + e + "-dropdown-button" + (o.ico ? " " + n + o.ico + "-button" : ""), html: t.hasSvg && r ? '<svg><use xlink:href="' + t.svgPath + "#" + n + (o.ico || e).replace(/([A-Z]+)/g, "-$1").toLowerCase() + '"/></svg>' + (o.text || o.title || t.lang[e] || e) : o.text || o.title || t.lang[e] || e, title: o.key ? " (Ctrl + " + o.key + ")" : null, style: o.style || null, mousedown: function mousedown() {
                    return a("body", t.doc).trigger("mousedown"), t.execCmd(o.fn || e, o.param || e, o.forceCss), !1;
                } });
        }, isSupportedBtn: function isSupportedBtn(e) {
            try {
                return this.btnsDef[e].isSupported();
            } catch (t) {}return !0;
        }, buildOverlay: function buildOverlay() {
            var e = this;return e.$overlay = a("<div/>", { "class": e.o.prefix + "overlay" }).appendTo(e.$box), e.$overlay;
        }, showOverlay: function showOverlay() {
            var e = this;a(t).trigger("scroll"), e.$overlay.fadeIn(200), e.$box.addClass(e.o.prefix + "box-blur");
        }, hideOverlay: function hideOverlay() {
            var e = this;e.$overlay.fadeOut(50), e.$box.removeClass(e.o.prefix + "box-blur");
        }, fixedBtnPaneEvents: function fixedBtnPaneEvents() {
            var e = this,
                n = e.o.fixedFullWidth,
                o = e.$box;e.o.fixedBtnPane && (e.isFixed = !1, a(t).on("scroll." + e.eventNamespace + " resize." + e.eventNamespace, function () {
                if (o) {
                    e.syncCode();var r = a(t).scrollTop(),
                        i = o.offset().top + 1,
                        s = e.$btnPane,
                        l = s.outerHeight() - 2;r - i > 0 && r - i - e.height < 0 ? (e.isFixed || (e.isFixed = !0, s.css({ position: "fixed", top: 0, left: n ? "0" : "auto", zIndex: 7 }), a([e.$ta, e.$ed]).css({ marginTop: s.height() })), s.css({ width: n ? "100%" : o.width() - 1 + "px" }), a("." + e.o.prefix + "fixed-top", o).css({ position: n ? "fixed" : "absolute", top: n ? l : l + (r - i) + "px", zIndex: 15 })) : e.isFixed && (e.isFixed = !1, s.removeAttr("style"), a([e.$ta, e.$ed]).css({ marginTop: 0 }), a("." + e.o.prefix + "fixed-top", o).css({ position: "absolute", top: l }));
                }
            }));
        }, setDisabled: function setDisabled(e) {
            var t = this,
                n = t.o.prefix;t.disabled = e, e ? t.$ta.attr("disabled", !0) : t.$ta.removeAttr("disabled"), t.$box.toggleClass(n + "disabled", e), t.$ed.attr("contenteditable", !e);
        }, destroy: function destroy() {
            var e = this,
                n = e.o.prefix;e.isTextarea ? e.$box.after(e.$ta.css({ height: "" }).val(e.html()).removeClass(n + "textarea").show()) : e.$box.after(e.$ed.css({ height: "" }).removeClass(n + "editor").removeAttr("contenteditable").removeAttr("dir").html(e.html()).show()), e.$ed.off("dblclick", "img"), e.destroyPlugins(), e.$box.remove(), e.$c.removeData("trumbowyg"), a("body").removeClass(n + "body-fullscreen"), e.$c.trigger("tbwclose"), a(t).off("scroll." + e.eventNamespace + " resize." + e.eventNamespace);
        }, empty: function empty() {
            this.$ta.val(""), this.syncCode(!0);
        }, toggle: function toggle() {
            var e = this,
                t = e.o.prefix;e.o.autogrowOnEnter && (e.autogrowOnEnterDontClose = !e.$box.hasClass(t + "editor-hidden")), e.semanticCode(!1, !0), setTimeout(function () {
                e.doc.activeElement.blur(), e.$box.toggleClass(t + "editor-hidden " + t + "editor-visible"), e.$btnPane.toggleClass(t + "disable"), a("." + t + "viewHTML-button", e.$btnPane).toggleClass(t + "active"), e.$box.hasClass(t + "editor-visible") ? e.$ta.attr("tabindex", -1) : e.$ta.removeAttr("tabindex"), e.o.autogrowOnEnter && !e.autogrowOnEnterDontClose && e.autogrowEditorOnEnter();
            }, 0);
        }, dropdown: function dropdown(e) {
            var n = this,
                o = n.doc,
                r = n.o.prefix,
                i = a("[data-" + r + "dropdown=" + e + "]", n.$box),
                s = a("." + r + e + "-button", n.$btnPane),
                l = i.is(":hidden");if (a("body", o).trigger("mousedown"), l) {
                var d = s.offset().left;s.addClass(r + "active"), i.css({ position: "absolute", top: s.offset().top - n.$btnPane.offset().top + s.outerHeight(), left: n.o.fixedFullWidth && n.isFixed ? d + "px" : d - n.$btnPane.offset().left + "px" }).show(), a(t).trigger("scroll"), a("body", o).on("mousedown." + n.eventNamespace, function (e) {
                    i.is(e.target) || (a("." + r + "dropdown", n.$box).hide(), a("." + r + "active", n.$btnPane).removeClass(r + "active"), a("body", o).off("mousedown." + n.eventNamespace));
                });
            }
        }, html: function html(e) {
            var t = this;return null != e ? (t.$ta.val(e), t.syncCode(!0), t.$c.trigger("tbwchange"), t) : t.$ta.val();
        }, syncTextarea: function syncTextarea() {
            var e = this;e.$ta.val(e.$ed.text().trim().length > 0 || e.$ed.find("hr,img,embed,iframe,input").length > 0 ? e.$ed.html() : "");
        }, syncCode: function syncCode(e) {
            var t = this;if (!e && t.$ed.is(":visible")) t.syncTextarea();else {
                var n = a("<div>").html(t.$ta.val()),
                    o = a("<div>").append(n);a(t.o.tagsToRemove.join(","), o).remove(), t.$ed.html(o.contents().html());
            }if (t.o.autogrow && (t.height = t.$ed.height(), t.height !== t.$ta.css("height") && (t.$ta.css({ height: t.height }), t.$c.trigger("tbwresize"))), t.o.autogrowOnEnter) {
                t.$ed.height("auto");var r = t.autogrowOnEnterWasFocused ? t.$ed[0].scrollHeight : t.$ed.css("min-height");r !== t.$ta.css("height") && (t.$ed.css({ height: r }), t.$c.trigger("tbwresize"));
            }
        }, semanticCode: function semanticCode(e, t, n) {
            var o = this;if (o.saveRange(), o.syncCode(e), o.o.semantic) {
                if (o.semanticTag("b"), o.semanticTag("i"), o.semanticTag("s"), o.semanticTag("strike"), t) {
                    var r = o.o.inlineElementsSelector,
                        i = ":not(" + r + ")";o.$ed.contents().filter(function () {
                        return 3 === this.nodeType && this.nodeValue.trim().length > 0;
                    }).wrap("<span data-tbw/>");var s = function s(e) {
                        if (0 !== e.length) {
                            var t = e.nextUntil(i).addBack().wrapAll("<p/>").parent(),
                                n = t.nextAll(r).first();t.next("br").remove(), s(n);
                        }
                    };s(o.$ed.children(r).first()), o.semanticTag("div", !0), o.$ed.find("p").filter(function () {
                        return (!o.range || this !== o.range.startContainer) && 0 === a(this).text().trim().length && 0 === a(this).children().not("br,span").length;
                    }).contents().unwrap(), a("[data-tbw]", o.$ed).contents().unwrap(), o.$ed.find("p:empty").remove();
                }n || o.restoreRange(), o.syncTextarea();
            }
        }, semanticTag: function semanticTag(e, t) {
            var n;if (null != this.o.semantic && "object" == _typeof(this.o.semantic) && this.o.semantic.hasOwnProperty(e)) n = this.o.semantic[e];else {
                if (this.o.semantic !== !0 || !this.DEFAULT_SEMANTIC_MAP.hasOwnProperty(e)) return;n = this.DEFAULT_SEMANTIC_MAP[e];
            }a(e, this.$ed).each(function () {
                var e = a(this);e.wrap("<" + n + "/>"), t && a.each(e.prop("attributes"), function () {
                    e.parent().attr(this.name, this.value);
                }), e.contents().unwrap();
            });
        }, createLink: function createLink() {
            for (var e, t, n, o = this, r = o.doc.getSelection(), i = r.focusNode, s = new XMLSerializer().serializeToString(r.getRangeAt(0).cloneContents()); ["A", "DIV"].indexOf(i.nodeName) < 0;) {
                i = i.parentNode;
            }if (i && "A" === i.nodeName) {
                var l = a(i);s = l.text(), e = l.attr("href"), o.o.minimalLinks || (t = l.attr("title"), n = l.attr("target"));var d = o.doc.createRange();d.selectNode(i), r.removeAllRanges(), r.addRange(d);
            }o.saveRange();var c = { url: { label: "URL", required: !0, value: e }, text: { label: o.lang.text, value: s } };o.o.minimalLinks || Object.assign(c, { title: { label: o.lang.title, value: t }, target: { label: o.lang.target, value: n } }), o.openModalInsert(o.lang.createLink, c, function (e) {
                var t = o.prependUrlPrefix(e.url);if (!t.length) return !1;var n = a(['<a href="', e.url, '">', e.text || e.url, "</a>"].join(""));return o.o.minimalLinks || (e.title.length > 0 && n.attr("title", e.title), e.target.length > 0 && n.attr("target", e.target)), o.range.deleteContents(), o.range.insertNode(n[0]), o.syncCode(), o.$c.trigger("tbwchange"), !0;
            });
        }, prependUrlPrefix: function prependUrlPrefix(e) {
            var t = this;if (!t.urlPrefix) return e;var n = /^([a-z][-+.a-z0-9]*:|\/|#)/i;if (n.test(e)) return e;var a = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;return a.test(e) ? "mailto:" + e : t.urlPrefix + e;
        }, unlink: function unlink() {
            var e = this,
                t = e.doc.getSelection(),
                n = t.focusNode;if (t.isCollapsed) {
                for (; ["A", "DIV"].indexOf(n.nodeName) < 0;) {
                    n = n.parentNode;
                }if (n && "A" === n.nodeName) {
                    var a = e.doc.createRange();a.selectNode(n), t.removeAllRanges(), t.addRange(a);
                }
            }e.execCmd("unlink", void 0, void 0, !0);
        }, insertImage: function insertImage() {
            var e = this;e.saveRange();var t = { url: { label: "URL", required: !0 }, alt: { label: e.lang.description, value: e.getRangeText() } };e.o.imageWidthModalEdit && (t.width = {}), e.openModalInsert(e.lang.insertImage, t, function (t) {
                e.execCmd("insertImage", t.url);var n = a('img[src="' + t.url + '"]:not([alt])', e.$box);return n.attr("alt", t.alt), e.o.imageWidthModalEdit && n.attr({ width: t.width }), e.syncCode(), e.$c.trigger("tbwchange"), !0;
            });
        }, fullscreen: function fullscreen() {
            var e,
                n = this,
                o = n.o.prefix,
                r = o + "fullscreen";n.$box.toggleClass(r), e = n.$box.hasClass(r), a("body").toggleClass(o + "body-fullscreen", e), a(t).trigger("scroll"), n.$c.trigger("tbw" + (e ? "open" : "close") + "fullscreen");
        }, execCmd: function execCmd(e, t, n, a) {
            var o = this;a = !!a || "", "dropdown" !== e && o.$ed.focus();try {
                o.doc.execCommand("styleWithCSS", !1, n || !1);
            } catch (r) {}try {
                o[e + a](t);
            } catch (r) {
                try {
                    e(t);
                } catch (i) {
                    "insertHorizontalRule" === e ? t = void 0 : "formatBlock" === e && o.isIE && (t = "<" + t + ">"), o.doc.execCommand(e, !1, t), o.syncCode(), o.semanticCode(!1, !0);
                }"dropdown" !== e && (o.updateButtonPaneStatus(), o.$c.trigger("tbwchange"));
            }
        }, openModal: function openModal(e, n) {
            var i = this,
                s = i.o.prefix;if (a("." + s + "modal-box", i.$box).length > 0) return !1;i.o.autogrowOnEnter && (i.autogrowOnEnterDontClose = !0), i.saveRange(), i.showOverlay(), i.$btnPane.addClass(s + "disable");var l = a("<div/>", { "class": s + "modal " + s + "fixed-top" }).css({ top: i.$btnPane.height() }).appendTo(i.$box);i.$overlay.one("click", function () {
                return l.trigger(r), !1;
            });var d = a("<form/>", { action: "", html: n }).on("submit", function () {
                return l.trigger(o), !1;
            }).on("reset", function () {
                return l.trigger(r), !1;
            }).on("submit reset", function () {
                i.o.autogrowOnEnter && (i.autogrowOnEnterDontClose = !1);
            }),
                c = a("<div/>", { "class": s + "modal-box", html: d }).css({ top: "-" + i.$btnPane.outerHeight() + "px", opacity: 0 }).appendTo(l).animate({ top: 0, opacity: 1 }, 100);return a("<span/>", { text: e, "class": s + "modal-title" }).prependTo(c), l.height(c.outerHeight() + 10), a("input:first", c).focus(), i.buildModalBtn("submit", c), i.buildModalBtn("reset", c), a(t).trigger("scroll"), l;
        }, buildModalBtn: function buildModalBtn(e, t) {
            var n = this,
                o = n.o.prefix;return a("<button/>", { "class": o + "modal-button " + o + "modal-" + e, type: e, text: n.lang[e] || e }).appendTo(a("form", t));
        }, closeModal: function closeModal() {
            var e = this,
                t = e.o.prefix;e.$btnPane.removeClass(t + "disable"), e.$overlay.off();var n = a("." + t + "modal-box", e.$box);n.animate({ top: "-" + n.height() }, 100, function () {
                n.parent().remove(), e.hideOverlay();
            }), e.restoreRange();
        }, openModalInsert: function openModalInsert(e, t, n) {
            var i = this,
                s = i.o.prefix,
                l = i.lang,
                d = "";return a.each(t, function (e, t) {
                var n = t.label || e,
                    a = t.name || e,
                    o = t.attributes || {},
                    r = Object.keys(o).map(function (e) {
                    return e + '="' + o[e] + '"';
                }).join(" ");d += '<label><input type="' + (t.type || "text") + '" name="' + a + '"' + ("checkbox" === t.type && t.value ? ' checked="checked"' : ' value="' + (t.value || "").replace(/"/g, "&quot;")) + '"' + r + '><span class="' + s + 'input-infos"><span>' + (l[n] ? l[n] : n) + "</span></span></label>";
            }), i.openModal(e, d).on(o, function () {
                var e = a("form", a(this)),
                    r = !0,
                    s = {};a.each(t, function (t, n) {
                    var o = n.name || t,
                        l = a('input[name="' + o + '"]', e),
                        d = l.attr("type");switch (d.toLowerCase()) {case "checkbox":
                            s[o] = l.is(":checked");break;case "radio":
                            s[o] = l.filter(":checked").val();break;default:
                            s[o] = a.trim(l.val());}n.required && "" === s[o] ? (r = !1, i.addErrorOnModalField(l, i.lang.required)) : n.pattern && !n.pattern.test(s[o]) && (r = !1, i.addErrorOnModalField(l, n.patternError));
                }), r && (i.restoreRange(), n(s, t) && (i.syncCode(), i.$c.trigger("tbwchange"), i.closeModal(), a(this).off(o)));
            }).one(r, function () {
                a(this).off(o), i.closeModal();
            });
        }, addErrorOnModalField: function addErrorOnModalField(e, t) {
            var n = this.o.prefix,
                o = e.parent();e.on("change keyup", function () {
                o.removeClass(n + "input-error");
            }), o.addClass(n + "input-error").find("input+span").append(a("<span/>", { "class": n + "msg-error", text: t }));
        }, getDefaultImgDblClickHandler: function getDefaultImgDblClickHandler() {
            var e = this;return function () {
                var t = a(this),
                    n = t.attr("src"),
                    o = "(Base64)";0 === n.indexOf("data:image") && (n = o);var r = { url: { label: "URL", value: n, required: !0 }, alt: { label: e.lang.description, value: t.attr("alt") } };return e.o.imageWidthModalEdit && (r.width = { value: t.attr("width") ? t.attr("width") : "" }), e.openModalInsert(e.lang.insertImage, r, function (n) {
                    return n.src !== o && t.attr({ src: n.url }), t.attr({ alt: n.alt }), e.o.imageWidthModalEdit && (parseInt(n.width) > 0 ? t.attr({ width: n.width }) : t.removeAttr("width")), !0;
                }), !1;
            };
        }, saveRange: function saveRange() {
            var e = this,
                t = e.doc.getSelection();if (e.range = null, t.rangeCount) {
                var n,
                    a = e.range = t.getRangeAt(0),
                    o = e.doc.createRange();o.selectNodeContents(e.$ed[0]), o.setEnd(a.startContainer, a.startOffset), n = (o + "").length, e.metaRange = { start: n, end: n + (a + "").length };
            }
        }, restoreRange: function restoreRange() {
            var e,
                t = this,
                n = t.metaRange,
                a = t.range,
                o = t.doc.getSelection();if (a) {
                if (n && n.start !== n.end) {
                    var r,
                        i = 0,
                        s = [t.$ed[0]],
                        l = !1,
                        d = !1;for (e = t.doc.createRange(); !d && (r = s.pop());) {
                        if (3 === r.nodeType) {
                            var c = i + r.length;!l && n.start >= i && n.start <= c && (e.setStart(r, n.start - i), l = !0), l && n.end >= i && n.end <= c && (e.setEnd(r, n.end - i), d = !0), i = c;
                        } else for (var u = r.childNodes, g = u.length; g > 0;) {
                            g -= 1, s.push(u[g]);
                        }
                    }
                }o.removeAllRanges(), o.addRange(e || a);
            }
        }, getRangeText: function getRangeText() {
            return this.range + "";
        }, updateButtonPaneStatus: function updateButtonPaneStatus() {
            var e = this,
                t = e.o.prefix,
                n = e.getTagsRecursive(e.doc.getSelection().focusNode),
                o = t + "active-button " + t + "active";a("." + t + "active-button", e.$btnPane).removeClass(o), a.each(n, function (n, r) {
                var i = e.tagToButton[r.toLowerCase()],
                    s = a("." + t + i + "-button", e.$btnPane);if (s.length > 0) s.addClass(o);else try {
                    s = a("." + t + "dropdown ." + t + i + "-dropdown-button", e.$box);var l = s.parent().data("dropdown");a("." + t + l + "-button", e.$box).addClass(o);
                } catch (d) {}
            });
        }, getTagsRecursive: function getTagsRecursive(e, t) {
            var n = this;if (t = t || (e && e.tagName ? [e.tagName] : []), !e || !e.parentNode) return t;e = e.parentNode;var o = e.tagName;return "DIV" === o ? t : ("P" === o && "" !== e.style.textAlign && t.push(e.style.textAlign), a.each(n.tagHandlers, function (a, o) {
                t = t.concat(o(e, n));
            }), t.push(o), n.getTagsRecursive(e, t).filter(function (e) {
                return null != e;
            }));
        }, initPlugins: function initPlugins() {
            var e = this;e.loadedPlugins = [], a.each(a.trumbowyg.plugins, function (t, n) {
                n.shouldInit && !n.shouldInit(e) || (n.init(e), n.tagHandler && e.tagHandlers.push(n.tagHandler), e.loadedPlugins.push(n));
            });
        }, destroyPlugins: function destroyPlugins() {
            a.each(this.loadedPlugins, function (e, t) {
                t.destroy && t.destroy();
            });
        } };
}(navigator, window, document, jQuery);
!function (o) {
    "use strict";
    function r(o) {
        return ("0" + parseInt(o).toString(16)).slice(-2);
    }function e(o) {
        return o.search("rgb") === -1 ? o.replace("#", "") : "rgba(0, 0, 0, 0)" === o ? "transparent" : (o = o.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/), r(o[1]) + r(o[2]) + r(o[3]));
    }function a(o, r) {
        var a = [];if (!o.style) return a;if ("" !== o.style.backgroundColor) {
            var f = e(o.style.backgroundColor);r.o.plugins.colors.colorList.indexOf(f) >= 0 ? a.push("backColor" + f) : a.push("backColorFree");
        }var c;return "" !== o.style.color ? c = e(o.style.color) : o.hasAttribute("color") && (c = e(o.getAttribute("color"))), c && (r.o.plugins.colors.colorList.indexOf(c) >= 0 ? a.push("foreColor" + c) : a.push("foreColorFree")), a;
    }function f(r, e) {
        var a = [];o.each(e.o.plugins.colors.colorList, function (o, f) {
            var c = r + f,
                l = { fn: r, forceCss: !0, param: "#" + f, style: "background-color: #" + f + ";" };e.addBtnDef(c, l), a.push(c);
        });var f = r + "Remove",
            c = { fn: "removeFormat", param: r, style: "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAG0lEQVQIW2NkQAAfEJMRmwBYhoGBYQtMBYoAADziAp0jtJTgAAAAAElFTkSuQmCC);" };e.addBtnDef(f, c), a.push(f);var l = r + "Free",
            d = { fn: function fn() {
                e.openModalInsert(e.lang[r], { color: { label: r, value: "#FFFFFF" } }, function (o) {
                    return e.execCmd(r, o.color), !0;
                });
            }, text: "#", style: "text-indent: 0;line-height: 20px;padding: 0 5px;" };return e.addBtnDef(l, d), a.push(l), a;
    }o.extend(!0, o.trumbowyg, { langs: { cs: { foreColor: "Barva textu", backColor: "Barva pozadí" }, en: { foreColor: "Text color", backColor: "Background color" }, fr: { foreColor: "Couleur du texte", backColor: "Couleur de fond" }, nl: { foreColor: "Tekstkleur", backColor: "Achtergrondkleur" }, sk: { foreColor: "Farba textu", backColor: "Farba pozadia" }, zh_cn: { foreColor: "文字颜色", backColor: "背景颜色" }, ru: { foreColor: "Цвет текста", backColor: "Цвет выделения текста" }, ja: { foreColor: "文字色", backColor: "背景色" }, tr: { foreColor: "Yazı rengi", backColor: "Arkaplan rengi" } } });var c = { colorList: ["ffffff", "000000", "eeece1", "1f497d", "4f81bd", "c0504d", "9bbb59", "8064a2", "4bacc6", "f79646", "ffff00", "f2f2f2", "7f7f7f", "ddd9c3", "c6d9f0", "dbe5f1", "f2dcdb", "ebf1dd", "e5e0ec", "dbeef3", "fdeada", "fff2ca", "d8d8d8", "595959", "c4bd97", "8db3e2", "b8cce4", "e5b9b7", "d7e3bc", "ccc1d9", "b7dde8", "fbd5b5", "ffe694", "bfbfbf", "3f3f3f", "938953", "548dd4", "95b3d7", "d99694", "c3d69b", "b2a2c7", "b7dde8", "fac08f", "f2c314", "a5a5a5", "262626", "494429", "17365d", "366092", "953734", "76923c", "5f497a", "92cddc", "e36c09", "c09100", "7f7f7f", "0c0c0c", "1d1b10", "0f243e", "244061", "632423", "4f6128", "3f3151", "31859b", "974806", "7f6000"] };o.extend(!0, o.trumbowyg, { plugins: { color: { init: function init(o) {
                    o.o.plugins.colors = o.o.plugins.colors || c;var r = { dropdown: f("foreColor", o) },
                        e = { dropdown: f("backColor", o) };o.addBtnDef("foreColor", r), o.addBtnDef("backColor", e);
                }, tagHandler: a } } });
}(jQuery);
/* ===========================================================
 * ja.js
 * Japanese translation for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Kouta Fukuhara (foo9)
 *          Twitter : @foo9
 *          Website : https://github.com/foo9
 */
jQuery.trumbowyg.langs.ja = { viewHTML: "HTML表示", undo: "元に戻す", redo: "やり直す", formatting: "フォーマット", p: "段落", blockquote: "引用", code: "コード", header: "見出し", bold: "太字", italic: "斜体", strikethrough: "取り消し線", underline: "下線", strong: "太字", em: "斜体", del: "取り消し線", superscript: "上付き文字", subscript: "下付き文字", unorderedList: "順序なしリスト", orderedList: "順序ありリスト", insertImage: "画像の挿入", link: "リンク", createLink: "リンクの作成", unlink: "リンクの削除", justifyLeft: "左揃え", justifyCenter: "中央揃え", justifyRight: "右揃え", justifyFull: "両端揃え", horizontalRule: "横罫線", removeformat: "フォーマットの削除", fullscreen: "全画面表示", close: "閉じる", submit: "送信", reset: "キャンセル", required: "必須", description: "説明", title: "タイトル", text: "テキスト", target: "ターゲット" };
$.trumbowyg.svgPath = '/images/icons.svg';
$(document).ready(function () {
    $('#trumbowyg-editor').trumbowyg({
        //lang: 'ja',
        btns: [['foreColor', 'backColor', 'strong', 'em', 'underline', 'justifyLeft', 'justifyCenter', 'justifyRight', 'unorderedList', 'orderedList', 'btnExtra']],
        btnsDef: {
            btnExtra: {
                dropdown: ['undo', 'redo', 'formatting', 'createLink', 'unlink', 'removeformat', 'fullscreen', 'justifyFull'],
                title: 'Button Extra',
                ico: 'btnExtra',
                hasIcon: true
            }
        },
        autogrow: true
    });
});
/*! version : 4.17.47
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
/*
 The MIT License (MIT)

 Copyright (c) 2015 Jonathan Peterson

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
/*global define:false */
/*global exports:false */
/*global require:false */
/*global jQuery:false */
/*global moment:false */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD is used - Register as an anonymous module.
        define(['jquery', 'moment'], factory);
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
        module.exports = factory(require('jquery'), require('moment'));
    } else {
        // Neither AMD nor CommonJS used. Use global variables.
        if (typeof jQuery === 'undefined') {
            throw 'bootstrap-datetimepicker requires jQuery to be loaded first';
        }
        if (typeof moment === 'undefined') {
            throw 'bootstrap-datetimepicker requires Moment.js to be loaded first';
        }
        factory(jQuery, moment);
    }
})(function ($, moment) {
    'use strict';

    if (!moment) {
        throw new Error('bootstrap-datetimepicker requires Moment.js to be loaded first');
    }

    var dateTimePicker = function dateTimePicker(element, options) {
        var picker = {},
            date,
            viewDate,
            unset = true,
            input,
            component = false,
            widget = false,
            use24Hours,
            minViewModeNumber = 0,
            actualFormat,
            parseFormats,
            currentViewMode,
            datePickerModes = [{
            clsName: 'days',
            navFnc: 'M',
            navStep: 1
        }, {
            clsName: 'months',
            navFnc: 'y',
            navStep: 1
        }, {
            clsName: 'years',
            navFnc: 'y',
            navStep: 10
        }, {
            clsName: 'decades',
            navFnc: 'y',
            navStep: 100
        }],
            viewModes = ['days', 'months', 'years', 'decades'],
            verticalModes = ['top', 'bottom', 'auto'],
            horizontalModes = ['left', 'right', 'auto'],
            toolbarPlacements = ['default', 'top', 'bottom'],
            keyMap = {
            'up': 38,
            38: 'up',
            'down': 40,
            40: 'down',
            'left': 37,
            37: 'left',
            'right': 39,
            39: 'right',
            'tab': 9,
            9: 'tab',
            'escape': 27,
            27: 'escape',
            'enter': 13,
            13: 'enter',
            'pageUp': 33,
            33: 'pageUp',
            'pageDown': 34,
            34: 'pageDown',
            'shift': 16,
            16: 'shift',
            'control': 17,
            17: 'control',
            'space': 32,
            32: 'space',
            't': 84,
            84: 't',
            'delete': 46,
            46: 'delete'
        },
            keyState = {},


        /********************************************************************************
         *
         * Private functions
         *
         ********************************************************************************/

        hasTimeZone = function hasTimeZone() {
            return moment.tz !== undefined && options.timeZone !== undefined && options.timeZone !== null && options.timeZone !== '';
        },
            getMoment = function getMoment(d) {
            var returnMoment;

            if (d === undefined || d === null) {
                returnMoment = moment(); //TODO should this use format? and locale?
            } else if (moment.isDate(d) || moment.isMoment(d)) {
                // If the date that is passed in is already a Date() or moment() object,
                // pass it directly to moment.
                returnMoment = moment(d);
            } else if (hasTimeZone()) {
                // There is a string to parse and a default time zone
                // parse with the tz function which takes a default time zone if it is not in the format string
                returnMoment = moment.tz(d, parseFormats, options.useStrict, options.timeZone);
            } else {
                returnMoment = moment(d, parseFormats, options.useStrict);
            }

            if (hasTimeZone()) {
                returnMoment.tz(options.timeZone);
            }

            return returnMoment;
        },
            isEnabled = function isEnabled(granularity) {
            if (typeof granularity !== 'string' || granularity.length > 1) {
                throw new TypeError('isEnabled expects a single character string parameter');
            }
            switch (granularity) {
                case 'y':
                    return actualFormat.indexOf('Y') !== -1;
                case 'M':
                    return actualFormat.indexOf('M') !== -1;
                case 'd':
                    return actualFormat.toLowerCase().indexOf('d') !== -1;
                case 'h':
                case 'H':
                    return actualFormat.toLowerCase().indexOf('h') !== -1;
                case 'm':
                    return actualFormat.indexOf('m') !== -1;
                case 's':
                    return actualFormat.indexOf('s') !== -1;
                default:
                    return false;
            }
        },
            hasTime = function hasTime() {
            return isEnabled('h') || isEnabled('m') || isEnabled('s');
        },
            hasDate = function hasDate() {
            return isEnabled('y') || isEnabled('M') || isEnabled('d');
        },
            getDatePickerTemplate = function getDatePickerTemplate() {
            var headTemplate = $('<thead>').append($('<tr>').append($('<th>').addClass('prev').attr('data-action', 'previous').append($('<span>').addClass(options.icons.previous))).append($('<th>').addClass('picker-switch').attr('data-action', 'pickerSwitch').attr('colspan', options.calendarWeeks ? '6' : '5')).append($('<th>').addClass('next').attr('data-action', 'next').append($('<span>').addClass(options.icons.next)))),
                contTemplate = $('<tbody>').append($('<tr>').append($('<td>').attr('colspan', options.calendarWeeks ? '8' : '7')));

            return [$('<div>').addClass('datepicker-days').append($('<table>').addClass('table-condensed').append(headTemplate).append($('<tbody>'))), $('<div>').addClass('datepicker-months').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone())), $('<div>').addClass('datepicker-years').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone())), $('<div>').addClass('datepicker-decades').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone()))];
        },
            getTimePickerMainTemplate = function getTimePickerMainTemplate() {
            var topRow = $('<tr>'),
                middleRow = $('<tr>'),
                bottomRow = $('<tr>');

            if (isEnabled('h')) {
                topRow.append($('<td>').append($('<a>').attr({ href: '#', tabindex: '-1', 'title': options.tooltips.incrementHour }).addClass('btn').attr('data-action', 'incrementHours').append($('<span>').addClass(options.icons.up))));
                middleRow.append($('<td>').append($('<span>').addClass('timepicker-hour').attr({ 'data-time-component': 'hours', 'title': options.tooltips.pickHour }).attr('data-action', 'showHours')));
                bottomRow.append($('<td>').append($('<a>').attr({ href: '#', tabindex: '-1', 'title': options.tooltips.decrementHour }).addClass('btn').attr('data-action', 'decrementHours').append($('<span>').addClass(options.icons.down))));
            }
            if (isEnabled('m')) {
                if (isEnabled('h')) {
                    topRow.append($('<td>').addClass('separator'));
                    middleRow.append($('<td>').addClass('separator').html(':'));
                    bottomRow.append($('<td>').addClass('separator'));
                }
                topRow.append($('<td>').append($('<a>').attr({ href: '#', tabindex: '-1', 'title': options.tooltips.incrementMinute }).addClass('btn').attr('data-action', 'incrementMinutes').append($('<span>').addClass(options.icons.up))));
                middleRow.append($('<td>').append($('<span>').addClass('timepicker-minute').attr({ 'data-time-component': 'minutes', 'title': options.tooltips.pickMinute }).attr('data-action', 'showMinutes')));
                bottomRow.append($('<td>').append($('<a>').attr({ href: '#', tabindex: '-1', 'title': options.tooltips.decrementMinute }).addClass('btn').attr('data-action', 'decrementMinutes').append($('<span>').addClass(options.icons.down))));
            }
            if (isEnabled('s')) {
                if (isEnabled('m')) {
                    topRow.append($('<td>').addClass('separator'));
                    middleRow.append($('<td>').addClass('separator').html(':'));
                    bottomRow.append($('<td>').addClass('separator'));
                }
                topRow.append($('<td>').append($('<a>').attr({ href: '#', tabindex: '-1', 'title': options.tooltips.incrementSecond }).addClass('btn').attr('data-action', 'incrementSeconds').append($('<span>').addClass(options.icons.up))));
                middleRow.append($('<td>').append($('<span>').addClass('timepicker-second').attr({ 'data-time-component': 'seconds', 'title': options.tooltips.pickSecond }).attr('data-action', 'showSeconds')));
                bottomRow.append($('<td>').append($('<a>').attr({ href: '#', tabindex: '-1', 'title': options.tooltips.decrementSecond }).addClass('btn').attr('data-action', 'decrementSeconds').append($('<span>').addClass(options.icons.down))));
            }

            if (!use24Hours) {
                topRow.append($('<td>').addClass('separator'));
                middleRow.append($('<td>').append($('<button>').addClass('btn btn-primary').attr({ 'data-action': 'togglePeriod', tabindex: '-1', 'title': options.tooltips.togglePeriod })));
                bottomRow.append($('<td>').addClass('separator'));
            }

            return $('<div>').addClass('timepicker-picker').append($('<table>').addClass('table-condensed').append([topRow, middleRow, bottomRow]));
        },
            getTimePickerTemplate = function getTimePickerTemplate() {
            var hoursView = $('<div>').addClass('timepicker-hours').append($('<table>').addClass('table-condensed')),
                minutesView = $('<div>').addClass('timepicker-minutes').append($('<table>').addClass('table-condensed')),
                secondsView = $('<div>').addClass('timepicker-seconds').append($('<table>').addClass('table-condensed')),
                ret = [getTimePickerMainTemplate()];

            if (isEnabled('h')) {
                ret.push(hoursView);
            }
            if (isEnabled('m')) {
                ret.push(minutesView);
            }
            if (isEnabled('s')) {
                ret.push(secondsView);
            }

            return ret;
        },
            getToolbar = function getToolbar() {
            var row = [];
            if (options.showTodayButton) {
                row.push($('<td>').append($('<a>').attr({ 'data-action': 'today', 'title': options.tooltips.today }).append($('<span>').addClass(options.icons.today))));
            }
            if (!options.sideBySide && hasDate() && hasTime()) {
                row.push($('<td>').append($('<a>').attr({ 'data-action': 'togglePicker', 'title': options.tooltips.selectTime }).append($('<span>').addClass(options.icons.time))));
            }
            if (options.showClear) {
                row.push($('<td>').append($('<a>').attr({ 'data-action': 'clear', 'title': options.tooltips.clear }).append($('<span>').addClass(options.icons.clear))));
            }
            if (options.showClose) {
                row.push($('<td>').append($('<a>').attr({ 'data-action': 'close', 'title': options.tooltips.close }).append($('<span>').addClass(options.icons.close))));
            }
            return $('<table>').addClass('table-condensed').append($('<tbody>').append($('<tr>').append(row)));
        },
            getTemplate = function getTemplate() {
            var template = $('<div>').addClass('bootstrap-datetimepicker-widget dropdown-menu'),
                dateView = $('<div>').addClass('datepicker').append(getDatePickerTemplate()),
                timeView = $('<div>').addClass('timepicker').append(getTimePickerTemplate()),
                content = $('<ul>').addClass('list-unstyled'),
                toolbar = $('<li>').addClass('picker-switch' + (options.collapse ? ' accordion-toggle' : '')).append(getToolbar());

            if (options.inline) {
                template.removeClass('dropdown-menu');
            }

            if (use24Hours) {
                template.addClass('usetwentyfour');
            }

            if (isEnabled('s') && !use24Hours) {
                template.addClass('wider');
            }

            if (options.sideBySide && hasDate() && hasTime()) {
                template.addClass('timepicker-sbs');
                if (options.toolbarPlacement === 'top') {
                    template.append(toolbar);
                }
                template.append($('<div>').addClass('row').append(dateView.addClass('col-md-6')).append(timeView.addClass('col-md-6')));
                if (options.toolbarPlacement === 'bottom') {
                    template.append(toolbar);
                }
                return template;
            }

            if (options.toolbarPlacement === 'top') {
                content.append(toolbar);
            }
            if (hasDate()) {
                content.append($('<li>').addClass(options.collapse && hasTime() ? 'collapse in' : '').append(dateView));
            }
            if (options.toolbarPlacement === 'default') {
                content.append(toolbar);
            }
            if (hasTime()) {
                content.append($('<li>').addClass(options.collapse && hasDate() ? 'collapse' : '').append(timeView));
            }
            if (options.toolbarPlacement === 'bottom') {
                content.append(toolbar);
            }
            return template.append(content);
        },
            dataToOptions = function dataToOptions() {
            var eData,
                dataOptions = {};

            if (element.is('input') || options.inline) {
                eData = element.data();
            } else {
                eData = element.find('input').data();
            }

            if (eData.dateOptions && eData.dateOptions instanceof Object) {
                dataOptions = $.extend(true, dataOptions, eData.dateOptions);
            }

            $.each(options, function (key) {
                var attributeName = 'date' + key.charAt(0).toUpperCase() + key.slice(1);
                if (eData[attributeName] !== undefined) {
                    dataOptions[key] = eData[attributeName];
                }
            });
            return dataOptions;
        },
            place = function place() {
            var position = (component || element).position(),
                offset = (component || element).offset(),
                vertical = options.widgetPositioning.vertical,
                horizontal = options.widgetPositioning.horizontal,
                parent;

            if (options.widgetParent) {
                parent = options.widgetParent.append(widget);
            } else if (element.is('input')) {
                parent = element.after(widget).parent();
            } else if (options.inline) {
                parent = element.append(widget);
                return;
            } else {
                parent = element;
                element.children().first().after(widget);
            }

            // Top and bottom logic
            if (vertical === 'auto') {
                if (offset.top + widget.height() * 1.5 >= $(window).height() + $(window).scrollTop() && widget.height() + element.outerHeight() < offset.top) {
                    vertical = 'top';
                } else {
                    vertical = 'bottom';
                }
            }

            // Left and right logic
            if (horizontal === 'auto') {
                if (parent.width() < offset.left + widget.outerWidth() / 2 && offset.left + widget.outerWidth() > $(window).width()) {
                    horizontal = 'right';
                } else {
                    horizontal = 'left';
                }
            }

            if (vertical === 'top') {
                widget.addClass('top').removeClass('bottom');
            } else {
                widget.addClass('bottom').removeClass('top');
            }

            if (horizontal === 'right') {
                widget.addClass('pull-right');
            } else {
                widget.removeClass('pull-right');
            }

            // find the first parent element that has a non-static css positioning
            if (parent.css('position') === 'static') {
                parent = parent.parents().filter(function () {
                    return $(this).css('position') !== 'static';
                }).first();
            }

            if (parent.length === 0) {
                throw new Error('datetimepicker component should be placed within a non-static positioned container');
            }

            widget.css({
                top: vertical === 'top' ? 'auto' : position.top + element.outerHeight(),
                bottom: vertical === 'top' ? parent.outerHeight() - (parent === element ? 0 : position.top) : 'auto',
                left: horizontal === 'left' ? parent === element ? 0 : position.left : 'auto',
                right: horizontal === 'left' ? 'auto' : parent.outerWidth() - element.outerWidth() - (parent === element ? 0 : position.left)
            });
        },
            notifyEvent = function notifyEvent(e) {
            if (e.type === 'dp.change' && (e.date && e.date.isSame(e.oldDate) || !e.date && !e.oldDate)) {
                return;
            }
            element.trigger(e);
        },
            viewUpdate = function viewUpdate(e) {
            if (e === 'y') {
                e = 'YYYY';
            }
            notifyEvent({
                type: 'dp.update',
                change: e,
                viewDate: viewDate.clone()
            });
        },
            showMode = function showMode(dir) {
            if (!widget) {
                return;
            }
            if (dir) {
                currentViewMode = Math.max(minViewModeNumber, Math.min(3, currentViewMode + dir));
            }
            widget.find('.datepicker > div').hide().filter('.datepicker-' + datePickerModes[currentViewMode].clsName).show();
        },
            fillDow = function fillDow() {
            var row = $('<tr>'),
                currentDate = viewDate.clone().startOf('w').startOf('d');

            if (options.calendarWeeks === true) {
                row.append($('<th>').addClass('cw').text('#'));
            }

            while (currentDate.isBefore(viewDate.clone().endOf('w'))) {
                row.append($('<th>').addClass('dow').text(currentDate.format('dd')));
                currentDate.add(1, 'd');
            }
            widget.find('.datepicker-days thead').append(row);
        },
            isInDisabledDates = function isInDisabledDates(testDate) {
            return options.disabledDates[testDate.format('YYYY-MM-DD')] === true;
        },
            isInEnabledDates = function isInEnabledDates(testDate) {
            return options.enabledDates[testDate.format('YYYY-MM-DD')] === true;
        },
            isInDisabledHours = function isInDisabledHours(testDate) {
            return options.disabledHours[testDate.format('H')] === true;
        },
            isInEnabledHours = function isInEnabledHours(testDate) {
            return options.enabledHours[testDate.format('H')] === true;
        },
            isValid = function isValid(targetMoment, granularity) {
            if (!targetMoment.isValid()) {
                return false;
            }
            if (options.disabledDates && granularity === 'd' && isInDisabledDates(targetMoment)) {
                return false;
            }
            if (options.enabledDates && granularity === 'd' && !isInEnabledDates(targetMoment)) {
                return false;
            }
            if (options.minDate && targetMoment.isBefore(options.minDate, granularity)) {
                return false;
            }
            if (options.maxDate && targetMoment.isAfter(options.maxDate, granularity)) {
                return false;
            }
            if (options.daysOfWeekDisabled && granularity === 'd' && options.daysOfWeekDisabled.indexOf(targetMoment.day()) !== -1) {
                return false;
            }
            if (options.disabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && isInDisabledHours(targetMoment)) {
                return false;
            }
            if (options.enabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && !isInEnabledHours(targetMoment)) {
                return false;
            }
            if (options.disabledTimeIntervals && (granularity === 'h' || granularity === 'm' || granularity === 's')) {
                var found = false;
                $.each(options.disabledTimeIntervals, function () {
                    if (targetMoment.isBetween(this[0], this[1])) {
                        found = true;
                        return false;
                    }
                });
                if (found) {
                    return false;
                }
            }
            return true;
        },
            fillMonths = function fillMonths() {
            var spans = [],
                monthsShort = viewDate.clone().startOf('y').startOf('d');
            while (monthsShort.isSame(viewDate, 'y')) {
                spans.push($('<span>').attr('data-action', 'selectMonth').addClass('month').text(monthsShort.format('MMM')));
                monthsShort.add(1, 'M');
            }
            widget.find('.datepicker-months td').empty().append(spans);
        },
            updateMonths = function updateMonths() {
            var monthsView = widget.find('.datepicker-months'),
                monthsViewHeader = monthsView.find('th'),
                months = monthsView.find('tbody').find('span');

            monthsViewHeader.eq(0).find('span').attr('title', options.tooltips.prevYear);
            monthsViewHeader.eq(1).attr('title', options.tooltips.selectYear);
            monthsViewHeader.eq(2).find('span').attr('title', options.tooltips.nextYear);

            monthsView.find('.disabled').removeClass('disabled');

            if (!isValid(viewDate.clone().subtract(1, 'y'), 'y')) {
                monthsViewHeader.eq(0).addClass('disabled');
            }

            monthsViewHeader.eq(1).text(viewDate.year());

            if (!isValid(viewDate.clone().add(1, 'y'), 'y')) {
                monthsViewHeader.eq(2).addClass('disabled');
            }

            months.removeClass('active');
            if (date.isSame(viewDate, 'y') && !unset) {
                months.eq(date.month()).addClass('active');
            }

            months.each(function (index) {
                if (!isValid(viewDate.clone().month(index), 'M')) {
                    $(this).addClass('disabled');
                }
            });
        },
            updateYears = function updateYears() {
            var yearsView = widget.find('.datepicker-years'),
                yearsViewHeader = yearsView.find('th'),
                startYear = viewDate.clone().subtract(5, 'y'),
                endYear = viewDate.clone().add(6, 'y'),
                html = '';

            yearsViewHeader.eq(0).find('span').attr('title', options.tooltips.prevDecade);
            yearsViewHeader.eq(1).attr('title', options.tooltips.selectDecade);
            yearsViewHeader.eq(2).find('span').attr('title', options.tooltips.nextDecade);

            yearsView.find('.disabled').removeClass('disabled');

            if (options.minDate && options.minDate.isAfter(startYear, 'y')) {
                yearsViewHeader.eq(0).addClass('disabled');
            }

            yearsViewHeader.eq(1).text(startYear.year() + '-' + endYear.year());

            if (options.maxDate && options.maxDate.isBefore(endYear, 'y')) {
                yearsViewHeader.eq(2).addClass('disabled');
            }

            while (!startYear.isAfter(endYear, 'y')) {
                html += '<span data-action="selectYear" class="year' + (startYear.isSame(date, 'y') && !unset ? ' active' : '') + (!isValid(startYear, 'y') ? ' disabled' : '') + '">' + startYear.year() + '</span>';
                startYear.add(1, 'y');
            }

            yearsView.find('td').html(html);
        },
            updateDecades = function updateDecades() {
            var decadesView = widget.find('.datepicker-decades'),
                decadesViewHeader = decadesView.find('th'),
                startDecade = moment({ y: viewDate.year() - viewDate.year() % 100 - 1 }),
                endDecade = startDecade.clone().add(100, 'y'),
                startedAt = startDecade.clone(),
                minDateDecade = false,
                maxDateDecade = false,
                endDecadeYear,
                html = '';

            decadesViewHeader.eq(0).find('span').attr('title', options.tooltips.prevCentury);
            decadesViewHeader.eq(2).find('span').attr('title', options.tooltips.nextCentury);

            decadesView.find('.disabled').removeClass('disabled');

            if (startDecade.isSame(moment({ y: 1900 })) || options.minDate && options.minDate.isAfter(startDecade, 'y')) {
                decadesViewHeader.eq(0).addClass('disabled');
            }

            decadesViewHeader.eq(1).text(startDecade.year() + '-' + endDecade.year());

            if (startDecade.isSame(moment({ y: 2000 })) || options.maxDate && options.maxDate.isBefore(endDecade, 'y')) {
                decadesViewHeader.eq(2).addClass('disabled');
            }

            while (!startDecade.isAfter(endDecade, 'y')) {
                endDecadeYear = startDecade.year() + 12;
                minDateDecade = options.minDate && options.minDate.isAfter(startDecade, 'y') && options.minDate.year() <= endDecadeYear;
                maxDateDecade = options.maxDate && options.maxDate.isAfter(startDecade, 'y') && options.maxDate.year() <= endDecadeYear;
                html += '<span data-action="selectDecade" class="decade' + (date.isAfter(startDecade) && date.year() <= endDecadeYear ? ' active' : '') + (!isValid(startDecade, 'y') && !minDateDecade && !maxDateDecade ? ' disabled' : '') + '" data-selection="' + (startDecade.year() + 6) + '">' + (startDecade.year() + 1) + ' - ' + (startDecade.year() + 12) + '</span>';
                startDecade.add(12, 'y');
            }
            html += '<span></span><span></span><span></span>'; //push the dangling block over, at least this way it's even

            decadesView.find('td').html(html);
            decadesViewHeader.eq(1).text(startedAt.year() + 1 + '-' + startDecade.year());
        },
            fillDate = function fillDate() {
            var daysView = widget.find('.datepicker-days'),
                daysViewHeader = daysView.find('th'),
                currentDate,
                html = [],
                row,
                clsNames = [],
                i;

            if (!hasDate()) {
                return;
            }

            daysViewHeader.eq(0).find('span').attr('title', options.tooltips.prevMonth);
            daysViewHeader.eq(1).attr('title', options.tooltips.selectMonth);
            daysViewHeader.eq(2).find('span').attr('title', options.tooltips.nextMonth);

            daysView.find('.disabled').removeClass('disabled');
            daysViewHeader.eq(1).text(viewDate.format(options.dayViewHeaderFormat));

            if (!isValid(viewDate.clone().subtract(1, 'M'), 'M')) {
                daysViewHeader.eq(0).addClass('disabled');
            }
            if (!isValid(viewDate.clone().add(1, 'M'), 'M')) {
                daysViewHeader.eq(2).addClass('disabled');
            }

            currentDate = viewDate.clone().startOf('M').startOf('w').startOf('d');

            for (i = 0; i < 42; i++) {
                //always display 42 days (should show 6 weeks)
                if (currentDate.weekday() === 0) {
                    row = $('<tr>');
                    if (options.calendarWeeks) {
                        row.append('<td class="cw">' + currentDate.week() + '</td>');
                    }
                    html.push(row);
                }
                clsNames = ['day'];
                if (currentDate.isBefore(viewDate, 'M')) {
                    clsNames.push('old');
                }
                if (currentDate.isAfter(viewDate, 'M')) {
                    clsNames.push('new');
                }
                if (currentDate.isSame(date, 'd') && !unset) {
                    clsNames.push('active');
                }
                if (!isValid(currentDate, 'd')) {
                    clsNames.push('disabled');
                }
                if (currentDate.isSame(getMoment(), 'd')) {
                    clsNames.push('today');
                }
                if (currentDate.day() === 0 || currentDate.day() === 6) {
                    clsNames.push('weekend');
                }
                notifyEvent({
                    type: 'dp.classify',
                    date: currentDate,
                    classNames: clsNames
                });
                row.append('<td data-action="selectDay" data-day="' + currentDate.format('L') + '" class="' + clsNames.join(' ') + '">' + currentDate.date() + '</td>');
                currentDate.add(1, 'd');
            }

            daysView.find('tbody').empty().append(html);

            updateMonths();

            updateYears();

            updateDecades();
        },
            fillHours = function fillHours() {
            var table = widget.find('.timepicker-hours table'),
                currentHour = viewDate.clone().startOf('d'),
                html = [],
                row = $('<tr>');

            if (viewDate.hour() > 11 && !use24Hours) {
                currentHour.hour(12);
            }
            while (currentHour.isSame(viewDate, 'd') && (use24Hours || viewDate.hour() < 12 && currentHour.hour() < 12 || viewDate.hour() > 11)) {
                if (currentHour.hour() % 4 === 0) {
                    row = $('<tr>');
                    html.push(row);
                }
                row.append('<td data-action="selectHour" class="hour' + (!isValid(currentHour, 'h') ? ' disabled' : '') + '">' + currentHour.format(use24Hours ? 'HH' : 'hh') + '</td>');
                currentHour.add(1, 'h');
            }
            table.empty().append(html);
        },
            fillMinutes = function fillMinutes() {
            var table = widget.find('.timepicker-minutes table'),
                currentMinute = viewDate.clone().startOf('h'),
                html = [],
                row = $('<tr>'),
                step = options.stepping === 1 ? 5 : options.stepping;

            while (viewDate.isSame(currentMinute, 'h')) {
                if (currentMinute.minute() % (step * 4) === 0) {
                    row = $('<tr>');
                    html.push(row);
                }
                row.append('<td data-action="selectMinute" class="minute' + (!isValid(currentMinute, 'm') ? ' disabled' : '') + '">' + currentMinute.format('mm') + '</td>');
                currentMinute.add(step, 'm');
            }
            table.empty().append(html);
        },
            fillSeconds = function fillSeconds() {
            var table = widget.find('.timepicker-seconds table'),
                currentSecond = viewDate.clone().startOf('m'),
                html = [],
                row = $('<tr>');

            while (viewDate.isSame(currentSecond, 'm')) {
                if (currentSecond.second() % 20 === 0) {
                    row = $('<tr>');
                    html.push(row);
                }
                row.append('<td data-action="selectSecond" class="second' + (!isValid(currentSecond, 's') ? ' disabled' : '') + '">' + currentSecond.format('ss') + '</td>');
                currentSecond.add(5, 's');
            }

            table.empty().append(html);
        },
            fillTime = function fillTime() {
            var toggle,
                newDate,
                timeComponents = widget.find('.timepicker span[data-time-component]');

            if (!use24Hours) {
                toggle = widget.find('.timepicker [data-action=togglePeriod]');
                newDate = date.clone().add(date.hours() >= 12 ? -12 : 12, 'h');

                toggle.text(date.format('A'));

                if (isValid(newDate, 'h')) {
                    toggle.removeClass('disabled');
                } else {
                    toggle.addClass('disabled');
                }
            }
            timeComponents.filter('[data-time-component=hours]').text(date.format(use24Hours ? 'HH' : 'hh'));
            timeComponents.filter('[data-time-component=minutes]').text(date.format('mm'));
            timeComponents.filter('[data-time-component=seconds]').text(date.format('ss'));

            fillHours();
            fillMinutes();
            fillSeconds();
        },
            update = function update() {
            if (!widget) {
                return;
            }
            fillDate();
            fillTime();
        },
            setValue = function setValue(targetMoment) {
            var oldDate = unset ? null : date;

            // case of calling setValue(null or false)
            if (!targetMoment) {
                unset = true;
                input.val('');
                element.data('date', '');
                notifyEvent({
                    type: 'dp.change',
                    date: false,
                    oldDate: oldDate
                });
                update();
                return;
            }

            targetMoment = targetMoment.clone().locale(options.locale);

            if (hasTimeZone()) {
                targetMoment.tz(options.timeZone);
            }

            if (options.stepping !== 1) {
                targetMoment.minutes(Math.round(targetMoment.minutes() / options.stepping) * options.stepping).seconds(0);

                while (options.minDate && targetMoment.isBefore(options.minDate)) {
                    targetMoment.add(options.stepping, 'minutes');
                }
            }

            if (isValid(targetMoment)) {
                date = targetMoment;
                viewDate = date.clone();
                input.val(date.format(actualFormat));
                element.data('date', date.format(actualFormat));
                unset = false;
                update();
                notifyEvent({
                    type: 'dp.change',
                    date: date.clone(),
                    oldDate: oldDate
                });
            } else {
                if (!options.keepInvalid) {
                    input.val(unset ? '' : date.format(actualFormat));
                } else {
                    notifyEvent({
                        type: 'dp.change',
                        date: targetMoment,
                        oldDate: oldDate
                    });
                }
                notifyEvent({
                    type: 'dp.error',
                    date: targetMoment,
                    oldDate: oldDate
                });
            }
        },


        /**
         * Hides the widget. Possibly will emit dp.hide
         */
        hide = function hide() {
            var transitioning = false;
            if (!widget) {
                return picker;
            }
            // Ignore event if in the middle of a picker transition
            widget.find('.collapse').each(function () {
                var collapseData = $(this).data('collapse');
                if (collapseData && collapseData.transitioning) {
                    transitioning = true;
                    return false;
                }
                return true;
            });
            if (transitioning) {
                return picker;
            }
            if (component && component.hasClass('btn')) {
                component.toggleClass('active');
            }
            widget.hide();

            $(window).off('resize', place);
            widget.off('click', '[data-action]');
            widget.off('mousedown', false);

            widget.remove();
            widget = false;

            notifyEvent({
                type: 'dp.hide',
                date: date.clone()
            });

            input.blur();

            viewDate = date.clone();

            return picker;
        },
            clear = function clear() {
            setValue(null);
        },
            parseInputDate = function parseInputDate(inputDate) {
            if (options.parseInputDate === undefined) {
                if (!moment.isMoment(inputDate) || inputDate instanceof Date) {
                    inputDate = getMoment(inputDate);
                }
            } else {
                inputDate = options.parseInputDate(inputDate);
            }
            //inputDate.locale(options.locale);
            return inputDate;
        },


        /********************************************************************************
         *
         * Widget UI interaction functions
         *
         ********************************************************************************/
        actions = {
            next: function next() {
                var navFnc = datePickerModes[currentViewMode].navFnc;
                viewDate.add(datePickerModes[currentViewMode].navStep, navFnc);
                fillDate();
                viewUpdate(navFnc);
            },

            previous: function previous() {
                var navFnc = datePickerModes[currentViewMode].navFnc;
                viewDate.subtract(datePickerModes[currentViewMode].navStep, navFnc);
                fillDate();
                viewUpdate(navFnc);
            },

            pickerSwitch: function pickerSwitch() {
                showMode(1);
            },

            selectMonth: function selectMonth(e) {
                var month = $(e.target).closest('tbody').find('span').index($(e.target));
                viewDate.month(month);
                if (currentViewMode === minViewModeNumber) {
                    setValue(date.clone().year(viewDate.year()).month(viewDate.month()));
                    if (!options.inline) {
                        hide();
                    }
                } else {
                    showMode(-1);
                    fillDate();
                }
                viewUpdate('M');
            },

            selectYear: function selectYear(e) {
                var year = parseInt($(e.target).text(), 10) || 0;
                viewDate.year(year);
                if (currentViewMode === minViewModeNumber) {
                    setValue(date.clone().year(viewDate.year()));
                    if (!options.inline) {
                        hide();
                    }
                } else {
                    showMode(-1);
                    fillDate();
                }
                viewUpdate('YYYY');
            },

            selectDecade: function selectDecade(e) {
                var year = parseInt($(e.target).data('selection'), 10) || 0;
                viewDate.year(year);
                if (currentViewMode === minViewModeNumber) {
                    setValue(date.clone().year(viewDate.year()));
                    if (!options.inline) {
                        hide();
                    }
                } else {
                    showMode(-1);
                    fillDate();
                }
                viewUpdate('YYYY');
            },

            selectDay: function selectDay(e) {
                var day = viewDate.clone();
                if ($(e.target).is('.old')) {
                    day.subtract(1, 'M');
                }
                if ($(e.target).is('.new')) {
                    day.add(1, 'M');
                }
                setValue(day.date(parseInt($(e.target).text(), 10)));
                if (!hasTime() && !options.keepOpen && !options.inline) {
                    hide();
                }
            },

            incrementHours: function incrementHours() {
                var newDate = date.clone().add(1, 'h');
                if (isValid(newDate, 'h')) {
                    setValue(newDate);
                }
            },

            incrementMinutes: function incrementMinutes() {
                var newDate = date.clone().add(options.stepping, 'm');
                if (isValid(newDate, 'm')) {
                    setValue(newDate);
                }
            },

            incrementSeconds: function incrementSeconds() {
                var newDate = date.clone().add(1, 's');
                if (isValid(newDate, 's')) {
                    setValue(newDate);
                }
            },

            decrementHours: function decrementHours() {
                var newDate = date.clone().subtract(1, 'h');
                if (isValid(newDate, 'h')) {
                    setValue(newDate);
                }
            },

            decrementMinutes: function decrementMinutes() {
                var newDate = date.clone().subtract(options.stepping, 'm');
                if (isValid(newDate, 'm')) {
                    setValue(newDate);
                }
            },

            decrementSeconds: function decrementSeconds() {
                var newDate = date.clone().subtract(1, 's');
                if (isValid(newDate, 's')) {
                    setValue(newDate);
                }
            },

            togglePeriod: function togglePeriod() {
                setValue(date.clone().add(date.hours() >= 12 ? -12 : 12, 'h'));
            },

            togglePicker: function togglePicker(e) {
                var $this = $(e.target),
                    $parent = $this.closest('ul'),
                    expanded = $parent.find('.in'),
                    closed = $parent.find('.collapse:not(.in)'),
                    collapseData;

                if (expanded && expanded.length) {
                    collapseData = expanded.data('collapse');
                    if (collapseData && collapseData.transitioning) {
                        return;
                    }
                    if (expanded.collapse) {
                        // if collapse plugin is available through bootstrap.js then use it
                        expanded.collapse('hide');
                        closed.collapse('show');
                    } else {
                        // otherwise just toggle in class on the two views
                        expanded.removeClass('in');
                        closed.addClass('in');
                    }
                    if ($this.is('span')) {
                        $this.toggleClass(options.icons.time + ' ' + options.icons.date);
                    } else {
                        $this.find('span').toggleClass(options.icons.time + ' ' + options.icons.date);
                    }

                    // NOTE: uncomment if toggled state will be restored in show()
                    //if (component) {
                    //    component.find('span').toggleClass(options.icons.time + ' ' + options.icons.date);
                    //}
                }
            },

            showPicker: function showPicker() {
                widget.find('.timepicker > div:not(.timepicker-picker)').hide();
                widget.find('.timepicker .timepicker-picker').show();
            },

            showHours: function showHours() {
                widget.find('.timepicker .timepicker-picker').hide();
                widget.find('.timepicker .timepicker-hours').show();
            },

            showMinutes: function showMinutes() {
                widget.find('.timepicker .timepicker-picker').hide();
                widget.find('.timepicker .timepicker-minutes').show();
            },

            showSeconds: function showSeconds() {
                widget.find('.timepicker .timepicker-picker').hide();
                widget.find('.timepicker .timepicker-seconds').show();
            },

            selectHour: function selectHour(e) {
                var hour = parseInt($(e.target).text(), 10);

                if (!use24Hours) {
                    if (date.hours() >= 12) {
                        if (hour !== 12) {
                            hour += 12;
                        }
                    } else {
                        if (hour === 12) {
                            hour = 0;
                        }
                    }
                }
                setValue(date.clone().hours(hour));
                actions.showPicker.call(picker);
            },

            selectMinute: function selectMinute(e) {
                setValue(date.clone().minutes(parseInt($(e.target).text(), 10)));
                actions.showPicker.call(picker);
            },

            selectSecond: function selectSecond(e) {
                setValue(date.clone().seconds(parseInt($(e.target).text(), 10)));
                actions.showPicker.call(picker);
            },

            clear: clear,

            today: function today() {
                var todaysDate = getMoment();
                if (isValid(todaysDate, 'd')) {
                    setValue(todaysDate);
                }
            },

            close: hide
        },
            doAction = function doAction(e) {
            if ($(e.currentTarget).is('.disabled')) {
                return false;
            }
            actions[$(e.currentTarget).data('action')].apply(picker, arguments);
            return false;
        },


        /**
         * Shows the widget. Possibly will emit dp.show and dp.change
         */
        show = function show() {
            var currentMoment,
                useCurrentGranularity = {
                'year': function year(m) {
                    return m.month(0).date(1).hours(0).seconds(0).minutes(0);
                },
                'month': function month(m) {
                    return m.date(1).hours(0).seconds(0).minutes(0);
                },
                'day': function day(m) {
                    return m.hours(0).seconds(0).minutes(0);
                },
                'hour': function hour(m) {
                    return m.seconds(0).minutes(0);
                },
                'minute': function minute(m) {
                    return m.seconds(0);
                }
            };

            if (input.prop('disabled') || !options.ignoreReadonly && input.prop('readonly') || widget) {
                return picker;
            }
            if (input.val() !== undefined && input.val().trim().length !== 0) {
                setValue(parseInputDate(input.val().trim()));
            } else if (unset && options.useCurrent && (options.inline || input.is('input') && input.val().trim().length === 0)) {
                currentMoment = getMoment();
                if (typeof options.useCurrent === 'string') {
                    currentMoment = useCurrentGranularity[options.useCurrent](currentMoment);
                }
                setValue(currentMoment);
            }
            widget = getTemplate();

            fillDow();
            fillMonths();

            widget.find('.timepicker-hours').hide();
            widget.find('.timepicker-minutes').hide();
            widget.find('.timepicker-seconds').hide();

            update();
            showMode();

            $(window).on('resize', place);
            widget.on('click', '[data-action]', doAction); // this handles clicks on the widget
            widget.on('mousedown', false);

            if (component && component.hasClass('btn')) {
                component.toggleClass('active');
            }
            place();
            widget.show();
            if (options.focusOnShow && !input.is(':focus')) {
                input.focus();
            }

            notifyEvent({
                type: 'dp.show'
            });
            return picker;
        },


        /**
         * Shows or hides the widget
         */
        toggle = function toggle() {
            return widget ? hide() : show();
        },
            keydown = function keydown(e) {
            var handler = null,
                index,
                index2,
                pressedKeys = [],
                pressedModifiers = {},
                currentKey = e.which,
                keyBindKeys,
                allModifiersPressed,
                pressed = 'p';

            keyState[currentKey] = pressed;

            for (index in keyState) {
                if (keyState.hasOwnProperty(index) && keyState[index] === pressed) {
                    pressedKeys.push(index);
                    if (parseInt(index, 10) !== currentKey) {
                        pressedModifiers[index] = true;
                    }
                }
            }

            for (index in options.keyBinds) {
                if (options.keyBinds.hasOwnProperty(index) && typeof options.keyBinds[index] === 'function') {
                    keyBindKeys = index.split(' ');
                    if (keyBindKeys.length === pressedKeys.length && keyMap[currentKey] === keyBindKeys[keyBindKeys.length - 1]) {
                        allModifiersPressed = true;
                        for (index2 = keyBindKeys.length - 2; index2 >= 0; index2--) {
                            if (!(keyMap[keyBindKeys[index2]] in pressedModifiers)) {
                                allModifiersPressed = false;
                                break;
                            }
                        }
                        if (allModifiersPressed) {
                            handler = options.keyBinds[index];
                            break;
                        }
                    }
                }
            }

            if (handler) {
                handler.call(picker, widget);
                e.stopPropagation();
                e.preventDefault();
            }
        },
            keyup = function keyup(e) {
            keyState[e.which] = 'r';
            e.stopPropagation();
            e.preventDefault();
        },
            change = function change(e) {
            var val = $(e.target).val().trim(),
                parsedDate = val ? parseInputDate(val) : null;
            setValue(parsedDate);
            e.stopImmediatePropagation();
            return false;
        },
            attachDatePickerElementEvents = function attachDatePickerElementEvents() {
            input.on({
                'change': change,
                'blur': options.debug ? '' : hide,
                'keydown': keydown,
                'keyup': keyup,
                'focus': options.allowInputToggle ? show : ''
            });

            if (element.is('input')) {
                input.on({
                    'focus': show
                });
            } else if (component) {
                component.on('click', toggle);
                component.on('mousedown', false);
            }
        },
            detachDatePickerElementEvents = function detachDatePickerElementEvents() {
            input.off({
                'change': change,
                'blur': blur,
                'keydown': keydown,
                'keyup': keyup,
                'focus': options.allowInputToggle ? hide : ''
            });

            if (element.is('input')) {
                input.off({
                    'focus': show
                });
            } else if (component) {
                component.off('click', toggle);
                component.off('mousedown', false);
            }
        },
            indexGivenDates = function indexGivenDates(givenDatesArray) {
            // Store given enabledDates and disabledDates as keys.
            // This way we can check their existence in O(1) time instead of looping through whole array.
            // (for example: options.enabledDates['2014-02-27'] === true)
            var givenDatesIndexed = {};
            $.each(givenDatesArray, function () {
                var dDate = parseInputDate(this);
                if (dDate.isValid()) {
                    givenDatesIndexed[dDate.format('YYYY-MM-DD')] = true;
                }
            });
            return Object.keys(givenDatesIndexed).length ? givenDatesIndexed : false;
        },
            indexGivenHours = function indexGivenHours(givenHoursArray) {
            // Store given enabledHours and disabledHours as keys.
            // This way we can check their existence in O(1) time instead of looping through whole array.
            // (for example: options.enabledHours['2014-02-27'] === true)
            var givenHoursIndexed = {};
            $.each(givenHoursArray, function () {
                givenHoursIndexed[this] = true;
            });
            return Object.keys(givenHoursIndexed).length ? givenHoursIndexed : false;
        },
            initFormatting = function initFormatting() {
            var format = options.format || 'L LT';

            actualFormat = format.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput) {
                var newinput = date.localeData().longDateFormat(formatInput) || formatInput;
                return newinput.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput2) {
                    //temp fix for #740
                    return date.localeData().longDateFormat(formatInput2) || formatInput2;
                });
            });

            parseFormats = options.extraFormats ? options.extraFormats.slice() : [];
            if (parseFormats.indexOf(format) < 0 && parseFormats.indexOf(actualFormat) < 0) {
                parseFormats.push(actualFormat);
            }

            use24Hours = actualFormat.toLowerCase().indexOf('a') < 1 && actualFormat.replace(/\[.*?\]/g, '').indexOf('h') < 1;

            if (isEnabled('y')) {
                minViewModeNumber = 2;
            }
            if (isEnabled('M')) {
                minViewModeNumber = 1;
            }
            if (isEnabled('d')) {
                minViewModeNumber = 0;
            }

            currentViewMode = Math.max(minViewModeNumber, currentViewMode);

            if (!unset) {
                setValue(date);
            }
        };

        /********************************************************************************
         *
         * Public API functions
         * =====================
         *
         * Important: Do not expose direct references to private objects or the options
         * object to the outer world. Always return a clone when returning values or make
         * a clone when setting a private variable.
         *
         ********************************************************************************/
        picker.destroy = function () {
            ///<summary>Destroys the widget and removes all attached event listeners</summary>
            hide();
            detachDatePickerElementEvents();
            element.removeData('DateTimePicker');
            element.removeData('date');
        };

        picker.toggle = toggle;

        picker.show = show;

        picker.hide = hide;

        picker.disable = function () {
            ///<summary>Disables the input element, the component is attached to, by adding a disabled="true" attribute to it.
            ///If the widget was visible before that call it is hidden. Possibly emits dp.hide</summary>
            hide();
            if (component && component.hasClass('btn')) {
                component.addClass('disabled');
            }
            input.prop('disabled', true);
            return picker;
        };

        picker.enable = function () {
            ///<summary>Enables the input element, the component is attached to, by removing disabled attribute from it.</summary>
            if (component && component.hasClass('btn')) {
                component.removeClass('disabled');
            }
            input.prop('disabled', false);
            return picker;
        };

        picker.ignoreReadonly = function (ignoreReadonly) {
            if (arguments.length === 0) {
                return options.ignoreReadonly;
            }
            if (typeof ignoreReadonly !== 'boolean') {
                throw new TypeError('ignoreReadonly () expects a boolean parameter');
            }
            options.ignoreReadonly = ignoreReadonly;
            return picker;
        };

        picker.options = function (newOptions) {
            if (arguments.length === 0) {
                return $.extend(true, {}, options);
            }

            if (!(newOptions instanceof Object)) {
                throw new TypeError('options() options parameter should be an object');
            }
            $.extend(true, options, newOptions);
            $.each(options, function (key, value) {
                if (picker[key] !== undefined) {
                    picker[key](value);
                } else {
                    throw new TypeError('option ' + key + ' is not recognized!');
                }
            });
            return picker;
        };

        picker.date = function (newDate) {
            ///<signature helpKeyword="$.fn.datetimepicker.date">
            ///<summary>Returns the component's model current date, a moment object or null if not set.</summary>
            ///<returns type="Moment">date.clone()</returns>
            ///</signature>
            ///<signature>
            ///<summary>Sets the components model current moment to it. Passing a null value unsets the components model current moment. Parsing of the newDate parameter is made using moment library with the options.format and options.useStrict components configuration.</summary>
            ///<param name="newDate" locid="$.fn.datetimepicker.date_p:newDate">Takes string, Date, moment, null parameter.</param>
            ///</signature>
            if (arguments.length === 0) {
                if (unset) {
                    return null;
                }
                return date.clone();
            }

            if (newDate !== null && typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
                throw new TypeError('date() parameter must be one of [null, string, moment or Date]');
            }

            setValue(newDate === null ? null : parseInputDate(newDate));
            return picker;
        };

        picker.format = function (newFormat) {
            ///<summary>test su</summary>
            ///<param name="newFormat">info about para</param>
            ///<returns type="string|boolean">returns foo</returns>
            if (arguments.length === 0) {
                return options.format;
            }

            if (typeof newFormat !== 'string' && (typeof newFormat !== 'boolean' || newFormat !== false)) {
                throw new TypeError('format() expects a string or boolean:false parameter ' + newFormat);
            }

            options.format = newFormat;
            if (actualFormat) {
                initFormatting(); // reinit formatting
            }
            return picker;
        };

        picker.timeZone = function (newZone) {
            if (arguments.length === 0) {
                return options.timeZone;
            }

            if (typeof newZone !== 'string') {
                throw new TypeError('newZone() expects a string parameter');
            }

            options.timeZone = newZone;

            return picker;
        };

        picker.dayViewHeaderFormat = function (newFormat) {
            if (arguments.length === 0) {
                return options.dayViewHeaderFormat;
            }

            if (typeof newFormat !== 'string') {
                throw new TypeError('dayViewHeaderFormat() expects a string parameter');
            }

            options.dayViewHeaderFormat = newFormat;
            return picker;
        };

        picker.extraFormats = function (formats) {
            if (arguments.length === 0) {
                return options.extraFormats;
            }

            if (formats !== false && !(formats instanceof Array)) {
                throw new TypeError('extraFormats() expects an array or false parameter');
            }

            options.extraFormats = formats;
            if (parseFormats) {
                initFormatting(); // reinit formatting
            }
            return picker;
        };

        picker.disabledDates = function (dates) {
            ///<signature helpKeyword="$.fn.datetimepicker.disabledDates">
            ///<summary>Returns an array with the currently set disabled dates on the component.</summary>
            ///<returns type="array">options.disabledDates</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
            ///options.enabledDates if such exist.</summary>
            ///<param name="dates" locid="$.fn.datetimepicker.disabledDates_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.disabledDates ? $.extend({}, options.disabledDates) : options.disabledDates;
            }

            if (!dates) {
                options.disabledDates = false;
                update();
                return picker;
            }
            if (!(dates instanceof Array)) {
                throw new TypeError('disabledDates() expects an array parameter');
            }
            options.disabledDates = indexGivenDates(dates);
            options.enabledDates = false;
            update();
            return picker;
        };

        picker.enabledDates = function (dates) {
            ///<signature helpKeyword="$.fn.datetimepicker.enabledDates">
            ///<summary>Returns an array with the currently set enabled dates on the component.</summary>
            ///<returns type="array">options.enabledDates</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of options.disabledDates if such exist.</summary>
            ///<param name="dates" locid="$.fn.datetimepicker.enabledDates_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.enabledDates ? $.extend({}, options.enabledDates) : options.enabledDates;
            }

            if (!dates) {
                options.enabledDates = false;
                update();
                return picker;
            }
            if (!(dates instanceof Array)) {
                throw new TypeError('enabledDates() expects an array parameter');
            }
            options.enabledDates = indexGivenDates(dates);
            options.disabledDates = false;
            update();
            return picker;
        };

        picker.daysOfWeekDisabled = function (daysOfWeekDisabled) {
            if (arguments.length === 0) {
                return options.daysOfWeekDisabled.splice(0);
            }

            if (typeof daysOfWeekDisabled === 'boolean' && !daysOfWeekDisabled) {
                options.daysOfWeekDisabled = false;
                update();
                return picker;
            }

            if (!(daysOfWeekDisabled instanceof Array)) {
                throw new TypeError('daysOfWeekDisabled() expects an array parameter');
            }
            options.daysOfWeekDisabled = daysOfWeekDisabled.reduce(function (previousValue, currentValue) {
                currentValue = parseInt(currentValue, 10);
                if (currentValue > 6 || currentValue < 0 || isNaN(currentValue)) {
                    return previousValue;
                }
                if (previousValue.indexOf(currentValue) === -1) {
                    previousValue.push(currentValue);
                }
                return previousValue;
            }, []).sort();
            if (options.useCurrent && !options.keepInvalid) {
                var tries = 0;
                while (!isValid(date, 'd')) {
                    date.add(1, 'd');
                    if (tries === 31) {
                        throw 'Tried 31 times to find a valid date';
                    }
                    tries++;
                }
                setValue(date);
            }
            update();
            return picker;
        };

        picker.maxDate = function (maxDate) {
            if (arguments.length === 0) {
                return options.maxDate ? options.maxDate.clone() : options.maxDate;
            }

            if (typeof maxDate === 'boolean' && maxDate === false) {
                options.maxDate = false;
                update();
                return picker;
            }

            if (typeof maxDate === 'string') {
                if (maxDate === 'now' || maxDate === 'moment') {
                    maxDate = getMoment();
                }
            }

            var parsedDate = parseInputDate(maxDate);

            if (!parsedDate.isValid()) {
                throw new TypeError('maxDate() Could not parse date parameter: ' + maxDate);
            }
            if (options.minDate && parsedDate.isBefore(options.minDate)) {
                throw new TypeError('maxDate() date parameter is before options.minDate: ' + parsedDate.format(actualFormat));
            }
            options.maxDate = parsedDate;
            if (options.useCurrent && !options.keepInvalid && date.isAfter(maxDate)) {
                setValue(options.maxDate);
            }
            if (viewDate.isAfter(parsedDate)) {
                viewDate = parsedDate.clone().subtract(options.stepping, 'm');
            }
            update();
            return picker;
        };

        picker.minDate = function (minDate) {
            if (arguments.length === 0) {
                return options.minDate ? options.minDate.clone() : options.minDate;
            }

            if (typeof minDate === 'boolean' && minDate === false) {
                options.minDate = false;
                update();
                return picker;
            }

            if (typeof minDate === 'string') {
                if (minDate === 'now' || minDate === 'moment') {
                    minDate = getMoment();
                }
            }

            var parsedDate = parseInputDate(minDate);

            if (!parsedDate.isValid()) {
                throw new TypeError('minDate() Could not parse date parameter: ' + minDate);
            }
            if (options.maxDate && parsedDate.isAfter(options.maxDate)) {
                throw new TypeError('minDate() date parameter is after options.maxDate: ' + parsedDate.format(actualFormat));
            }
            options.minDate = parsedDate;
            if (options.useCurrent && !options.keepInvalid && date.isBefore(minDate)) {
                setValue(options.minDate);
            }
            if (viewDate.isBefore(parsedDate)) {
                viewDate = parsedDate.clone().add(options.stepping, 'm');
            }
            update();
            return picker;
        };

        picker.defaultDate = function (defaultDate) {
            ///<signature helpKeyword="$.fn.datetimepicker.defaultDate">
            ///<summary>Returns a moment with the options.defaultDate option configuration or false if not set</summary>
            ///<returns type="Moment">date.clone()</returns>
            ///</signature>
            ///<signature>
            ///<summary>Will set the picker's inital date. If a boolean:false value is passed the options.defaultDate parameter is cleared.</summary>
            ///<param name="defaultDate" locid="$.fn.datetimepicker.defaultDate_p:defaultDate">Takes a string, Date, moment, boolean:false</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.defaultDate ? options.defaultDate.clone() : options.defaultDate;
            }
            if (!defaultDate) {
                options.defaultDate = false;
                return picker;
            }

            if (typeof defaultDate === 'string') {
                if (defaultDate === 'now' || defaultDate === 'moment') {
                    defaultDate = getMoment();
                } else {
                    defaultDate = getMoment(defaultDate);
                }
            }

            var parsedDate = parseInputDate(defaultDate);
            if (!parsedDate.isValid()) {
                throw new TypeError('defaultDate() Could not parse date parameter: ' + defaultDate);
            }
            if (!isValid(parsedDate)) {
                throw new TypeError('defaultDate() date passed is invalid according to component setup validations');
            }

            options.defaultDate = parsedDate;

            if (options.defaultDate && options.inline || input.val().trim() === '') {
                setValue(options.defaultDate);
            }
            return picker;
        };

        picker.locale = function (locale) {
            if (arguments.length === 0) {
                return options.locale;
            }

            if (!moment.localeData(locale)) {
                throw new TypeError('locale() locale ' + locale + ' is not loaded from moment locales!');
            }

            options.locale = locale;
            date.locale(options.locale);
            viewDate.locale(options.locale);

            if (actualFormat) {
                initFormatting(); // reinit formatting
            }
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.stepping = function (stepping) {
            if (arguments.length === 0) {
                return options.stepping;
            }

            stepping = parseInt(stepping, 10);
            if (isNaN(stepping) || stepping < 1) {
                stepping = 1;
            }
            options.stepping = stepping;
            return picker;
        };

        picker.useCurrent = function (useCurrent) {
            var useCurrentOptions = ['year', 'month', 'day', 'hour', 'minute'];
            if (arguments.length === 0) {
                return options.useCurrent;
            }

            if (typeof useCurrent !== 'boolean' && typeof useCurrent !== 'string') {
                throw new TypeError('useCurrent() expects a boolean or string parameter');
            }
            if (typeof useCurrent === 'string' && useCurrentOptions.indexOf(useCurrent.toLowerCase()) === -1) {
                throw new TypeError('useCurrent() expects a string parameter of ' + useCurrentOptions.join(', '));
            }
            options.useCurrent = useCurrent;
            return picker;
        };

        picker.collapse = function (collapse) {
            if (arguments.length === 0) {
                return options.collapse;
            }

            if (typeof collapse !== 'boolean') {
                throw new TypeError('collapse() expects a boolean parameter');
            }
            if (options.collapse === collapse) {
                return picker;
            }
            options.collapse = collapse;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.icons = function (icons) {
            if (arguments.length === 0) {
                return $.extend({}, options.icons);
            }

            if (!(icons instanceof Object)) {
                throw new TypeError('icons() expects parameter to be an Object');
            }
            $.extend(options.icons, icons);
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.tooltips = function (tooltips) {
            if (arguments.length === 0) {
                return $.extend({}, options.tooltips);
            }

            if (!(tooltips instanceof Object)) {
                throw new TypeError('tooltips() expects parameter to be an Object');
            }
            $.extend(options.tooltips, tooltips);
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.useStrict = function (useStrict) {
            if (arguments.length === 0) {
                return options.useStrict;
            }

            if (typeof useStrict !== 'boolean') {
                throw new TypeError('useStrict() expects a boolean parameter');
            }
            options.useStrict = useStrict;
            return picker;
        };

        picker.sideBySide = function (sideBySide) {
            if (arguments.length === 0) {
                return options.sideBySide;
            }

            if (typeof sideBySide !== 'boolean') {
                throw new TypeError('sideBySide() expects a boolean parameter');
            }
            options.sideBySide = sideBySide;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.viewMode = function (viewMode) {
            if (arguments.length === 0) {
                return options.viewMode;
            }

            if (typeof viewMode !== 'string') {
                throw new TypeError('viewMode() expects a string parameter');
            }

            if (viewModes.indexOf(viewMode) === -1) {
                throw new TypeError('viewMode() parameter must be one of (' + viewModes.join(', ') + ') value');
            }

            options.viewMode = viewMode;
            currentViewMode = Math.max(viewModes.indexOf(viewMode), minViewModeNumber);

            showMode();
            return picker;
        };

        picker.toolbarPlacement = function (toolbarPlacement) {
            if (arguments.length === 0) {
                return options.toolbarPlacement;
            }

            if (typeof toolbarPlacement !== 'string') {
                throw new TypeError('toolbarPlacement() expects a string parameter');
            }
            if (toolbarPlacements.indexOf(toolbarPlacement) === -1) {
                throw new TypeError('toolbarPlacement() parameter must be one of (' + toolbarPlacements.join(', ') + ') value');
            }
            options.toolbarPlacement = toolbarPlacement;

            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.widgetPositioning = function (widgetPositioning) {
            if (arguments.length === 0) {
                return $.extend({}, options.widgetPositioning);
            }

            if ({}.toString.call(widgetPositioning) !== '[object Object]') {
                throw new TypeError('widgetPositioning() expects an object variable');
            }
            if (widgetPositioning.horizontal) {
                if (typeof widgetPositioning.horizontal !== 'string') {
                    throw new TypeError('widgetPositioning() horizontal variable must be a string');
                }
                widgetPositioning.horizontal = widgetPositioning.horizontal.toLowerCase();
                if (horizontalModes.indexOf(widgetPositioning.horizontal) === -1) {
                    throw new TypeError('widgetPositioning() expects horizontal parameter to be one of (' + horizontalModes.join(', ') + ')');
                }
                options.widgetPositioning.horizontal = widgetPositioning.horizontal;
            }
            if (widgetPositioning.vertical) {
                if (typeof widgetPositioning.vertical !== 'string') {
                    throw new TypeError('widgetPositioning() vertical variable must be a string');
                }
                widgetPositioning.vertical = widgetPositioning.vertical.toLowerCase();
                if (verticalModes.indexOf(widgetPositioning.vertical) === -1) {
                    throw new TypeError('widgetPositioning() expects vertical parameter to be one of (' + verticalModes.join(', ') + ')');
                }
                options.widgetPositioning.vertical = widgetPositioning.vertical;
            }
            update();
            return picker;
        };

        picker.calendarWeeks = function (calendarWeeks) {
            if (arguments.length === 0) {
                return options.calendarWeeks;
            }

            if (typeof calendarWeeks !== 'boolean') {
                throw new TypeError('calendarWeeks() expects parameter to be a boolean value');
            }

            options.calendarWeeks = calendarWeeks;
            update();
            return picker;
        };

        picker.showTodayButton = function (showTodayButton) {
            if (arguments.length === 0) {
                return options.showTodayButton;
            }

            if (typeof showTodayButton !== 'boolean') {
                throw new TypeError('showTodayButton() expects a boolean parameter');
            }

            options.showTodayButton = showTodayButton;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.showClear = function (showClear) {
            if (arguments.length === 0) {
                return options.showClear;
            }

            if (typeof showClear !== 'boolean') {
                throw new TypeError('showClear() expects a boolean parameter');
            }

            options.showClear = showClear;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.widgetParent = function (widgetParent) {
            if (arguments.length === 0) {
                return options.widgetParent;
            }

            if (typeof widgetParent === 'string') {
                widgetParent = $(widgetParent);
            }

            if (widgetParent !== null && typeof widgetParent !== 'string' && !(widgetParent instanceof $)) {
                throw new TypeError('widgetParent() expects a string or a jQuery object parameter');
            }

            options.widgetParent = widgetParent;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.keepOpen = function (keepOpen) {
            if (arguments.length === 0) {
                return options.keepOpen;
            }

            if (typeof keepOpen !== 'boolean') {
                throw new TypeError('keepOpen() expects a boolean parameter');
            }

            options.keepOpen = keepOpen;
            return picker;
        };

        picker.focusOnShow = function (focusOnShow) {
            if (arguments.length === 0) {
                return options.focusOnShow;
            }

            if (typeof focusOnShow !== 'boolean') {
                throw new TypeError('focusOnShow() expects a boolean parameter');
            }

            options.focusOnShow = focusOnShow;
            return picker;
        };

        picker.inline = function (inline) {
            if (arguments.length === 0) {
                return options.inline;
            }

            if (typeof inline !== 'boolean') {
                throw new TypeError('inline() expects a boolean parameter');
            }

            options.inline = inline;
            return picker;
        };

        picker.clear = function () {
            clear();
            return picker;
        };

        picker.keyBinds = function (keyBinds) {
            if (arguments.length === 0) {
                return options.keyBinds;
            }

            options.keyBinds = keyBinds;
            return picker;
        };

        picker.getMoment = function (d) {
            return getMoment(d);
        };

        picker.debug = function (debug) {
            if (typeof debug !== 'boolean') {
                throw new TypeError('debug() expects a boolean parameter');
            }

            options.debug = debug;
            return picker;
        };

        picker.allowInputToggle = function (allowInputToggle) {
            if (arguments.length === 0) {
                return options.allowInputToggle;
            }

            if (typeof allowInputToggle !== 'boolean') {
                throw new TypeError('allowInputToggle() expects a boolean parameter');
            }

            options.allowInputToggle = allowInputToggle;
            return picker;
        };

        picker.showClose = function (showClose) {
            if (arguments.length === 0) {
                return options.showClose;
            }

            if (typeof showClose !== 'boolean') {
                throw new TypeError('showClose() expects a boolean parameter');
            }

            options.showClose = showClose;
            return picker;
        };

        picker.keepInvalid = function (keepInvalid) {
            if (arguments.length === 0) {
                return options.keepInvalid;
            }

            if (typeof keepInvalid !== 'boolean') {
                throw new TypeError('keepInvalid() expects a boolean parameter');
            }
            options.keepInvalid = keepInvalid;
            return picker;
        };

        picker.datepickerInput = function (datepickerInput) {
            if (arguments.length === 0) {
                return options.datepickerInput;
            }

            if (typeof datepickerInput !== 'string') {
                throw new TypeError('datepickerInput() expects a string parameter');
            }

            options.datepickerInput = datepickerInput;
            return picker;
        };

        picker.parseInputDate = function (parseInputDate) {
            if (arguments.length === 0) {
                return options.parseInputDate;
            }

            if (typeof parseInputDate !== 'function') {
                throw new TypeError('parseInputDate() sholud be as function');
            }

            options.parseInputDate = parseInputDate;

            return picker;
        };

        picker.disabledTimeIntervals = function (disabledTimeIntervals) {
            ///<signature helpKeyword="$.fn.datetimepicker.disabledTimeIntervals">
            ///<summary>Returns an array with the currently set disabled dates on the component.</summary>
            ///<returns type="array">options.disabledTimeIntervals</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
            ///options.enabledDates if such exist.</summary>
            ///<param name="dates" locid="$.fn.datetimepicker.disabledTimeIntervals_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.disabledTimeIntervals ? $.extend({}, options.disabledTimeIntervals) : options.disabledTimeIntervals;
            }

            if (!disabledTimeIntervals) {
                options.disabledTimeIntervals = false;
                update();
                return picker;
            }
            if (!(disabledTimeIntervals instanceof Array)) {
                throw new TypeError('disabledTimeIntervals() expects an array parameter');
            }
            options.disabledTimeIntervals = disabledTimeIntervals;
            update();
            return picker;
        };

        picker.disabledHours = function (hours) {
            ///<signature helpKeyword="$.fn.datetimepicker.disabledHours">
            ///<summary>Returns an array with the currently set disabled hours on the component.</summary>
            ///<returns type="array">options.disabledHours</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
            ///options.enabledHours if such exist.</summary>
            ///<param name="hours" locid="$.fn.datetimepicker.disabledHours_p:hours">Takes an [ int ] of values and disallows the user to select only from those hours.</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.disabledHours ? $.extend({}, options.disabledHours) : options.disabledHours;
            }

            if (!hours) {
                options.disabledHours = false;
                update();
                return picker;
            }
            if (!(hours instanceof Array)) {
                throw new TypeError('disabledHours() expects an array parameter');
            }
            options.disabledHours = indexGivenHours(hours);
            options.enabledHours = false;
            if (options.useCurrent && !options.keepInvalid) {
                var tries = 0;
                while (!isValid(date, 'h')) {
                    date.add(1, 'h');
                    if (tries === 24) {
                        throw 'Tried 24 times to find a valid date';
                    }
                    tries++;
                }
                setValue(date);
            }
            update();
            return picker;
        };

        picker.enabledHours = function (hours) {
            ///<signature helpKeyword="$.fn.datetimepicker.enabledHours">
            ///<summary>Returns an array with the currently set enabled hours on the component.</summary>
            ///<returns type="array">options.enabledHours</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of options.disabledHours if such exist.</summary>
            ///<param name="hours" locid="$.fn.datetimepicker.enabledHours_p:hours">Takes an [ int ] of values and allows the user to select only from those hours.</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.enabledHours ? $.extend({}, options.enabledHours) : options.enabledHours;
            }

            if (!hours) {
                options.enabledHours = false;
                update();
                return picker;
            }
            if (!(hours instanceof Array)) {
                throw new TypeError('enabledHours() expects an array parameter');
            }
            options.enabledHours = indexGivenHours(hours);
            options.disabledHours = false;
            if (options.useCurrent && !options.keepInvalid) {
                var tries = 0;
                while (!isValid(date, 'h')) {
                    date.add(1, 'h');
                    if (tries === 24) {
                        throw 'Tried 24 times to find a valid date';
                    }
                    tries++;
                }
                setValue(date);
            }
            update();
            return picker;
        };
        /**
         * Returns the component's model current viewDate, a moment object or null if not set. Passing a null value unsets the components model current moment. Parsing of the newDate parameter is made using moment library with the options.format and options.useStrict components configuration.
         * @param {Takes string, viewDate, moment, null parameter.} newDate
         * @returns {viewDate.clone()}
         */
        picker.viewDate = function (newDate) {
            if (arguments.length === 0) {
                return viewDate.clone();
            }

            if (!newDate) {
                viewDate = date.clone();
                return picker;
            }

            if (typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
                throw new TypeError('viewDate() parameter must be one of [string, moment or Date]');
            }

            viewDate = parseInputDate(newDate);
            viewUpdate();
            return picker;
        };

        // initializing element and component attributes
        if (element.is('input')) {
            input = element;
        } else {
            input = element.find(options.datepickerInput);
            if (input.length === 0) {
                input = element.find('input');
            } else if (!input.is('input')) {
                throw new Error('CSS class "' + options.datepickerInput + '" cannot be applied to non input element');
            }
        }

        if (element.hasClass('input-group')) {
            // in case there is more then one 'input-group-addon' Issue #48
            if (element.find('.datepickerbutton').length === 0) {
                component = element.find('.input-group-addon');
            } else {
                component = element.find('.datepickerbutton');
            }
        }

        if (!options.inline && !input.is('input')) {
            throw new Error('Could not initialize DateTimePicker without an input element');
        }

        // Set defaults for date here now instead of in var declaration
        date = getMoment();
        viewDate = date.clone();

        $.extend(true, options, dataToOptions());

        picker.options(options);

        initFormatting();

        attachDatePickerElementEvents();

        if (input.prop('disabled')) {
            picker.disable();
        }
        if (input.is('input') && input.val().trim().length !== 0) {
            setValue(parseInputDate(input.val().trim()));
        } else if (options.defaultDate && input.attr('placeholder') === undefined) {
            setValue(options.defaultDate);
        }
        if (options.inline) {
            show();
        }
        return picker;
    };

    /********************************************************************************
     *
     * jQuery plugin constructor and defaults object
     *
     ********************************************************************************/

    /**
    * See (http://jquery.com/).
    * @name jQuery
    * @class
    * See the jQuery Library  (http://jquery.com/) for full details.  This just
    * documents the function and classes that are added to jQuery by this plug-in.
    */
    /**
     * See (http://jquery.com/)
     * @name fn
     * @class
     * See the jQuery Library  (http://jquery.com/) for full details.  This just
     * documents the function and classes that are added to jQuery by this plug-in.
     * @memberOf jQuery
     */
    /**
     * Show comments
     * @class datetimepicker
     * @memberOf jQuery.fn
     */
    $.fn.datetimepicker = function (options) {
        options = options || {};

        var args = Array.prototype.slice.call(arguments, 1),
            isInstance = true,
            thisMethods = ['destroy', 'hide', 'show', 'toggle'],
            returnValue;

        if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === 'object') {
            return this.each(function () {
                var $this = $(this),
                    _options;
                if (!$this.data('DateTimePicker')) {
                    // create a private copy of the defaults object
                    _options = $.extend(true, {}, $.fn.datetimepicker.defaults, options);
                    $this.data('DateTimePicker', dateTimePicker($this, _options));
                }
            });
        } else if (typeof options === 'string') {
            this.each(function () {
                var $this = $(this),
                    instance = $this.data('DateTimePicker');
                if (!instance) {
                    throw new Error('bootstrap-datetimepicker("' + options + '") method was called on an element that is not using DateTimePicker');
                }

                returnValue = instance[options].apply(instance, args);
                isInstance = returnValue === instance;
            });

            if (isInstance || $.inArray(options, thisMethods) > -1) {
                return this;
            }

            return returnValue;
        }

        throw new TypeError('Invalid arguments for DateTimePicker: ' + options);
    };

    $.fn.datetimepicker.defaults = {
        timeZone: '',
        format: false,
        dayViewHeaderFormat: 'MMMM YYYY',
        extraFormats: false,
        stepping: 1,
        minDate: false,
        maxDate: false,
        useCurrent: true,
        collapse: true,
        locale: moment.locale(),
        defaultDate: false,
        disabledDates: false,
        enabledDates: false,
        icons: {
            time: 'glyphicon glyphicon-time',
            date: 'glyphicon glyphicon-calendar',
            up: 'glyphicon glyphicon-chevron-up',
            down: 'glyphicon glyphicon-chevron-down',
            previous: 'glyphicon glyphicon-chevron-left',
            next: 'glyphicon glyphicon-chevron-right',
            today: 'glyphicon glyphicon-screenshot',
            clear: 'glyphicon glyphicon-trash',
            close: 'glyphicon glyphicon-remove'
        },
        tooltips: {
            today: 'Go to today',
            clear: 'Clear selection',
            close: 'Close the picker',
            selectMonth: 'Select Month',
            prevMonth: 'Previous Month',
            nextMonth: 'Next Month',
            selectYear: 'Select Year',
            prevYear: 'Previous Year',
            nextYear: 'Next Year',
            selectDecade: 'Select Decade',
            prevDecade: 'Previous Decade',
            nextDecade: 'Next Decade',
            prevCentury: 'Previous Century',
            nextCentury: 'Next Century',
            pickHour: 'Pick Hour',
            incrementHour: 'Increment Hour',
            decrementHour: 'Decrement Hour',
            pickMinute: 'Pick Minute',
            incrementMinute: 'Increment Minute',
            decrementMinute: 'Decrement Minute',
            pickSecond: 'Pick Second',
            incrementSecond: 'Increment Second',
            decrementSecond: 'Decrement Second',
            togglePeriod: 'Toggle Period',
            selectTime: 'Select Time'
        },
        useStrict: false,
        sideBySide: false,
        daysOfWeekDisabled: false,
        calendarWeeks: false,
        viewMode: 'days',
        toolbarPlacement: 'default',
        showTodayButton: false,
        showClear: false,
        showClose: false,
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'auto'
        },
        widgetParent: null,
        ignoreReadonly: false,
        keepOpen: false,
        focusOnShow: true,
        inline: false,
        keepInvalid: false,
        datepickerInput: '.datepickerinput',
        keyBinds: {
            up: function up(widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(7, 'd'));
                } else {
                    this.date(d.clone().add(this.stepping(), 'm'));
                }
            },
            down: function down(widget) {
                if (!widget) {
                    this.show();
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(7, 'd'));
                } else {
                    this.date(d.clone().subtract(this.stepping(), 'm'));
                }
            },
            'control up': function controlUp(widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'y'));
                } else {
                    this.date(d.clone().add(1, 'h'));
                }
            },
            'control down': function controlDown(widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'y'));
                } else {
                    this.date(d.clone().subtract(1, 'h'));
                }
            },
            left: function left(widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'd'));
                }
            },
            right: function right(widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'd'));
                }
            },
            pageUp: function pageUp(widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'M'));
                }
            },
            pageDown: function pageDown(widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'M'));
                }
            },
            enter: function enter() {
                this.hide();
            },
            escape: function escape() {
                this.hide();
            },
            //tab: function (widget) { //this break the flow of the form. disabling for now
            //    var toggle = widget.find('.picker-switch a[data-action="togglePicker"]');
            //    if(toggle.length > 0) toggle.click();
            //},
            'control space': function controlSpace(widget) {
                if (!widget) {
                    return;
                }
                if (widget.find('.timepicker').is(':visible')) {
                    widget.find('.btn[data-action="togglePeriod"]').click();
                }
            },
            t: function t() {
                this.date(this.getMoment());
            },
            'delete': function _delete() {
                this.clear();
            }
        },
        debug: false,
        allowInputToggle: false,
        disabledTimeIntervals: false,
        disabledHours: false,
        enabledHours: false,
        viewDate: false
    };

    return $.fn.datetimepicker;
});