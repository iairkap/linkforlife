import React from 'react';
import { useGlobalContext } from '../dashboard/globalContext';
import { useTableData } from '../helpers/useTableData';
import type { DashboardData } from '@/types/types';
import "../sass/components/groupsFilter.scss"

function FilterTable({ t, extraction }: { t: (key: string) => string, extraction: string }): JSX.Element {
    let groups: any,
        filteruserInvitationListByGroup: (arg: any) => any,
        userInvitationList: any,
        filteredInvitation: any,
        setGroupIds: React.Dispatch<React.SetStateAction<number[]>>,
        groupIds: number[];
    const context = useGlobalContext();



    if (!context) {
        return <div>Loading...</div>;
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

    const filterContainerButtons = extraction === "he" ? "filter-container-buttons-he" : "filter-container-buttons";

    return (
        <article className={filterContainerButtons}>
            {
                groups && groups.length > 0 &&
                <div className='filter-container-chips'>
                    <span>{t("filterByGroups")}</span>
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