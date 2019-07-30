import Router from 'koa-router';
import AccountController from '../../controllers/account';

const router = new Router({ prefix: '/account' });
const controller = AccountController();

/**
 *
 * @api {get} /api/v1/account GET MANY
 * @apiVersion 1.0.0
 * @apiName getAccounts
 * @apiGroup Account
 *
 * @apiDescription Get Accounts
 * Default limit: 50,
 * Max limit: 50
 * Supports pagination with the use of a cursor (next) field
 *
 * @apiExample {curl} Example usage:
 *     curl -v -X GET http://localhost:3003/api/v1/account
 *
 * @apiExample {curl} Example usage - Cusom limit:
 *     curl -v -X GET http://localhost:3003/api/v1/account?limit=2
 *
 * @apiExample {curl} Example usage - Partial:
 *     curl -v -X GET http://localhost:3003/api/v1/account?fields=email,_id
 *
 * @apiExample {curl} Example usage - Filter:
 *     curl -v -X GET http://localhost:3030/api/v1/account?email=demo@demo.com
 *
 * @apiSuccess (200) {Array} data Array of Account Objects
 * @apiSuccess (200) {String} next Cursor for next document in pagination
 * @apiError (Error responses) {String} message Internal Server error
 * @apiError (Error responses) {String} errorCode Code to find more information in the docs.
 * @apiError (Error responses) {String} errors Array of error messages.
 *
 * @apiSuccessExample {JSON} Success-Response:
 * {
 *    "message": "ok",
 *    "data": [
 *        {
 *            "_id": "5d40ad6f53e62706059c64ad",
 *            "balance": 100
 *        },
 *        {
 *            "_id": "5d40ad37fc77de0422109374",
 *            "balance": 100
 *        },
 *        {
 *            "_id": "5d3e17bb056dc3672600971e",
 *            "balance": 100
 *        }
 *    ],
 *    "next": "5d3e17bb056dc3672600971e",
 *    "statusCode": 200
 * }
 *
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "statusCode": 503,
 *    "errorCode": 503,
 *    "errors": [
 *        "Could not connect to database"
 *    ],
 *    "message": "ServiceUnavailable"
 * }
 */
router.get('/', controller.find);
/**
 *
 * @api {get} /api/v1/account/:id GET BY ID
 * @apiVersion 1.0.0
 * @apiName getAccount
 * @apiGroup Account
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET 'http://localhost:3003/account/5d3e14c3056dc3672600971d?fields=balance,name,_id' -H 'Content-Type: application/json'
 *
 * @apiSuccess (200) {data} User Object
 * @apiError (Error responses) {String} message ValidationError
 * @apiError (Error responses) {String} errorCode Code to find more information in the docs.
 * @apiError (Error responses) {String} errors Array of error messages.
 *
 * @apiSuccessExample {JSON} Success-Response:
 * {
 *    "message": "ok",
 *    "data": {
 *        "_id": "5d3e17bb056dc3672600971e",
 *        "name": "test",
 *        "balance": 100
 *    },
 *    "statusCode": 200
 * }
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "statusCode": 400,
 *    "errorCode": 400,
 *    "errors": [
 *        "Not a valid id"
 *    ],
 *    "message": "ValidationError"
 * }
 */
router.get('/:id', controller.findById);
/**
 *
 * @api {patch} /api/v1/account/:id UPDATE
 * @apiVersion 1.0.0
 * @apiName updateAccount
 * @apiGroup Account
 *
 * @apiExample {curl} Example usage:
 *     curl -X PATCH http://localhost:3003/account/5d3e14c3056dc3672600971d -H 'Content-Type: application/json'  -d '{"balance": 200}'
 *
 * @apiSuccess (204) {Empty} Empty No content
 * @apiError (Error responses) {String} message ValidationError
 * @apiError (Error responses) {String} errorCode Code to find more information in the docs.
 * @apiError (Error responses) {String} errors Array of error messages.
 *
 * @apiSuccessExample {JSON} Success-Response:
 * status: 204
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "statusCode": 400,
 *    "errorCode": 400,
 *    "errors": [
 *        "Not a valid id"
 *    ],
 *    "message": "ValidationError"
 * }
 */
router.patch('/:id', controller.update);
/**
 *
 * @api {delete} /api/v1/account/:id DELETE
 * @apiVersion 1.0.0
 * @apiName deleteAccount
 * @apiGroup Account
 *
 * @apiExample {curl} Example usage:
 *     curl -X DELETE http://localhost:3003/account/5d3e17bb056dc3672600971e -H 'Content-Type: application/json' \
 *
 * @apiSuccess (204) {Empty} Empty No content
 * @apiError (Error responses) {String} message ValidationError
 * @apiError (Error responses) {String} errorCode Code to find more information in the docs.
 * @apiError (Error responses) {String} errors Array of error messages.
 *
 * @apiSuccessExample {JSON} Success-Response:
 * status: 204
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "statusCode": 400,
 *    "errorCode": 400,
 *    "errors": [
 *        "Not a valid id"
 *    ],
 *    "message": "ValidationError"
 * }
 */
router.delete('/:id', controller.deleteById);
/**
 *
 * @api {post} /api/v1/account CREATE
 * @apiVersion 1.0.0
 * @apiName createAccount
 * @apiGroup Account
 *
 * @apiExample {curl} Example usage:
 *     curl -X POST http://localhost:3003/account -H 'Content-Type: application/json' -d '{ "ownerId": "5d33c18dc1629243f43db274", "name": "test", "balance": 100 }'
 *
 * @apiSuccess (201) {Empty} Created
 * @apiError (Error responses) {String} message ValidationError
 * @apiError (Error responses) {String} errorCode Code to find more information in the docs.
 * @apiError (Error responses) {String} errors Array of error messages.
 *
 * @apiSuccessExample {JSON} Success-Response:
 * status: 201 Created
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "statusCode": 400,
 *    "errorCode": 400,
 *    "errors": [
 *        "ownerId is required"
 *    ],
 *    "message": "ValidationError"
 *}
 */
router.post('/', controller.create);
export default router;
