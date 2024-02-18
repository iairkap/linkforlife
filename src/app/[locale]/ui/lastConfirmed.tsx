import React from 'react';




function DashboardLastConfirmed({ userInvitationList, extraction }) {
    console.log(userInvitationList)

    const confirmedUsers = userInvitationList
        .filter(user => user.isAttending)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 6);

    return (

        <div>
            <h2>Last Attendees</h2>
            <ul>
                {confirmedUsers.map((user, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <p>{user.name}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default DashboardLastConfirmed;