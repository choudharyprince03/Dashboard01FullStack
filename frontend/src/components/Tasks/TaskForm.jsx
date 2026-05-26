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
            className="bg-[#F7F6F2]/95 backdrop-blur-md p-6 rounded-2xl border border-[#C6D7C2] shadow-sm space-y-5 mb-8 transition-colors duration-300"
        >
            <div className="flex items-center gap-3 border-b border-[#D8D3C7] pb-4 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#DFE8DC] flex items-center justify-center border border-[#C6D7C2] transition-colors">
                    <span className="text-[#48684F] font-bold">+</span>
                </div>
                <h3 className="text-[#2C3040] text-xl font-semibold transition-colors">
                    Create New Task
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div className="md:col-span-2 space-y-1.5">
                    <label className="text-sm font-medium text-[#5E6473] transition-colors">Task Title</label>
                    <input
                        type="text"
                        placeholder="Enter task title..."
                        className="w-full p-3 bg-[#EDEAE2] border border-[#D8D3C7] text-[#2C3040] rounded-xl focus:border-[#6B8F71] focus:ring-1 focus:ring-[#6B8F71] outline-none transition-all placeholder:text-[#8A8F9E]"
                        {...register("title", {
                            required: "Title is required",
                            minLength: {
                                value: 3,
                                message: "Minimum 3 characters"
                            }
                        })}
                    />
                    {errors.title && (
                        <p className="text-[#A7625B] text-sm">{errors.title.message}</p>
                    )}
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-1.5">
                    <label className="text-sm font-medium text-[#5E6473] transition-colors">Description</label>
                    <textarea
                        placeholder="Add more details about this task..."
                        rows={3}
                        className="w-full p-3 bg-[#EDEAE2] border border-[#D8D3C7] text-[#2C3040] rounded-xl focus:border-[#6B8F71] focus:ring-1 focus:ring-[#6B8F71] outline-none transition-all placeholder:text-[#8A8F9E] resize-none"
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && (
                        <p className="text-[#A7625B] text-sm">{errors.description.message}</p>
                    )}
                </div>

                {/* Priority */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#5E6473] transition-colors">Priority</label>
                    <div className="relative">
                        <select
                            className="w-full p-3 bg-[#EDEAE2] border border-[#D8D3C7] text-[#2C3040] rounded-xl focus:border-[#6B8F71] focus:ring-1 focus:ring-[#6B8F71] outline-none transition-all appearance-none cursor-pointer"
                            {...register("priority")}
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-[#8A8F9E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Due Date */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#5E6473] transition-colors">Due Date</label>
                    <input
                        type="date"
                        className="w-full p-3 bg-[#EDEAE2] border border-[#D8D3C7] text-[#2C3040] rounded-xl focus:border-[#6B8F71] focus:ring-1 focus:ring-[#6B8F71] outline-none transition-all"
                        {...register("dueDate")}
                    />
                </div>

                {/* Assign To User */}
                <div className="md:col-span-2 space-y-1.5">
                    <label className="text-sm font-medium text-[#5E6473] transition-colors">Assign To</label>
                    <div className="relative">
                        <select
                            className="w-full p-3 bg-[#EDEAE2] border border-[#D8D3C7] text-[#2C3040] rounded-xl focus:border-[#6B8F71] focus:ring-1 focus:ring-[#6B8F71] outline-none transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <svg className="w-4 h-4 text-[#8A8F9E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    {errors.assignee && (
                        <p className="text-[#A7625B] text-sm">{errors.assignee.message}</p>
                    )}
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-[#6B8F71] hover:bg-[#5F8065] text-white px-6 py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
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
