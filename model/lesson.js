const c = require("./constants");

/**
 *  @schema Lesson
 *  type: object
 *  required:
 *      - lesson_id
 *      - lesson_date
 *      - source
 *  properties:
 *      lesson_id:
 *          type: integer
 *          description: to identify the lesson from others
 *          example: 1
 *      lesson_date:
 *          type: date
 *          description: to identify the day that the lesson was taught
 *          example: 2021-10-30
 *      source:
 *          type: string
 *          description: a URL to the lesson recording
 *          example: "https://www.facebook.com/watch/live/?ref=watch_permalink&v=244235014324418"
 */
async function createLesson(data) {
    // Frontend note: also add a feature where we guess that the
    //  lesson's date is the next saturday after the last lesson's date
    var invalid = c.simpleValidation(data, {
        lesson_date: "date",
        source: "string",
    });
    if (invalid) {
        return invalid;
    }
    var sql =
        "INSERT INTO Lesson (source, lesson_date) VALUES ($1, $2) RETURNING *;";
    var params = [data.source, data.lesson_date];
    return await c.create(
        sql,
        params,
        new c.Message({ success: "Successfully created a lesson." })
    );
}

/** Self explanatory function */
async function getLessons() {
    return await c.retrieve("SELECT * FROM Lesson;");
}

/** Self explanatory function */
async function getLessonById(data) {
    var invalid = c.simpleValidation(data, {
        lesson_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Lesson WHERE lesson_id=$1";
    var params = [data.lesson_id];
    return await c.retrieve(
        sql,
        params,
        new c.Message({
            success: `Successfully fetched lesson with id ${data.lesson_id}.`,
        })
    );
}

/** Update a lesson, requires all attributes of the lesson. */
async function updateLesson(data) {
    var invalid = c.simpleValidation(data, {
        lesson_id: "integer",
        lesson_date: "date",
        source: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "UPDATE Lesson SET source=$2, lesson_date=$3 WHERE lesson_id=$1";
    var params = [data.lesson_id, data.source, data.lesson_date];
    return await c.update(
        sql,
        params,
        new c.Message({
            success: `Successfully update lesson with id ${data.lesson_id}.`,
            none: `Could not find a lesson with id ${data.lesson_id}.`,
        })
    );
}

module.exports = {
    getLessons: getLessons,
    getLessonById: getLessonById,
    createLesson: createLesson,
    updateLesson: updateLesson,
};
