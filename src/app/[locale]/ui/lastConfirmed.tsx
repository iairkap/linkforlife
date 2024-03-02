import React from 'react';
import "../sass/components/lastConfirmed.scss"
import Image from 'next/image';
import logo from "../../../../public/logo.png"
import { timeToMinutes } from '../utils/timeToMinutes';
import { useState } from 'react';
import type { UserInvitation } from '../../../types/types';

interface userInvitationList {
    userInvitationList: UserInvitation[];
    extraction: string | undefined;
}
function DashboardLastConfirmed({ userInvitationList, extraction }: userInvitationList) {
    const [menuOpen, setMenuOpen] = useState<Record<number, boolean>>({});

    const confirmedUsers = userInvitationList
        .filter(user => user?.isAttending)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 3);

    return (
        <div className='general-containeras'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <h2>Last Attendees</h2>
            <ul className='list-ul'>
                {confirmedUsers.map((user, index) => {
                    const avatar = (Array.isArray(user.avatar) && user.avatar.length === 0) ? '/logo.png' : user.avatar; (avatar)
                    return (
                        <li key={index} className='display' >
                            <div className={`list-container ${menuOpen[index] ? 'menu-open' : 'regular-width'}`}>
                                <div className='first-container'>
                                    <div className='imagen-container'>
                                        <Image src={avatar ?? '/logo.png'} alt='profile-picture' width={45} height={45} />
                                    </div>
                                    <div>
                                        <p className='name-title'>{user.name}</p>
                                        <p>{extraction && timeToMinutes(user.updatedAt, extraction)}</p>
                                    </div>
                                </div>
                                <button onClick={() => setMenuOpen(prevState => ({ ...prevState, [index]: true }))}>
                                    <span className="material-symbols-outlined">
                                        more_vert
                                    </span>
                                </button>
                            </div>
                            {
                                menuOpen[index] && (
                                    <div className='menu-containerLast'>
                                        <button onClick={() => setMenuOpen(prevState => ({ ...prevState, [index]: false }))} className='fafa'>
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </button>
                                    </div>
                                )
                            }
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default DashboardLastConfirmed;