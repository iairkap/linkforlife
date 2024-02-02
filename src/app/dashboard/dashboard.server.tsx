"use server"

import { NextApiResponse } from "next";
import { parse } from "cookie";
import axios from "axios";

export async function getServerComponent(req, res: NextApiResponse) {
    const { token } = parse(req.headers.cookie || "");

    if (!token) {
        console.log("No token provided in the request");
        res.status(400).json({ message: "No token provided" });
        return;
    }

    try {
        const response = await axios.get('/api/inivitationListGeneral', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(response.data);
        return { props: { invitations: response.data } };
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to fetch data" });
    }
}