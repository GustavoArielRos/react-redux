//importando as funções createSlice e createAsyncThunk da biblioteca reduxjs
import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//DEFININDO O ESTADO INICIAL

const initialState = {
    tasks: [], // um array vazio que armazena uma lista de tarefas
    loading: false, // um booleando que indica o carregamento de dados
    error: null,//onde será armazenado a mensagem de erro caso ocorrá na requisição
    status: 'All' // representa o status da tarefa
}

//CRIA UMA AÇÃO ASSÍCRONA(USANDO O createAsyncThunk). É RESPONSÁVEL POR PEGAR AS INFORMAÇÕES DA API
//"tasks/fetchTodo" representa o nome da ação
//"async () => {....} " função assíncrona que realiza a busca de dados
export const fetchTodo = createAsyncThunk('tasks/fetchTodo', async () => {
    //?_limit=5 , limita para aparecer apenas 5 objetos dessa url
    const response =await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const data = await response.json() //pegando as informações do json e armazendo na variável 'data'

    //mapeia os dados da resposta para o formato desejado, que no caso é esse objeto ai
    return data.map(task => (
        {
            id: task.id,
            title: task.title,
            description: '',
            status: task.completed ? "Completed" : "To Do"
        }

    ))
})

//CRIA UM SLICE DE ESTADO CHAMADO "taskSlice" USANDO O "createSlice"
// um slice é uma aprte do estado Redux que contém o estado e os redutores relacionados
const taskSlice = createSlice({
    name: 'tasks', // nome do slice
    initialState, // estado inicial do slice que já foi definido lá em cima
    //um objeto que pode conter redutores síncronos
    //reducers aqui usados para gerenciar o estado de uma lista de tarefas
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)//método push adiciona uma nova tarefa no array "tasks" e estamos mudandos
        },
        editTask: (state, action) => {
            //percorre cada tarefa e ve se tem uma com o id parecido
            state.tasks = state.tasks.map(task => (
                //se achar atualiza se não, retorna a tarefa inalterada
                task.id === action.payload.id ? action.payload : task
            ))
        },
        deleteTask : (state, action) => {
            //faz o método filter e percorre todas as tarefas, a que for diferente do "id" continua na lista
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        }
    },
    //extraReducers é usado para manipular o estado com base no clico de vida da requisição(Pendecia, Conclusao,Rejeição)
    extraReducers: (builder) => {
        //fetchTodo.peding, indica requisição em andamento
        builder.addCase(fetchTodo.pending, (state) => {
            state.loading = true;
            state.error = null
        }).addCase(fetchTodo.fulfilled, (state, action) => { //fetchTodo.fulfilled, indica que a requisção foi concluída
            state.loading = false;
            state.tasks = action.payload
        }).addCase(fetchTodo.rejected, (state, action) => { //fetchTodo.rejected, indica que a requisição falhou
            state.loading = false;
            state.error = action.error.message
        });
    }
})

export const  {addTask, editTask, deleteTask} = taskSlice.actions

//exportar o redutor(reducer) gerado pelo createSlice,esse redutor será usado para configurar a store do Redux
//redutor é uma função do Redux que atualiza o estado da aplicação em resposta a ações
export default taskSlice.reducer


