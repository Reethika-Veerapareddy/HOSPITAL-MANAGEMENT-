const BASE_URL = "http://127.0.0.1:5000/api";


// ================= GET BLOOD INVENTORY =================

export async function getInventory(){


    const response = await fetch(
        `${BASE_URL}/blood/inventory`
    );


    if(!response.ok){

        throw new Error(
            "Failed to fetch blood inventory"
        );

    }


    return await response.json();


}






// ================= ADD BLOOD =================


export async function addBlood(data){


    const response = await fetch(
        `${BASE_URL}/blood/inventory`,
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },


            body:JSON.stringify(data)

        }
    );



    const result = await response.json();



    if(!response.ok){

        throw new Error(
            result.message ||
            "Failed to add blood"
        );

    }


    return result;


}







// ================= UPDATE BLOOD =================


export async function updateBlood(id,data){


    const response = await fetch(

        `${BASE_URL}/blood/inventory/${id}`,

        {

            method:"PUT",


            headers:{
                "Content-Type":"application/json"
            },


            body:JSON.stringify(data)

        }

    );



    const result = await response.json();



    if(!response.ok){

        throw new Error(
            result.message ||
            "Failed to update blood"
        );

    }



    return result;


}








// ================= DELETE BLOOD =================


export async function deleteBlood(id){


    const response = await fetch(

        `${BASE_URL}/blood/inventory/${id}`,

        {

            method:"DELETE"

        }

    );



    const result =
    await response.json();



    if(!response.ok){

        throw new Error(
            result.message ||
            "Failed to delete blood"
        );

    }


    return result;


}