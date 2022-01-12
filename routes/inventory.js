const router = require("express").Router();
const item = require("../model/item");
const utils = require("./utils");

/*
 * @api [get] /item
 *  summary: "Fetch all item items"
 *  description: "This is a general fetch and has no parameters. It will fetch all of the item items in the database."
 *  tags:
 *    - Item Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: A list of item items.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/item'
 *    404:
 *      description: No item items found.
 *
 */
router.get("/items", async (request, response) => {
  await item.getInventory(request.body).then(async function (result) {
    return utils.simpleResponse(result, response);
  });
});

/*
 * @api [get] /item/{item}
 *  summary: "Fetch an item item by ID"
 *  description: "This fetches an item item by id."
 *  tags:
 *    - Item Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: item_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: A list of item items.
 *      schema:
 *          $ref: '#/definitions/item'
 *    404:
 *      description: No item items found with that ID.
 *
 */
router.get("/item/:item_id", async (request, response) => {
  await item.getItemById(request.params).then(async function (result) {
    return utils.simpleResponse(result, response);
  });
});

/*
 * @api [post] /item
 *  summary: "Create a item"
 *  tags:
 *    - Item Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the item to update and it's new attributes
 *          schema:
 *            $ref: '#/definitions/item'
 *  responses:
 *    200:
 *      description: item has been created.
 *
 */
router.post("/item", async (request, response) => {
  await item.createItem(request.body).then(async function (result) {
    return utils.simpleResponse(result, response);
  });
});

/*
 * @api [patch] /item
 *  summary: "Update a item"
 *  tags:
 *    - Item Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the item to update and it's new attributes
 *          schema:
 *            $ref: '#/definitions/item'
 *  responses:
 *    200:
 *      description: item has been updated.
 *    404:
 *      description: Could not find a item with that id.
 *
 */
router.patch("/item", async (request, response) => {
  await item.updateItem(request.body).then(async function (result) {
    return utils.simpleResponse(result, response);
  });
});

module.exports = router;
