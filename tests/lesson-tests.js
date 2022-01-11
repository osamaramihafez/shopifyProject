const faker = require("faker");
const utils = require("./utils");
const apiGET = utils.apiGET;
const apiPOST = utils.apiPOST;
const apiPATCH = utils.apiPATCH;
const setup = require("./setup");
const moment = require("moment");
const seedData = setup.seedData;

function lessonTests() {
    it("getting a lesson's information", async () => {
        let lessonA = seedData.lesson[0];

        const resp1 = await apiGET(`/lesson/1`);
        let lessonB = resp1.data.data[0];
        checkMatch(lessonA, lessonB);
        expect(resp1.data.success).toEqual(true);
    });

    it("getting all lessons", async () => {
        let lessonA = seedData.lesson[0];

        const resp1 = await apiGET(`/lessons`);
        let lessonB = resp1.data.data[0];
        checkMatch(lessonA, lessonB);
        expect(resp1.data.success).toEqual(true);
    });

    it("creating a lesson", async () => {
        let newlesson = {
            lesson_date: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
            source: "randomWebsite.com/url_to_video",
        };

        let resp1 = await apiPOST(`/lesson`, newlesson);
        let lesson = resp1.data.data[0];
        checkMatch(newlesson, lesson);
        expect(resp1.data.success).toEqual(true);
    });

    it("updating a lesson", async () => {
        let newlesson = {
            lesson_id: 1,
            lesson_date: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
            source: "randomWebsite.com/url_to_video",
        };

        let resp1 = await apiGET(`/lesson/1`);
        let original_lesson = resp1.data.data[0];
        expect(original_lesson.source).not.toEqual(newlesson.source);
        expect(
            new moment(original_lesson.lesson_date).format("YYYY-MM-DD")
        ).not.toEqual(new moment(newlesson.lesson_date).format("YYYY-MM-DD"));

        await apiPATCH(`/lesson`, newlesson);
        let resp2 = await apiGET(`/lesson/1`);
        checkMatch(newlesson, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });
}

function checkMatch(lessonA, lessonB) {
    expect(lessonA.source).toEqual(lessonB.source);
    expect(new moment(lessonA.lesson_date).format("YYYY-MM-DD")).toEqual(
        new moment(lessonB.lesson_date).format("YYYY-MM-DD")
    );
}

module.exports = {
    lessonTests: lessonTests,
};
