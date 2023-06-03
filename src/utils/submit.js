import { v4 as uuidv4 } from 'uuid';
import { getData } from './getData';

export const submitHandler = async (e, inputs) => {
    e.preventDefault();
    const data = await getData("https://next-online-store-api-production.up.railway.app/users")
    const response = await fetch("https://next-online-store-api-production.up.railway.app/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...data,
            [inputs.username]: {
                ...inputs,
                id: uuidv4()
            }
        }
        )
    });
};
