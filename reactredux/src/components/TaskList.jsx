import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchTodo } from '../features/taskSlice'
import EditTask from './EditTask'
import { deleteTask } from '../features/taskSlice'

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.tasks)
    const loading = useSelector((state) => state.tasks.loading)
    const error = useSelector((state) => state.tasks.error)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodo())
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteTask(id))
    }


    if(loading){
        return <p>Tasks loading ....</p>
    }
    if(error){
        return <p>There is an error { error }</p>
    }

    

    return (
        <div>
            <div>
                <h2>Tasks</h2>
                <ul className="space-y-4">
                    {tasks.map(task => (
                        <li key={task.id} className="bg-gray-50 p-4 rounded-md shawo-sm flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                                {task.description && <p className="text-gray-600">{task.description}</p>}
                                <p className='mt1 text-sm font-semibold'>
                                    Status: <span className='italic underline'>{task.status}</span>
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <EditTask task={task} />
                                <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleDelete(task.id)}>delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TaskList