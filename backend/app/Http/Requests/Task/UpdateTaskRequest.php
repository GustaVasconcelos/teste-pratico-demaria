<?php

namespace App\Http\Requests\Task;

use App\Http\Requests\BaseFormRequest;

class UpdateTaskRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'nullable|in:pendente,concluída', 
        ];
    }

    public function messages(): array
    {
        return [
            'status.in' => 'O status da tarefa deve ser um dos seguintes: pendente, concluída.',
        ];
    }
}
