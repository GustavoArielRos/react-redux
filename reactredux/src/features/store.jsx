//configureStore biblioteca que simplica a criação da store do Redux
import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";

//o store vai ser um  store redux configurado
export const store = configureStore({
    reducer: {
        tasks: taskSlice //criando uma chave "tasks" que esta associado ao "taskSlice" redutor
    }
})