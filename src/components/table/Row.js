import React from 'react'

export default function Row(props) {
    return (
        <tr className="priority-200">
            <td>{ props.data.flight_number }</td>
            <td>{ props.data.mission_name }</td>
            <td>{ props.data.rocket.rocket_name }</td>
            <td>
                <i className="fas fa-circle"></i>
                { props.data.launch_date_local }
            </td>
            <td>
                { props.data.launch_site.site_name }
            </td>
            <td>
                <button className="delete">
                    <i className="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    )
}
