const utils = require("./utils");

/**
 * This is a self explanatory function
 *
 *  @schema Item
 *  type: object
 *  required:
 *      - item_id
 *      - item_title
 *      - item_description
 *      - item_quantity
 *  properties:
 *      item_id:
 *          type: integer
 *          description: to identify the items from other items
 *          example: 1
 *      item_title:
 *          type: string
 *          description: give the item a title
 *          example: "Tomato Paste"
 *      item_description:
 *          type: string
 *          description: a description of the item
 *          example: "This tomato paste is so good, it can be used as plaster for doors, windows, and bath tiles."
 *      item_quantity:
 *          type: integer
 *          description: the remaining quantity of this item
 *          example: 36
 */
async function createItem(data) {
  var invalid = utils.simpleValidation(data, {
    item_title: "string",
    item_description: "string",
    item_quantity: "integer",
  });
  if (invalid) {
    return invalid;
  }
  var sql =
    "INSERT INTO Item (item_title, item_description, item_quantity) VALUES ($1, $2, $3) RETURNING *;";
  var params = [data.item_title, data.item_description, data.item_quantity];
  return await utils.create(
    sql,
    params,
    new utils.Message({ success: "Successfully created an inventory item." })
  );
}

/** Fetches all items */
async function getInventory() {
  return await utils.retrieve("SELECT * FROM Item;");
}

/** Self explanatory function */
async function getItemById(data) {
  var invalid = utils.simpleValidation(data, {
    item_id: "integer",
  });
  if (invalid) {
    return invalid;
  }
  let sql = "SELECT * FROM Item WHERE item_id=$1";
  var params = [data.inventory_id];
  return await utils.retrieve(
    sql,
    params,
    new utils.Message({
      success: `Successfully fetched an inventory item with id ${data.inventory_id}.`,
    })
  );
}

/** Update any of an item's attributes. */
async function updateItem(data) {
  var invalid = utils.simpleValidation(data, {
    item_id: "integer",
    item_title: "string",
    item_description: "string",
    item_quantity: "integer",
  });

  if (invalid) {
    return invalid;
  }
  let sql =
    "UPDATE Item SET item_title=$2, item_description=$3, item_quantity=$4, WHERE item_id=$1";
  var params = [
    data.item_id,
    data.item_title,
    data.item_description,
    data.item_quantity,
  ];
  return await utils.update(
    sql,
    params,
    new utils.Message({
      success: `Successfully update item with id ${data.item_id}.`,
      none: `Could not find a item with id ${data.item_id}.`,
    })
  );
}

// /** Update an item's quantity.
//  * Note: we just take in the quantity because the increase can be done elsewhere (i.e. frontend)*/
// async function updateQuantity(data) {
//   var invalid = utils.simpleValidation(data, {
//     item_id: "integer",
//     item_quantity: "integer",
//   });
//   if (invalid) {
//     return invalid;
//   }
//   let sql = "UPDATE Item SET quantity=$2 WHERE item_id=$1";
//   var params = [data.item_id, data.item_quantity];
//   return await utils.update(
//     sql,
//     params,
//     new utils.Message({
//       success: `Successfully update item with id ${data.item_id}.`,
//       none: `Could not find a item with id ${data.item_id}.`,
//     })
//   );
// }

module.exports = {
  getInventory: getInventory,
  getItemById: getItemById,
  createItem: createItem,
  updateItem: updateItem,
  // updateQuantity: updateQuantity, // Seems redundant
};
