import React from 'react';
import Image from 'next/image';
import iconCouple from "../../../public/iconCouple.png"
import "../sass/components/dashboardGroups.scss"


interface DashboardGroupsProps {
    groups: Groups[];
}

interface Groups {
    id: number;
    name: string;
    userId: number;
    weddingId: number;
}


function DashboardGroups({ groups, user, setIsModalOpen }: any) {

    const fakeGroupNames = ["עמיתים", "משפחה", "מסיבת רווקים", "מסיבת רוותים", "שושבינה", "שולחן 2", "קולג'", "בית ספר תיכון", "קולג'", "משפחת הזוג", "שולחן 01"];
    const fakeGroups = fakeGroupNames.slice(0, 12 - groups.length).map((name, index) => ({ id: index + 1000, name, userId: 0, weddingId: 0 }));
    const allGroups = [...groups, ...fakeGroups];


    return (
        <article className='container'>
            <header className='groups-header'>
                <div className='icon-container-groups'>
                    <Image src={iconCouple} alt="groups icon" height={30} width={30} />
                </div>
                <h2 className='title-groups'>קבותזות</h2>
            </header>
            <div className='list-container'>
                <ul className='layout-ul'>
                    {allGroups.map((group) => (
                        <li key={group?.id} style={group?.userId === 0 ? { color: '#C4C8D2' } : {}} className='list-groupsbis'>
                            <h3 className='list-groups'>{group?.name}</h3>
                        </li>
                    ))}
                </ul>
            </div>
            <span onClick={() => { setIsModalOpen(true) }}>Add Group</span>
        </article>
    );
}

export default DashboardGroups;