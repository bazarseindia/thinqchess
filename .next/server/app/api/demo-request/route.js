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
exports.id = "app/api/demo-request/route";
exports.ids = ["app/api/demo-request/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdemo-request%2Froute&page=%2Fapi%2Fdemo-request%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdemo-request%2Froute.js&appDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdemo-request%2Froute&page=%2Fapi%2Fdemo-request%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdemo-request%2Froute.js&appDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_darpa_OneDrive_Desktop_Thinqchess_v2_src_app_api_demo_request_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/demo-request/route.js */ \"(rsc)/./src/app/api/demo-request/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/demo-request/route\",\n        pathname: \"/api/demo-request\",\n        filename: \"route\",\n        bundlePath: \"app/api/demo-request/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\darpa\\\\OneDrive\\\\Desktop\\\\Thinqchess\\\\v2\\\\src\\\\app\\\\api\\\\demo-request\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_darpa_OneDrive_Desktop_Thinqchess_v2_src_app_api_demo_request_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZkZW1vLXJlcXVlc3QlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmRlbW8tcmVxdWVzdCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmRlbW8tcmVxdWVzdCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNkYXJwYSU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q1RoaW5xY2hlc3MlNUN2MiU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDZGFycGElNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNUaGlucWNoZXNzJTVDdjImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzBDO0FBQ3ZIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxkYXJwYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFRoaW5xY2hlc3NcXFxcdjJcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcZGVtby1yZXF1ZXN0XFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9kZW1vLXJlcXVlc3Qvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9kZW1vLXJlcXVlc3RcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2RlbW8tcmVxdWVzdC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGRhcnBhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcVGhpbnFjaGVzc1xcXFx2MlxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxkZW1vLXJlcXVlc3RcXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdemo-request%2Froute&page=%2Fapi%2Fdemo-request%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdemo-request%2Froute.js&appDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "(rsc)/./src/app/api/demo-request/route.js":
/*!*******************************************!*\
  !*** ./src/app/api/demo-request/route.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.js\");\n\n\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const demo = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].demoRequest.create({\n            data: {\n                name: body.name || \"\",\n                email: body.email || \"\",\n                phone: body.phone || null,\n                message: body.message || null\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            id: demo.id\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Demo Request Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\nasync function GET() {\n    try {\n        const demos = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].demoRequest.findMany({\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(demos);\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\nasync function DELETE(request) {\n    try {\n        const { searchParams } = new URL(request.url);\n        const id = searchParams.get('id');\n        if (!id) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: 'ID is required'\n        }, {\n            status: 400\n        });\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].demoRequest.delete({\n            where: {\n                id: id\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error(\"Demo Request Delete Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9kZW1vLXJlcXVlc3Qvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMkM7QUFDVDtBQUUzQixlQUFlRSxLQUFLQyxPQUFPO0lBQzlCLElBQUk7UUFDQSxNQUFNQyxPQUFPLE1BQU1ELFFBQVFFLElBQUk7UUFFL0IsTUFBTUMsT0FBTyxNQUFNTCxtREFBTUEsQ0FBQ00sV0FBVyxDQUFDQyxNQUFNLENBQUM7WUFDekNDLE1BQU07Z0JBQ0ZDLE1BQU1OLEtBQUtNLElBQUksSUFBSTtnQkFDbkJDLE9BQU9QLEtBQUtPLEtBQUssSUFBSTtnQkFDckJDLE9BQU9SLEtBQUtRLEtBQUssSUFBSTtnQkFDckJDLFNBQVNULEtBQUtTLE9BQU8sSUFBSTtZQUM3QjtRQUNKO1FBRUEsT0FBT2IscURBQVlBLENBQUNLLElBQUksQ0FBQztZQUFFUyxTQUFTO1lBQU1DLElBQUlULEtBQUtTLEVBQUU7UUFBQyxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUMzRSxFQUFFLE9BQU9DLE9BQU87UUFDWkMsUUFBUUQsS0FBSyxDQUFDLHVCQUF1QkE7UUFDckMsT0FBT2pCLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7WUFBRVMsU0FBUztZQUFPRyxPQUFPQSxNQUFNSixPQUFPO1FBQUMsR0FBRztZQUFFRyxRQUFRO1FBQUk7SUFDckY7QUFDSjtBQUVPLGVBQWVHO0lBQ2xCLElBQUk7UUFDQSxNQUFNQyxRQUFRLE1BQU1uQixtREFBTUEsQ0FBQ00sV0FBVyxDQUFDYyxRQUFRLENBQUM7WUFDNUNDLFNBQVM7Z0JBQUVDLFdBQVc7WUFBTztRQUNqQztRQUNBLE9BQU92QixxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDZTtJQUM3QixFQUFFLE9BQU9ILE9BQU87UUFDWixPQUFPakIscURBQVlBLENBQUNLLElBQUksQ0FBQztZQUFFWSxPQUFPQSxNQUFNSixPQUFPO1FBQUMsR0FBRztZQUFFRyxRQUFRO1FBQUk7SUFDckU7QUFDSjtBQUVPLGVBQWVRLE9BQU9yQixPQUFPO0lBQ2hDLElBQUk7UUFDQSxNQUFNLEVBQUVzQixZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJdkIsUUFBUXdCLEdBQUc7UUFDNUMsTUFBTVosS0FBS1UsYUFBYUcsR0FBRyxDQUFDO1FBQzVCLElBQUksQ0FBQ2IsSUFBSSxPQUFPZixxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDO1lBQUVTLFNBQVM7WUFBT0csT0FBTztRQUFpQixHQUFHO1lBQUVELFFBQVE7UUFBSTtRQUU3RixNQUFNZixtREFBTUEsQ0FBQ00sV0FBVyxDQUFDc0IsTUFBTSxDQUFDO1lBQUVDLE9BQU87Z0JBQUVmLElBQUlBO1lBQUc7UUFBRTtRQUNwRCxPQUFPZixxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDO1lBQUVTLFNBQVM7UUFBSztJQUM3QyxFQUFFLE9BQU9HLE9BQU87UUFDWkMsUUFBUUQsS0FBSyxDQUFDLDhCQUE4QkE7UUFDNUMsT0FBT2pCLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7WUFBRVMsU0FBUztZQUFPRyxPQUFPQSxNQUFNSixPQUFPO1FBQUMsR0FBRztZQUFFRyxRQUFRO1FBQUk7SUFDckY7QUFDSiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxkYXJwYVxcT25lRHJpdmVcXERlc2t0b3BcXFRoaW5xY2hlc3NcXHYyXFxzcmNcXGFwcFxcYXBpXFxkZW1vLXJlcXVlc3RcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgcHJpc21hIGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG5cclxuICAgICAgICBjb25zdCBkZW1vID0gYXdhaXQgcHJpc21hLmRlbW9SZXF1ZXN0LmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGJvZHkubmFtZSB8fCBcIlwiLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IGJvZHkuZW1haWwgfHwgXCJcIixcclxuICAgICAgICAgICAgICAgIHBob25lOiBib2R5LnBob25lIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBib2R5Lm1lc3NhZ2UgfHwgbnVsbCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgaWQ6IGRlbW8uaWQgfSwgeyBzdGF0dXM6IDIwMSB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkRlbW8gUmVxdWVzdCBFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZW1vcyA9IGF3YWl0IHByaXNtYS5kZW1vUmVxdWVzdC5maW5kTWFueSh7XHJcbiAgICAgICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihkZW1vcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUocmVxdWVzdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybCk7XHJcbiAgICAgICAgY29uc3QgaWQgPSBzZWFyY2hQYXJhbXMuZ2V0KCdpZCcpO1xyXG4gICAgICAgIGlmICghaWQpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0lEIGlzIHJlcXVpcmVkJyB9LCB7IHN0YXR1czogNDAwIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCBwcmlzbWEuZGVtb1JlcXVlc3QuZGVsZXRlKHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSk7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkRlbW8gUmVxdWVzdCBEZWxldGUgRXJyb3I6XCIsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiUE9TVCIsInJlcXVlc3QiLCJib2R5IiwianNvbiIsImRlbW8iLCJkZW1vUmVxdWVzdCIsImNyZWF0ZSIsImRhdGEiLCJuYW1lIiwiZW1haWwiLCJwaG9uZSIsIm1lc3NhZ2UiLCJzdWNjZXNzIiwiaWQiLCJzdGF0dXMiLCJlcnJvciIsImNvbnNvbGUiLCJHRVQiLCJkZW1vcyIsImZpbmRNYW55Iiwib3JkZXJCeSIsImNyZWF0ZWRBdCIsIkRFTEVURSIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsImdldCIsImRlbGV0ZSIsIndoZXJlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/demo-request/route.js\n");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@prisma"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdemo-request%2Froute&page=%2Fapi%2Fdemo-request%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdemo-request%2Froute.js&appDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdarpa%5COneDrive%5CDesktop%5CThinqchess%5Cv2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();