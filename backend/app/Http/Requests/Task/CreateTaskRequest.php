<?php

namespace App\Http\Requests\Task;

use App\Http\Requests\BaseFormRequest;

class CreateTaskRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|in:pendente,concluída', 
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O título da tarefa é obrigatório.',
            'status.required' => 'O status da tarefa é obrigatório.',
            'status.in' => 'O status da tarefa deve ser um dos seguintes: pendente, concluída.',
        ];
    }
}
