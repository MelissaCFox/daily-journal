import { getInstructors, setInstructorId } from "./dataAccess.js"


export const Instructors = () => {
    const instructors = getInstructors()

    let html = `<label class="label" for="instructor">Instructor: </label>
    <select id="select__instructor">
    <option value="0">Choose an instructor...</option>`

    const instructorOptions = instructors.map(
        (instructor) => {
            return `<option value="${instructor.id}">${instructor.first_name} ${instructor.last_name}</option>`
        }
    ).join("")

    html += instructorOptions
    html += `</select>`
    return html
}


document.addEventListener("change", (event) => {
    if (event.target.id ==="select__instructor") {
        setInstructorId(parseInt(event.target.value))
    }
})