import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';

const Update = () => {
    // const loadedData = useLoaderData();
    const [loadedData, setLoadedData] = useState(null)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // console.log(loadedData)
    const { id } = useParams();

    useEffect(() => {

        fetch(`http://localhost:5000/item/${id}`)
            .then(res => res.json())
            .then(data => setLoadedData(data))
    }, [loading])

    const handleUpdata = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const link = form.link.value;

        const item = { name, link }

        // console.log(item)

        fetch(`http://localhost:5000/item/${loadedData._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged) {
                    toast.success('Successfully Updated!');
                    setLoading(!loading);
                }
            })
    }


    if(!loadedData){
        return <Loading></Loading>
    }
    return (
        <div>
            <div className='flex justify-center '>
                <form onSubmit={handleUpdata} className='text-center w-full'>
                    <img className='w-52 mx-auto' src={loadedData.link} alt="" />
                    <label> Name : </label>
                    <br />
                    <input defaultValue={loadedData.name} type="text" name='name' placeholder="name" className="input input-bordered input-error w-full max-w-xs" />
                    <br />
                    <label> Image Link : </label>
                    <br />
                    <input defaultValue={loadedData.link} type="text" name='link' placeholder="image link" className="input input-bordered input-error w-full max-w-xs" />
                    <br />
                    <button className='btn btn-error mt-3'>Update</button>
                    <br />
                </form>
            </div>
            <div className='flex justify-center'>
                <button onClick={() => navigate(-1)} className='btn btn-success mt-3'>Go back</button>
            </div>
        </div>
    );
};

export default Update;