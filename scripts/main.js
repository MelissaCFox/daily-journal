
//Started code, adjust as needed
import { DailyJournal } from "./DailyJournal.js"
import { fetchEntriesWithMoods, fetchMoods, fetchTags, fetchEntryTags, fetchInstructors } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchEntriesWithMoods()
    .then(
        () => fetchMoods()
    )
    .then (
        () => fetchTags()
    )
    .then(
        () => fetchEntryTags()
    )
    .then(
        () => fetchInstructors()
    )
    .then(
        () => {
            mainContainer.innerHTML = DailyJournal()
        }
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)