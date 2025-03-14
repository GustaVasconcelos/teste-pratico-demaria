<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true; // Defina como 'true' se a autorização não for necessária para atualizar o usuário
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255', 
            'email' => 'sometimes|email|unique:users,email,' . $this->route('user'), 
            'password' => 'sometimes|string|min:8|confirmed',
        ];
    }

    /**
     * Get the validation messages for the request.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'name.string' => 'O nome deve ser uma string.',
            'email.email' => 'O email fornecido não é válido.',
            'email.unique' => 'Este email já está registrado.',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres.',
            'password.confirmed' => 'As senhas não coincidem.',
            'role.in' => 'O papel deve ser "admin" ou "user".',
        ];
    }
}
