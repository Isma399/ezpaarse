/*jslint node: true, maxlen: 100, maxerr: 50, indent: 2 */
'use strict';

/**
 * Create a consultation event
 */
var ConsultationEvent = function (line, nb, validated) {
  var self = this;
  self._meta = { isValid: validated || false };
  if (nb)      { self._meta.lineNumber   = nb }
  if (line)    { self._meta.originalLine = line }

  self._clean = function () {
    for (var attr in self) {
      if (/^_/.test(attr)) { delete self[attr]; }
    }
  };
};

module.exports = ConsultationEvent;