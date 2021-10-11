import { Entries } from "./Entries.js"
import {JournalForm} from "./JournalForm.js"

export const DailyJournal = () => {
    return `
        <form class="entryForm">
            ${JournalForm()}
        </form>
    
        <div class="entryList">
            ${ Entries() }
        </div>
    `
}