import React from 'react';
import "../sass/components/stats.scss";
interface UserInvitationList {
    id?: number;
    name?: string;
    lastName?: string;
    emailInvitation?: string;
    createdAt?: Date;
    updatedAt?: Date;
    plusOne?: boolean;
    userId?: number;
    invitedBy?: any;
    specialRole?: any;
    isAttending?: boolean;
    isConfirmed?: boolean;
    plusOneConfirmed?: boolean;
    groups?: any[];
    groupId?: number;
    Table?: number;
}

function Graph({ userInvitationList }: { userInvitationList: UserInvitationList[] }) {


    const confirmed = userInvitationList?.filter((inv) => inv.isConfirmed === true);
    const notConfirmed = userInvitationList?.filter((inv) => inv.isConfirmed === false);
    const isAttending = userInvitationList?.filter((inv) => inv.isAttending === true);
    const notAttending = userInvitationList?.filter((inv) => inv.isAttending === false);


    return (
        <div className='container'>
            <div className='graph'>
                <div className='graph-container'>
                    <div className='confirmed'>
                        <span className="bold">מאושרים</span>
                        <span>{confirmed.length}</span>
                    </div>
                    <div className='not-confirmed'>
                        <span className="bold">לא מאושרים</span>
                        <span>{notConfirmed.length}</span>
                    </div>
                    <div className='is-attending'>
                        <span className="bold">מגיעים</span>
                        <span>{isAttending.length}</span>
                    </div>
                    <div className='not-attending'>
                        <span className="bold">לא מגיעים</span>
                        <span>{notAttending.length}</span>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Graph;