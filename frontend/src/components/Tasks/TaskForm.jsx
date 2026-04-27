import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/admin.api";
import { Loader2 } from "lucide-react";

const TaskForm = ({ onCreate }) => {
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    const {
        register, 
        handleSubmit,
        reset,
        formState: { errors, isSubmitting } 
    } = useForm({
        defaultValues: {
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

    const onSubmit = async (data) => {
        try {
            await onCreate(data); 
            reset();
        } catch (err) {
            console.error(err);
        } 
    }; 

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/80 dark:bg-[#121A2F]/80 backdrop-blur-md p-6 rounded-2xl border border-blue-200 dark:border-blue-500/30 shadow-md dark:shadow-[0_0_30px_rgba(59,130,246,0.1)] space-y-5 mb-8 transition-colors duration-300"
        >
            <div className="flex items-center gap-3 border-b border-gray-200 dark:border-white/5 pb-4 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center border border-blue-200 dark:border-blue-500/30 transition-colors">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">+</span>
                </div>
                <h3 className="text-gray-900 dark:text-white text-xl font-semibold transition-colors">
                    Create New Task
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div className="md:col-span-2 space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Task Title</label>
                    <input
                        type="text"
                        placeholder="Enter task title..."
                        className="w-full p-3 bg-gray-50 dark:bg-[#0A0F1C] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                        {...register("title", {
                            required: "Title is required",
                            minLength: {
                                value: 3,
                                message: "Minimum 3 characters"
                            }
                        })}
                    />
                    {errors.title && (
                        <p className="text-red-500 dark:text-red-400 text-sm">{errors.title.message}</p>
                    )}
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Description</label>
                    <textarea
                        placeholder="Add more details about this task..."
                        rows={3}
                        className="w-full p-3 bg-gray-50 dark:bg-[#0A0F1C] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none"
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && (
                        <p className="text-red-500 dark:text-red-400 text-sm">{errors.description.message}</p>
                    )}
                </div>

                {/* Priority */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Priority</label>
                    <div className="relative">
                        <select
                            className="w-full p-3 bg-gray-50 dark:bg-[#0A0F1C] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                            {...register("priority")}
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Due Date */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Due Date</label>
                    <input
                        type="date"
                        className="w-full p-3 bg-gray-50 dark:bg-[#0A0F1C] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:[color-scheme:dark]"
                        {...register("dueDate")}
                    />
                </div>

                {/* Assign To User */}
                <div className="md:col-span-2 space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Assign To</label>
                    <div className="relative">
                        <select
                            className="w-full p-3 bg-gray-50 dark:bg-[#0A0F1C] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            {...register("assignee", {
                                required: "Please assign the task to a user"
                            })}
                            disabled={loadingUsers}
                        >
                            <option value="">
                                {loadingUsers ? "Loading users..." : "Select a team member..."}
                            </option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.name} ({user.email})
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    {errors.assignee && (
                        <p className="text-red-500 dark:text-red-400 text-sm">{errors.assignee.message}</p>
                    )}
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        "Create Task"
                    )}
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
