
//Started code, adjust as needed
import { DailyJournal } from "./DailyJournal.js"

const container = document.querySelector("#journalFormAndEntries")

const render = () => {
    container.innerHTML = DailyJournal()
}

render()



//Display 3 most recent journal entries

// const previousEntries = () => {
//     //Set the beginning of the innerHTML string
//     for (let i=previousEntries.length - 1; i > previousEntries.length - 3; i-- ) {
//         stringify.previousEntries[i]
//     }
//     //Add in the ending of the HTML string
// }