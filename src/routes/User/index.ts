import Router from 'koa-router';
import UserController from '../../controllers/user';

const router = new Router({ prefix: '/user' });
const controller = UserController();

/**
 *
 * @api {get} /api/v1/user/:id GET BY ID
 * @apiVersion 1.0.0
 * @apiName getUser
 * @apiGroup User
 *
 * @apiExample {curl} Example usage:
 *     curl -v -X GET -H "Content-Type: application/json" http://localhost:3030/api/v1/user/5ca9fe78b9ec54647f5ef68f
 *
 * @apiSuccess (200) {data} User Object
 * @apiError (Error responses) {String} message Error message
 * @apiError (Error responses) {String} errorCode Code to find more information in the docs.
 *
 * @apiSuccessExample {JSON} Success-Response:
 * status: 200
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "message":"not a valid id",
 * }
 */
router.get('/:id', controller.findById);
/**
 *
 * @api {post} /api/v1/user CREATE
 * @apiVersion 1.0.0
 * @apiName createUser
 * @apiGroup User
 *
 * @apiExample {curl} Example usage:
 *     curl -v -X POST -H "Content-Type: application/json" -d '{ "email": "demo@demo.com", "password": "demo123"}' http://localhost:3030/api/v1/user
 *
 * @apiSuccess (204) {Empty} Empty No content
 * @apiError (Error responses) {String} message Error message
 * @apiError (Error responses) {String} errorCode Code to find more information in the docs.
 *
 * @apiSuccessExample {JSON} Success-Response:
 * status: 201
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "message":"field email is required",
 * }
 */
router.post('/', controller.create);
/**
 *
 * @api {patch} /api/v1/user/:id UPDATE
 * @apiVersion 1.0.0
 * @apiName updateUser
 * @apiGroup User
 *
 * @apiExample {curl} Example usage:
 *     curl -v -X PATCH -H "Content-Type: application/json" -d '{ "name": { "title": "mr"}}' http://localhost:3030/api/v1/user/5ca9fe78b9ec54647f5ef68f
 *
 * @apiSuccess (204) {Empty} Empty No content
 * @apiError (Error responses) {String} message Error message
 * @apiError (Error responses) {String} errorCode Code to find more information in the docs.
 *
 * @apiSuccessExample {JSON} Success-Response:
 * status: 204
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "message":"not a valid id",
 * }
 */
router.patch('/:id', controller.update);
/**
 *
 * @api {get} /api/v1/user GET MANY
 * @apiVersion 1.0.0
 * @apiName getUsers
 * @apiGroup User
 *
 * @apiDescription Get Users
 * Default limit: 50,
 * Max limit: 50
 * Supports pagination with the use of a cursor (next) field
 *
 * @apiExample {curl} Example usage:
 *     curl -v -X GET http://localhost:3003/api/v1/users
 *
 * @apiExample {curl} Example usage - Cusom limit:
 *     curl -v -X GET http://localhost:3003/api/v1/users?limit=2
 *
 * @apiExample {curl} Example usage - Partial:
 *     curl -v -X GET http://localhost:3003/api/v1/users?fields=email,_id
 *
 * @apiExample {curl} Example usage - Filter:
 *     curl -v -X GET http://localhost:3030/api/v1/users?email=demo@demo.com
 *
 * @apiSuccess (200) {Array} data Array of User Objects
 * @apiSuccess (200) {String} next Cursor for next document in pagination
 * @apiError (Error responses) {String} message Error message
 *
 * @apiSuccessExample {JSON} Success-Response:
 * {
 *  "status": "200",
 *  "data": [
 *      {
 *          "email": "demo@demo.com"
 *          "_id": "5cb22073ca3937d436f23447"
 *      }
 *  ],
 *  "next": "5cb22073ca3937d436f23447"
 * }
 *
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "message":"Could not connect to database",
 * }
 */

router.get('/', controller.find);
/**
 *
 * @api {delete} /api/v1/user/:id DELETE
 * @apiVersion 1.0.0
 * @apiName deleteUser
 * @apiGroup User
 *
 * @apiExample {curl} Example usage:
 *     curl -v -X DELETE  http://localhost:3030/api/v1/user/5ca9fe78b9ec54647f5ef68f
 *
 * @apiSuccess (204) {Empty} Empty No content
 * @apiError (Error responses) {String} message Error message
 * @apiError (Error responses) {String} errorCode Code to find more information in the docs.
 *
 * @apiSuccessExample {JSON} Success-Response:
 * status: 204
 *
 * @apiErrorExample {JSON} Error-Response:
 *  {
 *    "message":"not a valid id",
 * }
 */
router.delete('/:id', controller.deleteById);

export default router;
