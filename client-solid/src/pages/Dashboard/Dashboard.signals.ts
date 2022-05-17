import { createSignal } from 'solid-js';
import { DeleteTodoModalState } from './Dashboard.types';

export const [showAddModal, setShowAddModal] = createSignal(false);
export const [deleteModalState, setDeleteModalState] = createSignal<DeleteTodoModalState>({ show: false });