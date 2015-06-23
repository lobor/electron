define([
	'angular',
], function(angular) {
	"use strict";
	return ['sfErrorMessageProvider', function(sfErrorMessageProvider) {
		var defaultMessages = {
		    'default': 'Ce champs n\'est pas validé',
		    0: 'Doit être un {{schema.type}}',
		    1: 'No enum match for: {{value}}',
		    10: 'Data does not match any schemas from "anyOf"',
		    11: 'Data does not match any schemas from "oneOf"',
		    12: 'Data is valid against more than one schema from "oneOf"',
		    13: 'Data matches schema from "not"',
		    // Numeric errors
		    100: 'La valeur n\'est pas un multiple de {{schema.divisibleBy}}',
		    101: '{{viewValue}} is less than the allowed minimum of {{schema.minimum}}',
		    102: '{{viewValue}} is equal to the exclusive minimum {{schema.minimum}}',
		    103: '{{viewValue}} is greater than the allowed maximum of {{schema.maximum}}',
		    104: '{{viewValue}} is equal to the exclusive maximum {{schema.maximum}}',
		    105: 'Doit être un nombre',
		    // String errors
		    200: 'String is too short ({{viewValue.length}} chars), minimum {{schema.minLength}}',
		    201: 'String is too long ({{viewValue.length}} chars), maximum {{schema.maxLength}}',
		    202: 'String does not match pattern: {{schema.pattern}}',
		    // Object errors
		    300: 'Too few properties defined, minimum {{schema.minProperties}}',
		    301: 'Too many properties defined, maximum {{schema.maxProperties}}',
		    302: 'Ce champs est requis',
		    303: 'Additional properties not allowed',
		    304: 'Dependency failed - key must exist',
		    // Array errors
		    400: 'Array is too short ({{value.length}}), minimum {{schema.maxItems}}',
		    401: 'Array is too long ({{value.length}}), maximum {{schema.minItems}}',
		    402: 'Array items are not unique',
		    403: 'Additional items not allowed',
		    // Format errors
		    500: 'Format validation failed',
		    501: 'Keyword failed: "{{title}}"',
		    // Schema structure
		    600: 'Circular $refs',
		    // Non-standard validation options
		    1000: 'Unknown property (not in schema)'
	  	};
		sfErrorMessageProvider.setDefaultMessages(defaultMessages)
	}];
});
