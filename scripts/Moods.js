import { getMoods, setMood } from "./dataAccess.js";



export const Moods = () => {
    const moods = getMoods()

    let html = `<label class"label" for="mood">Mood: </label>
                <select id="select__mood">
                <option value="0">Choose a mood...</option>`


    const moodOptions = moods.map(
        (mood) => {
            return `<option value="${mood.id}">${mood.mood}</option>`
        }
    ).join("")

    html += moodOptions

    
    html += `</select>`
    return html
}

document.addEventListener("change", (event) => {
    if (event.target.id ==="select__mood") {
        setMood(parseInt(event.target.value))
    }
})
