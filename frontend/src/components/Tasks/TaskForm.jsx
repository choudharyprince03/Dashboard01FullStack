import {useForm} from "react-hook-form";

const TaskForm=({onCreate})=>{
    const {
        register, 
        handleSubmit,
        reset,
        formState:{errors, isSubmitting} }  = useForm({
            defaultValues:{
                priority: "medium"
            }
        }); 
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
