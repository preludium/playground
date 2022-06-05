<script lang="ts">
    import type { Todo } from './types';


    export let element: Todo;
    export let onDelete: (id: Todo['id']) => void;
    export let onUpdate: (todo: Todo) => void;
</script>

<style>
    .element {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 10px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        border-radius: 4px;
        margin: 2px;
    }

    .title {
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;
    }

    .clickable-element {
        cursor: pointer;
    }
    
	.checked-title {
        text-decoration: line-through;
    }

    .checked-element {
        background-color: #ddd;
    }
</style>

<div class="element" class:checked-element={element.done}>
    <input class="clickable-element" on:click={() => onUpdate(element)} checked={element.done} type="checkbox">
    <span class="title" class:checked-title={element.done}>{element.text}</span>
    <span class="clickable-element" on:click={() => onDelete(element.id)}>❌</span>
</div>