import { axiosInstance } from ".";
export const addTask = async(payload)=>{
    try{
        const response = await axiosInstance.post('/api/tasks/add-task', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}

export const updateTask = async(payload)=>{
    try{
        const response = await axiosInstance.patch('/api/tasks/update-task', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}

export const deleteTask = async(taskId)=>{
    try{
        const response = await axiosInstance.delete(`/api/tasks/delete-task/${taskId}`);
        return response.data;
    }catch(err){
        return err.message;
    }
}

export const getAllTasks = async(date)=>{
    try{
        let url = '/api/tasks/get-all-tasks';
        if(date){
            url += `?date=${date}`;
        }   
        const response = await axiosInstance.get(url);
        return response.data;
    }catch(err){
        return err.message;
    }
}
