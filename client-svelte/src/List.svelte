<script lang="ts">
    import { Tab, Todo } from './types';
    import Element from './Element.svelte'
    import axios from 'axios';

    export let selectedTab: Tab = Tab.TODO;
    export let todos: Todo[] = [];
    let newTodoTitle = '';
    let filteredTodoList: Todo[] = [];

    $: filteredTodoList = selectedTab === Tab.ALL
        ? todos
        : todos.filter((todo) => selectedTab === Tab.DONE ? todo.done : !todo.done);
	
	const addToList = async () => {
        if (newTodoTitle.trim() === '') return;
        const body = { text: newTodoTitle };
        const newTodos = await axios.post('http://localhost:5000/api/todos', body)
            .then(res => res.data);
		todos = newTodos
		newTodoTitle = '';
	}

    const handleUpdate = async (todo: Todo) => {
        const updatedTodos = await axios.put(`http://localhost:5000/api/todos/${todo.id}`, { ...todo, done: !todo.done })
            .then(res => res.data);
        todos = updatedTodos;
    }
	
	const handleDelete = async (id: Todo['id']) => {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
		todos = todos.filter((todo) => todo.id !== id);
    }
</script>


<style> 
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
        height: 100%;
        overflow: auto;
    }

    .input-wrapper {
        display: flex;
        gap: 1rem;
    }

    .input {
        margin: 0;
        width: 100%;
    }
</style>

<div class="wrapper">
    {#each filteredTodoList as todo}
        <Element
            element={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
    {/each}
</div>

<form class="input-wrapper" on:submit|preventDefault={addToList}>
    <input class="input" bind:value={newTodoTitle} type="text">
    <button>➕</button>
</form>