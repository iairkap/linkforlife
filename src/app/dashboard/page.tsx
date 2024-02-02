"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import TableInvitationList from '../ui/invitationList';

function Dashboard() {
    const token = Cookies.get('token'); // Accede a la cookie 'token'
    console.log(token)

    const [userInvitationList, setUserInvitationList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState([]); // Nuevo estado para los grupos
    const [groupInvitations, setGroupInvitations] = useState<Record<number, UserInvitation[]>>({});



    console.log(groupInvitations)


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Comienza la carga
            try {
                const response = await axios.get('/api/invitationListGeneral', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserInvitationList(response.data);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false); // Termina la carga
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Extrae los grupos de userInvitationList y los guarda en el estado 'groups'
        const newGroups = userInvitationList.map(user => user.groups);
        setGroups(newGroups);
    }, [userInvitationList]); // Se ejecuta cada vez que userInvitationList cambia

    useEffect(() => {
        // Suponiendo que 'userInvitationList' es un array de objetos que tienen una propiedad 'groups' que es un array de grupos
        const newGroupInvitations = userInvitationList.reduce((acc, invitation) => {
            invitation.groups.forEach(group => {
                if (!acc[group.id]) {
                    acc[group.id] = [];
                }
                acc[group.id].push(invitation);
            });
            return acc;
        }, {} as Record<number, UserInvitation[]>);

        setGroupInvitations(newGroupInvitations);
    }, [userInvitationList]);
    if (isLoading) { // Si está cargando, muestra un mensaje de carga
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TableInvitationList userInvitationList={userInvitationList}
                isLoading={isLoading} setIsLoading={setIsLoading}
                groups={groups} groupInvitations={groupInvitations}
            />
        </div>
    );
}

export default Dashboard;