(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~modules-posts-post-module~modules-users-user-module"],{

/***/ "./node_modules/filesize/lib/filesize.js":
/*!***********************************************!*\
  !*** ./node_modules/filesize/lib/filesize.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * filesize
 *
 * @copyright 2019 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 4.1.2
 */
(function (global) {
	var b = /^(b|B)$/,
	    symbol = {
		iec: {
			bits: ["b", "Kib", "Mib", "Gib", "Tib", "Pib", "Eib", "Zib", "Yib"],
			bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
		},
		jedec: {
			bits: ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"],
			bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
		}
	},
	    fullform = {
		iec: ["", "kibi", "mebi", "gibi", "tebi", "pebi", "exbi", "zebi", "yobi"],
		jedec: ["", "kilo", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta"]
	};

	/**
  * filesize
  *
  * @method filesize
  * @param  {Mixed}   arg        String, Int or Float to transform
  * @param  {Object}  descriptor [Optional] Flags
  * @return {String}             Readable file size String
  */
	function filesize(arg) {
		var descriptor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		var result = [],
		    val = 0,
		    e = void 0,
		    base = void 0,
		    bits = void 0,
		    ceil = void 0,
		    full = void 0,
		    fullforms = void 0,
		    locale = void 0,
		    neg = void 0,
		    num = void 0,
		    output = void 0,
		    round = void 0,
		    unix = void 0,
		    separator = void 0,
		    spacer = void 0,
		    standard = void 0,
		    symbols = void 0;

		if (isNaN(arg)) {
			throw new TypeError("Invalid number");
		}

		bits = descriptor.bits === true;
		unix = descriptor.unix === true;
		base = descriptor.base || 2;
		round = descriptor.round !== void 0 ? descriptor.round : unix ? 1 : 2;
		locale = descriptor.locale !== void 0 ? descriptor.locale : "";
		separator = descriptor.separator !== void 0 ? descriptor.separator : "";
		spacer = descriptor.spacer !== void 0 ? descriptor.spacer : unix ? "" : " ";
		symbols = descriptor.symbols || {};
		standard = base === 2 ? descriptor.standard || "jedec" : "jedec";
		output = descriptor.output || "string";
		full = descriptor.fullform === true;
		fullforms = descriptor.fullforms instanceof Array ? descriptor.fullforms : [];
		e = descriptor.exponent !== void 0 ? descriptor.exponent : -1;
		num = Number(arg);
		neg = num < 0;
		ceil = base > 2 ? 1000 : 1024;

		// Flipping a negative number to determine the size
		if (neg) {
			num = -num;
		}

		// Determining the exponent
		if (e === -1 || isNaN(e)) {
			e = Math.floor(Math.log(num) / Math.log(ceil));

			if (e < 0) {
				e = 0;
			}
		}

		// Exceeding supported length, time to reduce & multiply
		if (e > 8) {
			e = 8;
		}

		if (output === "exponent") {
			return e;
		}

		// Zero is now a special case because bytes divide by 1
		if (num === 0) {
			result[0] = 0;
			result[1] = unix ? "" : symbol[standard][bits ? "bits" : "bytes"][e];
		} else {
			val = num / (base === 2 ? Math.pow(2, e * 10) : Math.pow(1000, e));

			if (bits) {
				val = val * 8;

				if (val >= ceil && e < 8) {
					val = val / ceil;
					e++;
				}
			}

			result[0] = Number(val.toFixed(e > 0 ? round : 0));
			result[1] = base === 10 && e === 1 ? bits ? "kb" : "kB" : symbol[standard][bits ? "bits" : "bytes"][e];

			if (unix) {
				result[1] = standard === "jedec" ? result[1].charAt(0) : e > 0 ? result[1].replace(/B$/, "") : result[1];

				if (b.test(result[1])) {
					result[0] = Math.floor(result[0]);
					result[1] = "";
				}
			}
		}

		// Decorating a 'diff'
		if (neg) {
			result[0] = -result[0];
		}

		// Applying custom symbol
		result[1] = symbols[result[1]] || result[1];

		if (locale === true) {
			result[0] = result[0].toLocaleString();
		} else if (locale.length > 0) {
			result[0] = result[0].toLocaleString(locale);
		} else if (separator.length > 0) {
			result[0] = result[0].toString().replace(".", separator);
		}

		// Returning Array, Object, or String (default)
		if (output === "array") {
			return result;
		}

		if (full) {
			result[1] = fullforms[e] ? fullforms[e] : fullform[standard][e] + (bits ? "bit" : "byte") + (result[0] === 1 ? "" : "s");
		}

		if (output === "object") {
			return { value: result[0], symbol: result[1] };
		}

		return result.join(spacer);
	}

	// Partial application for functional programming
	filesize.partial = function (opt) {
		return function (arg) {
			return filesize(arg, opt);
		};
	};

	// CommonJS, AMD, script tag
	if (true) {
		module.exports = filesize;
	} else {}
})(typeof window !== "undefined" ? window : global);


/***/ }),

/***/ "./node_modules/ngx-filesize/dist/filesize.module.js":
/*!***********************************************************!*\
  !*** ./node_modules/ngx-filesize/dist/filesize.module.js ***!
  \***********************************************************/
/*! exports provided: FileSizeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileSizeModule", function() { return FileSizeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _filesize_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filesize.pipe */ "./node_modules/ngx-filesize/dist/filesize.pipe.js");


var FileSizeModule = /** @class */ (function () {
    function FileSizeModule() {
    }
    FileSizeModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    declarations: [
                        _filesize_pipe__WEBPACK_IMPORTED_MODULE_1__["FileSizePipe"]
                    ],
                    exports: [
                        _filesize_pipe__WEBPACK_IMPORTED_MODULE_1__["FileSizePipe"]
                    ]
                },] },
    ];
    return FileSizeModule;
}());

//# sourceMappingURL=filesize.module.js.map

/***/ }),

/***/ "./node_modules/ngx-filesize/dist/filesize.pipe.js":
/*!*********************************************************!*\
  !*** ./node_modules/ngx-filesize/dist/filesize.pipe.js ***!
  \*********************************************************/
/*! exports provided: FileSizePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileSizePipe", function() { return FileSizePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var filesize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! filesize */ "./node_modules/filesize/lib/filesize.js");
/* harmony import */ var filesize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(filesize__WEBPACK_IMPORTED_MODULE_1__);


var FileSizePipe = /** @class */ (function () {
    function FileSizePipe() {
    }
    FileSizePipe.prototype.transform = function (value, options) {
        if (Array.isArray(value)) {
            return value.map(function (val) { return FileSizePipe.transformOne(val, options); });
        }
        return FileSizePipe.transformOne(value, options);
    };
    FileSizePipe.transformOne = function (value, options) {
        return filesize__WEBPACK_IMPORTED_MODULE_1__(value, options);
    };
    FileSizePipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                    name: 'filesize'
                },] },
    ];
    return FileSizePipe;
}());

//# sourceMappingURL=filesize.pipe.js.map

/***/ }),

/***/ "./node_modules/ngx-filesize/dist/index.js":
/*!*************************************************!*\
  !*** ./node_modules/ngx-filesize/dist/index.js ***!
  \*************************************************/
/*! exports provided: FileSizeModule, FileSizePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filesize_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filesize.module */ "./node_modules/ngx-filesize/dist/filesize.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FileSizeModule", function() { return _filesize_module__WEBPACK_IMPORTED_MODULE_0__["FileSizeModule"]; });

/* harmony import */ var _filesize_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filesize.pipe */ "./node_modules/ngx-filesize/dist/filesize.pipe.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FileSizePipe", function() { return _filesize_pipe__WEBPACK_IMPORTED_MODULE_1__["FileSizePipe"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/modules/users/components/Photo-Editor/Photo-Editor.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/modules/users/components/Photo-Editor/Photo-Editor.component.html ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-2\" *ngFor=\"let photo of photos\">\n        <img src=\"{{photo}}\" class=\"img-thumbnail p1\" alt=\"\">\n        <div class=\"text-center\" *ngIf=\"post!=='post'\">\n            <button type=\"button\" class=\"btn btn-sm mr-2\" (click)=\"setMainPhoto(photo)\" [disabled]=\"photo.isMain\" [ngClass]=\"isMain(photo) ? 'btn btn-success active':'btn btn-secondary' \">Main</button>\n            <button type=\"button\" class=\"btn btn-sm btn-danger mt-1\" (click)=\"deletePhoto(photo)\" [disabled]=\"isMain(photo)\"><i class=\"fa fa-trash\"></i></button>\n        </div>\n    </div>\n</div>\n\n<div class=\" mt-3\">\n    <div class=\"dropzone\" appDropZone (hovered)=\"toggleHover($event)\" (Dropped)=\"startUpload($event)\" [class.hovering]=\"isHovring\">\n\n\n\n        <h3>File Drop Zone</h3>\n\n        <div class=\"file\">\n            <label class=\"file-label\">\n      \n      \n              <input class=\"file-input\" type=\"file\" (change)=\"startUpload($event.target.files)\">\n      \n      \n                <span class=\"file-cta\">\n                  <span class=\"file-icon\">\n                    <i class=\"fa fa-upload\"></i>\n                  </span>\n                  <span class=\"file-label\">\n                    or choose a file…\n                  </span>\n                </span>\n              </label>\n        </div>\n    </div>\n    <div *ngIf=\"progressBase | async as pct\">\n\n        <div class=\"progress mb-4\">\n            <!-- <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\" 'width': {{pct | number}} + '%' \"></div> -->\n        </div>\n\n\n    </div>\n\n\n    <div *ngIf=\"snapShot | async as snap\">\n        {{ snap.bytesTransferred | filesize }} of {{ snap.totalBytes | filesize }}\n\n        <button (click)=\"task.pause()\" class=\"btn btn-warning\" [disabled]=\"!isActive(snap)\">Pause</button>\n        <button (click)=\"task.cancel()\" class=\"btn btn-danger\" [disabled]=\"!isActive(snap)\">Cancel</button>\n        <button (click)=\"task.resume()\" class=\"btn btn-info\" [disabled]=\"!(snap?.state === 'paused')\">Resume</button>\n\n    </div>\n\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/modules/users/components/member-Card/member-Card.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/modules/users/components/member-Card/member-Card.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card mb-4\">\r\n    <div class=\"card-img-wrapper\">\r\n        <img src=\"{{user.photosUrl || '../../../../../../../assets/images/user.png\" class=\"card-img-top\" alt=\"{{user.displayName}}\" />\r\n        <ul class=\"list-inline member-icons animate text-center\">\r\n            <li class=\"list-inline-item\"><button style=\"font-size: 20px\" class=\"btn btn-primary \" [routerLink]=\"['/members/', user.uid]\">\r\n                <i class=\"fa fa-user\"></i></button></li>\r\n            <li class=\"list-inline-item\">\r\n                <button [disabled]=\"!done\" style=\"font-size: 20px\" class=\"btn btn-primary\">\r\n              <i class=\"fa fa-heart\" *ngIf=\"done\"></i>\r\n              <i class=\"demo-icon icon-spin6 animate-spin\" *ngIf=\"!done\"><div id=\"xe839\"></div></i>\r\n             \r\n       \r\n          \r\n        </button></li>\r\n            <li class=\"list-inline-item\"><button style=\"font-size: 20px\" class=\"btn btn-primary \">\r\n        <i class=\"fa fa-envelope\"></i></button></li>\r\n        </ul>\r\n    </div>\r\n    <div class=\"card-body p-1\">\r\n        <h6 class=\"card-title text-center mb-1\">\r\n            <i class=\"fa fa-user\"></i>{{user.displayName}}\r\n        </h6>\r\n    </div>\r\n    <p class=\"card-text text-muted text-center\">{{ user.city }}</p>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/modules/users/pages/detail-user-page/detail-user-page.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/modules/users/pages/detail-user-page/detail-user-page.component.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\">\n    <app-hero-loading *ngIf=\"!user\"></app-hero-loading>\n\n    <div *ngIf=\"user\" class=\"content-wrapper\">\n        <div class=\"row \">\n            <div class=\"col-sm-4\">\n                <h1 class=\"bold\">{{ user.displayName }}'s Profile</h1>\n            </div>\n\n\n        </div>\n        <div class=\"row\">\n            <div class=\"col-sm-4 \">\n                <div class=\"card card-fluid\">\n                    <img src=\"{{user.photoURL }}\" alt=\"{{ user.knownAs }}\" class=\"card-img-top img-thumbnail\" />\n                    <div class=\"card-body\">\n                        <div>\n                            <star-rating [starType]=\"'svg'\" [rating]=\"user.rate\" [disabled]=\"true\"></star-rating>\n\n                        </div>\n                        <div>\n                            <strong>Location:</strong>\n                            <p>{{user.city }}</p>\n                        </div>\n                        <div>\n                            <strong>Age:</strong>\n                            <p>{{ user.age }}</p>\n                        </div>\n                        <div>\n                            <strong>Last Active:</strong>\n                            <p *ngIf=\"presence$ | async as presence\" [ngClass]=\"{\n                                    'alert-success':  presence.status  === 'online',\n                                    'alert-warning': presence.status  === 'away',\n                                    'alert-danger':  presence.status  === 'offline'\n                                }\">\n                                {{presence.status}}</p>\n                        </div>\n                        <div>\n                            <strong>Member since:</strong>\n                            <p>{{ user.created |date: 'mediumDate' }}</p>\n                        </div>\n                    </div>\n                    <div class=\"card-footer\">\n\n\n\n\n                        <div class=\"btn-group d-flex\" *ngIf=\"Action\">\n                            <button [disabled]=\"!done\" style=\"font-size: 20px\" (click)=\"like()\" [ngClass]=\" x? 'btn-primary': 'btn-danger'\" class=\"btn   mr-3\">\n                                <i class=\"fa fa-thumbs-up\" *ngIf=\"x\"></i>\n                                <i class=\"demo-icon icon-spin6 animate-spin\" *ngIf=\"!done\"><div id=\"xe839\"></div></i>\n                               \n                                <i class=\"fa fa-thumbs-down\" *ngIf=\"!x\"></i>\n                               \n                              </button>\n                            <button style=\"font-size: 20px\" (click)=\"sendMessage()\" class=\"btn btn-success\">\n                                <i class=\"fa fa-comments\"></i>\n                              </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-sm-8 \">\n                <div class=\"tab-panel\">\n                    <mat-tab-group (selectedTabChange)=\"getReview($event)\" class=\"member-tabset\">\n                        <mat-tab label=\"Posts\" style=\"background-color:gray !important \">\n\n\n                            <div *ngIf=\"user.posts\" style=\"background-color:gray !important \">\n                                <app-post-card style=\"width:90%\" *ngFor=\"let post of user.posts\" [id]=\"post\"></app-post-card>\n                            </div>\n\n                        </mat-tab>\n\n                        <mat-tab label=\"Profile\">\n                            <h4>Description:</h4>\n                            <pre>{{user.bio}}</pre>\n\n                            <h4>Intresets</h4>\n                            <pre>{{user.intrest}}</pre>\n                            <h4>Location Details:</h4>\n                            <div class=\"form-inline\">\n                                <label class=\"center-block\" for=\"city\">City : &nbsp; &nbsp; &nbsp;</label>\n                                <pre id=\"city\">{{user.city}}</pre>\n                            </div>\n                            <h4>Personal data :</h4>\n                            <div class=\"form-inline\">\n                                <label for=\"age\">Age : &nbsp; &nbsp; &nbsp;</label>\n                                <pre>{{user.age}}</pre>\n                            </div>\n                        </mat-tab>\n\n                        <mat-tab label=\" Galary\">\n                            <ngx-gallery [options]=\"galleryOptions\" [images]=\"galleryImages\"></ngx-gallery>\n                        </mat-tab>\n                        <mat-tab (click)=\"getReview()\" label=\"reviews\">\n                            <app-review-card *ngFor=\"let review of reviews\" [review]=\"review\"></app-review-card>\n                            <hr>\n                        </mat-tab>\n                    </mat-tab-group>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/modules/users/pages/edit-user-page/edit-user-page.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/modules/users/pages/edit-user-page/edit-user-page.component.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\">\n    <app-hero-loading *ngIf=\"user===undefined\"></app-hero-loading>\n\n    <div *ngIf=\"user\" class=\"content-wrapper\">\n        <div class=\"row \">\n            <div class=\"col-sm-4\">\n                <h1 class=\"bold\">{{ user.displayName }}'s Profile</h1>\n            </div>\n\n            <div class=\"col-sm-8\">\n                <div *ngIf=\"editForm.dirty\" class=\"alert alert-info\">\n                    <strong>Information:</strong> You have made change. Any unsaved changes will be lost\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-sm-4 \">\n                <div class=\"card card-fluid\">\n                    <img src=\"{{user.photoURL }}\" alt=\"{{ user.knownAs }}\" class=\"card-img-top img-thumbnail\" />\n                    <div class=\"card-body\">\n                        <div>\n                            <strong>Location:</strong>\n                            <p>{{user.city }}</p>\n                        </div>\n                        <div>\n                            <strong>Age:</strong>\n                            <p>{{ user.age }}</p>\n                        </div>\n                        <div>\n                            <strong>Last Active:</strong>\n                            <p *ngIf=\"presence$ | async as presence\" [ngClass]=\"{\n                                'alert-success':  presence.status  === 'online',\n                                'alert-warning': presence.status  === 'away',\n                                'alert-danger':  presence.status  === 'offline'\n                            }\">\n                                {{presence.status}}</p>\n                        </div>\n                        <div>\n                            <strong>Member since:</strong>\n                            <p>{{ user.created |date: 'mediumDate' }}</p>\n                        </div>\n                    </div>\n                    <div *ngIf=\"canEdit\" class=\"card-footer\">\n                        <button form=\"editform\" [disabled]=\"!editForm.dirty\" style=\"font-size: 20px\" class=\"btn btn-success btn-block  mr-3\">\n               <span class=\"mat-button-wrapper\">Save Changes</span>  <i class=\"fa fa-save\"></i>\n              </button>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-sm-8 \">\n                <div class=\"tab-panel\">\n                    <mat-tab-group (selectedTabChange)=\"getReview($event)\" class=\"member-tabset\">\n                        <mat-tab label=\"Main Info\">\n                            <ngx-auth-firebaseui-user [canDeleteAccount]=\"false\"></ngx-auth-firebaseui-user>\n                        </mat-tab>\n                        <mat-tab label=\"Posts\" style=\"background-color:gray !important \">\n\n\n                            <div *ngIf=\"user.posts\" style=\"background-color:gray !important \">\n                                <app-post-card style=\"width:90%\" *ngFor=\"let post of user.posts\" [id]=\"post\"></app-post-card>\n                            </div>\n\n\n\n                        </mat-tab>\n                        <mat-tab label=\"Edit Profile\">\n                            <form #editForm=\"ngForm\" id=\"editform\" (ngSubmit)=\"updateProfile()\">\n                                <h4>Description:</h4>\n                                <textarea name=\"bio\" rows=\"1\" class=\"form-control\" [(ngModel)]=\"user.bio\"></textarea>\n\n                                <h4>Intresets</h4>\n                                <textarea name=\"intrest\" rows=\"1\" class=\"form-control\" [(ngModel)]=\"user.intrest\">{{user.intrest}}</textarea>\n                                <h4>Location Details:</h4>\n                                <div class=\"form-inline\">\n                                    <label for=\"city\">City</label>\n                                    <input type=\"text\" name=\"city\" class=\"form-control ml-2\" [(ngModel)]=\"user.city\" />\n                                </div>\n                                <h4>Personal data :</h4>\n                                <div class=\"form-inline\">\n                                    <label for=\"age\">Age</label>\n                                    <input type=\"text\" name=\"age\" class=\"form-control ml-2\" [(ngModel)]=\"user.age\" />\n                                </div>\n                            </form>\n                        </mat-tab>\n\n                        <mat-tab label=\"Edit Photos\" *ngIf=\"canEdit\">\n                            <app-Photo-Editor [photos]=\"user.photos\" (user)=\"setMainPhoto($event)\"></app-Photo-Editor>\n                        </mat-tab>\n                        <mat-tab label=\" Galary\">\n                            <ngx-gallery [options]=\"galleryOptions\" [images]=\"galleryImages\"></ngx-gallery>\n                        </mat-tab>\n                        <mat-tab (click)=\"getReview()\" label=\"reviews\">\n                            <app-review-card *ngFor=\"let review of reviews\" [review]=\"review\"></app-review-card>\n                            <hr>\n                        </mat-tab>\n                    </mat-tab-group>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/modules/users/components/Photo-Editor/Photo-Editor.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/modules/users/components/Photo-Editor/Photo-Editor.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dropzone {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  height: 300px;\n  border: 2px dashed #f16624;\n  border-radius: 5px;\n  background: white;\n  margin: 10px 0; }\n  .dropzone.hovering {\n    border: 2px solid #f16624;\n    color: #dadada !important; }\n  progress::-webkit-progress-value {\n  transition: width 0.1s ease; }\n  .img-thumbnail {\n  height: 100px;\n  min-width: 100px;\n  margin-bottom: 2px;\n  margin-top: 2px; }\n  .my-drop-zone {\n  border: dotted 3px lightgray; }\n  .nv-file-over {\n  border: dotted 3px red; }\n  /* Default class applied to drop zones on over */\n  .another-file-over-class {\n  border: dotted 3px green; }\n  html,\nbody {\n  height: 100%; }\n  input[type=file] {\n  color: transparent; }\n  .mianphoto {\n  background-color: red;\n  opacity: 30%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy91c2Vycy9jb21wb25lbnRzL1Bob3RvLUVkaXRvci9DOlxcVXNlcnNcXHd3d211XFxPbmVEcml2ZVxcRGVza3RvcFxcVW5pdGVkIFNlcnZpY2Uvc3JjXFxhcHBcXG1vZHVsZXNcXHVzZXJzXFxjb21wb25lbnRzXFxQaG90by1FZGl0b3JcXFBob3RvLUVkaXRvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHNCQUFtQjtNQUFuQixtQkFBbUI7RUFDbkIscUJBQXVCO01BQXZCLHVCQUF1QjtFQUN2QiwwQkFBc0I7TUFBdEIsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYiwwQkFBMEI7RUFDMUIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixjQUFjLEVBQUE7RUFUbEI7SUFXUSx5QkFBeUI7SUFDekIseUJBQXlCLEVBQUE7RUFJakM7RUFDSSwyQkFBMkIsRUFBQTtFQUcvQjtFQUNJLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGVBQWUsRUFBQTtFQUduQjtFQUNJLDRCQUE0QixFQUFBO0VBR2hDO0VBQ0ksc0JBQXNCLEVBQUE7RUFJMUIsZ0RBQUE7RUFFQTtFQUNJLHdCQUF3QixFQUFBO0VBRzVCOztFQUVJLFlBQVksRUFBQTtFQUdoQjtFQUNJLGtCQUFrQixFQUFBO0VBR3RCO0VBQ0kscUJBQXFCO0VBQ3JCLFlBQ0osRUFBQSIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvdXNlcnMvY29tcG9uZW50cy9QaG90by1FZGl0b3IvUGhvdG8tRWRpdG9yLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRyb3B6b25lIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgaGVpZ2h0OiAzMDBweDtcclxuICAgIGJvcmRlcjogMnB4IGRhc2hlZCAjZjE2NjI0O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBtYXJnaW46IDEwcHggMDtcclxuICAgICYuaG92ZXJpbmcge1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICNmMTY2MjQ7XHJcbiAgICAgICAgY29sb3I6ICNkYWRhZGEgIWltcG9ydGFudDtcclxuICAgIH1cclxufVxyXG5cclxucHJvZ3Jlc3M6Oi13ZWJraXQtcHJvZ3Jlc3MtdmFsdWUge1xyXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC4xcyBlYXNlO1xyXG59XHJcblxyXG4uaW1nLXRodW1ibmFpbCB7XHJcbiAgICBoZWlnaHQ6IDEwMHB4O1xyXG4gICAgbWluLXdpZHRoOiAxMDBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDJweDtcclxuICAgIG1hcmdpbi10b3A6IDJweDtcclxufVxyXG5cclxuLm15LWRyb3Atem9uZSB7XHJcbiAgICBib3JkZXI6IGRvdHRlZCAzcHggbGlnaHRncmF5O1xyXG59XHJcblxyXG4ubnYtZmlsZS1vdmVyIHtcclxuICAgIGJvcmRlcjogZG90dGVkIDNweCByZWQ7XHJcbn1cclxuXHJcblxyXG4vKiBEZWZhdWx0IGNsYXNzIGFwcGxpZWQgdG8gZHJvcCB6b25lcyBvbiBvdmVyICovXHJcblxyXG4uYW5vdGhlci1maWxlLW92ZXItY2xhc3Mge1xyXG4gICAgYm9yZGVyOiBkb3R0ZWQgM3B4IGdyZWVuO1xyXG59XHJcblxyXG5odG1sLFxyXG5ib2R5IHtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1maWxlXSB7XHJcbiAgICBjb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi5taWFucGhvdG8ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xyXG4gICAgb3BhY2l0eTogMzAlXHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/modules/users/components/Photo-Editor/Photo-Editor.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/modules/users/components/Photo-Editor/Photo-Editor.component.ts ***!
  \*********************************************************************************/
/*! exports provided: PhotoEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoEditorComponent", function() { return PhotoEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/storage */ "./node_modules/@angular/fire/storage/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_core_services_logger_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/logger.service */ "./src/app/core/services/logger.service.ts");
/* harmony import */ var src_app_core_services_user_utils_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/user-utils.service */ "./src/app/core/services/user-utils.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Guid = /** @class */ (function () {
    function Guid() {
    }
    Guid.newGuid = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Guid;
}());
var PhotoEditorComponent = /** @class */ (function () {
    function PhotoEditorComponent(storages, userService, LoggerService) {
        this.storages = storages;
        this.userService = userService;
        this.LoggerService = LoggerService;
        this.user = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.done = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.hasBaseDropZoneOver = false;
        this.userID = JSON.parse(localStorage.getItem("user")).uid;
        this.url = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    PhotoEditorComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    PhotoEditorComponent.prototype.toggleHover = function (event) {
        this.isHovring = event;
    };
    PhotoEditorComponent.prototype.isMain = function (photoUrl) {
        return this.userService.getProfilePicUrl() === photoUrl;
    };
    PhotoEditorComponent.prototype.startUpload = function (event) {
        var _this = this;
        var file = event.item(0);
        if (file.type.split("/")[0] !== "image") {
            this.LoggerService.showSnackBar("this is not photo");
        }
        var path;
        if (this.pp === "post") {
            path = this.userID + "_" + Guid.newGuid() + "_" + file.name;
        }
        else {
            path = this.userID + "/" + Guid.newGuid() + "_" + file.name;
        }
        var metaData = { customMetadata: { app: "asdasddasd" } };
        this.task = this.storages.upload(path, file, metaData);
        this.progressBase = this.task.percentageChanges();
        this.snapShot = this.task.snapshotChanges();
        this.task.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["finalize"])(function () {
            _this.downloadUrl = _this.storages.ref(path).getDownloadURL();
            if (_this.pp === "post") {
                _this.downloadUrl.subscribe(function (url) { return _this.url.emit(url); });
                _this.done.emit(true);
            }
            else {
                _this.downloadUrl.subscribe(function (url) { return _this.userService.addPhoto(url); });
            }
        })).subscribe();
        this.task.catch(function (err) { return src_app_core_services_logger_service__WEBPACK_IMPORTED_MODULE_3__["LoggerService"].log(err.message); });
    };
    PhotoEditorComponent.prototype.isActive = function (snapshot) {
        return snapshot.state === "running" && snapshot.bytesTransferred < snapshot.totalBytes;
    };
    PhotoEditorComponent.prototype.ngOnInit = function () {
        // this.initilizeUploder();
    };
    PhotoEditorComponent.prototype.setMainPhoto = function (photo) {
        this.userService.setMainPhoto(photo);
        this.user.emit(photo);
    };
    PhotoEditorComponent.prototype.deletePhoto = function (photo) {
        this.userService.deletePhoto(photo);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], PhotoEditorComponent.prototype, "photos", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], PhotoEditorComponent.prototype, "pp", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PhotoEditorComponent.prototype, "user", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PhotoEditorComponent.prototype, "done", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PhotoEditorComponent.prototype, "url", void 0);
    PhotoEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-Photo-Editor",
            template: __webpack_require__(/*! raw-loader!./Photo-Editor.component.html */ "./node_modules/raw-loader/index.js!./src/app/modules/users/components/Photo-Editor/Photo-Editor.component.html"),
            styles: [__webpack_require__(/*! ./Photo-Editor.component.scss */ "./src/app/modules/users/components/Photo-Editor/Photo-Editor.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_fire_storage__WEBPACK_IMPORTED_MODULE_1__["AngularFireStorage"],
            src_app_core_services_user_utils_service__WEBPACK_IMPORTED_MODULE_4__["UserUtilsService"],
            src_app_core_services_logger_service__WEBPACK_IMPORTED_MODULE_3__["LoggerService"]])
    ], PhotoEditorComponent);
    return PhotoEditorComponent;
}());



/***/ }),

/***/ "./src/app/modules/users/components/member-Card/member-Card.component.css":
/*!********************************************************************************!*\
  !*** ./src/app/modules/users/components/member-Card/member-Card.component.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card:hover img {\r\n  -webkit-transform: scale(1.2, 1.2);\r\n          transform: scale(1.2, 1.2);\r\n  transition-duration: 500ms;\r\n  transition-timing-function: ease-out;\r\n  opacity: 0.7;\r\n}\r\n\r\n.card img {\r\n  -webkit-transform: scale(1, 1);\r\n          transform: scale(1, 1);\r\n  transition-duration: 500ms;\r\n  transition-timing-function: ease-out;\r\n}\r\n\r\n.card-img-wrapper {\r\n  overflow: hidden;\r\n  position: relative;\r\n}\r\n\r\n.member-icons {\r\n    position: absolute;\r\n    bottom: -30%;\r\n    left: 0;\r\n    right: 0;\r\n    margin-right:auto;\r\n    margin-left: auto;\r\n    opacity: 0; \r\n}\r\n\r\n.card-img-wrapper:hover .member-icons  {\r\n    bottom: 0;\r\n    opacity: 1;\r\n}\r\n\r\n.animate{\r\n    transition:all 0.3s ease-in-out;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy91c2Vycy9jb21wb25lbnRzL21lbWJlci1DYXJkL21lbWJlci1DYXJkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQ0FBMEI7VUFBMUIsMEJBQTBCO0VBQzFCLDBCQUEwQjtFQUMxQixvQ0FBb0M7RUFDcEMsWUFBWTtBQUNkOztBQUVBO0VBQ0UsOEJBQXNCO1VBQXRCLHNCQUFzQjtFQUN0QiwwQkFBMEI7RUFDMUIsb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osT0FBTztJQUNQLFFBQVE7SUFDUixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLFVBQVU7QUFDZDs7QUFDQTtJQUNJLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBQ0E7SUFDSSwrQkFBK0I7QUFDbkMiLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL3VzZXJzL2NvbXBvbmVudHMvbWVtYmVyLUNhcmQvbWVtYmVyLUNhcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJkOmhvdmVyIGltZyB7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjIsIDEuMik7XHJcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogNTAwbXM7XHJcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xyXG4gIG9wYWNpdHk6IDAuNztcclxufVxyXG5cclxuLmNhcmQgaW1nIHtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEsIDEpO1xyXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDUwMG1zO1xyXG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcclxufVxyXG5cclxuLmNhcmQtaW1nLXdyYXBwZXIge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbi5tZW1iZXItaWNvbnMge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAtMzAlO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgbWFyZ2luLXJpZ2h0OmF1dG87XHJcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcclxuICAgIG9wYWNpdHk6IDA7IFxyXG59XHJcbi5jYXJkLWltZy13cmFwcGVyOmhvdmVyIC5tZW1iZXItaWNvbnMgIHtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIG9wYWNpdHk6IDE7XHJcbn1cclxuLmFuaW1hdGV7XHJcbiAgICB0cmFuc2l0aW9uOmFsbCAwLjNzIGVhc2UtaW4tb3V0O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/modules/users/components/member-Card/member-Card.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/modules/users/components/member-Card/member-Card.component.ts ***!
  \*******************************************************************************/
/*! exports provided: MemberCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberCardComponent", function() { return MemberCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_core_services_user_utils_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/user-utils.service */ "./src/app/core/services/user-utils.service.ts");
/* harmony import */ var _shared_user_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/user.model */ "./src/app/modules/users/shared/user.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MemberCardComponent = /** @class */ (function () {
    function MemberCardComponent(userService, route) {
        this.userService = userService;
        this.route = route;
        this.done = true;
    }
    MemberCardComponent.prototype.ngOnInit = function () {
        this.userId = JSON.parse(localStorage.getItem("user"));
        this.recipientId = this.user.uid;
    };
    MemberCardComponent.prototype.message = function () {
        this.done = false;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _shared_user_model__WEBPACK_IMPORTED_MODULE_3__["User"])
    ], MemberCardComponent.prototype, "user", void 0);
    MemberCardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-member-card",
            template: __webpack_require__(/*! raw-loader!./member-Card.component.html */ "./node_modules/raw-loader/index.js!./src/app/modules/users/components/member-Card/member-Card.component.html"),
            styles: [__webpack_require__(/*! ./member-Card.component.css */ "./src/app/modules/users/components/member-Card/member-Card.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_core_services_user_utils_service__WEBPACK_IMPORTED_MODULE_2__["UserUtilsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], MemberCardComponent);
    return MemberCardComponent;
}());



/***/ }),

/***/ "./src/app/modules/users/pages/detail-user-page/detail-user-page.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/modules/users/pages/detail-user-page/detail-user-page.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@font-face {\n  font-family: 'fontello';\n  src: url('fontello.eot?14790327');\n  src: url('fontello.eot?14790327#iefix') format('embedded-opentype'),\n       url('fontello.woff2?14790327') format('woff2'),\n       url('fontello.woff?14790327') format('woff'),\n       url('fontello.ttf?14790327') format('truetype'),\n       url('fontello.svg?14790327#fontello') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n/* Chrome hack: SVG is rendered more smooth in Windozze. 100% magic, uncomment if you need it. */\n/* Note, that will break hinting! In other OS-es font will be not as sharp as it could be */\n/*\n@media screen and (-webkit-min-device-pixel-ratio:0) {\n  @font-face {\n    font-family: 'fontello';\n    src: url('../font/fontello.svg?14790327#fontello') format('svg');\n  }\n}\n*/\n[class^=\"icon-\"]:before, [class*=\" icon-\"]:before {\n  font-family: \"fontello\";\n  font-style: normal;\n  font-weight: normal;\n  speak: none;\n \n  display: inline-block;\n  text-decoration: inherit;\n  width: 1em;\n  margin-right: .2em;\n  text-align: center;\n  /* opacity: .8; */\n \n  /* For safety - reset parent styles, that can break glyph codes*/\n  font-variant: normal;\n  text-transform: none;\n \n  /* fix buttons height, for twitter bootstrap */\n  line-height: 1em;\n \n  /* Animation center compensation - margins should be symmetric */\n  /* remove if not needed */\n  margin-left: .2em;\n \n  /* you can be more comfortable with increased icons size */\n  /* font-size: 120%; */\n \n  /* Font smoothing. That was taken from TWBS */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n \n  /* Uncomment for 3D effect */\n  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */\n}\n.icon-ok-circled:before { content: '\\e800'; }\n/* '' */\n.icon-spin6:before { content: '\\e839'; }\n/* '' */\n/*\n   Animation example, for spinners\n*/\n.animate-spin {\n  -webkit-animation: spin 2s infinite linear;\n  animation: spin 2s infinite linear;\n  display: inline-block;\n}\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n@keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy91c2Vycy9wYWdlcy9kZXRhaWwtdXNlci1wYWdlL2Nzcy9mb250ZWxsby5jc3MiLCJzcmMvYXBwL21vZHVsZXMvdXNlcnMvcGFnZXMvZGV0YWlsLXVzZXItcGFnZS9jc3MvYW5pbWF0aW9uLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHVCQUF1QjtFQUN2QixpQ0FBeUM7RUFDekM7Ozs7MERBSWdFO0VBQ2hFLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQSxnR0FBZ0c7QUFDaEcsMkZBQTJGO0FBQzNGOzs7Ozs7O0NBT0M7QUFFQTtFQUNDLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLFdBQVc7O0VBRVgscUJBQXFCO0VBQ3JCLHdCQUF3QjtFQUN4QixVQUFVO0VBQ1Ysa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixpQkFBaUI7O0VBRWpCLGdFQUFnRTtFQUNoRSxvQkFBb0I7RUFDcEIsb0JBQW9COztFQUVwQiw4Q0FBOEM7RUFDOUMsZ0JBQWdCOztFQUVoQixnRUFBZ0U7RUFDaEUseUJBQXlCO0VBQ3pCLGlCQUFpQjs7RUFFakIsMERBQTBEO0VBQzFELHFCQUFxQjs7RUFFckIsNkNBQTZDO0VBQzdDLG1DQUFtQztFQUNuQyxrQ0FBa0M7O0VBRWxDLDRCQUE0QjtFQUM1Qix1REFBdUQ7QUFDekQ7QUFFQSwwQkFBMEIsZ0JBQWdCLEVBQUU7QUFBRSxRQUFRO0FBQ3RELHFCQUFxQixnQkFBZ0IsRUFBRTtBQUFFLFFBQVE7QUMxRGpEOztDQUVDO0FBQ0Q7RUFHRSwwQ0FBMEM7RUFDMUMsa0NBQWtDO0VBQ2xDLHFCQUFxQjtBQUN2QjtBQWdCQTtFQUNFO0lBR0UsK0JBQStCO0lBQy9CLHVCQUF1QjtFQUN6Qjs7RUFFQTtJQUdFLGlDQUFpQztJQUNqQyx5QkFBeUI7RUFDM0I7QUFDRjtBQStCQTtFQUNFO0lBR0UsK0JBQStCO0lBQy9CLHVCQUF1QjtFQUN6Qjs7RUFFQTtJQUdFLGlDQUFpQztJQUNqQyx5QkFBeUI7RUFDM0I7QUFDRiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvdXNlcnMvcGFnZXMvZGV0YWlsLXVzZXItcGFnZS9kZXRhaWwtdXNlci1wYWdlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdmb250ZWxsbyc7XG4gIHNyYzogdXJsKCcuLi9mb250L2ZvbnRlbGxvLmVvdD8xNDc5MDMyNycpO1xuICBzcmM6IHVybCgnLi4vZm9udC9mb250ZWxsby5lb3Q/MTQ3OTAzMjcjaWVmaXgnKSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXG4gICAgICAgdXJsKCcuLi9mb250L2ZvbnRlbGxvLndvZmYyPzE0NzkwMzI3JykgZm9ybWF0KCd3b2ZmMicpLFxuICAgICAgIHVybCgnLi4vZm9udC9mb250ZWxsby53b2ZmPzE0NzkwMzI3JykgZm9ybWF0KCd3b2ZmJyksXG4gICAgICAgdXJsKCcuLi9mb250L2ZvbnRlbGxvLnR0Zj8xNDc5MDMyNycpIGZvcm1hdCgndHJ1ZXR5cGUnKSxcbiAgICAgICB1cmwoJy4uL2ZvbnQvZm9udGVsbG8uc3ZnPzE0NzkwMzI3I2ZvbnRlbGxvJykgZm9ybWF0KCdzdmcnKTtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLyogQ2hyb21lIGhhY2s6IFNWRyBpcyByZW5kZXJlZCBtb3JlIHNtb290aCBpbiBXaW5kb3p6ZS4gMTAwJSBtYWdpYywgdW5jb21tZW50IGlmIHlvdSBuZWVkIGl0LiAqL1xuLyogTm90ZSwgdGhhdCB3aWxsIGJyZWFrIGhpbnRpbmchIEluIG90aGVyIE9TLWVzIGZvbnQgd2lsbCBiZSBub3QgYXMgc2hhcnAgYXMgaXQgY291bGQgYmUgKi9cbi8qXG5AbWVkaWEgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOjApIHtcbiAgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICdmb250ZWxsbyc7XG4gICAgc3JjOiB1cmwoJy4uL2ZvbnQvZm9udGVsbG8uc3ZnPzE0NzkwMzI3I2ZvbnRlbGxvJykgZm9ybWF0KCdzdmcnKTtcbiAgfVxufVxuKi9cbiBcbiBbY2xhc3NePVwiaWNvbi1cIl06YmVmb3JlLCBbY2xhc3MqPVwiIGljb24tXCJdOmJlZm9yZSB7XG4gIGZvbnQtZmFtaWx5OiBcImZvbnRlbGxvXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgc3BlYWs6IG5vbmU7XG4gXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdGV4dC1kZWNvcmF0aW9uOiBpbmhlcml0O1xuICB3aWR0aDogMWVtO1xuICBtYXJnaW4tcmlnaHQ6IC4yZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgLyogb3BhY2l0eTogLjg7ICovXG4gXG4gIC8qIEZvciBzYWZldHkgLSByZXNldCBwYXJlbnQgc3R5bGVzLCB0aGF0IGNhbiBicmVhayBnbHlwaCBjb2RlcyovXG4gIGZvbnQtdmFyaWFudDogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiBcbiAgLyogZml4IGJ1dHRvbnMgaGVpZ2h0LCBmb3IgdHdpdHRlciBib290c3RyYXAgKi9cbiAgbGluZS1oZWlnaHQ6IDFlbTtcbiBcbiAgLyogQW5pbWF0aW9uIGNlbnRlciBjb21wZW5zYXRpb24gLSBtYXJnaW5zIHNob3VsZCBiZSBzeW1tZXRyaWMgKi9cbiAgLyogcmVtb3ZlIGlmIG5vdCBuZWVkZWQgKi9cbiAgbWFyZ2luLWxlZnQ6IC4yZW07XG4gXG4gIC8qIHlvdSBjYW4gYmUgbW9yZSBjb21mb3J0YWJsZSB3aXRoIGluY3JlYXNlZCBpY29ucyBzaXplICovXG4gIC8qIGZvbnQtc2l6ZTogMTIwJTsgKi9cbiBcbiAgLyogRm9udCBzbW9vdGhpbmcuIFRoYXQgd2FzIHRha2VuIGZyb20gVFdCUyAqL1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbiBcbiAgLyogVW5jb21tZW50IGZvciAzRCBlZmZlY3QgKi9cbiAgLyogdGV4dC1zaGFkb3c6IDFweCAxcHggMXB4IHJnYmEoMTI3LCAxMjcsIDEyNywgMC4zKTsgKi9cbn1cbiBcbi5pY29uLW9rLWNpcmNsZWQ6YmVmb3JlIHsgY29udGVudDogJ1xcZTgwMCc7IH0gLyogJ+6ggCcgKi9cbi5pY29uLXNwaW42OmJlZm9yZSB7IGNvbnRlbnQ6ICdcXGU4MzknOyB9IC8qICfuoLknICovIiwiLypcbiAgIEFuaW1hdGlvbiBleGFtcGxlLCBmb3Igc3Bpbm5lcnNcbiovXG4uYW5pbWF0ZS1zcGluIHtcbiAgLW1vei1hbmltYXRpb246IHNwaW4gMnMgaW5maW5pdGUgbGluZWFyO1xuICAtby1hbmltYXRpb246IHNwaW4gMnMgaW5maW5pdGUgbGluZWFyO1xuICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAycyBpbmZpbml0ZSBsaW5lYXI7XG4gIGFuaW1hdGlvbjogc3BpbiAycyBpbmZpbml0ZSBsaW5lYXI7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cbkAtbW96LWtleWZyYW1lcyBzcGluIHtcbiAgMCUge1xuICAgIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgLW8tdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTtcbiAgICAtby10cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xuICB9XG59XG5ALXdlYmtpdC1rZXlmcmFtZXMgc3BpbiB7XG4gIDAlIHtcbiAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgIC1vLXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gIH1cblxuICAxMDAlIHtcbiAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDM1OWRlZyk7XG4gICAgLW8tdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM1OWRlZyk7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTtcbiAgfVxufVxuQC1vLWtleWZyYW1lcyBzcGluIHtcbiAgMCUge1xuICAgIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgLW8tdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTtcbiAgICAtby10cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xuICB9XG59XG5ALW1zLWtleWZyYW1lcyBzcGluIHtcbiAgMCUge1xuICAgIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgLW8tdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTtcbiAgICAtby10cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xuICB9XG59XG5Aa2V5ZnJhbWVzIHNwaW4ge1xuICAwJSB7XG4gICAgLW1vei10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICAtby10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgLW1vei10cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xuICAgIC1vLXRyYW5zZm9ybTogcm90YXRlKDM1OWRlZyk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM1OWRlZyk7XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/modules/users/pages/detail-user-page/detail-user-page.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/modules/users/pages/detail-user-page/detail-user-page.component.ts ***!
  \************************************************************************************/
/*! exports provided: DetailUserPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailUserPageComponent", function() { return DetailUserPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-gallery */ "./node_modules/ngx-gallery/bundles/ngx-gallery.umd.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ngx_gallery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_app_core_services_logger_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/logger.service */ "./src/app/core/services/logger.service.ts");
/* harmony import */ var src_app_core_services_presence_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/presence.service */ "./src/app/core/services/presence.service.ts");
/* harmony import */ var src_app_core_services_progress_bar_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/progress-bar.service */ "./src/app/core/services/progress-bar.service.ts");
/* harmony import */ var _core_services_user_utils_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../core/services/user-utils.service */ "./src/app/core/services/user-utils.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DetailUserPageComponent = /** @class */ (function () {
    function DetailUserPageComponent(userService, presence, log, progressBarService, activatedRoute, router) {
        this.userService = userService;
        this.presence = presence;
        this.log = log;
        this.progressBarService = progressBarService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.done = true;
        this.x = true;
        this.Action = false;
        // override the route reuse strategy
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }
    DetailUserPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.progressBarService.increase();
        var id = this.activatedRoute.snapshot.params.id;
        var user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            if (user && id !== user.uid) {
                this.Action = true;
            }
        }
        this.userService.getUser(id).subscribe(function (user) {
            _this.user = user;
            if (_this.user === null) {
                _this.router.navigate(["404"]);
            }
            else {
                _this.loadImage();
                _this.presence$ = _this.presence.getPresence(id);
            }
        }, function (err) { return _this.router.navigate(["404"]); });
        setTimeout(function (a) {
            _this.progressBarService.decrease();
        }, 700);
    };
    DetailUserPageComponent.prototype.getReview = function (event) {
        var _this = this;
        if (event.index === 3) {
            this.reviews = new Array();
            this.userService.getReviews(this.user.uid).subscribe(function (data) {
                console.log(data);
                var count = 0;
                var user = JSON.parse(localStorage.getItem("user"));
                data.forEach(function (review) {
                    _this.reviews.push(review);
                });
                _this.reviews.forEach(function (x) {
                    count += x.rate;
                });
                user.rate = count / _this.reviews.length;
                console.log(user.rate);
                _this.userService.updateUser(user);
            });
        }
    };
    DetailUserPageComponent.prototype.like = function () {
        var _this = this;
        this.done = false;
        var recipientId = "" + this.activatedRoute.snapshot.params.id;
        var user = JSON.parse(localStorage.getItem("user"));
        this.userService.like(user.uid, recipientId)
            .subscribe(function (data) {
            if (data.length === 12) {
                _this.x = false;
            }
            else {
                _this.x = true;
            }
            _this.done = true;
        });
    };
    DetailUserPageComponent.prototype.sendMessage = function () {
        var id = this.activatedRoute.snapshot.params.id;
        this.router.navigate(["/messages/" + id]);
    };
    DetailUserPageComponent.prototype.loadImage = function () {
        this.galleryOptions = [
            {
                width: "500px",
                height: "500px",
                imagePercent: 100,
                thumbnailsColumns: 4,
                imageAnimation: ngx_gallery__WEBPACK_IMPORTED_MODULE_2__["NgxGalleryAnimation"].Slide,
                preview: true,
                previewFullscreen: false,
                previewCloseOnClick: true,
                previewCloseOnEsc: true,
                previewKeyboardNavigation: true,
            },
        ];
        this.galleryImages = [];
        this.galleryImages = this.getImages();
    };
    DetailUserPageComponent.prototype.getImages = function () {
        var imageUrls = [];
        if (!this.user.photos) {
            return imageUrls;
        }
        for (var i = 0; i < this.user.photos.length; i++) {
            imageUrls.push({
                small: this.user.photos[i],
                medium: this.user.photos[i],
                big: this.user.photos[i],
                description: " ",
            });
        }
        return imageUrls;
    };
    DetailUserPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-detail-user-page",
            template: __webpack_require__(/*! raw-loader!./detail-user-page.component.html */ "./node_modules/raw-loader/index.js!./src/app/modules/users/pages/detail-user-page/detail-user-page.component.html"),
            styles: [__webpack_require__(/*! ./detail-user-page.component.css */ "./src/app/modules/users/pages/detail-user-page/detail-user-page.component.css")]
        }),
        __metadata("design:paramtypes", [_core_services_user_utils_service__WEBPACK_IMPORTED_MODULE_6__["UserUtilsService"],
            src_app_core_services_presence_service__WEBPACK_IMPORTED_MODULE_4__["PresenceService"],
            src_app_core_services_logger_service__WEBPACK_IMPORTED_MODULE_3__["LoggerService"],
            src_app_core_services_progress_bar_service__WEBPACK_IMPORTED_MODULE_5__["ProgressBarService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], DetailUserPageComponent);
    return DetailUserPageComponent;
}());



/***/ }),

/***/ "./src/app/modules/users/pages/edit-user-page/edit-user-page.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/modules/users/pages/edit-user-page/edit-user-page.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".img-thumbnail {\r\n    margin: 25px;\r\n    width: 85%;\r\n    padding: 4px;\r\n    line-height: 1.42857143;\r\n    background-color: #fff;\r\n    border: 1px solid #ddd;\r\n    border-radius: 4px;\r\n    transition: all .2s ease-in-out;\r\n    display: inline-block;\r\n    max-width: 100%;\r\n    height: auto;\r\n}\r\n\r\n.card-body {\r\n    padding: 0 25px;\r\n}\r\n\r\npre {\r\n    margin-top: 19px;\r\n}\r\n\r\n.card-footer {\r\n    padding: 10px 15px;\r\n    background-color: #fff;\r\n    border-top: none;\r\n}\r\n\r\n.ddd h1 {\r\n    padding: 0 !important;\r\n    margin: 0 !important;\r\n    text-align: center;\r\n    padding-left: 3em !important;\r\n    font-size: 3rem;\r\n}\r\n\r\ntextarea {\r\n    font-size: 3rem;\r\n}\r\n\r\ninput {\r\n    font-size: 1.4rem;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy91c2Vycy9wYWdlcy9lZGl0LXVzZXItcGFnZS9lZGl0LXVzZXItcGFnZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtJQUNaLFVBQVU7SUFDVixZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLHNCQUFzQjtJQUN0QixzQkFBc0I7SUFDdEIsa0JBQWtCO0lBR2xCLCtCQUErQjtJQUMvQixxQkFBcUI7SUFDckIsZUFBZTtJQUNmLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLHNCQUFzQjtJQUN0QixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQiw0QkFBNEI7SUFDNUIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckIiLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL3VzZXJzL3BhZ2VzL2VkaXQtdXNlci1wYWdlL2VkaXQtdXNlci1wYWdlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1nLXRodW1ibmFpbCB7XHJcbiAgICBtYXJnaW46IDI1cHg7XHJcbiAgICB3aWR0aDogODUlO1xyXG4gICAgcGFkZGluZzogNHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlLWluLW91dDtcclxuICAgIC1vLXRyYW5zaXRpb246IGFsbCAuMnMgZWFzZS1pbi1vdXQ7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2UtaW4tb3V0O1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG59XHJcblxyXG4uY2FyZC1ib2R5IHtcclxuICAgIHBhZGRpbmc6IDAgMjVweDtcclxufVxyXG5cclxucHJlIHtcclxuICAgIG1hcmdpbi10b3A6IDE5cHg7XHJcbn1cclxuXHJcbi5jYXJkLWZvb3RlciB7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxufVxyXG5cclxuLmRkZCBoMSB7XHJcbiAgICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW46IDAgIWltcG9ydGFudDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmctbGVmdDogM2VtICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXNpemU6IDNyZW07XHJcbn1cclxuXHJcbnRleHRhcmVhIHtcclxuICAgIGZvbnQtc2l6ZTogM3JlbTtcclxufVxyXG5cclxuaW5wdXQge1xyXG4gICAgZm9udC1zaXplOiAxLjRyZW07XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/modules/users/pages/edit-user-page/edit-user-page.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/modules/users/pages/edit-user-page/edit-user-page.component.ts ***!
  \********************************************************************************/
/*! exports provided: EditUserPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditUserPageComponent", function() { return EditUserPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-gallery */ "./node_modules/ngx-gallery/bundles/ngx-gallery.umd.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ngx_gallery__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var src_app_core_services_presence_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/presence.service */ "./src/app/core/services/presence.service.ts");
/* harmony import */ var src_app_core_services_progress_bar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/progress-bar.service */ "./src/app/core/services/progress-bar.service.ts");
/* harmony import */ var src_app_core_services_user_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/user-auth.service */ "./src/app/core/services/user-auth.service.ts");
/* harmony import */ var src_app_core_services_user_utils_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/user-utils.service */ "./src/app/core/services/user-utils.service.ts");
/* harmony import */ var _shared_user_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/user.model */ "./src/app/modules/users/shared/user.model.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var EditUserPageComponent = /** @class */ (function () {
    function EditUserPageComponent(activatedRoute, userAuthService, progressBarService, presence, router, datachang, userService) {
        this.activatedRoute = activatedRoute;
        this.userAuthService = userAuthService;
        this.progressBarService = progressBarService;
        this.presence = presence;
        this.router = router;
        this.datachang = datachang;
        this.userService = userService;
        this.canEdit = false;
        this.subscriptions = [];
        this.canDoAction = true;
        this.x = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subscription"]();
        this.canDoAction = true;
    }
    EditUserPageComponent.prototype.unloadNotification = function ($event) {
        if (this.editForm.dirty) {
            $event.returnValue = true;
        }
    };
    EditUserPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.userAuthService.isUserSignedIn()) {
            this.router.navigate(["404"]);
        }
        this.userService.getUser(this.userAuthService.currentUser.value.uid).subscribe(function (data) {
            var c_user = new _shared_user_model__WEBPACK_IMPORTED_MODULE_9__["User"](__assign({ id: data.uid }, data));
            c_user.isActive = true;
            c_user.lastActive = new Date(Date.now());
            var fName = c_user.displayName.split(" ");
            var fiName, lasName;
            if (fName.length > 1) {
                fiName = fName[0];
                lasName = c_user.displayName.substring(fiName.length + 1, c_user.displayName.length);
                c_user.displayName = fiName;
                c_user.familyName = lasName;
            }
            _this.userAuthService.currentUser.next(c_user);
            localStorage.setItem("user", JSON.stringify(c_user));
        });
        this.progressBarService.increase();
        var id = this.activatedRoute.snapshot.params.id;
        this.presence$ = this.presence.getPresence(id);
        if (this.userAuthService.currentUser.value) {
            this.userAuthService.currentUser.subscribe(function (data) {
                _this.user = data;
                _this.loadImage();
                if (id !== _this.user.uid) {
                    _this.router.navigate(["/404"]);
                }
                _this.loadImage();
                if (_this.user.photoURL === "" || _this.user.photoURL === undefined) {
                    _this.userAuthService.photoUrl.subscribe(function (url) {
                        _this.user.photoURL = url;
                    });
                }
                _this.canDoAction = true;
                _this.canEdit = true;
            });
        }
    };
    EditUserPageComponent.prototype.getReview = function (event) {
        var _this = this;
        if (event.index === 4) {
            this.reviews = new Array();
            this.userService.getReviews(this.user.uid).subscribe(function (data) {
                console.log(data);
                data.forEach(function (review) {
                    _this.reviews.push(review);
                });
            });
        }
    };
    EditUserPageComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.canDoAction = false;
        this.datachang.detectChanges();
        setTimeout(function (a) {
            _this.progressBarService.decrease();
        }, 700);
    };
    EditUserPageComponent.prototype.updateProfile = function () {
        var _this = this;
        this.userService.updateUser(this.user).finally(function () {
            _this.editForm.reset(_this.user);
        });
    };
    EditUserPageComponent.prototype.loadImage = function () {
        this.galleryOptions = [
            {
                width: "500px",
                height: "500px",
                imagePercent: 100,
                thumbnailsColumns: 4,
                imageAnimation: ngx_gallery__WEBPACK_IMPORTED_MODULE_3__["NgxGalleryAnimation"].Slide,
                preview: true,
                previewFullscreen: false,
                previewCloseOnClick: true,
                previewCloseOnEsc: true,
                previewKeyboardNavigation: true,
            },
        ];
        this.galleryImages = [];
        this.galleryImages = this.getImages();
    };
    EditUserPageComponent.prototype.getImages = function () {
        var imageUrls = [];
        if (!this.user.photos) {
            return imageUrls;
        }
        for (var i = 0; i < this.user.photos.length; i++) {
            imageUrls.push({
                small: this.user.photos[i],
                medium: this.user.photos[i],
                big: this.user.photos[i],
                description: "this.user.photos[i].description",
            });
        }
        return imageUrls;
    };
    EditUserPageComponent.prototype.setMainPhoto = function (url) {
        this.user.photoURL = url;
    };
    EditUserPageComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (x) { return x.unsubscribe(); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("editForm", { static: false }),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgForm"])
    ], EditUserPageComponent.prototype, "editForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])("window:beforeunload", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], EditUserPageComponent.prototype, "unloadNotification", null);
    EditUserPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-edit-user-page",
            template: __webpack_require__(/*! raw-loader!./edit-user-page.component.html */ "./node_modules/raw-loader/index.js!./src/app/modules/users/pages/edit-user-page/edit-user-page.component.html"),
            styles: [__webpack_require__(/*! ./edit-user-page.component.css */ "./src/app/modules/users/pages/edit-user-page/edit-user-page.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            src_app_core_services_user_auth_service__WEBPACK_IMPORTED_MODULE_7__["UserAuthService"],
            src_app_core_services_progress_bar_service__WEBPACK_IMPORTED_MODULE_6__["ProgressBarService"],
            src_app_core_services_presence_service__WEBPACK_IMPORTED_MODULE_5__["PresenceService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"],
            src_app_core_services_user_utils_service__WEBPACK_IMPORTED_MODULE_8__["UserUtilsService"]])
    ], EditUserPageComponent);
    return EditUserPageComponent;
}());



/***/ }),

/***/ "./src/app/modules/users/shared/Photo.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/modules/users/shared/Photo.service.ts ***!
  \*******************************************************/
/*! exports provided: PhotoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoService", function() { return PhotoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PhotoService = /** @class */ (function () {
    function PhotoService() {
    }
    PhotoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: "root",
        }),
        __metadata("design:paramtypes", [])
    ], PhotoService);
    return PhotoService;
}());



/***/ }),

/***/ "./src/app/modules/users/user-routing.module.ts":
/*!******************************************************!*\
  !*** ./src/app/modules/users/user-routing.module.ts ***!
  \******************************************************/
/*! exports provided: UserRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRoutingModule", function() { return UserRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_core_guard_auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/guard/auth.guard */ "./src/app/core/guard/auth.guard.ts");
/* harmony import */ var _pages_detail_user_page_detail_user_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/detail-user-page/detail-user-page.component */ "./src/app/modules/users/pages/detail-user-page/detail-user-page.component.ts");
/* harmony import */ var _pages_edit_user_page_edit_user_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/edit-user-page/edit-user-page.component */ "./src/app/modules/users/pages/edit-user-page/edit-user-page.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [{
        path: "", component: _pages_detail_user_page_detail_user_page_component__WEBPACK_IMPORTED_MODULE_3__["DetailUserPageComponent"], pathMatch: "full",
    },
    {
        path: "edit", component: _pages_edit_user_page_edit_user_page_component__WEBPACK_IMPORTED_MODULE_4__["EditUserPageComponent"], runGuardsAndResolvers: "always",
        canActivate: [src_app_core_guard_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
    },
];
var UserRoutingModule = /** @class */ (function () {
    function UserRoutingModule() {
    }
    UserRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], UserRoutingModule);
    return UserRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/users/user.module.ts":
/*!**********************************************!*\
  !*** ./src/app/modules/users/user.module.ts ***!
  \**********************************************/
/*! exports provided: UsereModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsereModule", function() { return UsereModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_star_rating__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-star-rating */ "./node_modules/angular-star-rating/esm5/angular-star-rating.js");
/* harmony import */ var ngx_filesize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-filesize */ "./node_modules/ngx-filesize/dist/index.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-gallery */ "./node_modules/ngx-gallery/bundles/ngx-gallery.umd.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_gallery__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-timeago */ "./node_modules/ngx-timeago/fesm5/ngx-timeago.js");
/* harmony import */ var src_app_shared_directive_DropZone_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/directive/DropZone.directive */ "./src/app/shared/directive/DropZone.directive.ts");
/* harmony import */ var src_app_shared_modules_material_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/shared/modules/material.module */ "./src/app/shared/modules/material.module.ts");
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _components_member_Card_member_Card_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/member-Card/member-Card.component */ "./src/app/modules/users/components/member-Card/member-Card.component.ts");
/* harmony import */ var _components_Photo_Editor_Photo_Editor_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/Photo-Editor/Photo-Editor.component */ "./src/app/modules/users/components/Photo-Editor/Photo-Editor.component.ts");
/* harmony import */ var _pages_detail_user_page_detail_user_page_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pages/detail-user-page/detail-user-page.component */ "./src/app/modules/users/pages/detail-user-page/detail-user-page.component.ts");
/* harmony import */ var _pages_edit_user_page_edit_user_page_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pages/edit-user-page/edit-user-page.component */ "./src/app/modules/users/pages/edit-user-page/edit-user-page.component.ts");
/* harmony import */ var _shared_Photo_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shared/Photo.service */ "./src/app/modules/users/shared/Photo.service.ts");
/* harmony import */ var _user_routing_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./user-routing.module */ "./src/app/modules/users/user-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var UsereModule = /** @class */ (function () {
    function UsereModule() {
    }
    UsereModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                angular_star_rating__WEBPACK_IMPORTED_MODULE_4__["StarRatingModule"].forRoot(),
                ngx_gallery__WEBPACK_IMPORTED_MODULE_6__["NgxGalleryModule"],
                ngx_filesize__WEBPACK_IMPORTED_MODULE_5__["FileSizeModule"],
                src_app_shared_modules_material_module__WEBPACK_IMPORTED_MODULE_9__["MaterialModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"],
                _user_routing_module__WEBPACK_IMPORTED_MODULE_16__["UserRoutingModule"],
                src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
                ngx_timeago__WEBPACK_IMPORTED_MODULE_7__["TimeagoModule"].forRoot()
            ],
            providers: [_shared_Photo_service__WEBPACK_IMPORTED_MODULE_15__["PhotoService"]],
            declarations: [_pages_edit_user_page_edit_user_page_component__WEBPACK_IMPORTED_MODULE_14__["EditUserPageComponent"], _pages_detail_user_page_detail_user_page_component__WEBPACK_IMPORTED_MODULE_13__["DetailUserPageComponent"], _components_member_Card_member_Card_component__WEBPACK_IMPORTED_MODULE_11__["MemberCardComponent"], _components_Photo_Editor_Photo_Editor_component__WEBPACK_IMPORTED_MODULE_12__["PhotoEditorComponent"], src_app_shared_directive_DropZone_directive__WEBPACK_IMPORTED_MODULE_8__["DropZoneDirective"]],
            entryComponents: [_components_member_Card_member_Card_component__WEBPACK_IMPORTED_MODULE_11__["MemberCardComponent"]],
            exports: [_components_Photo_Editor_Photo_Editor_component__WEBPACK_IMPORTED_MODULE_12__["PhotoEditorComponent"]],
        })
    ], UsereModule);
    return UsereModule;
}());



/***/ }),

/***/ "./src/app/shared/directive/DropZone.directive.ts":
/*!********************************************************!*\
  !*** ./src/app/shared/directive/DropZone.directive.ts ***!
  \********************************************************/
/*! exports provided: DropZoneDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropZoneDirective", function() { return DropZoneDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DropZoneDirective = /** @class */ (function () {
    function DropZoneDirective() {
        this.Dropped = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.hovered = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    DropZoneDirective.prototype.onDrop = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        var files = $event.dataTransfer.files;
        this.Dropped.emit(files);
        this.hovered.emit(false);
    };
    DropZoneDirective.prototype.onDragLeave = function ($event) {
        $event.preventDefault();
        this.hovered.emit(false);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], DropZoneDirective.prototype, "Dropped", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], DropZoneDirective.prototype, "hovered", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])("drop", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DropZoneDirective.prototype, "onDrop", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])("dragover", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DropZoneDirective.prototype, "onDragLeave", null);
    DropZoneDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: "[appDropZone]",
        }),
        __metadata("design:paramtypes", [])
    ], DropZoneDirective);
    return DropZoneDirective;
}());



/***/ })

}]);
//# sourceMappingURL=default~modules-posts-post-module~modules-users-user-module.js.map