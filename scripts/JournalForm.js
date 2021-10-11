
export const JournalForm = () => {
    return `
        <fieldset>
            <label for "date">Date</label>
            <input type="date" id="date" name="Date">
        </fieldset>
        <fieldset>
            <label for "new-entry-concept">Concepts Covered</label>
            <textarea id="new-entry-concept" name="Concept" rows="1" cols="20"></textarea>
        </fieldset>
        <fieldset>
            <label for "new-entry-text">Journal Entry</label>
            <textarea id="new-entry-text" name="Text" rows="3" cols="50"></textarea>
        </fieldset >
        <fieldset>
            <label for "mood">Mood:</label>
            <select name="mood" name="mood">
                <option value = "Happy">Happy</option>
                <option value = "Comfortable">Comfortable</option>
                <option value = "Ok">Ok</option>
                <option value = "Frustrated">Frustrated</option>
                <option value = "Oatmeal">Oatmeal</option>
            </select>
        </fieldset >
    <button type="button">Record Journal Entry</button>
    `
}
