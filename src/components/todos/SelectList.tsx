
export function SelectList() {
    return (
        <div className="flex justify-between bg-Dark-fondo-input p-3">

            <span className="">item left</span>
            <ul className="flex gap-4">
                <li>All</li>
                <li>Active</li>
                <li>Completed</li>
            </ul>
            <span>Clear Completed</span>

        </div>
    )
}
