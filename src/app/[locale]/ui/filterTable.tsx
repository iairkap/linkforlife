import React from 'react';
import { useGlobalContext } from '../dashboard/globalContext';
import { useTableData } from '../helpers/useTableData';
import type { DashboardData } from '@/types/types';
import "../sass/components/groupsFilter.scss"


function FilterTable() {


    const { groups, filteruserInvitationListByGroup, userInvitationList, filteredInvitation, setGroupIds, groupIds }: DashboardData = useGlobalContext() || {};


    if (groupIds) {
        console.log(groupIds)
    }


    const handleClick = (groupId: number) => {
        setGroupIds(prevGroupIds => {
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
                    {groups.map((group) => {
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