const router = require("express").Router();
const item = require("../model/item");
const utils = require("./utils");

// The extra feature that I will be implementing: Filtering based on fields/inventory count/tags/other metadata
/*
 * @api [get] /items
 *  summary: "Filter items"
 *  description: "This fetch acts as a filter based on the given query params. If none are given, then all params are fetched. Operator must be one of: eq, gt, lt, gte, or lte."
 *  tags:
 *    - Item Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: query
 *        name: property
 *        type: string
 *        required: false
 *        example: 'sale_date'
 *      - in: query
 *        name: operator
 *        type: string
 *        required: false
 *        example: 'eq'
 *      - in: query
 *        name: value
 *        type: string
 *        required: false
 *        example: '2021-5-28'
 *  responses:
 *    200:
 *      description: A list of items.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Item'
 *    404:
 *      description: No items found.
 *
 */
router.get("/items", async (request, response) => {
  await item.filterItems(request.query).then(async function (result) {
    return utils.simpleResponse(result, response);
  });
});

/*
 * @api [get] /item/{item}
 *  summary: "Fetch an item by ID"
 *  description: "This fetches an item by id."
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
 *      description: A list of items.
 *      schema:
 *          $ref: '#/definitions/Item'
 *    404:
 *      description: No items found with that ID.
 *
 */
router.get("/item/:item_id", async (request, response) => {
  await item.getItemById(request.params).then(async function (result) {
    return utils.simpleResponse(result, response);
  });
});

/*
 * @api [post] /item
 *  summary: "Create an item"
 *  tags:
 *    - Item Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the item to update and it's new attributes
 *          schema:
 *            $ref: '#/definitions/Item'
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
 *  summary: "Update an item"
 *  tags:
 *    - Item Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the item to update and it's new attributes
 *          schema:
 *            $ref: '#/definitions/Item'
 *  responses:
 *    200:
 *      description: item has been updated.
 *    404:
 *      description: Could not find an item with that id.
 *
 */
router.patch("/item", async (request, response) => {
  await item.updateItem(request.body).then(async function (result) {
    return utils.simpleResponse(result, response);
  });
});

/*
 * @api [delete] /item
 *  summary: "Delete an item"
 *  tags:
 *    - Item Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the item to be deleted
 *          schema:
 *              $ref: '#/definitions/Item'
 *  responses:
 *    200:
 *      description: This item has been deleted.
 *      schema:
 *          $ref: '#/definitions/Item'
 *    404:
 *      description: Could not find a item with that id.
 *
 */
router.delete("/item/:item_id", async (request, response) => {
  await item.deleteItem(request.params).then(async function (result) {
    return utils.simpleResponse(result, response);
  });
});

module.exports = router;
