const utils = require("./utils");
const apiGET = utils.apiGET;
const apiPOST = utils.apiPOST;
const apiPATCH = utils.apiPATCH;
const setup = require("./setup");
const seedData = setup.seedData;

function itemTests() {
  it("getting a item's information", async () => {
    let item_a = seedData.item[0];

    const resp1 = await apiGET(`/item/1`);
    let item_b = resp1.data.data[0];
    checkMatch(item_a, item_b);
    expect(resp1.data.success).toEqual(true);
  });

  it("getting all items", async () => {
    let item_a = seedData.item[0];

    const resp1 = await apiGET(`/items`);
    let item_b = resp1.data.data[0];
    checkMatch(item_a, item_b);
    expect(resp1.data.success).toEqual(true);
  });

  it("creating a item", async () => {
    let new_item = {
      item_title: "amazing title #x",
      item_description: "this is a thing you can place in your humble abode",
      item_quantity: 49,
    };

    let resp1 = await apiPOST(`/item`, new_item);
    let item = resp1.data.data[0];
    checkMatch(new_item, item);
    expect(resp1.data.success).toEqual(true);
  });

  it("updating a item", async () => {
    let new_item = {
      item_id: 1,
      item_title: "different title",
      item_description: "we want a different desc",
      item_quantity: 49,
    };

    let resp1 = await apiGET(`/item/1`);
    let original_item = resp1.data.data[0];
    expect(original_item.item_id).toEqual(new_item.item_id);
    expect(original_item.item_title).not.toEqual(new_item.item_title);
    expect(original_item.item_description).not.toEqual(
      new_item.item_description
    );
    expect(original_item.item_quantity).not.toEqual(new_item.item_quantity);

    await apiPATCH(`/item`, new_item);
    let resp2 = await apiGET(`/item/1`);
    expect(resp2.data.data[0].item_id).toEqual(new_item.item_id);
    checkMatch(new_item, resp2.data.data[0]);
    expect(resp2.data.success).toEqual(true);
  });
}

function checkMatch(item_a, item_b) {
  expect(item_a.item_title).toEqual(item_b.item_title);
  expect(item_a.item_description).toEqual(item_b.item_description);
  expect(item_a.item_quantity).toEqual(item_b.item_quantity);
}

module.exports = {
  itemTests: itemTests,
};
