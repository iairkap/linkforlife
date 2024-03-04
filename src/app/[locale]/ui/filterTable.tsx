import React from 'react';
import { useGlobalContext } from '../dashboard/globalContext';
import { useTableData } from '../helpers/useTableData';
import type { DashboardData } from '@/types/types';
import "../sass/components/groupsFilter.scss"

function FilterTable() {
    let groups: any,
        filteruserInvitationListByGroup: (arg: any) => any,
        userInvitationList: any,
        filteredInvitation: any,
        setGroupIds: React.Dispatch<React.SetStateAction<number[]>>,
        groupIds: number[];
    const context = useGlobalContext();
    if (!context) {
        return null; // or some other JSX
    } else {
        ({ groups, filteruserInvitationListByGroup, userInvitationList, filteredInvitation, setGroupIds, groupIds } = context as DashboardData);
    }

    if (groupIds) {
        console.log(groupIds)
    }

    const handleClick = (groupId: number) => {
        setGroupIds((prevGroupIds: any[]) => {
            if (prevGroupIds.includes(groupId)) {
                return prevGroupIds.filter(id => id !== groupId);
            } else {
                return [...prevGroupIds, groupId];
            }
        });
    };

    const classNameGroupSelected = (groupId: number) => {
        if (groupIds.includes(groupId)) {
            return 'chip-button-filter-selected';
        } else {
            return 'chip-button-filter';
        }
    }

    return (
        <article className='filter-container-buttons'>
            {
                groups && groups.length > 0 &&
                <div className='filter-container-chips'>
                    <span>Filter by Groups:</span>
                    {groups.map((group: any) => {
                        return (
                            <div className='chips-layout'>
                                <button key={group.id} onClick={() => handleClick(group.id)} className={classNameGroupSelected(group.id)}>{group.name}</button>
                            </div>
                        )
                    }
                    )}
                    <button onClick={() => filteruserInvitationListByGroup(null)}>All</button>
                </div>
            }
        </article >
    );
}

export default FilterTable;