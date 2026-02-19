import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {getAllUsers} from "../../api/admin.api";

const TaskForm=({onCreate})=>{
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    const {
        register, 
        handleSubmit,
        reset,
        formState:{errors, isSubmitting} }  = useForm({
            defaultValues:{
                priority: "medium"
            }
        });
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoadingUsers(true);
                const response = await getAllUsers();
                setUsers(response.data.users || []);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            } finally {
                setLoadingUsers(false);
            }
        };
        fetchUsers();
    }, []);

    const onSubmit = async(data)=>{
        try {
            await onCreate(data); 
            reset();
        } catch (err) {
            console.error(err);
        } 
    }; 

    return(
    <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-lg space-y-4"
        >
        <h3 className="text-white text-lg font-semibold">
            Create New Task
        </h3>

        {/* Title */}
        <div>
            <input
            type="text"
            placeholder="Task title"
            className="w-full p-2 bg-gray-700 text-white rounded"
            {...register("title", {
                required: "Title is required",
                minLength: {
                value: 3,
                message: "Minimum 3 characters"
                }
            })}
            />
            {errors.title && (
            <p className="text-red-400 text-sm mt-1">
                {errors.title.message}
            </p>
            )}
        </div>

        {/* Description */}
        <div>
            <textarea
            placeholder="Description"
            className="w-full p-2 bg-gray-700 text-white rounded"
            {...register("description",
                {required: "Description is required"})
            }
            />
            {errors.description&&(
               <p className="text-red-400 text-sm mt-1">
                    {errors.description.message}
               </p>
            )}
        </div>

        {/* Priority */}
        <div>
            <select
            className="w-full p-2 bg-gray-700 text-white rounded"
            {...register("priority")}
            >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            </select>
        </div>

        {/* Assign To User */}
        <div>
            <select
            className="w-full p-2 bg-gray-700 text-white rounded"
            {...register("assignee", {
                required: "Please assign the task to a user"
            })}
            disabled={loadingUsers}
            >
            <option value="">
                {loadingUsers ? "Loading users..." : "Select user to assign"}
            </option>
            {users.map((user) => (
                <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                </option>
            ))}
            </select>
            {errors.assignee && (
            <p className="text-red-400 text-sm mt-1">
                {errors.assignee.message}
            </p>
            )}
        </div>

        {/* Due Date */}
        <div>
            <input
            type="date"
            className="w-full p-2 bg-gray-700 text-white rounded"
            {...register("dueDate")}
            />
        </div>

        <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
            {isSubmitting ? "Creating..." : "Create Task"}
        </button>
    </form>
    );

}
export default TaskForm; 
