import { getTransientState, saveEntry, setEntryTags } from "./dataAccess.js"
import { Moods } from "./Moods.js"


export const JournalForm = () => {
    return `
        <fieldset>
            <label for "date">Date</label>
            <input type="date" id="date" name="date">
        </fieldset>
        <fieldset>
            <label for "new-entry-concept">Concepts Covered</label>
            <textarea id="new-entry-concept" name="concept" rows="1" cols="20"></textarea>
        </fieldset>
        <fieldset>
            <label for "new-entry-text">Journal Entry</label>
            <textarea id="new-entry-text" name="text" rows="3" cols="50"></textarea>
        </fieldset >
        <fieldset>
            ${Moods()}
        </fieldset >
        <fieldset>
            <label for "entry-tags">Tags</label>
            <input type="text" id="entry-tags" name="entry-tags">
        </fieldset>
    <button type="button" id="recordEntry">Record Journal Entry</button>
    `
}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "recordEntry") {
        const transientState = getTransientState()

        const userDate = document.querySelector("input[name='date']").value
        const userConcept = document.querySelector("textarea[name='concept']").value
        const userEntry = document.querySelector("textarea[name='text']").value
        const userMood = transientState.moodId
        const userDateToSort = Date.parse(userDate)

        const tagsArray = document.querySelector("input[name='entry-tags']").value.split(",")

        console.log(tagsArray)

        tagsArray.forEach(
            (tag) => {
                setEntryTags(tag)
            }
        )

        const userEntryObj = {
            date: userDate,
            dateToSort: userDateToSort,
            concepts: userConcept,
            entry: userEntry,
            moodId: userMood
        }

        saveEntry(userEntryObj)
    }
})