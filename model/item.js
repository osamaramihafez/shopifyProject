const utils = require("./utils");

// Note: this object contains key value pairs of the attributes and types within the schema.
const attributes = {
  item_id: "integer",
  item_description: "string",
  item_quantity: "integer",
  sale_date: "date",
  tag: "string",
};

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
 *      sale_date:
 *          type: string
 *          description: the date on which this item will go on sale
 *          example: 2021-5-28
 *      tag:
 *          type: string
 *          description: a tag for the item
 *          example: Shoes
 */
async function createItem(data) {
  var invalid = utils.simpleValidation(data, {
    item_title: "string",
    item_description: "string",
    item_quantity: "integer",
    sale_date: "string",
    item_tag: "string",
  });
  if (invalid) {
    return invalid;
  }
  var sql =
    "INSERT INTO Item (item_title, item_description, item_quantity, sale_date, item_tag) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
  var params = [
    data.item_title,
    data.item_description,
    data.item_quantity,
    data.sale_date,
    data.item_tag,
  ];
  return await utils.create(
    sql,
    params,
    new utils.Message({ success: "Successfully created an inventory item." })
  );
}

/**
 *
 *  This is where we actually filter our values.
 *  Properties must be a string representing one of the table columns.
 *  Operator must be one of: eq, gt, lt, gte, or lte.
 *  Value is the value we are filtering by.
 */
async function filterItems(data) {
  var invalid = utils.simpleValidation(data, {
    property: "string",
    operator: "string",
  });
  if (invalid) {
    return await utils.retrieve(
      "SELECT * FROM Item;",
      [],
      new utils.Message({
        success: `Fetched all Items since no query was properly defined.`,
      })
    );
  } else {
    if (!Object.keys(attributes).includes(data.property)) {
      // This check is done to avoid SQL injection.
      return utils.returnInvalid(
        `${property} is not an attribute of the Item type.`
      );
    }
    invalid = utils.simpleValidation(data, {
      value: attributes[data.property],
    });
    if (invalid) {
      return invalid;
    }
    let sql = `SELECT * FROM Item WHERE ${data.property}`;
    let op = utils.getOperator(data.operator);
    if (op) {
      sql = sql + `${op}$1;`;
    } else {
      // If the operator is invalid, then we must notify the client.
      utils.returnInvalid(
        `Operator was not set correctly. Operator must be one of: eq, gt, lt, gte, or lte.`
      );
    }
    var params = [data.value];
    return await utils.retrieve(
      sql,
      params,
      new utils.Message({
        success: `Successfully fetched Items based on filter ${data.property} ${op} ${data.value}.`,
      })
    );
  }
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
  var params = [data.item_id];
  return await utils.retrieve(
    sql,
    params,
    new utils.Message({
      success: `Successfully fetched an inventory item with id ${data.item_id}.`,
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
    sale_date: "string",
    item_tag: "string",
  });

  if (invalid) {
    return invalid;
  }
  let sql =
    "UPDATE Item SET item_title=$2, item_description=$3, item_quantity=$4, sale_date=$5, item_tag=$6 WHERE item_id=$1";
  var params = [
    data.item_id,
    data.item_title,
    data.item_description,
    data.item_quantity,
    data.sale_date,
    data.item_tag,
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

/** Delete an item by id. */
async function deleteItem(data) {
  var invalid = utils.simpleValidation(data, {
    item_id: "integer",
  });
  if (invalid) {
    return invalid;
  }
  let sql = "DELETE FROM item WHERE item_id=$1 RETURNING *;";
  var params = [data.item_id];
  return await utils.remove(
    sql,
    params,
    new utils.Message({
      success: `Successfully deleted item with id ${data.item_id}.`,
      none: `Could not find a item with id ${data.item_id}.`,
    })
  );
}

module.exports = {
  filterItems: filterItems,
  getItemById: getItemById,
  createItem: createItem,
  updateItem: updateItem,
  deleteItem: deleteItem,
};
