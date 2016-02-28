"use strict";

function forEach(a, cb) {
	for (var i = 0; i < a.length; i++) {
		cb(a[i]);
	}
}
