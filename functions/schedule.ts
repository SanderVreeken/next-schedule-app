import EmployeeT from '../types/employee'
import ShiftT from '../types/shift'

const millisecondsInADay = 86400000
const millisecondsInAnHour = 3600000

export const getAvailableShifts = (endDate: number, shifts: ShiftT[], startDate: number): {_id: string, end: number, employee?: string, start: number}[] => {
    const availableShifts = []
    for (let date = startDate; date < endDate; date+= millisecondsInADay) {
        shifts.map(shift => {
            for (let n = 0; n < shift.employeesNeeded; n++) {
                availableShifts.push({
                    // TODO: Ensure that a random id is generated for every shift available rather than the hard-coded id that is used now.
                    _id: 'cdfba08b-9472-4636-b1ce-4d8b879286fc',
                    end: new Date(date).setHours(shift.endHour),
                    start: new Date(date).setHours(shift.startHour)
                })
            }
        })
    }

    return availableShifts
}

export const scheduleShifts = (shifts: {_id: string, end: number, employee?: string, start: number}[], employees: EmployeeT[]) => {    
    
    let availableEmployees = [...employees]
    let availableShifts = [...shifts]

    for (let s = 0; s < availableShifts.length; s++) {
        const hours = (availableShifts[s].end - availableShifts[s].start) / millisecondsInAnHour
        for (let e = 0; e < availableEmployees.length; e++) {
            if (availableEmployees[e].hours >= hours) {
                availableShifts[s].employee = availableEmployees[e]._id
                availableEmployees[e].hours -= hours
                break
            }
        }
    }
    return availableShifts
}