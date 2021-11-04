
//Started code, adjust as needed
import { DailyJournal } from "./DailyJournal.js"
import { fetchData } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchData().then(
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


//Display 3 most recent journal entries

// const previousEntries = () => {
//     //Set the beginning of the innerHTML string
//     for (let i=previousEntries.length - 1; i > previousEntries.length - 3; i-- ) {
//         stringify.previousEntries[i]
//     }
//     //Add in the ending of the HTML string
// }