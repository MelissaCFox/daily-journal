import { Entries } from "./Entries.js"
import {JournalForm} from "./JournalForm.js"
import { MoodFilter } from "./MoodFilter.js"

export const DailyJournal = () => {
    return `
        <form class="entryForm">
            ${JournalForm()}
        </form>
        
        <section class="moodFilter">
        ${MoodFilter()}
        </section>

        <section class="entryList">
            ${ Entries() }
        </section>
    `
}