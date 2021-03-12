import React from 'react'

export default function Row(props) {
    console.log('heyo marc', props.data)
    return (
        <tr className="priority-200">
            <td>{ props.data.flight_number }</td>
            <td>{ props.data.rocket_name }</td>
            <td>
                <i className="fas fa-circle"></i>
                { props.data.launch_date_local }
            </td>
            <td>
                <button className="delete">
                    <i className="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    )
}
