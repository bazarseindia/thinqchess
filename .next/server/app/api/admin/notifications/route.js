/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/notifications/route";
exports.ids = ["app/api/admin/notifications/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("better-sqlite3");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fnotifications%2Froute&page=%2Fapi%2Fadmin%2Fnotifications%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fnotifications%2Froute.js&appDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fnotifications%2Froute&page=%2Fapi%2Fadmin%2Fnotifications%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fnotifications%2Froute.js&appDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_darpa_OneDrive_Desktop_Thinqchess_v2_src_app_api_admin_notifications_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/admin/notifications/route.js */ \"(rsc)/./src/app/api/admin/notifications/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/notifications/route\",\n        pathname: \"/api/admin/notifications\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/notifications/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\darpa\\\\OneDrive\\\\Desktop\\\\Thinqchess\\\\v2\\\\src\\\\app\\\\api\\\\admin\\\\notifications\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_darpa_OneDrive_Desktop_Thinqchess_v2_src_app_api_admin_notifications_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRm5vdGlmaWNhdGlvbnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGbm90aWZpY2F0aW9ucyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGbm90aWZpY2F0aW9ucyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNkYXJwYSU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q1RoaW5xY2hlc3MlNUN2MiU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDZGFycGElNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNUaGlucWNoZXNzJTVDdjImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2tEO0FBQy9IO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxkYXJwYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFRoaW5xY2hlc3NcXFxcdjJcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcbm90aWZpY2F0aW9uc1xcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWRtaW4vbm90aWZpY2F0aW9ucy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FkbWluL25vdGlmaWNhdGlvbnNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FkbWluL25vdGlmaWNhdGlvbnMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxkYXJwYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFRoaW5xY2hlc3NcXFxcdjJcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcbm90aWZpY2F0aW9uc1xcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fnotifications%2Froute&page=%2Fapi%2Fadmin%2Fnotifications%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fnotifications%2Froute.js&appDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/admin/notifications/route.js":
/*!**************************************************!*\
  !*** ./src/app/api/admin/notifications/route.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.js\");\n\n\nasync function GET() {\n    try {\n        const notifications = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].notification.findMany({\n            orderBy: {\n                createdAt: \"desc\"\n            },\n            take: 50\n        });\n        const unreadCount = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].notification.count({\n            where: {\n                isRead: false\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            notifications,\n            unreadCount\n        });\n    } catch (e) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            notifications: [],\n            unreadCount: 0\n        });\n    }\n}\nasync function PATCH(request) {\n    try {\n        const body = await request.json();\n        if (body.markAllRead) {\n            await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].notification.updateMany({\n                where: {\n                    isRead: false\n                },\n                data: {\n                    isRead: true\n                }\n            });\n        } else if (body.id) {\n            await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].notification.update({\n                where: {\n                    id: body.id\n                },\n                data: {\n                    isRead: true\n                }\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (e) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: e.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hZG1pbi9ub3RpZmljYXRpb25zL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFDVDtBQUUzQixlQUFlRTtJQUNsQixJQUFJO1FBQ0EsTUFBTUMsZ0JBQWdCLE1BQU1GLG1EQUFNQSxDQUFDRyxZQUFZLENBQUNDLFFBQVEsQ0FBQztZQUNyREMsU0FBUztnQkFBRUMsV0FBVztZQUFPO1lBQzdCQyxNQUFNO1FBQ1Y7UUFDQSxNQUFNQyxjQUFjLE1BQU1SLG1EQUFNQSxDQUFDRyxZQUFZLENBQUNNLEtBQUssQ0FBQztZQUFFQyxPQUFPO2dCQUFFQyxRQUFRO1lBQU07UUFBRTtRQUMvRSxPQUFPWixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQUVDLFNBQVM7WUFBTVg7WUFBZU07UUFBWTtJQUN6RSxFQUFFLE9BQU9NLEdBQUc7UUFBRSxPQUFPZixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQUVDLFNBQVM7WUFBTVgsZUFBZSxFQUFFO1lBQUVNLGFBQWE7UUFBRTtJQUFJO0FBQ2xHO0FBRU8sZUFBZU8sTUFBTUMsT0FBTztJQUMvQixJQUFJO1FBQ0EsTUFBTUMsT0FBTyxNQUFNRCxRQUFRSixJQUFJO1FBQy9CLElBQUlLLEtBQUtDLFdBQVcsRUFBRTtZQUNsQixNQUFNbEIsbURBQU1BLENBQUNHLFlBQVksQ0FBQ2dCLFVBQVUsQ0FBQztnQkFBRVQsT0FBTztvQkFBRUMsUUFBUTtnQkFBTTtnQkFBR1MsTUFBTTtvQkFBRVQsUUFBUTtnQkFBSztZQUFFO1FBQzVGLE9BQU8sSUFBSU0sS0FBS0ksRUFBRSxFQUFFO1lBQ2hCLE1BQU1yQixtREFBTUEsQ0FBQ0csWUFBWSxDQUFDbUIsTUFBTSxDQUFDO2dCQUFFWixPQUFPO29CQUFFVyxJQUFJSixLQUFLSSxFQUFFO2dCQUFDO2dCQUFHRCxNQUFNO29CQUFFVCxRQUFRO2dCQUFLO1lBQUU7UUFDdEY7UUFDQSxPQUFPWixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQUVDLFNBQVM7UUFBSztJQUM3QyxFQUFFLE9BQU9DLEdBQUc7UUFBRSxPQUFPZixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQUVDLFNBQVM7WUFBT1UsT0FBT1QsRUFBRVUsT0FBTztRQUFDLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQUk7QUFDbkciLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZGFycGFcXE9uZURyaXZlXFxEZXNrdG9wXFxUaGlucWNoZXNzXFx2Mlxcc3JjXFxhcHBcXGFwaVxcYWRtaW5cXG5vdGlmaWNhdGlvbnNcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgcHJpc21hIGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbnMgPSBhd2FpdCBwcmlzbWEubm90aWZpY2F0aW9uLmZpbmRNYW55KHtcclxuICAgICAgICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH0sXHJcbiAgICAgICAgICAgIHRha2U6IDUwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgdW5yZWFkQ291bnQgPSBhd2FpdCBwcmlzbWEubm90aWZpY2F0aW9uLmNvdW50KHsgd2hlcmU6IHsgaXNSZWFkOiBmYWxzZSB9IH0pO1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG5vdGlmaWNhdGlvbnMsIHVucmVhZENvdW50IH0pO1xyXG4gICAgfSBjYXRjaCAoZSkgeyByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBub3RpZmljYXRpb25zOiBbXSwgdW5yZWFkQ291bnQ6IDAgfSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBBVENIKHJlcXVlc3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG4gICAgICAgIGlmIChib2R5Lm1hcmtBbGxSZWFkKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHByaXNtYS5ub3RpZmljYXRpb24udXBkYXRlTWFueSh7IHdoZXJlOiB7IGlzUmVhZDogZmFsc2UgfSwgZGF0YTogeyBpc1JlYWQ6IHRydWUgfSB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGJvZHkuaWQpIHtcclxuICAgICAgICAgICAgYXdhaXQgcHJpc21hLm5vdGlmaWNhdGlvbi51cGRhdGUoeyB3aGVyZTogeyBpZDogYm9keS5pZCB9LCBkYXRhOiB7IGlzUmVhZDogdHJ1ZSB9IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkgeyByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGUubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pOyB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsIkdFVCIsIm5vdGlmaWNhdGlvbnMiLCJub3RpZmljYXRpb24iLCJmaW5kTWFueSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJ0YWtlIiwidW5yZWFkQ291bnQiLCJjb3VudCIsIndoZXJlIiwiaXNSZWFkIiwianNvbiIsInN1Y2Nlc3MiLCJlIiwiUEFUQ0giLCJyZXF1ZXN0IiwiYm9keSIsIm1hcmtBbGxSZWFkIiwidXBkYXRlTWFueSIsImRhdGEiLCJpZCIsInVwZGF0ZSIsImVycm9yIiwibWVzc2FnZSIsInN0YXR1cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/admin/notifications/route.js\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.js":
/*!***************************!*\
  !*** ./src/lib/prisma.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _prisma_adapter_better_sqlite3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/adapter-better-sqlite3 */ \"(rsc)/./node_modules/@prisma/adapter-better-sqlite3/dist/index.mjs\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst globalForPrisma = globalThis;\nfunction createPrismaClient() {\n    const dbPath = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"prisma\", \"dev.db\");\n    const adapter = new _prisma_adapter_better_sqlite3__WEBPACK_IMPORTED_MODULE_2__.PrismaBetterSqlite3({\n        url: \"file:\" + dbPath\n    });\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n        adapter\n    });\n}\nconst prisma = globalForPrisma.prisma ?? createPrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBOEM7QUFDdUI7QUFDN0M7QUFFeEIsTUFBTUcsa0JBQWtCQztBQUV4QixTQUFTQztJQUNMLE1BQU1DLFNBQVNKLGdEQUFTLENBQUNNLFFBQVFDLEdBQUcsSUFBSSxVQUFVO0lBQ2xELE1BQU1DLFVBQVUsSUFBSVQsK0VBQW1CQSxDQUFDO1FBQUVVLEtBQUssVUFBVUw7SUFBTztJQUNoRSxPQUFPLElBQUlOLHdEQUFZQSxDQUFDO1FBQUVVO0lBQVE7QUFDdEM7QUFFQSxNQUFNRSxTQUFTVCxnQkFBZ0JTLE1BQU0sSUFBSVA7QUFFekMsSUFBSUcsSUFBcUMsRUFBRUwsZ0JBQWdCUyxNQUFNLEdBQUdBO0FBRXBFLGlFQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGRhcnBhXFxPbmVEcml2ZVxcRGVza3RvcFxcVGhpbnFjaGVzc1xcdjJcXHNyY1xcbGliXFxwcmlzbWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcbmltcG9ydCB7IFByaXNtYUJldHRlclNxbGl0ZTMgfSBmcm9tIFwiQHByaXNtYS9hZGFwdGVyLWJldHRlci1zcWxpdGUzXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlUHJpc21hQ2xpZW50KCkge1xyXG4gICAgY29uc3QgZGJQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwicHJpc21hXCIsIFwiZGV2LmRiXCIpO1xyXG4gICAgY29uc3QgYWRhcHRlciA9IG5ldyBQcmlzbWFCZXR0ZXJTcWxpdGUzKHsgdXJsOiBcImZpbGU6XCIgKyBkYlBhdGggfSk7XHJcbiAgICByZXR1cm4gbmV3IFByaXNtYUNsaWVudCh7IGFkYXB0ZXIgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gY3JlYXRlUHJpc21hQ2xpZW50KCk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiUHJpc21hQmV0dGVyU3FsaXRlMyIsInBhdGgiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwiY3JlYXRlUHJpc21hQ2xpZW50IiwiZGJQYXRoIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJhZGFwdGVyIiwidXJsIiwicHJpc21hIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@prisma"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fnotifications%2Froute&page=%2Fapi%2Fadmin%2Fnotifications%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fnotifications%2Froute.js&appDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();